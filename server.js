const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const session = require("express-session");
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

const DB_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DB_DIR, "students.json");
const ADMIN_FILE = path.join(DB_DIR, "admin.json");
const LOG_FILE = path.join(DB_DIR, "operation-logs.json");
const BACKUP_DIR = path.join(DB_DIR, "backups");
const DEFAULT_ADMIN = { username: "admin", password: "admin123" };

app.use(express.json());
app.use(
  session({
    secret: "student-management-secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(path.join(__dirname, "public")));

let students = [];
let nextId = 1;
let classes = [];
let nextClassId = 1;
let courses = [];
let nextCourseId = 1;
let grades = [];
let nextGradeId = 1;
let attendanceRecords = [];
let nextAttendanceId = 1;
let admin = { ...DEFAULT_ADMIN };
let lastImportFailedRows = [];
let operationLogs = [];
const loginFailures = new Map();
const MAX_LOGIN_FAILURES = 5;
const LOGIN_LOCK_MS = 10 * 60 * 1000;

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  if (!salt || !hash) return false;
  const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(hash, "hex"));
}

function ensureDataFiles() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ students: [], nextId: 1 }, null, 2), "utf-8");
  }
  if (!fs.existsSync(ADMIN_FILE)) {
    const encrypted = hashPassword(DEFAULT_ADMIN.password);
    fs.writeFileSync(
      ADMIN_FILE,
      JSON.stringify({ username: DEFAULT_ADMIN.username, ...encrypted }, null, 2),
      "utf-8"
    );
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function loadStudents() {
  ensureDataFiles();
  const text = fs.readFileSync(DB_FILE, "utf-8");
  const parsed = JSON.parse(text);
  const rawStudents = Array.isArray(parsed.students) ? parsed.students : [];
  students = rawStudents.map((s) => enrichStudent(s));
  nextId = Number.isInteger(parsed.nextId) ? parsed.nextId : students.length + 1;
  classes = Array.isArray(parsed.classes) ? parsed.classes : [];
  nextClassId = Number.isInteger(parsed.nextClassId) ? parsed.nextClassId : classes.length + 1;
  courses = Array.isArray(parsed.courses) ? parsed.courses : [];
  nextCourseId = Number.isInteger(parsed.nextCourseId) ? parsed.nextCourseId : courses.length + 1;
  grades = Array.isArray(parsed.grades) ? parsed.grades : [];
  nextGradeId = Number.isInteger(parsed.nextGradeId) ? parsed.nextGradeId : grades.length + 1;
  attendanceRecords = Array.isArray(parsed.attendanceRecords) ? parsed.attendanceRecords : [];
  nextAttendanceId = Number.isInteger(parsed.nextAttendanceId)
    ? parsed.nextAttendanceId
    : attendanceRecords.length + 1;
  // Auto-migrate legacy student schema to V1 shape.
  const needMigration = rawStudents.some(
    (s) =>
      !Object.prototype.hasOwnProperty.call(s, "studentNo") ||
      !Object.prototype.hasOwnProperty.call(s, "phone") ||
      !Object.prototype.hasOwnProperty.call(s, "guardianName") ||
      !Object.prototype.hasOwnProperty.call(s, "updatedAt")
  );
  if (needMigration) {
    saveStudents();
  }
}

function saveStudents() {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(
      {
        students,
        nextId,
        classes,
        nextClassId,
        courses,
        nextCourseId,
        grades,
        nextGradeId,
        attendanceRecords,
        nextAttendanceId
      },
      null,
      2
    ),
    "utf-8"
  );
}

function loadOperationLogs() {
  ensureDataFiles();
  const text = fs.readFileSync(LOG_FILE, "utf-8");
  const parsed = JSON.parse(text);
  operationLogs = Array.isArray(parsed) ? parsed : [];
}

function saveOperationLogs() {
  fs.writeFileSync(LOG_FILE, JSON.stringify(operationLogs, null, 2), "utf-8");
}

function addOperationLog(user, action, detail) {
  operationLogs.unshift({
    id: Date.now() + Math.floor(Math.random() * 1000),
    time: new Date().toISOString(),
    user: user || "unknown",
    action,
    detail
  });
  if (operationLogs.length > 200) {
    operationLogs = operationLogs.slice(0, 200);
  }
  saveOperationLogs();
}

function inferLogModule(action) {
  const actionText = String(action || "");
  if (actionText.includes("学生")) return "学生";
  if (actionText.includes("班级")) return "班级";
  if (actionText.includes("课程")) return "课程";
  if (actionText.includes("成绩")) return "成绩";
  if (actionText.includes("考勤")) return "考勤";
  return "系统";
}

function inferActionType(action) {
  const actionText = String(action || "");
  if (actionText.includes("新增") || actionText.includes("录入") || actionText.includes("创建")) return "新增";
  if (actionText.includes("编辑") || actionText.includes("修改") || actionText.includes("更新")) return "编辑";
  if (actionText.includes("删除")) return "删除";
  return "其他";
}

function inferTargetName(action, detail) {
  const detailText = String(detail || "").trim();
  if (!detailText) return "";
  const byName = detailText.match(/(?:姓名|班级|课程|学生)\s*[:：]?\s*([^，,]+)/);
  if (byName && byName[1]) return byName[1].trim();
  return detailText.split(/[，,]/)[0].trim();
}

function normalizeLogItem(log) {
  const action = String(log?.action || "").trim();
  const message = String(log?.detail || "").trim();
  return {
    id: Number(log?.id) || 0,
    module: inferLogModule(action),
    action,
    actionType: inferActionType(action),
    targetName: inferTargetName(action, message),
    operator: String(log?.user || "unknown"),
    message,
    createdAt: log?.time || new Date().toISOString()
  };
}

function toIsoDaysAgo(daysAgo, hour = 9, minute = 0) {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

function buildDemoClasses() {
  return [
    { id: 1, name: "1班", teacher: "李明", capacity: 45, remark: "软件工程方向" },
    { id: 2, name: "2班", teacher: "张红", capacity: 45, remark: "数据科学方向" },
    { id: 3, name: "3班", teacher: "王强", capacity: 40, remark: "网络与安全方向" },
    { id: 4, name: "4班", teacher: "周洁", capacity: 40, remark: "人工智能方向" },
    { id: 5, name: "5班", teacher: "陈刚", capacity: 50, remark: "软件测试方向" },
    { id: 6, name: "6班", teacher: "刘洋", capacity: 35, remark: "前端与交互方向" }
  ];
}

function buildDemoStudents(classList) {
  const names = [
    "张子涵", "李思雨", "王浩然", "赵梓轩", "刘佳宁", "陈宇航",
    "杨若曦", "黄嘉豪", "吴思远", "周沐晨", "徐佳怡", "孙宇辰",
    "马欣怡", "朱晨曦", "胡景天", "郭语彤", "何俊杰", "高诗涵",
    "林梓墨", "罗雨桐", "郑宇轩", "谢嘉琪", "宋泽宇", "唐依然",
    "许明哲", "邓书瑶", "冯子昂", "曹雨晨", "彭梓晴", "曾浩宇",
    "田思涵", "董嘉俊", "袁欣悦", "潘宇航", "于可欣", "蒋梓豪"
  ];
  const statuses = new Array(36).fill("在读");
  statuses[5] = "休学";
  statuses[14] = "毕业";
  statuses[21] = "休学";
  statuses[27] = "在读";
  statuses[31] = "毕业";
  statuses[34] = "休学";
  const studentsData = [];
  let id = 1;
  for (let classIndex = 0; classIndex < classList.length; classIndex += 1) {
    for (let i = 0; i < 6; i += 1) {
      const idx = classIndex * 6 + i;
      const classItem = classList[classIndex];
      const createdAt = toIsoDaysAgo(30 - idx % 12, 10 + (idx % 5), 10 + (idx % 30));
      studentsData.push({
        id,
        studentNo: `S2026${String(id).padStart(3, "0")}`,
        name: names[idx],
        age: 18 + (idx % 7),
        classId: classItem.id,
        className: classItem.name,
        gender: idx % 2 === 0 ? "男" : "女",
        status: statuses[idx] || "在读",
        phone: `138${String(10000000 + id * 37).slice(-8)}`,
        enrollmentDate: `2024-09-${String((idx % 20) + 1).padStart(2, "0")}`,
        guardianName: `${names[idx].slice(0, 1)}家长`,
        guardianPhone: `139${String(20000000 + id * 53).slice(-8)}`,
        remark: idx % 4 === 0 ? "综合表现良好" : idx % 6 === 0 ? "需关注学习状态" : "正常",
        createdAt,
        updatedAt: createdAt
      });
      id += 1;
    }
  }
  return studentsData;
}

function buildDemoCourses() {
  const raw = [
    ["高等数学", "赵建国", 5, "核心基础课"],
    ["大学英语", "孙丽", 3, "公共必修"],
    ["数据结构", "何涛", 4, "专业核心课"],
    ["数据库原理", "顾明", 4, "专业核心课"],
    ["计算机网络", "郑伟", 3, "专业课"],
    ["操作系统", "彭林", 4, "专业核心课"],
    ["Java 程序设计", "唐静", 3, "实践课"],
    ["Web 前端开发", "刘欣", 3, "实践课"],
    ["Python 程序设计", "韩雪", 3, "实践课"],
    ["软件工程", "沈强", 2, "项目管理课程"]
  ];
  return raw.map((item, index) => {
    const createdAt = toIsoDaysAgo(45 - index * 2, 9 + (index % 4), 20 + index);
    return {
      id: index + 1,
      name: item[0],
      teacher: item[1],
      credit: item[2],
      remark: item[3],
      createdAt,
      updatedAt: createdAt
    };
  });
}

function buildDemoGrades(studentsData, coursesData) {
  const result = [];
  let next = 1;
  studentsData.forEach((student, idx) => {
    const courseOffsets = [idx % coursesData.length, (idx + 2) % coursesData.length, (idx + 5) % coursesData.length];
    courseOffsets.forEach((offset, j) => {
      const course = coursesData[offset];
      const base = 58 + ((idx * 7 + j * 11) % 38);
      const adjustment = idx % 9 === 0 ? -10 : idx % 8 === 0 ? 9 : idx % 7 === 0 ? -4 : 0;
      const total = Math.max(35, Math.min(98, base + adjustment));
      const usual = Math.max(30, Math.min(100, Number((total - 3 + ((idx + j) % 7)).toFixed(1))));
      const final = Math.max(30, Math.min(100, Number((total + 2 - ((idx + j) % 5)).toFixed(1))));
      const totalScore = Number((usual * 0.4 + final * 0.6).toFixed(1));
      const createdAt = toIsoDaysAgo(16 - (idx % 10), 11 + (j % 3), 5 + idx % 50);
      result.push({
        id: next++,
        studentId: student.id,
        studentNo: student.studentNo,
        studentName: student.name,
        className: student.className,
        courseId: course.id,
        courseName: course.name,
        usualScore: usual,
        finalScore: final,
        totalScore,
        status: totalScore >= 60 ? "及格" : "不及格",
        createdAt,
        updatedAt: createdAt
      });
    });
  });
  return result;
}

function buildDemoAttendance(studentsData) {
  const statuses = ["出勤", "出勤", "出勤", "迟到", "请假", "缺勤"];
  const records = [];
  let id = 1;
  for (let day = 0; day < 12; day += 1) {
    for (let i = 0; i < 7; i += 1) {
      const student = studentsData[(day * 3 + i * 5) % studentsData.length];
      const status = statuses[(day + i) % statuses.length];
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - day);
      const dateText = dateObj.toISOString().slice(0, 10);
      const createdAt = toIsoDaysAgo(day, 8 + (i % 4), 10 + i * 3);
      records.push({
        id: id++,
        studentId: student.id,
        studentNo: student.studentNo,
        studentName: student.name,
        className: student.className,
        date: dateText,
        status,
        remark: status === "出勤" ? "按时到课" : status === "迟到" ? "早课迟到" : status === "请假" ? "事假" : "缺勤未到",
        createdAt,
        updatedAt: createdAt
      });
    }
  }
  return records;
}

function buildDemoOperationLogs(studentsData, classList, coursesData, gradesData, attendanceData) {
  const logs = [];
  const actions = [
    ["新增学生", () => `ID ${studentsData[logs.length % studentsData.length].id}，姓名 ${studentsData[logs.length % studentsData.length].name}`],
    ["编辑学生", () => `ID ${studentsData[(logs.length + 4) % studentsData.length].id}，姓名 ${studentsData[(logs.length + 4) % studentsData.length].name}`],
    ["删除学生", () => `ID ${studentsData[(logs.length + 9) % studentsData.length].id}，姓名 ${studentsData[(logs.length + 9) % studentsData.length].name}`],
    ["新增班级", () => `ID ${classList[logs.length % classList.length].id}，班级 ${classList[logs.length % classList.length].name}`],
    ["编辑班级", () => `ID ${classList[(logs.length + 2) % classList.length].id}，班级 ${classList[(logs.length + 2) % classList.length].name}`],
    ["新增课程", () => `ID ${coursesData[logs.length % coursesData.length].id}，课程 ${coursesData[logs.length % coursesData.length].name}`],
    ["编辑课程", () => `ID ${coursesData[(logs.length + 3) % coursesData.length].id}，课程 ${coursesData[(logs.length + 3) % coursesData.length].name}`],
    ["录入成绩", () => `学生 ${gradesData[logs.length % gradesData.length].studentName}，课程 ${gradesData[logs.length % gradesData.length].courseName}`],
    ["编辑成绩", () => `成绩ID ${gradesData[(logs.length + 8) % gradesData.length].id}，总评 ${gradesData[(logs.length + 8) % gradesData.length].totalScore}`],
    ["删除成绩", () => `成绩ID ${gradesData[(logs.length + 13) % gradesData.length].id}`],
    ["新增考勤", () => `学生 ${attendanceData[logs.length % attendanceData.length].studentName}，日期 ${attendanceData[logs.length % attendanceData.length].date}`],
    ["编辑考勤", () => `考勤ID ${attendanceData[(logs.length + 5) % attendanceData.length].id}，状态 ${attendanceData[(logs.length + 5) % attendanceData.length].status}`],
    ["删除考勤", () => `考勤ID ${attendanceData[(logs.length + 11) % attendanceData.length].id}`]
  ];
  for (let i = 0; i < 40; i += 1) {
    const [action, detailFactory] = actions[i % actions.length];
    const time = toIsoDaysAgo(i % 7, 9 + (i % 8), 5 + i);
    logs.push({
      id: Date.now() - i * 1379,
      time,
      user: "admin",
      action,
      detail: detailFactory()
    });
  }
  logs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  return logs;
}

function ensureDemoDataset() {
  const shouldSeed =
    students.length < 30 ||
    classes.length < 6 ||
    courses.length < 8 ||
    grades.length < 80 ||
    attendanceRecords.length < 60 ||
    operationLogs.length < 30;
  if (!shouldSeed) return;
  const classList = buildDemoClasses();
  const studentsData = buildDemoStudents(classList);
  const coursesData = buildDemoCourses();
  const gradesData = buildDemoGrades(studentsData, coursesData);
  const attendanceData = buildDemoAttendance(studentsData);
  const logsData = buildDemoOperationLogs(studentsData, classList, coursesData, gradesData, attendanceData);

  classes = classList;
  nextClassId = classList.length + 1;
  students = studentsData.map((s) => enrichStudent(s));
  nextId = studentsData.length + 1;
  courses = coursesData;
  nextCourseId = coursesData.length + 1;
  grades = gradesData;
  nextGradeId = gradesData.length + 1;
  attendanceRecords = attendanceData;
  nextAttendanceId = attendanceData.length + 1;
  operationLogs = logsData;
  saveStudents();
  saveOperationLogs();
}

function loadAdmin() {
  ensureDataFiles();
  const text = fs.readFileSync(ADMIN_FILE, "utf-8");
  const parsed = JSON.parse(text);
  if (
    parsed &&
    typeof parsed.username === "string" &&
    parsed.username.trim() &&
    typeof parsed.hash === "string" &&
    parsed.hash.trim() &&
    typeof parsed.salt === "string" &&
    parsed.salt.trim()
  ) {
    admin = { username: parsed.username.trim(), hash: parsed.hash, salt: parsed.salt };
  } else if (
    parsed &&
    typeof parsed.username === "string" &&
    parsed.username.trim() &&
    typeof parsed.password === "string" &&
    parsed.password.trim()
  ) {
    const encrypted = hashPassword(parsed.password);
    admin = { username: parsed.username.trim(), ...encrypted };
    saveAdmin();
  } else {
    const encrypted = hashPassword(DEFAULT_ADMIN.password);
    admin = { username: DEFAULT_ADMIN.username, ...encrypted };
    saveAdmin();
  }
}

function saveAdmin() {
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2), "utf-8");
}

function isValidStudent(data) {
  const validStatuses = ["在读", "休学", "毕业"];
  return (
    typeof data.studentNo === "string" &&
    data.studentNo.trim() !== "" &&
    typeof data.name === "string" &&
    data.name.trim() !== "" &&
    Number.isInteger(data.age) &&
    data.age > 0 &&
    typeof data.className === "string" &&
    data.className.trim() !== "" &&
    typeof data.gender === "string" &&
    data.gender.trim() !== "" &&
    typeof data.status === "string" &&
    validStatuses.includes(data.status.trim())
  );
}

function normalizeStudentInput(payload) {
  return {
    studentNo: String(payload.studentNo || "").trim(),
    name: String(payload.name || "").trim(),
    age: Number(payload.age),
    classId: Number.isInteger(Number(payload.classId)) ? Number(payload.classId) : null,
    className: String(payload.className || "").trim(),
    gender: String(payload.gender || "").trim(),
    status: String(payload.status || "在读").trim(),
    phone: String(payload.phone || "").trim(),
    enrollmentDate: String(payload.enrollmentDate || "").trim(),
    guardianName: String(payload.guardianName || "").trim(),
    guardianPhone: String(payload.guardianPhone || "").trim(),
    remark: String(payload.remark || "").trim()
  };
}

function enrichStudent(student) {
  return {
    id: student.id,
    studentNo: String(student.studentNo || `S${String(student.id).padStart(6, "0")}`),
    name: String(student.name || ""),
    age: Number(student.age) || 0,
    classId: Number.isInteger(Number(student.classId)) ? Number(student.classId) : null,
    className: String(student.className || ""),
    gender: String(student.gender || ""),
    status: String(student.status || "在读"),
    phone: String(student.phone || ""),
    enrollmentDate: String(student.enrollmentDate || ""),
    guardianName: String(student.guardianName || ""),
    guardianPhone: String(student.guardianPhone || ""),
    remark: String(student.remark || ""),
    createdAt: student.createdAt || new Date().toISOString(),
    updatedAt: student.updatedAt || new Date().toISOString()
  };
}

function normalizeClassInput(payload) {
  return {
    name: String(payload.name || "").trim(),
    teacher: String(payload.teacher || "").trim(),
    capacity: Number(payload.capacity),
    remark: String(payload.remark || "").trim()
  };
}

function getClassStudentCount(className) {
  return students.filter((s) => s.className === className).length;
}

function enrichClass(classItem) {
  const capacity = Number(classItem?.capacity);
  const safeCapacity = Number.isFinite(capacity) && capacity > 0 ? Math.floor(capacity) : 0;
  const studentCount = getClassStudentCount(String(classItem?.name || ""));
  const utilizationRate = safeCapacity ? Number(((studentCount / safeCapacity) * 100).toFixed(1)) : 0;
  return {
    id: Number(classItem?.id) || 0,
    name: String(classItem?.name || "").trim(),
    teacher: String(classItem?.teacher || "").trim(),
    capacity: safeCapacity,
    remark: String(classItem?.remark || "").trim(),
    createdAt: classItem?.createdAt || new Date().toISOString(),
    updatedAt: classItem?.updatedAt || new Date().toISOString(),
    studentCount,
    utilizationRate
  };
}

function normalizeCourseInput(payload) {
  return {
    name: String(payload.name || payload.courseName || "").trim(),
    teacher: String(payload.teacher || payload.teacherName || "").trim(),
    credit: Number(payload.credit),
    remark: String(payload.remark || "").trim()
  };
}

function enrichCourse(courseItem) {
  return {
    id: Number(courseItem?.id) || 0,
    name: String(courseItem?.name || "").trim(),
    teacher: String(courseItem?.teacher || "").trim(),
    credit: Number.isFinite(Number(courseItem?.credit)) ? Number(Number(courseItem.credit).toFixed(1)) : 0,
    remark: String(courseItem?.remark || "").trim(),
    createdAt: courseItem?.createdAt || new Date().toISOString(),
    updatedAt: courseItem?.updatedAt || new Date().toISOString()
  };
}

function normalizeGradeInput(payload) {
  const normalizedCourseId = Number(payload.courseId);
  return {
    studentId: Number(payload.studentId),
    courseId: Number.isInteger(normalizedCourseId) && normalizedCourseId > 0 ? normalizedCourseId : null,
    courseName: String(payload.courseName || "").trim(),
    usualScore: Number(payload.usualScore),
    finalScore: Number(payload.finalScore)
  };
}

function resolveStudentById(studentId) {
  return students.find((s) => s.id === studentId) || null;
}

function resolveCourseId(courseId, courseName) {
  if (Number.isInteger(courseId) && courseId > 0) return courseId;
  const matched = courses.find((c) => String(c.name || "").trim() === String(courseName || "").trim());
  return matched ? matched.id : null;
}

function computeGradeTotals(usualScore, finalScore) {
  const totalScore = Number((usualScore * 0.4 + finalScore * 0.6).toFixed(1));
  const status = totalScore >= 60 ? "及格" : "不及格";
  return { totalScore, status };
}

function enrichGrade(gradeItem) {
  const student = resolveStudentById(Number(gradeItem.studentId));
  const usualScore = Number(gradeItem.usualScore);
  const finalScore = Number(gradeItem.finalScore);
  const canUseNewFields =
    Number.isFinite(usualScore) &&
    Number.isFinite(finalScore) &&
    usualScore >= 0 &&
    usualScore <= 100 &&
    finalScore >= 0 &&
    finalScore <= 100;

  // Backward compatibility: migrate old score/courseId shaped data on read.
  const fallbackScore = Number(gradeItem.score);
  const safeUsual = canUseNewFields
    ? Number(usualScore.toFixed(1))
    : Number.isFinite(fallbackScore)
    ? Number(fallbackScore.toFixed(1))
    : 0;
  const safeFinal = canUseNewFields
    ? Number(finalScore.toFixed(1))
    : Number.isFinite(fallbackScore)
    ? Number(fallbackScore.toFixed(1))
    : 0;
  const totalInfo = computeGradeTotals(safeUsual, safeFinal);
  const linkedCourse = courses.find((c) => c.id === Number(gradeItem.courseId));
  const courseName = String(gradeItem.courseName || linkedCourse?.name || "").trim();
  return {
    id: Number(gradeItem.id) || 0,
    studentId: Number(gradeItem.studentId) || 0,
    courseId:
      Number.isInteger(Number(gradeItem.courseId)) && Number(gradeItem.courseId) > 0
        ? Number(gradeItem.courseId)
        : null,
    studentNo: String(gradeItem.studentNo || student?.studentNo || ""),
    studentName: String(gradeItem.studentName || student?.name || ""),
    className: String(gradeItem.className || student?.className || ""),
    courseName,
    usualScore: safeUsual,
    finalScore: safeFinal,
    totalScore: Number.isFinite(Number(gradeItem.totalScore))
      ? Number(Number(gradeItem.totalScore).toFixed(1))
      : totalInfo.totalScore,
    status: String(gradeItem.status || totalInfo.status),
    createdAt: gradeItem.createdAt || new Date().toISOString(),
    updatedAt: gradeItem.updatedAt || new Date().toISOString()
  };
}

function normalizeAttendanceInput(payload) {
  return {
    studentId: Number(payload.studentId),
    date: String(payload.date || "").trim(),
    status: String(payload.status || "").trim(),
    remark: String(payload.remark || "").trim()
  };
}

function enrichAttendance(item) {
  const student = resolveStudentById(Number(item.studentId));
  return {
    id: Number(item.id) || 0,
    studentId: Number(item.studentId) || 0,
    studentNo: String(item.studentNo || student?.studentNo || ""),
    studentName: String(item.studentName || student?.name || ""),
    className: String(item.className || student?.className || ""),
    date: String(item.date || "").trim(),
    status: String(item.status || "").trim(),
    remark: String(item.remark || "").trim(),
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString()
  };
}

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "请先登录" });
  }
  return next();
}

function getLoginFailKey(req, username) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  return `${String(username || "").trim().toLowerCase()}|${ip}`;
}

function getLockRemainSeconds(lockedUntil) {
  return Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  const key = getLoginFailKey(req, username);
  const status = loginFailures.get(key);
  if (status && status.lockedUntil > Date.now()) {
    const remainSeconds = getLockRemainSeconds(status.lockedUntil);
    return res
      .status(429)
      .json({ message: `登录失败次数过多，请 ${remainSeconds} 秒后再试`, remainSeconds });
  }

  if (username === admin.username && verifyPassword(password || "", admin.salt, admin.hash)) {
    loginFailures.delete(key);
    req.session.user = { username };
    addOperationLog(username, "登录", "管理员登录成功");
    return res.json({ username });
  }

  const failedCount = (status?.count || 0) + 1;
  if (failedCount >= MAX_LOGIN_FAILURES) {
    const lockedUntil = Date.now() + LOGIN_LOCK_MS;
    loginFailures.set(key, { count: failedCount, lockedUntil });
    const remainSeconds = getLockRemainSeconds(lockedUntil);
    return res
      .status(429)
      .json({ message: `登录失败次数过多，请 ${remainSeconds} 秒后再试`, remainSeconds });
  }
  loginFailures.set(key, { count: failedCount, lockedUntil: 0 });
  const remainAttempts = MAX_LOGIN_FAILURES - failedCount;
  return res
    .status(401)
    .json({ message: `账号或密码错误，还可尝试 ${remainAttempts} 次`, remainAttempts });
});

app.post("/api/logout", (req, res) => {
  const user = req.session?.user?.username;
  if (user) {
    addOperationLog(user, "退出登录", "管理员退出系统");
  }
  req.session.destroy(() => {
    res.status(204).send();
  });
});

app.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "未登录" });
  }
  return res.json(req.session.user);
});

app.put("/api/admin/credentials", requireAuth, (req, res) => {
  const { username, password, oldPassword } = req.body || {};
  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    !password.trim() ||
    typeof oldPassword !== "string" ||
    !oldPassword.trim()
  ) {
    return res.status(400).json({ message: "旧密码、账号和新密码均不能为空" });
  }
  if (!verifyPassword(oldPassword, admin.salt, admin.hash)) {
    return res.status(400).json({ message: "旧密码错误" });
  }
  const encrypted = hashPassword(password);
  admin = { username: username.trim(), ...encrypted };
  saveAdmin();
  req.session.user = { username: admin.username };
  addOperationLog(req.session.user.username, "修改管理员账号", `新账号：${admin.username}`);
  return res.json({ username: admin.username });
});

app.post("/api/admin/reset-default", (req, res) => {
  const encrypted = hashPassword(DEFAULT_ADMIN.password);
  admin = { username: DEFAULT_ADMIN.username, ...encrypted };
  saveAdmin();
  loginFailures.clear();
  addOperationLog("system", "重置管理员账号", "已恢复为默认账号 admin");
  return res.json({ username: DEFAULT_ADMIN.username, password: DEFAULT_ADMIN.password });
});

app.get("/api/classes", requireAuth, (_req, res) => {
  const keyword = String(_req.query.keyword || "")
    .trim()
    .toLowerCase();
  const sortBy = String(_req.query.sortBy || "id");
  const sortOrder = String(_req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(_req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(_req.query.pageSize, 10) || 10));

  const baseList = classes.map((c) => enrichClass(c));
  const filtered = keyword
    ? baseList.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) || item.teacher.toLowerCase().includes(keyword)
      )
    : baseList;
  const sortableFields = ["id", "name", "teacher", "capacity", "studentCount", "createdAt"];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "id";
  filtered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (typeof av === "number" && typeof bv === "number") {
      return sortOrder === "asc" ? av - bv : bv - av;
    }
    const compared = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? compared : -compared;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return res.json({ list, total, page, pageSize, sortBy: safeSortBy, sortOrder, keyword });
});

app.post("/api/classes", requireAuth, (req, res) => {
  const payload = normalizeClassInput(req.body || {});
  if (!payload.name || !payload.teacher || !Number.isInteger(payload.capacity) || payload.capacity <= 0) {
    return res.status(400).json({ message: "班级名称、班主任、容量不能为空且容量必须为正整数" });
  }
  if (classes.some((c) => c.name === payload.name)) {
    return res.status(400).json({ message: "班级名称已存在" });
  }
  const now = new Date().toISOString();
  const classItem = {
    id: nextClassId++,
    name: payload.name,
    teacher: payload.teacher,
    capacity: payload.capacity,
    remark: payload.remark,
    createdAt: now,
    updatedAt: now
  };
  classes.push(classItem);
  saveStudents();
  addOperationLog(req.session.user.username, "新增班级", `ID ${classItem.id}，班级 ${classItem.name}`);
  return res.status(201).json(enrichClass(classItem));
});

app.put("/api/classes/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const payload = normalizeClassInput(req.body || {});
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "无效的班级ID" });
  }
  if (!payload.name || !payload.teacher || !Number.isInteger(payload.capacity) || payload.capacity <= 0) {
    return res.status(400).json({ message: "班级名称、班主任、容量不能为空且容量必须为正整数" });
  }
  const index = classes.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "班级不存在" });
  }
  if (classes.some((c) => c.name === payload.name && c.id !== id)) {
    return res.status(400).json({ message: "班级名称已存在" });
  }
  const oldName = classes[index].name;
  classes[index] = {
    id,
    name: payload.name,
    teacher: payload.teacher,
    capacity: payload.capacity,
    remark: payload.remark,
    createdAt: classes[index].createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (oldName !== payload.name) {
    students = students.map((s) => (s.className === oldName ? { ...s, className: payload.name } : s));
  }
  saveStudents();
  addOperationLog(req.session.user.username, "编辑班级", `ID ${id}，班级 ${payload.name}`);
  return res.json(enrichClass(classes[index]));
});

app.delete("/api/classes/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "无效的班级ID" });
  }
  const index = classes.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "班级不存在" });
  }
  const classItem = classes[index];
  const relatedCount = getClassStudentCount(classItem.name);
  if (relatedCount > 0) {
    return res.status(400).json({ message: `该班级下还有 ${relatedCount} 名学生，无法删除` });
  }
  classes.splice(index, 1);
  saveStudents();
  addOperationLog(req.session.user.username, "删除班级", `ID ${classItem.id}，班级 ${classItem.name}`);
  return res.status(204).send();
});

app.get("/api/classes/stats", requireAuth, (_req, res) => {
  const total = classes.length;
  const totalCapacity = classes.reduce((sum, c) => sum + (Number(c.capacity) || 0), 0);
  const totalStudents = students.length;
  const headTeacherCount = new Set(
    classes.map((c) => String(c.teacher || "").trim()).filter((name) => name)
  ).size;
  const utilization = totalCapacity ? Number(((totalStudents / totalCapacity) * 100).toFixed(1)) : 0;
  return res.json({ total, totalCapacity, totalStudents, headTeacherCount, utilization });
});

app.get("/api/classes/:id(\\d+)", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const classItem = classes.find((c) => c.id === id);
  if (!classItem) {
    return res.status(404).json({ message: "班级不存在" });
  }
  return res.json(enrichClass(classItem));
});

app.get("/api/courses", requireAuth, (req, res) => {
  const keyword = String(req.query.keyword || "")
    .trim()
    .toLowerCase();
  const sortBy = String(req.query.sortBy || "id");
  const sortOrder = String(req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10));

  const enriched = courses.map((course) => enrichCourse(course));
  const filtered = keyword
    ? enriched.filter(
        (course) =>
          course.name.toLowerCase().includes(keyword) || course.teacher.toLowerCase().includes(keyword)
      )
    : enriched;
  const sortableFields = ["id", "name", "teacher", "credit", "createdAt"];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "id";
  filtered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (typeof av === "number" && typeof bv === "number") {
      return sortOrder === "asc" ? av - bv : bv - av;
    }
    const compared = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? compared : -compared;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return res.json({ list, total, page, pageSize, keyword, sortBy: safeSortBy, sortOrder });
});

app.post("/api/courses", requireAuth, (req, res) => {
  const payload = normalizeCourseInput(req.body || {});
  if (!payload.name || !payload.teacher || !Number.isFinite(payload.credit) || payload.credit <= 0) {
    return res.status(400).json({ message: "课程名称、授课老师不能为空且学分需大于0" });
  }
  if (courses.some((c) => c.name === payload.name)) {
    return res.status(400).json({ message: "课程名称已存在" });
  }
  const now = new Date().toISOString();
  const course = {
    id: nextCourseId++,
    name: payload.name,
    teacher: payload.teacher,
    credit: payload.credit,
    remark: payload.remark,
    createdAt: now,
    updatedAt: now
  };
  courses.push(course);
  saveStudents();
  addOperationLog(req.session.user.username, "新增课程", `ID ${course.id}，课程 ${course.name}`);
  return res.status(201).json(enrichCourse(course));
});

app.put("/api/courses/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const payload = normalizeCourseInput(req.body || {});
  if (!Number.isInteger(id)) return res.status(400).json({ message: "无效的课程ID" });
  if (!payload.name || !payload.teacher || !Number.isFinite(payload.credit) || payload.credit <= 0) {
    return res.status(400).json({ message: "课程名称、授课老师不能为空且学分需大于0" });
  }
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: "课程不存在" });
  if (courses.some((c) => c.name === payload.name && c.id !== id)) {
    return res.status(400).json({ message: "课程名称已存在" });
  }
  courses[index] = {
    id,
    name: payload.name,
    teacher: payload.teacher,
    credit: payload.credit,
    remark: payload.remark,
    createdAt: courses[index].createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveStudents();
  addOperationLog(req.session.user.username, "编辑课程", `ID ${id}，课程 ${payload.name}`);
  return res.json(enrichCourse(courses[index]));
});

app.delete("/api/courses/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "无效的课程ID" });
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: "课程不存在" });
  if (grades.some((g) => Number(g.courseId) === id || String(g.courseName || "").trim() === courses[index].name)) {
    return res.status(400).json({ message: "该课程已有成绩记录，无法删除" });
  }
  if (attendanceRecords.some((item) => item.courseId === id)) {
    return res.status(400).json({ message: "该课程已有考勤记录，无法删除" });
  }
  const removed = courses[index];
  courses.splice(index, 1);
  saveStudents();
  addOperationLog(req.session.user.username, "删除课程", `ID ${removed.id}，课程 ${removed.name}`);
  return res.status(204).send();
});

app.get("/api/courses/stats", requireAuth, (_req, res) => {
  const total = courses.length;
  const teacherCount = new Set(courses.map((c) => String(c.teacher || "").trim()).filter(Boolean)).size;
  const avgCredit = total
    ? Number((courses.reduce((sum, c) => sum + (Number(c.credit) || 0), 0) / total).toFixed(1))
    : 0;
  const totalCredit = Number(courses.reduce((sum, c) => sum + (Number(c.credit) || 0), 0).toFixed(1));
  return res.json({ total, teacherCount, avgCredit, totalCredit });
});

app.get("/api/grades", requireAuth, (req, res) => {
  const keyword = String(req.query.keyword || "")
    .trim()
    .toLowerCase();
  const className = String(req.query.className || "").trim();
  const courseName = String(req.query.courseName || "").trim();
  const status = String(req.query.status || "").trim();
  const sortBy = String(req.query.sortBy || "id");
  const sortOrder = String(req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10));

  const enriched = grades.map((g) => enrichGrade(g));
  const filtered = enriched.filter((g) => {
    const keywordMatch =
      !keyword ||
      g.studentName.toLowerCase().includes(keyword) ||
      g.studentNo.toLowerCase().includes(keyword) ||
      g.className.toLowerCase().includes(keyword) ||
      g.courseName.toLowerCase().includes(keyword);
    const classMatch = !className || g.className === className;
    const courseMatch = !courseName || g.courseName === courseName;
    const statusMatch = !status || g.status === status;
    return keywordMatch && classMatch && courseMatch && statusMatch;
  });

  const sortableFields = [
    "id",
    "studentId",
    "studentNo",
    "studentName",
    "className",
    "courseName",
    "usualScore",
    "finalScore",
    "totalScore",
    "status",
    "createdAt"
  ];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "id";
  filtered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (typeof av === "number" && typeof bv === "number") {
      return sortOrder === "asc" ? av - bv : bv - av;
    }
    const compared = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? compared : -compared;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return res.json({
    list,
    total,
    page,
    pageSize,
    keyword,
    className,
    courseName,
    status,
    sortBy: safeSortBy,
    sortOrder
  });
});

app.post("/api/grades", requireAuth, (req, res) => {
  const payload = normalizeGradeInput(req.body || {});
  if (!Number.isInteger(payload.studentId) || !payload.courseName) {
    return res.status(400).json({ message: "成绩信息不完整或格式错误" });
  }
  if (
    !Number.isFinite(payload.usualScore) ||
    payload.usualScore < 0 ||
    payload.usualScore > 100 ||
    !Number.isFinite(payload.finalScore) ||
    payload.finalScore < 0 ||
    payload.finalScore > 100
  ) {
    return res.status(400).json({ message: "平时成绩与期末成绩需为 0-100 分" });
  }
  const student = resolveStudentById(payload.studentId);
  if (!student) {
    return res.status(400).json({ message: "学生不存在" });
  }
  const exists = grades.some(
    (g) => Number(g.studentId) === payload.studentId && String(g.courseName || "").trim() === payload.courseName
  );
  if (exists) {
    return res.status(400).json({ message: "该学生该课程成绩已存在，请改用编辑功能" });
  }
  const totals = computeGradeTotals(payload.usualScore, payload.finalScore);
  const resolvedCourseId = resolveCourseId(payload.courseId, payload.courseName);
  const now = new Date().toISOString();
  const grade = {
    id: nextGradeId++,
    studentId: payload.studentId,
    courseId: resolvedCourseId,
    studentNo: student.studentNo,
    studentName: student.name,
    className: student.className,
    courseName: payload.courseName,
    usualScore: Number(payload.usualScore.toFixed(1)),
    finalScore: Number(payload.finalScore.toFixed(1)),
    totalScore: totals.totalScore,
    status: totals.status,
    createdAt: now,
    updatedAt: now
  };
  grades.push(grade);
  saveStudents();
  addOperationLog(req.session.user.username, "录入成绩", `学生 ${grade.studentName}，课程 ${grade.courseName}`);
  return res.status(201).json(enrichGrade(grade));
});

app.put("/api/grades/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const payload = normalizeGradeInput(req.body || {});
  if (!Number.isInteger(id)) return res.status(400).json({ message: "无效的成绩ID" });
  if (!Number.isInteger(payload.studentId) || !payload.courseName) {
    return res.status(400).json({ message: "成绩信息不完整或格式错误" });
  }
  if (
    !Number.isFinite(payload.usualScore) ||
    payload.usualScore < 0 ||
    payload.usualScore > 100 ||
    !Number.isFinite(payload.finalScore) ||
    payload.finalScore < 0 ||
    payload.finalScore > 100
  ) {
    return res.status(400).json({ message: "平时成绩与期末成绩需为 0-100 分" });
  }
  const student = resolveStudentById(payload.studentId);
  if (!student) {
    return res.status(400).json({ message: "学生不存在" });
  }
  const index = grades.findIndex((g) => g.id === id);
  if (index === -1) return res.status(404).json({ message: "成绩记录不存在" });
  const duplicate = grades.some(
    (g) =>
      Number(g.id) !== id &&
      Number(g.studentId) === payload.studentId &&
      String(g.courseName || "").trim() === payload.courseName
  );
  if (duplicate) {
    return res.status(400).json({ message: "该学生该课程成绩已存在" });
  }
  const totals = computeGradeTotals(payload.usualScore, payload.finalScore);
  const resolvedCourseId = resolveCourseId(payload.courseId, payload.courseName);
  grades[index] = {
    id,
    studentId: payload.studentId,
    courseId: resolvedCourseId,
    studentNo: student.studentNo,
    studentName: student.name,
    className: student.className,
    courseName: payload.courseName,
    usualScore: Number(payload.usualScore.toFixed(1)),
    finalScore: Number(payload.finalScore.toFixed(1)),
    totalScore: totals.totalScore,
    status: totals.status,
    createdAt: grades[index].createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveStudents();
  addOperationLog(req.session.user.username, "编辑成绩", `成绩ID ${id}，总评 ${totals.totalScore}`);
  return res.json(enrichGrade(grades[index]));
});

app.delete("/api/grades/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "无效的成绩ID" });
  const index = grades.findIndex((g) => g.id === id);
  if (index === -1) return res.status(404).json({ message: "成绩记录不存在" });
  grades.splice(index, 1);
  saveStudents();
  addOperationLog(req.session.user.username, "删除成绩", `成绩ID ${id}`);
  return res.status(204).send();
});

app.get("/api/grades/stats", requireAuth, (_req, res) => {
  const enriched = grades.map((g) => enrichGrade(g));
  const total = enriched.length;
  const avgScore = total
    ? Number((enriched.reduce((sum, g) => sum + g.totalScore, 0) / total).toFixed(1))
    : 0;
  const passCount = enriched.filter((g) => g.totalScore >= 60).length;
  const passRate = total ? Number(((passCount / total) * 100).toFixed(1)) : 0;
  return res.json({ total, avgScore, passRate, failCount: total - passCount });
});

app.get("/api/attendance", requireAuth, (req, res) => {
  const keyword = String(req.query.keyword || "")
    .trim()
    .toLowerCase();
  const className = String(req.query.className || "").trim();
  const status = String(req.query.status || "").trim();
  const date = String(req.query.date || "").trim();
  const sortBy = String(req.query.sortBy || "id");
  const sortOrder = String(req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10));

  const enriched = attendanceRecords.map((item) => enrichAttendance(item));
  const filtered = enriched.filter((item) => {
    const keywordMatch =
      !keyword ||
      item.studentName.toLowerCase().includes(keyword) ||
      item.studentNo.toLowerCase().includes(keyword) ||
      item.className.toLowerCase().includes(keyword) ||
      item.date.toLowerCase().includes(keyword);
    const classMatch = !className || item.className === className;
    const statusMatch = !status || item.status === status;
    const dateMatch = !date || item.date === date;
    return keywordMatch && classMatch && statusMatch && dateMatch;
  });

  const sortableFields = [
    "id",
    "studentId",
    "studentNo",
    "studentName",
    "className",
    "date",
    "status",
    "createdAt"
  ];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "id";
  filtered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (typeof av === "number" && typeof bv === "number") {
      return sortOrder === "asc" ? av - bv : bv - av;
    }
    const compared = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? compared : -compared;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return res.json({
    list,
    total,
    page,
    pageSize,
    keyword,
    className,
    status,
    date,
    sortBy: safeSortBy,
    sortOrder
  });
});

app.post("/api/attendance", requireAuth, (req, res) => {
  const payload = normalizeAttendanceInput(req.body || {});
  const validStatuses = ["出勤", "缺勤", "请假", "迟到"];
  if (!Number.isInteger(payload.studentId) || !payload.date || !validStatuses.includes(payload.status)) {
    return res.status(400).json({ message: "考勤信息不完整或格式错误" });
  }
  const student = resolveStudentById(payload.studentId);
  if (!student) {
    return res.status(400).json({ message: "学生不存在" });
  }
  const exists = attendanceRecords.some((item) => item.studentId === payload.studentId && item.date === payload.date);
  if (exists) {
    return res.status(400).json({ message: "该学生在该日期的考勤已存在" });
  }
  const now = new Date().toISOString();
  const attendance = {
    id: nextAttendanceId++,
    studentId: payload.studentId,
    studentNo: student.studentNo,
    studentName: student.name,
    className: student.className,
    date: payload.date,
    status: payload.status,
    remark: payload.remark,
    createdAt: now,
    updatedAt: now
  };
  attendanceRecords.push(attendance);
  saveStudents();
  addOperationLog(
    req.session.user.username,
    "新增考勤",
    `学生 ${attendance.studentName}，日期 ${attendance.date}，状态 ${attendance.status}`
  );
  return res.status(201).json(enrichAttendance(attendance));
});

app.put("/api/attendance/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const payload = normalizeAttendanceInput(req.body || {});
  const validStatuses = ["出勤", "缺勤", "请假", "迟到"];
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "无效的考勤ID" });
  }
  if (!Number.isInteger(payload.studentId) || !payload.date || !validStatuses.includes(payload.status)) {
    return res.status(400).json({ message: "考勤信息不完整或格式错误" });
  }
  const student = resolveStudentById(payload.studentId);
  if (!student) {
    return res.status(400).json({ message: "学生不存在" });
  }
  const index = attendanceRecords.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "考勤记录不存在" });
  }
  const duplicate = attendanceRecords.some(
    (item) => item.id !== id && item.studentId === payload.studentId && item.date === payload.date
  );
  if (duplicate) {
    return res.status(400).json({ message: "该学生在该日期的考勤已存在" });
  }
  attendanceRecords[index] = {
    id,
    studentId: payload.studentId,
    studentNo: student.studentNo,
    studentName: student.name,
    className: student.className,
    date: payload.date,
    status: payload.status,
    remark: payload.remark,
    createdAt: attendanceRecords[index].createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveStudents();
  addOperationLog(req.session.user.username, "编辑考勤", `考勤ID ${id}，状态 ${payload.status}`);
  return res.json(enrichAttendance(attendanceRecords[index]));
});

app.delete("/api/attendance/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "无效的考勤ID" });
  const index = attendanceRecords.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: "考勤记录不存在" });
  attendanceRecords.splice(index, 1);
  saveStudents();
  addOperationLog(req.session.user.username, "删除考勤", `考勤ID ${id}`);
  return res.status(204).send();
});

app.get("/api/attendance/stats", requireAuth, (_req, res) => {
  const enriched = attendanceRecords.map((item) => enrichAttendance(item));
  const total = enriched.length;
  const present = enriched.filter((item) => item.status === "出勤").length;
  const absent = enriched.filter((item) => item.status === "缺勤").length;
  const leave = enriched.filter((item) => item.status === "请假").length;
  const late = enriched.filter((item) => item.status === "迟到").length;
  const attendanceRate = total ? Number(((present / total) * 100).toFixed(1)) : 0;
  return res.json({ total, present, absent, leave, late, attendanceRate });
});

app.get("/api/dashboard/stats", requireAuth, (_req, res) => {
  const enrichedGrades = grades.map((g) => enrichGrade(g));
  const enrichedAttendance = attendanceRecords.map((item) => enrichAttendance(item));

  const classDistribution = {};
  for (const student of students) {
    const className = String(student.className || "未分班");
    classDistribution[className] = (classDistribution[className] || 0) + 1;
  }

  const gradeStatusDistribution = { 及格: 0, 不及格: 0 };
  for (const grade of enrichedGrades) {
    const status = grade.totalScore >= 60 ? "及格" : "不及格";
    gradeStatusDistribution[status] = (gradeStatusDistribution[status] || 0) + 1;
  }

  const attendanceStatusDistribution = { 出勤: 0, 迟到: 0, 缺勤: 0, 请假: 0 };
  for (const record of enrichedAttendance) {
    const status = String(record.status || "");
    if (Object.prototype.hasOwnProperty.call(attendanceStatusDistribution, status)) {
      attendanceStatusDistribution[status] += 1;
    }
  }

  const avgTotalScore = enrichedGrades.length
    ? Number((enrichedGrades.reduce((sum, g) => sum + g.totalScore, 0) / enrichedGrades.length).toFixed(1))
    : 0;
  const passCount = enrichedGrades.filter((g) => g.totalScore >= 60).length;
  const passRate = enrichedGrades.length
    ? Number(((passCount / enrichedGrades.length) * 100).toFixed(1))
    : 0;

  const recentFeed = operationLogs.slice(0, 6).map((log) => ({
    time: log.time,
    text: `${log.user} ${log.action}：${log.detail}`
  }));

  return res.json({
    cards: {
      studentTotal: students.length,
      classTotal: classes.length,
      gradeTotal: enrichedGrades.length,
      attendanceTotal: enrichedAttendance.length,
      avgTotalScore,
      passRate,
      absentCount: attendanceStatusDistribution.缺勤 || 0,
      leaveCount: attendanceStatusDistribution.请假 || 0
    },
    charts: {
      classDistribution,
      gradeStatusDistribution,
      attendanceStatusDistribution
    },
    recentFeed
  });
});

app.get("/api/students", requireAuth, (req, res) => {
  const keyword = (req.query.keyword || "").toLowerCase();
  const status = String(req.query.status || "").trim();
  const sortBy = String(req.query.sortBy || "id");
  const sortOrder = String(req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10));

  const filtered = !keyword
    ? [...students]
    : students.filter((s) => {
    return (
      s.studentNo.toLowerCase().includes(keyword) ||
      s.name.toLowerCase().includes(keyword) ||
      s.className.toLowerCase().includes(keyword) ||
      s.gender.toLowerCase().includes(keyword)
    );
  });
  const statusFiltered = status ? filtered.filter((s) => s.status === status) : filtered;

  const sortableFields = ["id", "studentNo", "name", "age", "className", "gender", "status", "enrollmentDate"];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "id";
  statusFiltered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (typeof av === "number" && typeof bv === "number") {
      return sortOrder === "asc" ? av - bv : bv - av;
    }
    const as = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? as : -as;
  });

  const total = statusFiltered.length;
  const start = (page - 1) * pageSize;
  const list = statusFiltered.slice(start, start + pageSize).map((s) => enrichStudent(s));
  return res.json({ list, total, page, pageSize, sortBy: safeSortBy, sortOrder, keyword, status });
});

app.post("/api/students", requireAuth, (req, res) => {
  const payload = normalizeStudentInput(req.body || {});
  if (!isValidStudent(payload)) {
    return res.status(400).json({ message: "学生信息不完整或格式错误" });
  }
  if (students.some((s) => s.studentNo === payload.studentNo)) {
    return res.status(400).json({ message: "学号已存在" });
  }

  const student = enrichStudent({
    id: nextId++,
    studentNo: payload.studentNo,
    name: payload.name,
    age: payload.age,
    classId: payload.classId,
    className: payload.className,
    gender: payload.gender,
    status: payload.status,
    phone: payload.phone,
    enrollmentDate: payload.enrollmentDate,
    guardianName: payload.guardianName,
    guardianPhone: payload.guardianPhone,
    remark: payload.remark,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  students.push(student);
  saveStudents();
  addOperationLog(req.session.user.username, "新增学生", `ID ${student.id}，姓名 ${student.name}`);
  return res.status(201).json(student);
});

app.put("/api/students/:id(\\d+)", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const payload = normalizeStudentInput(req.body || {});

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "无效的学生ID" });
  }
  if (!isValidStudent(payload)) {
    return res.status(400).json({ message: "学生信息不完整或格式错误" });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "学生不存在" });
  }
  if (students.some((s) => s.studentNo === payload.studentNo && s.id !== id)) {
    return res.status(400).json({ message: "学号已存在" });
  }

  students[index] = enrichStudent({
    id,
    studentNo: payload.studentNo,
    name: payload.name,
    age: payload.age,
    classId: payload.classId,
    className: payload.className,
    gender: payload.gender,
    status: payload.status,
    phone: payload.phone,
    enrollmentDate: payload.enrollmentDate,
    guardianName: payload.guardianName,
    guardianPhone: payload.guardianPhone,
    remark: payload.remark,
    createdAt: students[index].createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  saveStudents();
  addOperationLog(req.session.user.username, "编辑学生", `ID ${id}，姓名 ${students[index].name}`);
  return res.json(students[index]);
});

app.get("/api/students/:id", requireAuth, (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return next();
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "学生不存在" });
  }
  return res.json(enrichStudent(student));
});

app.delete("/api/students/:id(\\d+)", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "无效的学生ID" });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "学生不存在" });
  }
  if (grades.some((g) => g.studentId === id)) {
    return res.status(400).json({ message: "该学生已有成绩记录，无法删除" });
  }
  if (attendanceRecords.some((item) => item.studentId === id)) {
    return res.status(400).json({ message: "该学生已有考勤记录，无法删除" });
  }

  const removed = students[index];
  students.splice(index, 1);
  saveStudents();
  addOperationLog(req.session.user.username, "删除学生", `ID ${removed.id}，姓名 ${removed.name}`);
  return res.status(204).send();
});

app.post("/api/students/batch-delete", requireAuth, (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
  const idSet = new Set(
    ids
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id))
  );
  if (!idSet.size) {
    return res.status(400).json({ message: "请提供要删除的学生ID列表" });
  }
  const before = students.length;
  students = students.filter((s) => !idSet.has(s.id));
  const deleted = before - students.length;
  saveStudents();
  addOperationLog(req.session.user.username, "批量删除学生", `删除数量 ${deleted}`);
  return res.json({ deleted });
});

app.get("/api/students/stats", requireAuth, (_req, res) => {
  const total = students.length;
  const averageAge = total
    ? Number((students.reduce((sum, s) => sum + s.age, 0) / total).toFixed(1))
    : 0;
  const classMap = {};
  const statusMap = { 在读: 0, 休学: 0, 毕业: 0 };
  for (const s of students) {
    classMap[s.className] = (classMap[s.className] || 0) + 1;
    statusMap[s.status] = (statusMap[s.status] || 0) + 1;
  }
  return res.json({
    total,
    averageAge,
    classCount: Object.keys(classMap).length,
    classDistribution: classMap,
    statusDistribution: statusMap
  });
});

app.get("/api/students/export", requireAuth, (_req, res) => {
  const worksheet = XLSX.utils.json_to_sheet(students);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "students");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent("学生列表.xlsx")}`
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  return res.send(buffer);
});

app.post("/api/students/import", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "请上传Excel文件" });
  }
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet);

    let imported = 0;
    const failed = [];
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const candidate = {
        studentNo: String(row.studentNo || row["学号"] || `S${String(nextId).padStart(6, "0")}`).trim(),
        name: String(row.name || row["姓名"] || "").trim(),
        age: Number(row.age || row["年龄"]),
        classId: Number(row.classId || row["班级ID"] || 0) || null,
        className: String(row.className || row["班级"] || "").trim(),
        gender: String(row.gender || row["性别"] || "").trim(),
        status: String(row.status || row["状态"] || "在读").trim(),
        phone: String(row.phone || row["联系方式"] || "").trim(),
        enrollmentDate: String(row.enrollmentDate || row["入学日期"] || "").trim(),
        guardianName: String(row.guardianName || row["家长姓名"] || "").trim(),
        guardianPhone: String(row.guardianPhone || row["家长电话"] || "").trim(),
        remark: String(row.remark || row["备注"] || "").trim()
      };
      if (!isValidStudent(candidate)) {
        failed.push({
          row: i + 2,
          reason: "字段缺失或格式错误（需包含学号、姓名、年龄、班级、性别，且年龄为正整数）"
        });
        continue;
      }
      if (students.some((s) => s.studentNo === candidate.studentNo)) {
        failed.push({ row: i + 2, reason: "学号重复" });
        continue;
      }
      students.push(
        enrichStudent({
          id: nextId++,
          ...candidate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      );
      imported += 1;
    }

    saveStudents();
    lastImportFailedRows = failed;
    addOperationLog(
      req.session.user.username,
      "导入学生",
      `成功 ${imported} 条，失败 ${failed.length} 条`
    );
    return res.json({ imported, failedCount: failed.length, failed });
  } catch (error) {
    return res.status(400).json({ message: "Excel解析失败，请检查文件格式" });
  }
});

app.get("/api/students/import-failed/export", requireAuth, (_req, res) => {
  if (!lastImportFailedRows.length) {
    return res.status(400).json({ message: "当前没有可导出的导入失败明细" });
  }
  const worksheet = XLSX.utils.json_to_sheet(lastImportFailedRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "import_failed");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent("导入失败明细.xlsx")}`
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  return res.send(buffer);
});

app.get("/api/operation-logs", requireAuth, (_req, res) => {
  return res.json(operationLogs.slice(0, 50));
});

app.get("/api/logs", requireAuth, (req, res) => {
  const keyword = String(req.query.keyword || "")
    .trim()
    .toLowerCase();
  const module = String(req.query.module || "").trim();
  const actionType = String(req.query.actionType || "").trim();
  const sortBy = String(req.query.sortBy || "createdAt");
  const sortOrder = String(req.query.sortOrder || "desc").toLowerCase() === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10));
  const enriched = operationLogs.map((log) => normalizeLogItem(log));
  const filtered = enriched.filter((item) => {
    const moduleMatch = !module || item.module === module;
    const actionMatch = !actionType || item.actionType === actionType;
    const keywordMatch =
      !keyword ||
      String(item.targetName || "")
        .toLowerCase()
        .includes(keyword) ||
      String(item.message || "")
        .toLowerCase()
        .includes(keyword);
    return moduleMatch && actionMatch && keywordMatch;
  });
  const sortableFields = ["createdAt", "module", "action"];
  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : "createdAt";
  filtered.sort((a, b) => {
    const av = a[safeSortBy];
    const bv = b[safeSortBy];
    if (safeSortBy === "createdAt") {
      const timeDiff = new Date(av).getTime() - new Date(bv).getTime();
      return sortOrder === "asc" ? timeDiff : -timeDiff;
    }
    const compared = String(av).localeCompare(String(bv), "zh-CN");
    return sortOrder === "asc" ? compared : -compared;
  });
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return res.json({ list, total, page, pageSize, keyword, module, actionType, sortBy: safeSortBy, sortOrder });
});

app.get("/api/logs/stats", requireAuth, (_req, res) => {
  const enriched = operationLogs.map((log) => normalizeLogItem(log));
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  const total = enriched.length;
  const todayCount = enriched.filter((item) => {
    const time = new Date(item.createdAt);
    return time.getFullYear() === y && time.getMonth() === m && time.getDate() === d;
  }).length;
  const createCount = enriched.filter((item) => item.actionType === "新增").length;
  const updateCount = enriched.filter((item) => item.actionType === "编辑").length;
  const deleteCount = enriched.filter((item) => item.actionType === "删除").length;
  return res.json({ total, todayCount, createCount, updateCount, deleteCount });
});

app.post("/api/system/backup", requireAuth, (req, res) => {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `backup-${stamp}.json`;
  const filePath = path.join(BACKUP_DIR, fileName);
  const payload = {
    createdAt: new Date().toISOString(),
    students,
    nextId,
    classes,
    nextClassId,
    courses,
    nextCourseId,
    grades,
    nextGradeId,
    attendanceRecords,
    nextAttendanceId,
    admin,
    operationLogs
  };
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");
  addOperationLog(req.session.user.username, "创建备份", fileName);
  return res.json({ fileName });
});

app.get("/api/system/backups", requireAuth, (_req, res) => {
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort((a, b) => b.localeCompare(a));
  return res.json(files);
});

app.post("/api/system/restore", requireAuth, (req, res) => {
  const fileName = String(req.body?.fileName || "").trim();
  if (!fileName || fileName.includes("/") || fileName.includes("\\")) {
    return res.status(400).json({ message: "备份文件名无效" });
  }
  const filePath = path.join(BACKUP_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "备份文件不存在" });
  }
  const text = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(text);
  students = Array.isArray(parsed.students) ? parsed.students : [];
  nextId = Number.isInteger(parsed.nextId) ? parsed.nextId : students.length + 1;
  classes = Array.isArray(parsed.classes) ? parsed.classes : [];
  nextClassId = Number.isInteger(parsed.nextClassId) ? parsed.nextClassId : classes.length + 1;
  courses = Array.isArray(parsed.courses) ? parsed.courses : [];
  nextCourseId = Number.isInteger(parsed.nextCourseId) ? parsed.nextCourseId : courses.length + 1;
  grades = Array.isArray(parsed.grades) ? parsed.grades : [];
  nextGradeId = Number.isInteger(parsed.nextGradeId) ? parsed.nextGradeId : grades.length + 1;
  attendanceRecords = Array.isArray(parsed.attendanceRecords) ? parsed.attendanceRecords : [];
  nextAttendanceId = Number.isInteger(parsed.nextAttendanceId)
    ? parsed.nextAttendanceId
    : attendanceRecords.length + 1;
  if (parsed.admin && parsed.admin.username && parsed.admin.hash && parsed.admin.salt) {
    admin = parsed.admin;
  }
  operationLogs = Array.isArray(parsed.operationLogs) ? parsed.operationLogs : operationLogs;
  saveStudents();
  saveAdmin();
  saveOperationLogs();
  addOperationLog(req.session.user.username, "恢复备份", fileName);
  return res.json({ message: "恢复成功" });
});

loadStudents();
loadAdmin();
loadOperationLogs();
ensureDemoDataset();
app.listen(PORT, () => {
  console.log(`学生管理系统启动成功：http://localhost:${PORT}`);
  console.log(`管理员账号：${admin.username}（密码已加密存储）`);
});
