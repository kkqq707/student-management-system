const studentForm = document.getElementById("studentForm");
const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const mainApp = document.getElementById("mainApp");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeText = document.getElementById("welcomeText");
const adminForm = document.getElementById("adminForm");
const resetAdminBtn = document.getElementById("resetAdminBtn");
const createBackupBtn = document.getElementById("createBackupBtn");
const refreshBackupBtn = document.getElementById("refreshBackupBtn");
const backupSelect = document.getElementById("backupSelect");
const restoreBackupBtn = document.getElementById("restoreBackupBtn");
const oldPasswordInput = document.getElementById("oldPassword");
const newUsernameInput = document.getElementById("newUsername");
const newPasswordInput = document.getElementById("newPassword");
const studentIdInput = document.getElementById("studentId");
const studentNoInput = document.getElementById("studentNo");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const classIdInputForStudent = document.getElementById("studentClassId");
const classNameInput = document.getElementById("className");
const genderInput = document.getElementById("gender");
const studentStatusInput = document.getElementById("studentStatus");
const phoneInput = document.getElementById("phone");
const enrollmentDateInput = document.getElementById("enrollmentDate");
const guardianNameInput = document.getElementById("guardianName");
const guardianPhoneInput = document.getElementById("guardianPhone");
const remarkInput = document.getElementById("remark");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const exportFailedBtn = document.getElementById("exportFailedBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const sortBySelect = document.getElementById("sortBy");
const sortOrderSelect = document.getElementById("sortOrder");
const pageSizeSelect = document.getElementById("pageSize");
const statusFilterSelect = document.getElementById("statusFilter");
const batchDeleteBtn = document.getElementById("batchDeleteBtn");
const selectAllCurrentPage = document.getElementById("selectAllCurrentPage");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfo = document.getElementById("pageInfo");
const totalInfo = document.getElementById("totalInfo");
const formTitle = document.getElementById("formTitle");
const cancelEdit = document.getElementById("cancelEdit");
const studentFormCard = document.getElementById("studentFormCard");
const resetStudentFormBtn = document.getElementById("resetStudentFormBtn");
const quickAddStudentBtn = document.getElementById("quickAddStudentBtn");
const quickImportBtn = document.getElementById("quickImportBtn");
const selectedCountLabel = document.getElementById("selectedCountLabel");
const statTotal = document.getElementById("statTotal");
const statAvgAge = document.getElementById("statAvgAge");
const statClassCount = document.getElementById("statClassCount");
const statInSchool = document.getElementById("statInSchool");
const classForm = document.getElementById("classForm");
const classFormCard = document.getElementById("classFormCard");
const classIdInput = document.getElementById("classId");
const classNameManageInput = document.getElementById("classNameManage");
const classTeacherInput = document.getElementById("classTeacher");
const classCapacityInput = document.getElementById("classCapacity");
const classRemarkInput = document.getElementById("classRemark");
const classFormTitle = document.getElementById("classFormTitle");
const cancelClassEditBtn = document.getElementById("cancelClassEdit");
const classTableBody = document.getElementById("classTableBody");
const classStatTotal = document.getElementById("classStatTotal");
const classStatTeachers = document.getElementById("classStatTeachers");
const classStatCapacity = document.getElementById("classStatCapacity");
const classStatStudents = document.getElementById("classStatStudents");
const classSearchInput = document.getElementById("classSearch");
const classSearchBtn = document.getElementById("classSearchBtn");
const classResetBtn = document.getElementById("classResetBtn");
const classSortBySelect = document.getElementById("classSortBy");
const classSortOrderSelect = document.getElementById("classSortOrder");
const classPageSizeSelect = document.getElementById("classPageSize");
const classPrevPageBtn = document.getElementById("classPrevPageBtn");
const classNextPageBtn = document.getElementById("classNextPageBtn");
const classPageInfo = document.getElementById("classPageInfo");
const classTotalInfo = document.getElementById("classTotalInfo");
const courseForm = document.getElementById("courseForm");
const courseIdInput = document.getElementById("courseId");
const courseFormCard = document.getElementById("courseFormCard");
const courseNameInput = document.getElementById("courseName");
const courseTeacherInput = document.getElementById("courseTeacher");
const courseCreditInput = document.getElementById("courseCredit");
const courseRemarkInput = document.getElementById("courseRemark");
const courseFormTitle = document.getElementById("courseFormTitle");
const cancelCourseEditBtn = document.getElementById("cancelCourseEdit");
const courseTableBody = document.getElementById("courseTableBody");
const courseStatTotal = document.getElementById("courseStatTotal");
const courseStatTeachers = document.getElementById("courseStatTeachers");
const courseStatTotalCredit = document.getElementById("courseStatTotalCredit");
const courseStatAvgCredit = document.getElementById("courseStatAvgCredit");
const courseSearchInput = document.getElementById("courseSearch");
const courseSearchBtn = document.getElementById("courseSearchBtn");
const courseResetBtn = document.getElementById("courseResetBtn");
const courseSortBySelect = document.getElementById("courseSortBy");
const courseSortOrderSelect = document.getElementById("courseSortOrder");
const coursePageSizeSelect = document.getElementById("coursePageSize");
const coursePrevPageBtn = document.getElementById("coursePrevPageBtn");
const courseNextPageBtn = document.getElementById("courseNextPageBtn");
const coursePageInfo = document.getElementById("coursePageInfo");
const courseTotalInfo = document.getElementById("courseTotalInfo");
const gradeForm = document.getElementById("gradeForm");
const gradeFormCard = document.getElementById("gradeFormCard");
const gradeIdInput = document.getElementById("gradeId");
const gradeStudentSelect = document.getElementById("gradeStudent");
const gradeStudentNoInput = document.getElementById("gradeStudentNo");
const gradeClassNameInput = document.getElementById("gradeClassName");
const gradeCourseNameInput = document.getElementById("gradeCourseName");
const gradeUsualScoreInput = document.getElementById("gradeUsualScore");
const gradeFinalScoreInput = document.getElementById("gradeFinalScore");
const gradeTotalScoreInput = document.getElementById("gradeTotalScore");
const gradeStatusInput = document.getElementById("gradeStatus");
const gradeFormTitle = document.getElementById("gradeFormTitle");
const cancelGradeEditBtn = document.getElementById("cancelGradeEdit");
const gradeTableBody = document.getElementById("gradeTableBody");
const gradeStatTotal = document.getElementById("gradeStatTotal");
const gradeStatAvg = document.getElementById("gradeStatAvg");
const gradeStatPassRate = document.getElementById("gradeStatPassRate");
const gradeStatFailCount = document.getElementById("gradeStatFailCount");
const gradeSearchInput = document.getElementById("gradeSearch");
const gradeFilterClassNameInput = document.getElementById("gradeFilterClassName");
const gradeFilterCourseNameInput = document.getElementById("gradeFilterCourseName");
const gradeFilterCourseOptions = document.getElementById("gradeFilterCourseOptions");
const gradeFilterStatusSelect = document.getElementById("gradeFilterStatus");
const gradeSortBySelect = document.getElementById("gradeSortBy");
const gradeSortOrderSelect = document.getElementById("gradeSortOrder");
const gradePageSizeSelect = document.getElementById("gradePageSize");
const gradeSearchBtn = document.getElementById("gradeSearchBtn");
const gradeResetBtn = document.getElementById("gradeResetBtn");
const gradePrevPageBtn = document.getElementById("gradePrevPageBtn");
const gradeNextPageBtn = document.getElementById("gradeNextPageBtn");
const gradePageInfo = document.getElementById("gradePageInfo");
const gradeTotalInfo = document.getElementById("gradeTotalInfo");
const attendanceForm = document.getElementById("attendanceForm");
const attendanceFormCard = document.getElementById("attendanceFormCard");
const attendanceIdInput = document.getElementById("attendanceId");
const attendanceStudentSelect = document.getElementById("attendanceStudent");
const attendanceStudentNoInput = document.getElementById("attendanceStudentNo");
const attendanceClassNameInput = document.getElementById("attendanceClassName");
const attendanceDateInput = document.getElementById("attendanceDate");
const attendanceStatusInput = document.getElementById("attendanceStatus");
const attendanceRemarkInput = document.getElementById("attendanceRemark");
const attendanceFormTitle = document.getElementById("attendanceFormTitle");
const cancelAttendanceEditBtn = document.getElementById("cancelAttendanceEdit");
const attendanceTableBody = document.getElementById("attendanceTableBody");
const attendanceStatTotal = document.getElementById("attendanceStatTotal");
const attendanceStatRate = document.getElementById("attendanceStatRate");
const attendanceStatAbsent = document.getElementById("attendanceStatAbsent");
const attendanceStatLeave = document.getElementById("attendanceStatLeave");
const attendanceStatLate = document.getElementById("attendanceStatLate");
const attendanceSearchInput = document.getElementById("attendanceSearch");
const attendanceFilterClassNameInput = document.getElementById("attendanceFilterClassName");
const attendanceFilterDateInput = document.getElementById("attendanceFilterDate");
const attendanceFilterStatusSelect = document.getElementById("attendanceFilterStatus");
const attendanceSortBySelect = document.getElementById("attendanceSortBy");
const attendanceSortOrderSelect = document.getElementById("attendanceSortOrder");
const attendancePageSizeSelect = document.getElementById("attendancePageSize");
const attendanceSearchBtn = document.getElementById("attendanceSearchBtn");
const attendanceResetBtn = document.getElementById("attendanceResetBtn");
const attendancePrevPageBtn = document.getElementById("attendancePrevPageBtn");
const attendanceNextPageBtn = document.getElementById("attendanceNextPageBtn");
const attendancePageInfo = document.getElementById("attendancePageInfo");
const attendanceTotalInfo = document.getElementById("attendanceTotalInfo");
const operationLogList = document.getElementById("operationLogList");
const logStatTotal = document.getElementById("logStatTotal");
const logStatToday = document.getElementById("logStatToday");
const logStatCreate = document.getElementById("logStatCreate");
const logStatDelete = document.getElementById("logStatDelete");
const logFilterModuleSelect = document.getElementById("logFilterModule");
const logFilterActionTypeSelect = document.getElementById("logFilterActionType");
const logSearchInput = document.getElementById("logSearch");
const logSortBySelect = document.getElementById("logSortBy");
const logSortOrderSelect = document.getElementById("logSortOrder");
const logPageSizeSelect = document.getElementById("logPageSize");
const logSearchBtn = document.getElementById("logSearchBtn");
const logResetBtn = document.getElementById("logResetBtn");
const logTableBody = document.getElementById("logTableBody");
const logPrevPageBtn = document.getElementById("logPrevPageBtn");
const logNextPageBtn = document.getElementById("logNextPageBtn");
const logPageInfo = document.getElementById("logPageInfo");
const logTotalInfo = document.getElementById("logTotalInfo");
const detailModal = document.getElementById("detailModal");
const detailContent = document.getElementById("detailContent");
const detailTitle = document.querySelector(".detail-title");
const detailSubtitle = document.querySelector(".detail-subtitle");
const closeDetailBtn = document.getElementById("closeDetailBtn");
const detailModalCloseIcon = document.getElementById("detailModalCloseIcon");
const detailEditBtn = document.getElementById("detailEditBtn");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const deleteConfirmText = document.getElementById("deleteConfirmText");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const globalMessage = document.getElementById("globalMessage");
const featureMenu = document.getElementById("featureMenu");
const dashStudentTotal = document.getElementById("dashStudentTotal");
const dashClassTotal = document.getElementById("dashClassTotal");
const dashGradeTotal = document.getElementById("dashGradeTotal");
const dashAttendanceTotal = document.getElementById("dashAttendanceTotal");
const dashAvgScore = document.getElementById("dashAvgScore");
const dashPassRate = document.getElementById("dashPassRate");
const dashAbsentCount = document.getElementById("dashAbsentCount");
const dashLeaveCount = document.getElementById("dashLeaveCount");
const dashClassDistribution = document.getElementById("dashClassDistribution");
const dashGradeStatus = document.getElementById("dashGradeStatus");
const dashAttendanceStatus = document.getElementById("dashAttendanceStatus");
const dashRecentFeed = document.getElementById("dashRecentFeed");

const state = { keyword: "", page: 1, pageSize: 10, sortBy: "id", sortOrder: "desc", total: 0, status: "" };
let studentsCache = [];
let classList = [];
const classState = {
  keyword: "",
  page: 1,
  pageSize: 10,
  sortBy: "id",
  sortOrder: "desc",
  total: 0
};
let courseList = [];
const courseState = { keyword: "", page: 1, pageSize: 10, sortBy: "id", sortOrder: "desc", total: 0 };
let gradeList = [];
const gradeState = {
  keyword: "",
  className: "",
  courseName: "",
  status: "",
  sortBy: "id",
  sortOrder: "desc",
  page: 1,
  pageSize: 10,
  total: 0
};
let attendanceList = [];
const attendanceState = {
  keyword: "",
  className: "",
  status: "",
  date: "",
  sortBy: "id",
  sortOrder: "desc",
  page: 1,
  pageSize: 10,
  total: 0
};
let logList = [];
const logState = {
  keyword: "",
  module: "",
  actionType: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  pageSize: 10,
  total: 0
};
const LAST_SECTION_KEY = "sms:last-section";
const deleteState = { mode: "", targetId: null, ids: [] };
let studentSubmitLoading = false;
let messageTimer = null;
const MSG = {
  loadStudentFailed: "学生数据加载失败，请稍后重试",
  loadStudentDetailFailed: "学生详情加载失败，请稍后重试",
  loadStudentEditDataFailed: "学生编辑数据加载失败，请稍后重试",
  emptyStudents: "暂无学生数据，可点击右上角“新增学生”开始录入",
  emptySearch: "没有找到匹配结果，请调整筛选条件后重试",
  emptyClasses: "暂无班级数据",
  emptyClassSearch: "没有找到匹配班级，请调整筛选条件后重试",
  emptyCourses: "暂无课程数据",
  emptyGrades: "暂无成绩数据",
  emptyAttendance: "暂无考勤数据",
  emptyLogs: "暂无日志数据",
  saveStudentCreateSuccess: "学生新增成功",
  saveStudentUpdateSuccess: "学生更新成功",
  deleteSingleSuccess: "学生删除成功",
  deleteBatchSuccess: "批量删除成功",
  deleteClassSuccess: "班级删除成功",
  deleteCourseSuccess: "课程删除成功",
  deleteGradeSuccess: "成绩删除成功",
  deleteAttendanceSuccess: "考勤删除成功",
  selectBeforeBatchDelete: "请先勾选要删除的学生",
  importNeedFile: "请先选择要导入的 Excel 文件",
  importSuccess: "导入成功",
  studentNoDuplicated: "学号已存在，请更换",
  classSaveSuccess: "班级保存成功",
  courseSaveSuccess: "课程保存成功",
  gradeSaveSuccess: "成绩保存成功",
  attendanceSaveSuccess: "考勤保存成功",
  loadLogsFailed: "日志加载失败，请稍后重试",
  adminUpdated: "管理员账号密码已更新",
  resetAdminSuccess: "重置成功，请使用 admin / admin123 登录"
};

function renderEmptyRow(colspan, text = "暂无数据") {
  return `<tr><td colspan="${colspan}" class="empty-cell">${text}</td></tr>`;
}

function renderSkeletonRows(colspan, rowCount = 4) {
  return Array.from({ length: rowCount })
    .map(
      () =>
        `<tr><td colspan="${colspan}"><div class="skeleton-line w-70"></div></td></tr>`
    )
    .join("");
}

function safeText(value, fallback = "-") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text ? text : fallback;
}

function normalizeLogItemClient(item) {
  const action = String(item?.action || "").trim();
  const message = String(item?.message ?? item?.detail ?? "").trim();
  const createdAt = item?.createdAt || item?.time || new Date().toISOString();
  const operator = String(item?.operator ?? item?.user ?? "unknown");
  const module = String(item?.module || "").trim() || inferLogModuleByAction(action);
  const actionType = String(item?.actionType || "").trim() || inferLogTypeByAction(action);
  return {
    id: Number(item?.id) || 0,
    module,
    action,
    actionType,
    targetName: String(item?.targetName || "").trim(),
    operator,
    message,
    createdAt
  };
}

function inferLogModuleByAction(action) {
  const text = String(action || "");
  if (text.includes("学生")) return "学生";
  if (text.includes("班级")) return "班级";
  if (text.includes("课程")) return "课程";
  if (text.includes("成绩")) return "成绩";
  if (text.includes("考勤")) return "考勤";
  return "系统";
}

function inferLogTypeByAction(action) {
  const text = String(action || "");
  if (text.includes("新增") || text.includes("录入") || text.includes("创建")) return "新增";
  if (text.includes("编辑") || text.includes("修改") || text.includes("更新")) return "编辑";
  if (text.includes("删除")) return "删除";
  return "其他";
}

function renderDashboardBarList(container, mapData) {
  if (!container) return;
  const entries = Object.entries(mapData || {}).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    container.innerHTML = '<div class="chart-empty">暂无数据</div>';
    return;
  }
  const maxValue = Math.max(...entries.map(([, value]) => Number(value) || 0), 1);
  container.innerHTML = entries
    .map(([label, value]) => {
      const safeValue = Number(value) || 0;
      const width = Math.max(6, Math.round((safeValue / maxValue) * 100));
      return `<button type="button" class="bar-row" data-dashboard-action="students-by-class" data-class-name="${String(label).replace(/"/g, "&quot;")}" style="border:none;background:transparent;padding:0;text-align:left;cursor:pointer"><div class="bar-label">${safeText(label, "--")}</div><div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div><div class="bar-value">${safeValue}</div></button>`;
    })
    .join("");
}

function renderDashboardDonutList(container, mapData, colorMap = {}) {
  if (!container) return;
  const rawEntries = Array.isArray(mapData)
    ? mapData.map((item) => {
        const label = item?.label ?? item?.name ?? item?.status ?? "";
        const value = Number(item?.count ?? item?.value ?? item?.total ?? 0) || 0;
        return [label, value];
      })
    : Object.entries(mapData || {});
  const entries = rawEntries
    .map(([label, value]) => [safeText(label, "--"), Number(value) || 0])
    .filter(([label]) => Boolean(label));
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!entries.length) {
    container.innerHTML = '<div class="chart-empty">暂无数据</div>';
    return;
  }
  const maxValue = Math.max(...entries.map(([, value]) => value), 1);
  container.innerHTML = entries
    .map(([label, value]) => {
      const safeValue = Number(value) || 0;
      const percent = total > 0 ? Number(((safeValue / total) * 100).toFixed(1)) : 0;
      const width = Math.max(total > 0 ? 6 : 0, Math.round((safeValue / maxValue) * 100));
      const color = colorMap[label] || "#5b7cff";
      return `<button type="button" class="donut-item" data-dashboard-action="${container.id === "dashGradeStatus" ? "grade-status" : "attendance-status"}" data-status="${String(label).replace(/"/g, "&quot;")}" style="width:100%;cursor:pointer"><div class="donut-main"><div class="donut-header"><span class="legend-dot" style="background:${color}"></span><span class="donut-label">${safeText(label, "--")}</span><span class="donut-value">${safeValue}</span><span class="donut-percent">${percent}%</span></div><div class="donut-track"><div class="donut-fill" style="width:${width}%;background:${color}"></div></div></div></button>`;
    })
    .join("");
}

async function navigateToStudentsByKeyword(keyword) {
  switchSection("section-students");
  searchInput.value = keyword;
  state.keyword = keyword;
  state.page = 1;
  await fetchStudentsSafe();
}

async function navigateToGradesByStatus(status) {
  switchSection("section-grades");
  gradeFilterStatusSelect.value = status;
  gradeState.status = status;
  gradeState.page = 1;
  await fetchGrades();
}

async function navigateToAttendanceByStatus(status) {
  switchSection("section-attendance");
  attendanceFilterStatusSelect.value = status;
  attendanceState.status = status;
  attendanceState.page = 1;
  await fetchAttendance();
}

function getSectionFromFeedText(text) {
  const source = String(text || "");
  if (source.includes("学生")) return "section-students";
  if (source.includes("班级")) return "section-classes";
  if (source.includes("课程")) return "section-courses";
  if (source.includes("成绩")) return "section-grades";
  if (source.includes("考勤")) return "section-attendance";
  return "section-dashboard";
}

function normalizeClassItem(item) {
  const className = safeText(item?.className ?? item?.name, "");
  const headTeacher = safeText(item?.headTeacher ?? item?.teacher, "");
  const capacity = Number.isFinite(Number(item?.capacity)) ? Number(item.capacity) : 0;
  const studentCount = Number.isFinite(Number(item?.studentCount)) ? Number(item.studentCount) : 0;
  return {
    id: Number(item?.id) || 0,
    className,
    headTeacher,
    grade: safeText(item?.grade, "--"),
    status: safeText(item?.status, "正常"),
    capacity,
    remark: safeText(item?.remark, ""),
    createdAt: safeText(item?.createdAt, ""),
    updatedAt: safeText(item?.updatedAt, ""),
    studentCount,
    utilizationRate: capacity ? Number(((studentCount / capacity) * 100).toFixed(1)) : 0
  };
}

function normalizeCourseItem(item) {
  return {
    id: Number(item?.id) || 0,
    courseName: safeText(item?.courseName ?? item?.name, ""),
    teacherName: safeText(item?.teacherName ?? item?.teacher, ""),
    credit: Number.isFinite(Number(item?.credit)) ? Number(item.credit) : 0,
    remark: safeText(item?.remark, ""),
    createdAt: safeText(item?.createdAt, ""),
    updatedAt: safeText(item?.updatedAt, "")
  };
}

function showMessage(message, type = "success") {
  if (!globalMessage) {
    console.log(message);
    return;
  }
  globalMessage.textContent = message;
  globalMessage.className = `global-message ${type}`;
  globalMessage.style.display = "block";
  if (messageTimer) window.clearTimeout(messageTimer);
  messageTimer = window.setTimeout(() => {
    globalMessage.style.display = "none";
  }, 2400);
}

function setStudentFormLoading(loading) {
  studentSubmitLoading = loading;
  const submitBtn = studentForm.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? "保存中..." : "保存";
  }
}

function validateStudentForm() {
  if (!studentNoInput.value.trim()) return "学号不能为空";
  if (!nameInput.value.trim()) return "姓名不能为空";
  if (!classNameInput.value.trim()) return "班级不能为空";
  if (!genderInput.value.trim()) return "性别不能为空";
  const age = Number(ageInput.value);
  if (!Number.isInteger(age) || age < 1 || age > 120) return "年龄需为 1-120 的整数";
  const editingId = Number(studentIdInput.value || 0);
  const duplicated = studentsCache.some(
    (s) => s.studentNo === studentNoInput.value.trim() && Number(s.id) !== editingId
  );
  if (duplicated) return MSG.studentNoDuplicated;
  return "";
}

function renderStudentStatusTag(status) {
  const safeStatus = status || "在读";
  const cls =
    safeStatus === "在读"
      ? "tag tag-success"
      : safeStatus === "休学"
      ? "tag tag-warning"
      : "tag tag-default";
  return `<span class="${cls}">${safeStatus}</span>`;
}

function StudentStatsCards(data) {
  const total = Number.isFinite(data?.total) ? data.total : 0;
  const averageAge = Number.isFinite(data?.averageAge) ? data.averageAge : 0;
  const classCount = Number.isFinite(data?.classCount) ? data.classCount : 0;
  const inSchool = Number.isFinite(data?.statusDistribution?.在读) ? data.statusDistribution.在读 : 0;
  statTotal.textContent = String(total);
  statAvgAge.textContent = String(averageAge);
  statClassCount.textContent = String(classCount);
  if (statInSchool) statInSchool.textContent = String(inSchool);
}

function StudentBatchActions() {
  if (!selectedCountLabel) return;
  const count = document.querySelectorAll(".row-check:checked").length;
  selectedCountLabel.textContent = `已选 ${count} 项`;
  updateSelectAllState();
}

function StudentFilterBar() {
  // Query params are already bound through state and controls.
}

function StudentFormCard(student = null) {
  if (!student) {
    resetStudentForm();
    return;
  }
  studentIdInput.value = student.id;
  studentNoInput.value = student.studentNo || "";
  nameInput.value = student.name || "";
  ageInput.value = student.age || "";
  classIdInputForStudent.value = student.classId ?? "";
  classNameInput.value = student.className || "";
  genderInput.value = student.gender || "男";
  studentStatusInput.value = student.status || "在读";
  phoneInput.value = student.phone || "";
  enrollmentDateInput.value = student.enrollmentDate || "";
  guardianNameInput.value = student.guardianName || "";
  guardianPhoneInput.value = student.guardianPhone || "";
  remarkInput.value = student.remark || "";
  formTitle.textContent = "编辑学生";
  cancelEdit.style.display = "inline-block";
}

function StudentDetailDrawer(student) {
  const val = (v) => safeText(v, "--");
  if (detailTitle) detailTitle.textContent = "学生详情";
  if (detailSubtitle) detailSubtitle.textContent = "查看学生完整档案信息与记录。";
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">学号</div><div class="detail-value">${val(student.studentNo)}</div></div>
      <div class="detail-item"><div class="detail-label">姓名</div><div class="detail-value">${val(student.name)}</div></div>
      <div class="detail-item"><div class="detail-label">年龄</div><div class="detail-value">${val(student.age)}</div></div>
      <div class="detail-item"><div class="detail-label">性别</div><div class="detail-value">${val(student.gender)}</div></div>
      <div class="detail-item"><div class="detail-label">班级</div><div class="detail-value">${val(student.className)}</div></div>
      <div class="detail-item"><div class="detail-label">班级ID</div><div class="detail-value">${val(student.classId)}</div></div>
      <div class="detail-item"><div class="detail-label">状态</div><div class="detail-value">${renderStudentStatusTag(student.status)}</div></div>
      <div class="detail-item"><div class="detail-label">联系方式</div><div class="detail-value">${val(student.phone)}</div></div>
      <div class="detail-item"><div class="detail-label">入学日期</div><div class="detail-value">${val(student.enrollmentDate)}</div></div>
      <div class="detail-item"><div class="detail-label">家长姓名</div><div class="detail-value">${val(student.guardianName)}</div></div>
      <div class="detail-item"><div class="detail-label">家长电话</div><div class="detail-value">${val(student.guardianPhone)}</div></div>
    </div>
    <div class="detail-remark">
      <div class="detail-label">备注</div>
      <div class="detail-value">${val(student.remark)}</div>
    </div>
    <div class="detail-meta">
      <div>创建时间：${val(student.createdAt)}</div>
      <div>更新时间：${val(student.updatedAt)}</div>
      <div>学生ID：${val(student.id)}</div>
    </div>
  `;
  if (detailEditBtn) {
    detailEditBtn.dataset.id = String(student.id);
    detailEditBtn.dataset.mode = "student";
    detailEditBtn.textContent = "编辑该学生";
  }
  detailModal.style.display = "flex";
}

function ClassDetailDrawer(item) {
  const val = (v) => safeText(v, "--");
  const utilizationText =
    Number(item.capacity) > 0 && Number.isFinite(Number(item.utilizationRate))
      ? `${Number(item.utilizationRate)}%`
      : "--";
  if (detailTitle) detailTitle.textContent = "班级详情";
  if (detailSubtitle) detailSubtitle.textContent = "查看班级基础信息、容量与利用率。";
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">班级ID</div><div class="detail-value">${val(item.id)}</div></div>
      <div class="detail-item"><div class="detail-label">班级名称</div><div class="detail-value">${val(item.className)}</div></div>
      <div class="detail-item"><div class="detail-label">班主任</div><div class="detail-value">${val(item.headTeacher)}</div></div>
      <div class="detail-item"><div class="detail-label">容量</div><div class="detail-value">${Number(item.capacity) > 0 ? item.capacity : "--"}</div></div>
      <div class="detail-item"><div class="detail-label">当前人数</div><div class="detail-value">${val(item.studentCount)}</div></div>
      <div class="detail-item"><div class="detail-label">容量利用率</div><div class="detail-value">${renderClassUtilizationTag(item.capacity, item.utilizationRate)} ${utilizationText}</div></div>
    </div>
    <div class="detail-remark">
      <div class="detail-label">备注</div>
      <div class="detail-value">${val(item.remark)}</div>
    </div>
    <div class="detail-meta">
      <div>创建时间：${val(item.createdAt)}</div>
      <div>更新时间：${val(item.updatedAt)}</div>
    </div>
  `;
  if (detailEditBtn) {
    detailEditBtn.dataset.id = String(item.id);
    detailEditBtn.dataset.mode = "class";
    detailEditBtn.textContent = "编辑该班级";
  }
  detailModal.style.display = "flex";
}

function GradeDetailDrawer(item) {
  const val = (v) => safeText(v, "--");
  if (detailTitle) detailTitle.textContent = "成绩详情";
  if (detailSubtitle) detailSubtitle.textContent = "查看成绩构成、总评与状态。";
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">学生姓名</div><div class="detail-value">${val(item.studentName)}</div></div>
      <div class="detail-item"><div class="detail-label">学号</div><div class="detail-value">${val(item.studentNo)}</div></div>
      <div class="detail-item"><div class="detail-label">班级</div><div class="detail-value">${val(item.className)}</div></div>
      <div class="detail-item"><div class="detail-label">课程</div><div class="detail-value">${val(item.courseName)}</div></div>
      <div class="detail-item"><div class="detail-label">平时成绩</div><div class="detail-value">${val(item.usualScore)}</div></div>
      <div class="detail-item"><div class="detail-label">期末成绩</div><div class="detail-value">${val(item.finalScore)}</div></div>
      <div class="detail-item"><div class="detail-label">总评</div><div class="detail-value"><strong>${val(item.totalScore)}</strong></div></div>
      <div class="detail-item"><div class="detail-label">状态</div><div class="detail-value">${renderGradeStatusTag(item.status)}</div></div>
    </div>
    <div class="detail-meta">
      <div>创建时间：${val(item.createdAt)}</div>
      <div>更新时间：${val(item.updatedAt)}</div>
      <div>成绩ID：${val(item.id)}</div>
    </div>
  `;
  if (detailEditBtn) {
    detailEditBtn.dataset.id = String(item.id);
    detailEditBtn.dataset.mode = "grade";
    detailEditBtn.textContent = "编辑该成绩";
  }
  detailModal.style.display = "flex";
}

function AttendanceDetailDrawer(item) {
  const val = (v) => safeText(v, "--");
  if (detailTitle) detailTitle.textContent = "考勤详情";
  if (detailSubtitle) detailSubtitle.textContent = "查看学生考勤状态与记录。";
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">学生姓名</div><div class="detail-value">${val(item.studentName)}</div></div>
      <div class="detail-item"><div class="detail-label">学号</div><div class="detail-value">${val(item.studentNo)}</div></div>
      <div class="detail-item"><div class="detail-label">班级</div><div class="detail-value">${val(item.className)}</div></div>
      <div class="detail-item"><div class="detail-label">日期</div><div class="detail-value">${val(item.date)}</div></div>
      <div class="detail-item"><div class="detail-label">状态</div><div class="detail-value">${renderAttendanceStatusTag(item.status)}</div></div>
      <div class="detail-item"><div class="detail-label">备注</div><div class="detail-value">${val(item.remark)}</div></div>
    </div>
    <div class="detail-meta">
      <div>创建时间：${val(item.createdAt)}</div>
      <div>更新时间：${val(item.updatedAt)}</div>
      <div>考勤ID：${val(item.id)}</div>
    </div>
  `;
  if (detailEditBtn) {
    detailEditBtn.dataset.id = String(item.id);
    detailEditBtn.dataset.mode = "attendance";
    detailEditBtn.textContent = "编辑该考勤";
  }
  detailModal.style.display = "flex";
}

function CourseDetailDrawer(item) {
  const val = (v) => safeText(v, "--");
  if (detailTitle) detailTitle.textContent = "课程详情";
  if (detailSubtitle) detailSubtitle.textContent = "查看课程基础信息与配置。";
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">课程名称</div><div class="detail-value">${val(item.courseName)}</div></div>
      <div class="detail-item"><div class="detail-label">授课教师</div><div class="detail-value">${val(item.teacherName)}</div></div>
      <div class="detail-item"><div class="detail-label">学分</div><div class="detail-value">${val(item.credit)}</div></div>
      <div class="detail-item"><div class="detail-label">课程ID</div><div class="detail-value">${val(item.id)}</div></div>
    </div>
    <div class="detail-remark">
      <div class="detail-label">备注</div>
      <div class="detail-value">${val(item.remark)}</div>
    </div>
    <div class="detail-meta">
      <div>创建时间：${val(item.createdAt)}</div>
      <div>更新时间：${val(item.updatedAt)}</div>
    </div>
  `;
  if (detailEditBtn) {
    detailEditBtn.dataset.id = String(item.id);
    detailEditBtn.dataset.mode = "course";
    detailEditBtn.textContent = "编辑该课程";
  }
  detailModal.style.display = "flex";
}

function StudentTableCard() {
  StudentBatchActions();
}

function StudentManagementPage() {
  StudentFilterBar();
  StudentTableCard();
}

function updateSelectAllState() {
  if (!selectAllCurrentPage) return;
  const checks = [...tableBody.querySelectorAll(".row-check")];
  const checkedCount = checks.filter((el) => el.checked).length;
  const totalCount = checks.length;
  selectAllCurrentPage.checked = totalCount > 0 && checkedCount === totalCount;
  selectAllCurrentPage.indeterminate = false;
}

async function fetchStudentsSafe() {
  try {
    await fetchStudents();
  } catch (error) {
    console.error("学生列表加载失败", error);
    showMessage(MSG.loadStudentFailed, "error");
    tableBody.innerHTML = renderEmptyRow(10, "数据加载失败，请重试");
  }
}

function DeleteConfirmModal({ text, mode, targetId = null, ids = [] }) {
  deleteState.mode = mode;
  deleteState.targetId = targetId;
  deleteState.ids = ids;
  deleteConfirmText.textContent = text;
  deleteConfirmModal.style.display = "flex";
}

function renderAttendanceStatusTag(status) {
  const map = {
    出勤: "tag tag-success",
    缺勤: "tag tag-danger",
    迟到: "tag tag-warning",
    请假: "tag tag-default"
  };
  return `<span class="${map[status] || "tag tag-default"}">${status || "-"}</span>`;
}

function renderClassUtilizationTag(capacity, utilizationRate) {
  const safeCapacity = Number(capacity);
  if (!Number.isFinite(safeCapacity) || safeCapacity <= 0) {
    return '<span class="tag tag-default">--</span>';
  }
  const value = Number.isFinite(Number(utilizationRate)) ? Number(utilizationRate) : 0;
  if (value >= 100) return `<span class="tag tag-danger">${value}% 高风险</span>`;
  if (value >= 90) return `<span class="tag tag-warning">${value}% 警示</span>`;
  return `<span class="tag tag-success">${value}%</span>`;
}

function renderGradeStatusTag(status) {
  const cls = status === "及格" ? "tag tag-success" : "tag tag-danger";
  return `<span class="${cls}">${safeText(status, "--")}</span>`;
}

function startEditGrade(item) {
  detailModal.style.display = "none";
  switchSection("section-grades");
  gradeIdInput.value = item.id;
  gradeStudentSelect.value = String(item.studentId);
  syncGradeStudentReadonlyFields();
  const linkedCourseId = Number(item.courseId);
  if (Number.isInteger(linkedCourseId) && linkedCourseId > 0) {
    fillGradeCourseOptions(String(linkedCourseId));
    gradeCourseNameInput.value = String(linkedCourseId);
  } else {
    const fallbackValue = ensureLegacyGradeCourseOption(item.courseName || "");
    fillGradeCourseOptions(fallbackValue);
    gradeCourseNameInput.value = fallbackValue;
  }
  gradeUsualScoreInput.value = item.usualScore;
  gradeFinalScoreInput.value = item.finalScore;
  computeGradePreview();
  gradeFormTitle.textContent = "编辑成绩";
  cancelGradeEditBtn.style.display = "inline-block";
  requestAnimationFrame(() => {
    if (gradeFormCard) {
      gradeFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.setTimeout(() => {
      gradeStudentSelect.focus();
    }, 220);
  });
}

function startEditAttendance(item) {
  detailModal.style.display = "none";
  switchSection("section-attendance");
  attendanceIdInput.value = item.id;
  attendanceStudentSelect.value = String(item.studentId);
  syncAttendanceStudentReadonlyFields();
  attendanceDateInput.value = item.date || "";
  attendanceStatusInput.value = item.status || "出勤";
  attendanceRemarkInput.value = item.remark || "";
  attendanceFormTitle.textContent = "编辑考勤";
  cancelAttendanceEditBtn.style.display = "inline-block";
  requestAnimationFrame(() => {
    if (attendanceFormCard) {
      attendanceFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.setTimeout(() => {
      attendanceStudentSelect.focus();
    }, 220);
  });
}

function startEditCourse(item) {
  detailModal.style.display = "none";
  switchSection("section-courses");
  courseIdInput.value = item.id;
  courseNameInput.value = item.courseName;
  courseTeacherInput.value = item.teacherName;
  courseCreditInput.value = item.credit;
  courseRemarkInput.value = item.remark || "";
  courseFormTitle.textContent = "编辑课程";
  cancelCourseEditBtn.style.display = "inline-block";
  requestAnimationFrame(() => {
    if (courseFormCard) {
      courseFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.setTimeout(() => {
      courseNameInput.focus();
    }, 220);
  });
}

function switchSection(sectionId) {
  document.querySelectorAll(".right-section").forEach((el) => {
    el.classList.toggle("active", el.id === sectionId);
  });
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === sectionId);
  });
  try {
    localStorage.setItem(LAST_SECTION_KEY, sectionId);
  } catch (_error) {
    // Ignore storage failures in private mode.
  }
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    loginCard.style.display = "block";
    mainApp.style.display = "none";
    throw new Error("未登录");
  }
  return res;
}
async function getErrorMessage(res, fallback) {
  const contentType = res.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await res.json();
      if (data && typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
    } else {
      await res.text();
    }
  } catch (_error) {
    // Ignore parse errors and use fallback.
  }
  if (res.status >= 500) return "服务器开小差了，请稍后重试";
  return fallback;
}
const showMain = (username) => {
  loginCard.style.display = "none";
  mainApp.style.display = "block";
  welcomeText.textContent = `欢迎，${username}`;
};
async function checkLogin() {
  let profileRes;
  try {
    profileRes = await fetch("/api/me");
    if (!profileRes.ok) {
      loginCard.style.display = "block";
      mainApp.style.display = "none";
      return;
    }
    const user = await profileRes.json();
    showMain(user.username);
    newUsernameInput.value = user.username;
    await refreshAll();
    await fetchBackups();
  } catch (error) {
    if (profileRes && profileRes.status === 401) {
      loginCard.style.display = "block";
      mainApp.style.display = "none";
      return;
    }
    if (mainApp.style.display !== "block") {
      loginCard.style.display = "block";
      mainApp.style.display = "none";
      return;
    }
    // Keep current login state for non-auth errors to avoid false logout on refresh.
    // Do not show raw technical errors to users.
    console.error("页面初始化失败", error);
  }
}
const showLoggedOut = () => {
  loginCard.style.display = "block";
  mainApp.style.display = "none";
};
async function safeCheckLogin() {
  try {
    await checkLogin();
  } catch (_error) {
    loginCard.style.display = "block";
    mainApp.style.display = "none";
  }
}
const updatePaginationInfo = () => {
  const totalPages = Math.max(1, Math.ceil(state.total / state.pageSize));
  pageInfo.textContent = `第 ${state.page} / ${totalPages} 页`;
  totalInfo.textContent = `共 ${state.total} 条`;
  prevPageBtn.disabled = state.page <= 1;
  nextPageBtn.disabled = state.page >= totalPages;
};

function resetStudentForm() {
  studentIdInput.value = "";
  studentNoInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  classIdInputForStudent.value = "";
  classNameInput.value = "";
  genderInput.value = "男";
  studentStatusInput.value = "在读";
  phoneInput.value = "";
  enrollmentDateInput.value = "";
  guardianNameInput.value = "";
  guardianPhoneInput.value = "";
  remarkInput.value = "";
  formTitle.textContent = "新增学生";
  cancelEdit.style.display = "none";
}
function resetClassForm() {
  classIdInput.value = "";
  classNameManageInput.value = "";
  classTeacherInput.value = "";
  classCapacityInput.value = "";
  classRemarkInput.value = "";
  classFormTitle.textContent = "新增班级";
  cancelClassEditBtn.style.display = "none";
}

function startEditClass(item) {
  detailModal.style.display = "none";
  switchSection("section-classes");
  classIdInput.value = item.id;
  classNameManageInput.value = item.className;
  classTeacherInput.value = item.headTeacher;
  classCapacityInput.value = item.capacity;
  classRemarkInput.value = item.remark || "";
  classFormTitle.textContent = "编辑班级";
  cancelClassEditBtn.style.display = "inline-block";
  requestAnimationFrame(() => {
    if (classFormCard) {
      classFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.setTimeout(() => {
      classNameManageInput.focus();
    }, 220);
  });
}
function resetCourseForm() {
  courseIdInput.value = "";
  courseNameInput.value = "";
  courseTeacherInput.value = "";
  courseCreditInput.value = "";
  courseRemarkInput.value = "";
  courseFormTitle.textContent = "新增课程";
  cancelCourseEditBtn.style.display = "none";
}
function resetGradeForm() {
  gradeIdInput.value = "";
  gradeCourseNameInput.value = "";
  gradeUsualScoreInput.value = "";
  gradeFinalScoreInput.value = "";
  gradeTotalScoreInput.value = "";
  gradeStatusInput.value = "";
  gradeFormTitle.textContent = "新增成绩";
  cancelGradeEditBtn.style.display = "none";
  syncGradeStudentReadonlyFields();
}
function resetAttendanceForm() {
  attendanceIdInput.value = "";
  attendanceDateInput.value = "";
  attendanceStatusInput.value = "出勤";
  attendanceRemarkInput.value = "";
  attendanceFormTitle.textContent = "新增考勤";
  cancelAttendanceEditBtn.style.display = "none";
  syncAttendanceStudentReadonlyFields();
}

function fillGradeOptions() {
  gradeStudentSelect.innerHTML = "";
  studentsCache.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = `${safeText(s.id)} - ${safeText(s.name)}（${safeText(s.className)}）`;
    gradeStudentSelect.appendChild(o);
  });
  syncGradeStudentReadonlyFields();
  fillGradeCourseOptions();
}

function ensureLegacyGradeCourseOption(courseName) {
  const normalizedName = String(courseName || "").trim();
  if (!normalizedName) return "";
  const matched = courseList.find((course) => String(course.courseName || "").trim() === normalizedName);
  if (matched) return String(matched.id);
  return `legacy:${normalizedName}`;
}

function fillGradeCourseOptions(keepValue = "") {
  const previousValue = keepValue || String(gradeCourseNameInput.value || "").trim();
  gradeCourseNameInput.innerHTML = '<option value="">请选择课程</option>';
  courseList.forEach((course) => {
    const option = document.createElement("option");
    option.value = String(course.id);
    option.textContent = safeText(course.courseName, "");
    gradeCourseNameInput.appendChild(option);
  });
  if (gradeFilterCourseOptions) {
    gradeFilterCourseOptions.innerHTML = "";
    courseList.forEach((course) => {
      const option = document.createElement("option");
      option.value = safeText(course.courseName, "");
      gradeFilterCourseOptions.appendChild(option);
    });
  }
  if (!previousValue && courseList.length) {
    gradeCourseNameInput.value = String(courseList[0].id);
    return;
  }
  if (previousValue.startsWith("legacy:")) {
    const legacyName = previousValue.replace(/^legacy:/, "").trim();
    if (legacyName) {
      const option = document.createElement("option");
      option.value = previousValue;
      option.textContent = `历史课程：${legacyName}`;
      gradeCourseNameInput.appendChild(option);
    }
  }
  if (previousValue && Array.from(gradeCourseNameInput.options).some((option) => option.value === previousValue)) {
    gradeCourseNameInput.value = previousValue;
  }
}

function syncGradeStudentReadonlyFields() {
  const studentId = Number(gradeStudentSelect.value);
  const student = studentsCache.find((s) => Number(s.id) === studentId);
  gradeStudentNoInput.value = student ? safeText(student.studentNo, "") : "";
  gradeClassNameInput.value = student ? safeText(student.className, "") : "";
}

function computeGradePreview() {
  const usual = Number(gradeUsualScoreInput.value);
  const final = Number(gradeFinalScoreInput.value);
  if (!Number.isFinite(usual) || !Number.isFinite(final)) {
    gradeTotalScoreInput.value = "";
    gradeStatusInput.value = "";
    return;
  }
  const total = Number((usual * 0.4 + final * 0.6).toFixed(1));
  gradeTotalScoreInput.value = String(total);
  gradeStatusInput.value = total >= 60 ? "及格" : "不及格";
}

function updateGradePaginationInfo() {
  const totalPages = Math.max(1, Math.ceil(gradeState.total / gradeState.pageSize));
  gradePageInfo.textContent = `第 ${gradeState.page} / ${totalPages} 页`;
  gradeTotalInfo.textContent = `共 ${gradeState.total} 条`;
  gradePrevPageBtn.disabled = gradeState.page <= 1;
  gradeNextPageBtn.disabled = gradeState.page >= totalPages;
}

function hasDuplicateGrade(studentId, courseName, editingId = 0) {
  const normalizedCourseName = String(courseName || "").trim();
  return gradeList.some(
    (g) =>
      Number(g.id) !== Number(editingId) &&
      Number(g.studentId) === Number(studentId) &&
      String(g.courseName || "").trim() === normalizedCourseName
  );
}

function hasDuplicateAttendance(studentId, date, editingId = 0) {
  const normalizedDate = String(date || "").trim();
  return attendanceList.some(
    (item) =>
      Number(item.id) !== Number(editingId) &&
      Number(item.studentId) === Number(studentId) &&
      String(item.date || "").trim() === normalizedDate
  );
}

function fillAttendanceOptions() {
  attendanceStudentSelect.innerHTML = "";
  studentsCache.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = `${safeText(s.id)} - ${safeText(s.name)}（${safeText(s.className)}）`;
    attendanceStudentSelect.appendChild(o);
  });
  syncAttendanceStudentReadonlyFields();
}

function syncAttendanceStudentReadonlyFields() {
  const studentId = Number(attendanceStudentSelect.value);
  const student = studentsCache.find((s) => Number(s.id) === studentId);
  attendanceStudentNoInput.value = student ? safeText(student.studentNo, "") : "";
  attendanceClassNameInput.value = student ? safeText(student.className, "") : "";
}

function updateAttendancePaginationInfo() {
  const totalPages = Math.max(1, Math.ceil(attendanceState.total / attendanceState.pageSize));
  attendancePageInfo.textContent = `第 ${attendanceState.page} / ${totalPages} 页`;
  attendanceTotalInfo.textContent = `共 ${attendanceState.total} 条`;
  attendancePrevPageBtn.disabled = attendanceState.page <= 1;
  attendanceNextPageBtn.disabled = attendanceState.page >= totalPages;
}

async function fetchStudents() {
  tableBody.innerHTML = renderSkeletonRows(10, 4);
  const res = await apiFetch(`/api/students?${new URLSearchParams({
    keyword: state.keyword,
    page: state.page,
    pageSize: state.pageSize,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    status: state.status
  })}`);
  const data = await res.json();
  const total = Number.isFinite(data.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  if (state.page > totalPages) {
    state.page = totalPages;
    return fetchStudents();
  }
  studentsCache = Array.isArray(data.list) ? data.list : [];
  const hasKeyword = Boolean(state.keyword.trim());
  tableBody.innerHTML = studentsCache.length
    ? studentsCache
        .map(
          (s) => `<tr><td><input type="checkbox" class="row-check" value="${s.id}" /></td><td>${safeText(s.studentNo)}</td><td>${safeText(s.name)}</td><td>${safeText(s.age)}</td><td>${safeText(s.gender)}</td><td>${safeText(s.className)}</td><td>${renderStudentStatusTag(s.status)}</td><td>${safeText(s.phone)}</td><td>${safeText(s.enrollmentDate)}</td><td class="actions"><button class="btn-ghost" data-action="detail" data-id="${s.id}">详情</button><button class="btn-ghost" data-action="edit" data-id="${s.id}">编辑</button><button class="btn-danger-ghost" data-action="delete" data-id="${s.id}">删除</button></td></tr>`
        )
        .join("")
    : renderEmptyRow(10, hasKeyword ? MSG.emptySearch : MSG.emptyStudents);
  state.total = total;
  updatePaginationInfo();
  StudentBatchActions();
  fillGradeOptions();
  fillAttendanceOptions();
}

async function startEditStudent(student) {
  detailModal.style.display = "none";
  switchSection("section-students");
  StudentFormCard(student);
  requestAnimationFrame(() => {
    if (studentFormCard) {
      studentFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.setTimeout(() => {
      studentNoInput.focus();
    }, 220);
  });
}

async function startEditStudentById(id) {
  if (!id) return;
  const res = await apiFetch(`/api/students/${id}`);
  if (!res.ok) {
    showMessage(await getErrorMessage(res, MSG.loadStudentEditDataFailed), "error");
    return;
  }
  const student = await res.json();
  await startEditStudent(student);
}
async function fetchStats() {
  const d = await (await apiFetch("/api/students/stats")).json();
  StudentStatsCards(d);
}
async function fetchDashboard() {
  if (dashClassDistribution) {
    dashClassDistribution.innerHTML = '<div class="chart-empty">加载中...</div>';
  }
  if (dashGradeStatus) {
    dashGradeStatus.innerHTML = '<div class="chart-empty">加载中...</div>';
  }
  if (dashAttendanceStatus) {
    dashAttendanceStatus.innerHTML = '<div class="chart-empty">加载中...</div>';
  }
  if (dashRecentFeed) {
    dashRecentFeed.innerHTML = "<li>加载中...</li>";
  }
  let d = null;
  const dashboardRes = await apiFetch("/api/dashboard/stats");
  if (dashboardRes.ok) {
    d = await dashboardRes.json();
  } else {
    const [studentStatsRes, classStatsRes, gradeStatsRes, attendanceStatsRes, operationLogsRes] = await Promise.all([
      apiFetch("/api/students/stats"),
      apiFetch("/api/classes/stats"),
      apiFetch("/api/grades/stats"),
      apiFetch("/api/attendance/stats"),
      apiFetch("/api/operation-logs")
    ]);
    const studentStats = studentStatsRes.ok ? await studentStatsRes.json() : {};
    const classStats = classStatsRes.ok ? await classStatsRes.json() : {};
    const gradeStats = gradeStatsRes.ok ? await gradeStatsRes.json() : {};
    const attendanceStats = attendanceStatsRes.ok ? await attendanceStatsRes.json() : {};
    const rawLogs = operationLogsRes.ok ? await operationLogsRes.json() : [];
    const logs = (Array.isArray(rawLogs) ? rawLogs : []).map(normalizeLogItemClient);
    d = {
      cards: {
        studentTotal: Number(studentStats?.total) || 0,
        classTotal: Number(classStats?.total) || 0,
        gradeTotal: Number(gradeStats?.total) || 0,
        attendanceTotal: Number(attendanceStats?.total) || 0,
        avgTotalScore: Number(gradeStats?.avgScore) || 0,
        passRate: Number(gradeStats?.passRate) || 0,
        absentCount: Number(attendanceStats?.absent) || 0,
        leaveCount: Number(attendanceStats?.leave) || 0
      },
      charts: {
        classDistribution: {},
        gradeStatusDistribution: {
          及格: Math.max(0, Math.round(((Number(gradeStats?.passRate) || 0) * (Number(gradeStats?.total) || 0)) / 100)),
          不及格: Number(gradeStats?.failCount) || 0
        },
        attendanceStatusDistribution: {
          出勤: Number(attendanceStats?.present) || 0,
          迟到: Number(attendanceStats?.late) || 0,
          缺勤: Number(attendanceStats?.absent) || 0,
          请假: Number(attendanceStats?.leave) || 0
        }
      },
      recentFeed: logs.slice(0, 6).map((log) => ({
        time: log.createdAt,
        text: `${log.operator} ${log.action}：${log.message}`
      }))
    };
  }
  const cards = d?.cards || {};
  dashStudentTotal.textContent = String(Number(cards.studentTotal) || 0);
  dashClassTotal.textContent = String(Number(cards.classTotal) || 0);
  dashGradeTotal.textContent = String(Number(cards.gradeTotal) || 0);
  dashAttendanceTotal.textContent = String(Number(cards.attendanceTotal) || 0);
  dashAvgScore.textContent = String(Number(cards.avgTotalScore) || 0);
  dashPassRate.textContent = `${Number(cards.passRate) || 0}%`;
  dashAbsentCount.textContent = String(Number(cards.absentCount) || 0);
  dashLeaveCount.textContent = String(Number(cards.leaveCount) || 0);

  const charts = d?.charts || {};
  renderDashboardBarList(dashClassDistribution, charts.classDistribution || {});
  renderDashboardDonutList(dashGradeStatus, charts.gradeStatusDistribution || {}, {
    及格: "#16a34a",
    不及格: "#dc2626"
  });
  renderDashboardDonutList(dashAttendanceStatus, charts.attendanceStatusDistribution || {}, {
    出勤: "#16a34a",
    迟到: "#f59e0b",
    缺勤: "#dc2626",
    请假: "#64748b"
  });
  const feed = Array.isArray(d?.recentFeed) ? d.recentFeed : [];
  dashRecentFeed.innerHTML = feed.length
    ? feed
        .map(
          (item) =>
            `<li><button type="button" class="btn-ghost" data-dashboard-action="feed-jump" data-feed-text="${String(item.text || "").replace(/"/g, "&quot;")}" style="height:auto;padding:2px 8px;line-height:1.4;text-align:left">[${new Date(item.time).toLocaleString()}] ${safeText(item.text, "--")}</button></li>`
        )
        .join("")
    : "<li>暂无动态</li>";
}
async function fetchClasses() {
  classTableBody.innerHTML = renderSkeletonRows(8, 4);
  const raw = await (
    await apiFetch(`/api/classes?${new URLSearchParams({
      keyword: classState.keyword,
      page: classState.page,
      pageSize: classState.pageSize,
      sortBy: classState.sortBy,
      sortOrder: classState.sortOrder
    })}`)
  ).json();
  const rawList = Array.isArray(raw) ? raw : Array.isArray(raw?.list) ? raw.list : [];
  const total = Number.isFinite(raw?.total) ? raw.total : rawList.length;
  const totalPages = Math.max(1, Math.ceil(total / classState.pageSize));
  if (classState.page > totalPages) {
    classState.page = totalPages;
    return fetchClasses();
  }
  classList = rawList.map(normalizeClassItem);
  classTableBody.innerHTML = classList.length
    ? classList
        .map(
          (c) => `<tr><td>${safeText(c.id)}</td><td>${safeText(c.className)}</td><td>${safeText(c.headTeacher, "--")}</td><td>${Number(c.capacity) > 0 ? c.capacity : "--"}</td><td>${safeText(c.studentCount, "0")}</td><td>${renderClassUtilizationTag(c.capacity, c.utilizationRate)}</td><td>${safeText(c.createdAt, "--")}</td><td><button class="btn-ghost" data-action="detail-class" data-id="${c.id}">详情</button><button class="btn-ghost" data-action="edit-class" data-id="${c.id}">编辑</button><button class="btn-danger-ghost" data-action="delete-class" data-id="${c.id}">删除</button></td></tr>`
        )
        .join("")
    : renderEmptyRow(8, classState.keyword ? MSG.emptyClassSearch : MSG.emptyClasses);
  classState.total = total;
  updateClassPaginationInfo();
}
async function fetchClassStats() {
  const d = await (await apiFetch("/api/classes/stats")).json();
  classStatTotal.textContent = String(Number.isFinite(d?.total) ? d.total : 0);
  classStatTeachers.textContent = String(Number.isFinite(d?.headTeacherCount) ? d.headTeacherCount : 0);
  classStatCapacity.textContent = String(Number.isFinite(d?.totalCapacity) ? d.totalCapacity : 0);
  classStatStudents.textContent = String(Number.isFinite(d?.totalStudents) ? d.totalStudents : 0);
}

function updateClassPaginationInfo() {
  const totalPages = Math.max(1, Math.ceil(classState.total / classState.pageSize));
  classPageInfo.textContent = `第 ${classState.page} / ${totalPages} 页`;
  classTotalInfo.textContent = `共 ${classState.total} 条`;
  classPrevPageBtn.disabled = classState.page <= 1;
  classNextPageBtn.disabled = classState.page >= totalPages;
}
async function fetchCourses() {
  courseTableBody.innerHTML = renderSkeletonRows(7, 4);
  const data = await (
    await apiFetch(`/api/courses?${new URLSearchParams({
      keyword: courseState.keyword,
      page: courseState.page,
      pageSize: courseState.pageSize,
      sortBy: courseState.sortBy,
      sortOrder: courseState.sortOrder
    })}`)
  ).json();
  const total = Number.isFinite(data?.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / courseState.pageSize));
  if (courseState.page > totalPages) {
    courseState.page = totalPages;
    return fetchCourses();
  }
  courseList = (Array.isArray(data?.list) ? data.list : Array.isArray(data) ? data : []).map(normalizeCourseItem);
  courseTableBody.innerHTML = courseList.length
    ? courseList
        .map(
          (c) => `<tr><td>${safeText(c.id)}</td><td>${safeText(c.courseName)}</td><td>${safeText(c.teacherName)}</td><td>${safeText(c.credit, "0")}</td><td>${safeText(c.remark, "--")}</td><td>${safeText(c.createdAt, "--")}</td><td><button class="btn-ghost" data-action="detail-course" data-id="${c.id}">详情</button><button class="btn-ghost" data-action="edit-course" data-id="${c.id}">编辑</button><button class="btn-danger-ghost" data-action="delete-course" data-id="${c.id}">删除</button></td></tr>`
        )
        .join("")
    : renderEmptyRow(7, MSG.emptyCourses);
  courseState.total = total;
  updateCoursePaginationInfo();
  fillGradeOptions();
  if (gradeFilterCourseNameInput && gradeFilterCourseNameInput.value && gradeFilterCourseOptions) {
    const currentFilter = gradeFilterCourseNameInput.value.trim();
    const exists = Array.from(gradeFilterCourseOptions.options).some(
      (option) => String(option.value).trim() === currentFilter
    );
    if (currentFilter && !exists) {
      const option = document.createElement("option");
      option.value = currentFilter;
      gradeFilterCourseOptions.appendChild(option);
    }
  }
}

async function fetchCourseStats() {
  const d = await (await apiFetch("/api/courses/stats")).json();
  courseStatTotal.textContent = String(Number.isFinite(d?.total) ? d.total : 0);
  courseStatTeachers.textContent = String(Number.isFinite(d?.teacherCount) ? d.teacherCount : 0);
  courseStatTotalCredit.textContent = String(Number.isFinite(d?.totalCredit) ? d.totalCredit : 0);
  courseStatAvgCredit.textContent = String(Number.isFinite(d?.avgCredit) ? d.avgCredit : 0);
}

function updateCoursePaginationInfo() {
  const totalPages = Math.max(1, Math.ceil(courseState.total / courseState.pageSize));
  coursePageInfo.textContent = `第 ${courseState.page} / ${totalPages} 页`;
  courseTotalInfo.textContent = `共 ${courseState.total} 条`;
  coursePrevPageBtn.disabled = courseState.page <= 1;
  courseNextPageBtn.disabled = courseState.page >= totalPages;
}
async function fetchGrades() {
  gradeTableBody.innerHTML = renderSkeletonRows(12, 4);
  const data = await (
    await apiFetch(`/api/grades?${new URLSearchParams({
      keyword: gradeState.keyword,
      className: gradeState.className,
      courseName: gradeState.courseName,
      status: gradeState.status,
      sortBy: gradeState.sortBy,
      sortOrder: gradeState.sortOrder,
      page: gradeState.page,
      pageSize: gradeState.pageSize
    })}`)
  ).json();
  const total = Number.isFinite(data?.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / gradeState.pageSize));
  if (gradeState.page > totalPages) {
    gradeState.page = totalPages;
    return fetchGrades();
  }
  gradeList = Array.isArray(data?.list) ? data.list : Array.isArray(data) ? data : [];
  gradeTableBody.innerHTML = gradeList.length
    ? gradeList
        .map(
          (g) => `<tr><td>${safeText(g.id)}</td><td>${safeText(g.studentId)}</td><td>${safeText(g.studentNo)}</td><td>${safeText(g.studentName)}</td><td>${safeText(g.className)}</td><td>${safeText(g.courseName)}</td><td>${safeText(g.usualScore, "0")}</td><td>${safeText(g.finalScore, "0")}</td><td><strong>${safeText(g.totalScore, "0")}</strong></td><td>${renderGradeStatusTag(g.status)}</td><td>${safeText(g.createdAt)}</td><td><button class="btn-ghost" data-action="detail-grade" data-id="${g.id}">详情</button><button class="btn-ghost" data-action="edit-grade" data-id="${g.id}">编辑</button><button class="btn-danger-ghost" data-action="delete-grade" data-id="${g.id}">删除</button></td></tr>`
        )
        .join("")
    : renderEmptyRow(12, MSG.emptyGrades);
  gradeState.total = total;
  updateGradePaginationInfo();
}
async function fetchGradeStats() {
  const d = await (await apiFetch("/api/grades/stats")).json();
  gradeStatTotal.textContent = String(Number.isFinite(d?.total) ? d.total : 0);
  gradeStatAvg.textContent = String(Number.isFinite(d?.avgScore) ? d.avgScore : 0);
  gradeStatPassRate.textContent = `${Number.isFinite(d?.passRate) ? d.passRate : 0}%`;
  gradeStatFailCount.textContent = String(Number.isFinite(d?.failCount) ? d.failCount : 0);
}
async function fetchAttendance() {
  attendanceTableBody.innerHTML = renderSkeletonRows(10, 4);
  const data = await (
    await apiFetch(`/api/attendance?${new URLSearchParams({
      keyword: attendanceState.keyword,
      className: attendanceState.className,
      status: attendanceState.status,
      date: attendanceState.date,
      sortBy: attendanceState.sortBy,
      sortOrder: attendanceState.sortOrder,
      page: attendanceState.page,
      pageSize: attendanceState.pageSize
    })}`)
  ).json();
  const total = Number.isFinite(data?.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / attendanceState.pageSize));
  if (attendanceState.page > totalPages) {
    attendanceState.page = totalPages;
    return fetchAttendance();
  }
  attendanceList = Array.isArray(data?.list) ? data.list : Array.isArray(data) ? data : [];
  attendanceTableBody.innerHTML = attendanceList.length
    ? attendanceList
        .map(
          (a) =>
            `<tr><td>${safeText(a.id)}</td><td>${safeText(a.studentId)}</td><td>${safeText(a.studentNo)}</td><td>${safeText(a.studentName)}</td><td>${safeText(a.className)}</td><td>${safeText(a.date)}</td><td>${renderAttendanceStatusTag(a.status)}</td><td>${safeText(a.remark)}</td><td>${safeText(a.createdAt)}</td><td><button class="btn-ghost" data-action="detail-attendance" data-id="${a.id}">详情</button><button class="btn-ghost" data-action="edit-attendance" data-id="${a.id}">编辑</button><button class="btn-danger-ghost" data-action="delete-attendance" data-id="${a.id}">删除</button></td></tr>`
        )
        .join("")
    : renderEmptyRow(10, MSG.emptyAttendance);
  attendanceState.total = total;
  updateAttendancePaginationInfo();
}
async function fetchAttendanceStats() {
  const d = await (await apiFetch("/api/attendance/stats")).json();
  attendanceStatTotal.textContent = String(Number.isFinite(d?.total) ? d.total : 0);
  attendanceStatRate.textContent = `${Number.isFinite(d?.attendanceRate) ? d.attendanceRate : 0}%`;
  attendanceStatAbsent.textContent = String(Number.isFinite(d?.absent) ? d.absent : 0);
  attendanceStatLeave.textContent = String(Number.isFinite(d?.leave) ? d.leave : 0);
  attendanceStatLate.textContent = String(Number.isFinite(d?.late) ? d.late : 0);
}
function updateLogPaginationInfo() {
  const totalPages = Math.max(1, Math.ceil(logState.total / logState.pageSize));
  logPageInfo.textContent = `第 ${logState.page} / ${totalPages} 页`;
  logTotalInfo.textContent = `共 ${logState.total} 条`;
  logPrevPageBtn.disabled = logState.page <= 1;
  logNextPageBtn.disabled = logState.page >= totalPages;
}
async function fetchSystemLogs() {
  logTableBody.innerHTML = renderSkeletonRows(7, 4);
  try {
    const query = new URLSearchParams({
      keyword: logState.keyword,
      module: logState.module,
      actionType: logState.actionType,
      sortBy: logState.sortBy,
      sortOrder: logState.sortOrder,
      page: logState.page,
      pageSize: logState.pageSize
    });
    const res = await apiFetch(`/api/logs?${query}`);
    let data = null;
    if (res.ok) {
      data = await res.json();
    } else {
      const fallbackRes = await apiFetch("/api/operation-logs");
      if (!fallbackRes.ok) throw new Error("fallback logs failed");
      const all = (await fallbackRes.json()).map(normalizeLogItemClient);
      const filtered = all
        .filter((item) => {
          const keyword = String(logState.keyword || "").trim().toLowerCase();
          const moduleMatch = !logState.module || item.module === logState.module;
          const actionMatch = !logState.actionType || item.actionType === logState.actionType;
          const keywordMatch =
            !keyword ||
            String(item.targetName || "")
              .toLowerCase()
              .includes(keyword) ||
            String(item.message || "")
              .toLowerCase()
              .includes(keyword);
          return moduleMatch && actionMatch && keywordMatch;
        })
        .sort((a, b) => {
          const key = logState.sortBy || "createdAt";
          const order = logState.sortOrder === "asc" ? 1 : -1;
          if (key === "createdAt") {
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
          }
          return String(a[key] || "").localeCompare(String(b[key] || ""), "zh-CN") * order;
        });
      const total = filtered.length;
      const start = (logState.page - 1) * logState.pageSize;
      data = {
        list: filtered.slice(start, start + logState.pageSize),
        total
      };
    }
    const total = Number.isFinite(data?.total) ? data.total : 0;
    const totalPages = Math.max(1, Math.ceil(total / logState.pageSize));
    if (logState.page > totalPages) {
      logState.page = totalPages;
      return fetchSystemLogs();
    }
    logList = Array.isArray(data?.list) ? data.list : [];
    logTableBody.innerHTML = logList.length
      ? logList
          .map(
            (item) =>
              `<tr><td>${safeText(item.id)}</td><td>${safeText(item.module)}</td><td>${safeText(item.action)}</td><td>${safeText(item.targetName, "--")}</td><td>${safeText(item.operator, "--")}</td><td>${safeText(item.message, "--")}</td><td>${safeText(item.createdAt, "--")}</td></tr>`
          )
          .join("")
      : renderEmptyRow(7, MSG.emptyLogs);
    logState.total = total;
    updateLogPaginationInfo();
  } catch (_error) {
    logTableBody.innerHTML = renderEmptyRow(7, MSG.loadLogsFailed);
  }
}
async function fetchLogStats() {
  const res = await apiFetch("/api/logs/stats");
  let d = null;
  if (res.ok) {
    d = await res.json();
  } else {
    const fallbackRes = await apiFetch("/api/operation-logs");
    const all = fallbackRes.ok ? (await fallbackRes.json()).map(normalizeLogItemClient) : [];
    const today = new Date();
    d = {
      total: all.length,
      todayCount: all.filter((item) => {
        const t = new Date(item.createdAt);
        return (
          t.getFullYear() === today.getFullYear() &&
          t.getMonth() === today.getMonth() &&
          t.getDate() === today.getDate()
        );
      }).length,
      createCount: all.filter((item) => item.actionType === "新增").length,
      updateCount: all.filter((item) => item.actionType === "编辑").length,
      deleteCount: all.filter((item) => item.actionType === "删除").length
    };
  }
  logStatTotal.textContent = String(Number.isFinite(d?.total) ? d.total : 0);
  logStatToday.textContent = String(Number.isFinite(d?.todayCount) ? d.todayCount : 0);
  logStatCreate.textContent = String(Number.isFinite(d?.createCount) ? d.createCount : 0);
  logStatDelete.textContent = String(Number.isFinite(d?.deleteCount) ? d.deleteCount : 0);
}
async function fetchLogs() {
  const res = await apiFetch(
    `/api/logs?${new URLSearchParams({
      page: 1,
      pageSize: 8,
      sortBy: "createdAt",
      sortOrder: "desc"
    })}`
  );
  let list = [];
  if (res.ok) {
    const logsData = await res.json();
    list = Array.isArray(logsData?.list) ? logsData.list : [];
  } else {
    const fallbackRes = await apiFetch("/api/operation-logs");
    list = fallbackRes.ok ? (await fallbackRes.json()).map(normalizeLogItemClient).slice(0, 8) : [];
  }
  operationLogList.innerHTML = list
    .map((l) => `<li>[${new Date(l.createdAt).toLocaleString()}] ${l.operator} - ${l.action} - ${l.message}</li>`)
    .join("");
  if (!list.length) {
    operationLogList.innerHTML = "<li>暂无日志</li>";
  }
}
async function fetchBackups() {
  const files = await (await apiFetch("/api/system/backups")).json();
  backupSelect.innerHTML = files.length
    ? files.map((f) => `<option value="${f}">${f}</option>`).join("")
    : '<option value="">暂无备份</option>';
}
async function runModuleSafely(moduleName, task) {
  try {
    await task();
  } catch (error) {
    console.error(`${moduleName}加载失败`, error);
  }
}
async function refreshAll() {
  await runModuleSafely("首页看板", fetchDashboard);
  await runModuleSafely("学生列表", fetchStudents);
  await runModuleSafely("学生统计", fetchStats);
  await runModuleSafely("班级列表", fetchClasses);
  await runModuleSafely("班级统计", fetchClassStats);
  await runModuleSafely("课程列表", fetchCourses);
  await runModuleSafely("课程统计", fetchCourseStats);
  await runModuleSafely("成绩列表", fetchGrades);
  await runModuleSafely("成绩统计", fetchGradeStats);
  await runModuleSafely("考勤列表", fetchAttendance);
  await runModuleSafely("考勤统计", fetchAttendanceStats);
  await runModuleSafely("日志列表", fetchSystemLogs);
  await runModuleSafely("日志统计", fetchLogStats);
  await runModuleSafely("操作日志", fetchLogs);
  StudentManagementPage();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameInput.value.trim(), password: passwordInput.value })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "登录失败"), "error");
  const user = await res.json();
  showMain(user.username);
  await refreshAll();
  await fetchBackups();
});
logoutBtn.addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  loginCard.style.display = "block";
  mainApp.style.display = "none";
});
adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await apiFetch("/api/admin/credentials", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldPassword: oldPasswordInput.value, username: newUsernameInput.value.trim(), password: newPasswordInput.value })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "更新失败"), "error");
  showMessage(MSG.adminUpdated, "success");
});
resetAdminBtn.addEventListener("click", async () => {
  if (!confirm("确定重置管理员账号为默认值 admin/admin123 吗？")) return;
  const res = await fetch("/api/admin/reset-default", { method: "POST" });
  if (!res.ok) return showMessage(await getErrorMessage(res, "重置失败"), "error");
  showMessage(MSG.resetAdminSuccess, "success");
  await fetch("/api/logout", { method: "POST" });
  loginCard.style.display = "block";
  mainApp.style.display = "none";
});
createBackupBtn.addEventListener("click", async () => {
  const res = await apiFetch("/api/system/backup", { method: "POST" });
  if (!res.ok) return showMessage(await getErrorMessage(res, "创建备份失败"), "error");
  await fetchBackups();
  await fetchLogs();
});
refreshBackupBtn.addEventListener("click", fetchBackups);
restoreBackupBtn.addEventListener("click", async () => {
  if (!backupSelect.value) return;
  const res = await apiFetch("/api/system/restore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: backupSelect.value })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "恢复失败"), "error");
  await refreshAll();
  await fetchBackups();
});
closeDetailBtn.addEventListener("click", () => (detailModal.style.display = "none"));
if (detailModalCloseIcon) {
  detailModalCloseIcon.addEventListener("click", () => (detailModal.style.display = "none"));
}
if (detailEditBtn) {
  detailEditBtn.addEventListener("click", async () => {
    const id = Number(detailEditBtn.dataset.id || 0);
    const mode = String(detailEditBtn.dataset.mode || "student");
    if (mode === "class") {
      const item = classList.find((c) => c.id === id);
      if (!item) return;
      startEditClass(item);
      return;
    }
    if (mode === "course") {
      const item = courseList.find((c) => c.id === id);
      if (!item) return;
      startEditCourse(item);
      return;
    }
    if (mode === "grade") {
      const item = gradeList.find((g) => g.id === id);
      if (!item) return;
      startEditGrade(item);
      return;
    }
    if (mode === "attendance") {
      const item = attendanceList.find((a) => a.id === id);
      if (!item) return;
      startEditAttendance(item);
      return;
    }
    await startEditStudentById(id);
  });
}
detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) detailModal.style.display = "none";
});

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (studentSubmitLoading) return;
  const validationError = validateStudentForm();
  if (validationError) {
    showMessage(validationError, "error");
    return;
  }
  const id = studentIdInput.value;
  setStudentFormLoading(true);
  try {
    const res = await apiFetch(id ? `/api/students/${id}` : "/api/students", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentNo: studentNoInput.value.trim(),
        name: nameInput.value.trim(),
        age: Number(ageInput.value),
        classId: classIdInputForStudent.value ? Number(classIdInputForStudent.value) : null,
        className: classNameInput.value.trim(),
        gender: genderInput.value.trim(),
        status: studentStatusInput.value,
        phone: phoneInput.value.trim(),
        enrollmentDate: enrollmentDateInput.value,
        guardianName: guardianNameInput.value.trim(),
        guardianPhone: guardianPhoneInput.value.trim(),
        remark: remarkInput.value.trim()
      })
    });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "保存失败"), "error");
      return;
    }
    showMessage(id ? MSG.saveStudentUpdateSuccess : MSG.saveStudentCreateSuccess, "success");
    resetStudentForm();
    await refreshAll();
  } finally {
    setStudentFormLoading(false);
  }
});
cancelEdit.addEventListener("click", resetStudentForm);
tableBody.addEventListener("click", async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (!id || !action) return;
  if (action === "delete") {
    DeleteConfirmModal({
      text: "确认删除该学生记录吗？删除后不可恢复。",
      mode: "single",
      targetId: Number(id)
    });
    return;
  }
  const res = await apiFetch(`/api/students/${id}`);
  if (!res.ok) {
    showMessage(await getErrorMessage(res, MSG.loadStudentDetailFailed), "error");
    return;
  }
  const student = await res.json();
  if (action === "detail") {
    detailEditBtn.dataset.mode = "student";
    detailEditBtn.textContent = "编辑该学生";
    StudentDetailDrawer(student);
  }
  if (action === "edit") {
    await startEditStudent(student);
  }
});

classForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = classIdInput.value;
  const res = await apiFetch(id ? `/api/classes/${id}` : "/api/classes", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: classNameManageInput.value.trim(),
      teacher: classTeacherInput.value.trim(),
      capacity: Number(classCapacityInput.value),
      remark: classRemarkInput.value.trim()
    })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "班级保存失败"), "error");
  showMessage(MSG.classSaveSuccess, "success");
  resetClassForm();
  await refreshAll();
});
classForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    resetClassForm();
  }, 0);
});
cancelClassEditBtn.addEventListener("click", resetClassForm);
classTableBody.addEventListener("click", async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  const item = classList.find((c) => String(c.id) === id);
  if (!item) return;
  if (action === "edit-class") {
    startEditClass(item);
  }
  if (action === "detail-class") {
    ClassDetailDrawer(item);
  }
  if (action === "delete-class") {
    const hasStudents = Number(item.studentCount) > 0;
    const text = hasStudents
      ? `班级「${safeText(item.className)}」下仍有 ${item.studentCount} 名学生。继续删除可能导致学生数据与班级关联丢失，确认继续吗？`
      : `确认删除班级「${safeText(item.className)}」吗？`;
    DeleteConfirmModal({ text, mode: "class", targetId: item.id });
  }
});

courseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!courseNameInput.value.trim()) {
    showMessage("课程名称不能为空", "error");
    return;
  }
  if (!courseTeacherInput.value.trim()) {
    showMessage("授课教师不能为空", "error");
    return;
  }
  const id = courseIdInput.value;
  const res = await apiFetch(id ? `/api/courses/${id}` : "/api/courses", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseName: courseNameInput.value.trim(),
      teacherName: courseTeacherInput.value.trim(),
      credit: Number(courseCreditInput.value),
      remark: courseRemarkInput.value.trim()
    })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "课程保存失败"), "error");
  showMessage(MSG.courseSaveSuccess, "success");
  resetCourseForm();
  await refreshAll();
});
courseForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    resetCourseForm();
  }, 0);
});
cancelCourseEditBtn.addEventListener("click", resetCourseForm);
courseTableBody.addEventListener("click", async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  const item = courseList.find((c) => String(c.id) === id);
  if (!item) return;
  if (action === "detail-course") {
    CourseDetailDrawer(item);
  }
  if (action === "edit-course") {
    startEditCourse(item);
  }
  if (action === "delete-course") {
    const usedCount = gradeList.filter(
      (g) => String(g.courseName || "").trim() === String(item.courseName || "").trim()
    ).length;
    const usedHint =
      usedCount > 0
        ? `当前列表检测到该课程已有 ${usedCount} 条成绩记录，删除后可能影响历史成绩一致性，且后端可能拒绝删除。`
        : "如该课程已被成绩记录使用，后端会给出拦截提示。";
    DeleteConfirmModal({
      text: `${usedHint} 确认删除课程「${safeText(item.courseName)}」吗？`,
      mode: "course",
      targetId: item.id
    });
  }
});

gradeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = gradeIdInput.value;
  const studentId = Number(gradeStudentSelect.value);
  const selectedCourseValue = String(gradeCourseNameInput.value || "").trim();
  const selectedCourse = courseList.find((course) => String(course.id) === selectedCourseValue);
  const isLegacyCourse = selectedCourseValue.startsWith("legacy:");
  const courseName = selectedCourse
    ? String(selectedCourse.courseName || "").trim()
    : isLegacyCourse
    ? selectedCourseValue.replace(/^legacy:/, "").trim()
    : "";
  const courseId = selectedCourse ? Number(selectedCourse.id) : null;
  if (!Number.isInteger(studentId) || studentId <= 0) {
    showMessage("请选择学生", "error");
    return;
  }
  if (!courseName) {
    showMessage("请选择课程", "error");
    return;
  }
  const usualScore = Number(gradeUsualScoreInput.value);
  const finalScore = Number(gradeFinalScoreInput.value);
  if (!Number.isFinite(usualScore) || usualScore < 0 || usualScore > 100) {
    showMessage("平时成绩需为 0-100 分", "error");
    return;
  }
  if (!Number.isFinite(finalScore) || finalScore < 0 || finalScore > 100) {
    showMessage("期末成绩需为 0-100 分", "error");
    return;
  }
  if (hasDuplicateGrade(studentId, courseName, Number(id || 0))) {
    showMessage("同一学生同一课程成绩已存在，请勿重复新增", "error");
    return;
  }
  const res = await apiFetch(id ? `/api/grades/${id}` : "/api/grades", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId,
      courseId,
      courseName,
      usualScore,
      finalScore
    })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "成绩保存失败"), "error");
  showMessage(MSG.gradeSaveSuccess, "success");
  resetGradeForm();
  await refreshAll();
});
gradeForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    resetGradeForm();
  }, 0);
});
cancelGradeEditBtn.addEventListener("click", resetGradeForm);
gradeTableBody.addEventListener("click", async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  const item = gradeList.find((g) => String(g.id) === id);
  if (!item) return;
  if (action === "detail-grade") {
    GradeDetailDrawer(item);
  }
  if (action === "edit-grade") {
    startEditGrade(item);
  }
  if (action === "delete-grade") {
    DeleteConfirmModal({
      text: `确认删除成绩记录「${safeText(item.studentName)} / ${safeText(item.courseName)}」吗？`,
      mode: "grade",
      targetId: item.id
    });
  }
});
attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = attendanceIdInput.value;
  const studentId = Number(attendanceStudentSelect.value);
  if (!Number.isInteger(studentId) || studentId <= 0) {
    showMessage("请选择学生", "error");
    return;
  }
  if (!attendanceDateInput.value) {
    showMessage("日期不能为空", "error");
    return;
  }
  if (!attendanceStatusInput.value.trim()) {
    showMessage("请选择考勤状态", "error");
    return;
  }
  if (hasDuplicateAttendance(studentId, attendanceDateInput.value, Number(id || 0))) {
    showMessage("同一学生同一日期考勤已存在，请勿重复新增", "error");
    return;
  }
  const res = await apiFetch(id ? `/api/attendance/${id}` : "/api/attendance", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId,
      date: attendanceDateInput.value,
      status: attendanceStatusInput.value,
      remark: attendanceRemarkInput.value.trim()
    })
  });
  if (!res.ok) return showMessage(await getErrorMessage(res, "考勤保存失败"), "error");
  showMessage(MSG.attendanceSaveSuccess, "success");
  resetAttendanceForm();
  await refreshAll();
});
attendanceForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    resetAttendanceForm();
  }, 0);
});
cancelAttendanceEditBtn.addEventListener("click", resetAttendanceForm);
attendanceTableBody.addEventListener("click", async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  const item = attendanceList.find((a) => String(a.id) === id);
  if (!item) return;
  if (action === "detail-attendance") {
    AttendanceDetailDrawer(item);
  }
  if (action === "edit-attendance") {
    startEditAttendance(item);
  }
  if (action === "delete-attendance") {
    DeleteConfirmModal({
      text: `确认删除考勤记录「${safeText(item.studentName)} / ${safeText(item.date)} / ${safeText(item.status)}」吗？`,
      mode: "attendance",
      targetId: item.id
    });
  }
});

searchBtn.addEventListener("click", async () => {
  state.keyword = searchInput.value.trim();
  state.page = 1;
  await fetchStudentsSafe();
});
tableBody.addEventListener("change", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (!target.classList.contains("row-check")) return;
  StudentBatchActions();
});
if (selectAllCurrentPage) {
  selectAllCurrentPage.addEventListener("change", () => {
    const checks = tableBody.querySelectorAll(".row-check");
    checks.forEach((el) => {
      el.checked = selectAllCurrentPage.checked;
    });
    StudentBatchActions();
  });
}
resetBtn.addEventListener("click", async () => {
  searchInput.value = "";
  state.keyword = "";
  state.status = "";
  state.page = 1;
  statusFilterSelect.value = "";
  await fetchStudentsSafe();
});
statusFilterSelect.addEventListener("change", async () => {
  state.status = statusFilterSelect.value;
  state.page = 1;
  await fetchStudentsSafe();
});
sortBySelect.addEventListener("change", async () => {
  state.sortBy = sortBySelect.value;
  state.page = 1;
  await fetchStudentsSafe();
});
sortOrderSelect.addEventListener("change", async () => {
  state.sortOrder = sortOrderSelect.value;
  state.page = 1;
  await fetchStudentsSafe();
});
pageSizeSelect.addEventListener("change", async () => {
  state.pageSize = Number(pageSizeSelect.value);
  state.page = 1;
  await fetchStudentsSafe();
});
prevPageBtn.addEventListener("click", async () => {
  if (state.page > 1) {
    state.page -= 1;
    await fetchStudentsSafe();
  }
});
nextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(state.total / state.pageSize));
  if (state.page < totalPages) {
    state.page += 1;
    await fetchStudentsSafe();
  }
});
batchDeleteBtn.addEventListener("click", async () => {
  const ids = [...document.querySelectorAll(".row-check:checked")].map((el) => Number(el.value));
  if (!ids.length) return showMessage(MSG.selectBeforeBatchDelete, "error");
  DeleteConfirmModal({
    text: `确认删除已选中的 ${ids.length} 条学生记录吗？删除后不可恢复。`,
    mode: "batch",
    ids
  });
});
confirmDeleteBtn.addEventListener("click", async () => {
  if (deleteState.mode === "single" && deleteState.targetId) {
    const res = await apiFetch(`/api/students/${deleteState.targetId}`, { method: "DELETE" });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteSingleSuccess, "success");
  } else if (deleteState.mode === "batch" && deleteState.ids.length) {
    const res = await apiFetch("/api/students/batch-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: deleteState.ids })
    });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "批量删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteBatchSuccess, "success");
  } else if (deleteState.mode === "class" && deleteState.targetId) {
    const res = await apiFetch(`/api/classes/${deleteState.targetId}`, { method: "DELETE" });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteClassSuccess, "success");
  } else if (deleteState.mode === "course" && deleteState.targetId) {
    const res = await apiFetch(`/api/courses/${deleteState.targetId}`, { method: "DELETE" });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteCourseSuccess, "success");
  } else if (deleteState.mode === "grade" && deleteState.targetId) {
    const res = await apiFetch(`/api/grades/${deleteState.targetId}`, { method: "DELETE" });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteGradeSuccess, "success");
  } else if (deleteState.mode === "attendance" && deleteState.targetId) {
    const res = await apiFetch(`/api/attendance/${deleteState.targetId}`, { method: "DELETE" });
    if (!res.ok) {
      showMessage(await getErrorMessage(res, "删除失败"), "error");
      return;
    }
    showMessage(MSG.deleteAttendanceSuccess, "success");
  }
  deleteConfirmModal.style.display = "none";
  deleteState.mode = "";
  deleteState.targetId = null;
  deleteState.ids = [];
  await refreshAll();
});

classSearchBtn.addEventListener("click", async () => {
  classState.keyword = classSearchInput.value.trim();
  classState.page = 1;
  await fetchClasses();
});
classResetBtn.addEventListener("click", async () => {
  classSearchInput.value = "";
  classState.keyword = "";
  classState.sortBy = "id";
  classState.sortOrder = "desc";
  classState.pageSize = 10;
  classState.page = 1;
  classSortBySelect.value = "id";
  classSortOrderSelect.value = "desc";
  classPageSizeSelect.value = "10";
  await fetchClasses();
});
classSortBySelect.addEventListener("change", async () => {
  classState.sortBy = classSortBySelect.value;
  classState.page = 1;
  await fetchClasses();
});
classSortOrderSelect.addEventListener("change", async () => {
  classState.sortOrder = classSortOrderSelect.value;
  classState.page = 1;
  await fetchClasses();
});
classPageSizeSelect.addEventListener("change", async () => {
  classState.pageSize = Number(classPageSizeSelect.value);
  classState.page = 1;
  await fetchClasses();
});
classPrevPageBtn.addEventListener("click", async () => {
  if (classState.page <= 1) return;
  classState.page -= 1;
  await fetchClasses();
});
classNextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(classState.total / classState.pageSize));
  if (classState.page >= totalPages) return;
  classState.page += 1;
  await fetchClasses();
});
courseSearchBtn.addEventListener("click", async () => {
  courseState.keyword = courseSearchInput.value.trim();
  courseState.page = 1;
  await fetchCourses();
});
courseResetBtn.addEventListener("click", async () => {
  courseSearchInput.value = "";
  courseState.keyword = "";
  courseState.sortBy = "id";
  courseState.sortOrder = "desc";
  courseState.pageSize = 10;
  courseState.page = 1;
  courseSortBySelect.value = "id";
  courseSortOrderSelect.value = "desc";
  coursePageSizeSelect.value = "10";
  await fetchCourses();
});
courseSortBySelect.addEventListener("change", async () => {
  courseState.sortBy = courseSortBySelect.value;
  courseState.page = 1;
  await fetchCourses();
});
courseSortOrderSelect.addEventListener("change", async () => {
  courseState.sortOrder = courseSortOrderSelect.value;
  courseState.page = 1;
  await fetchCourses();
});
coursePageSizeSelect.addEventListener("change", async () => {
  courseState.pageSize = Number(coursePageSizeSelect.value);
  courseState.page = 1;
  await fetchCourses();
});
coursePrevPageBtn.addEventListener("click", async () => {
  if (courseState.page <= 1) return;
  courseState.page -= 1;
  await fetchCourses();
});
courseNextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(courseState.total / courseState.pageSize));
  if (courseState.page >= totalPages) return;
  courseState.page += 1;
  await fetchCourses();
});
gradeStudentSelect.addEventListener("change", () => {
  syncGradeStudentReadonlyFields();
});
gradeUsualScoreInput.addEventListener("input", computeGradePreview);
gradeFinalScoreInput.addEventListener("input", computeGradePreview);
gradeSearchBtn.addEventListener("click", async () => {
  gradeState.keyword = gradeSearchInput.value.trim();
  gradeState.className = gradeFilterClassNameInput.value.trim();
  gradeState.courseName = gradeFilterCourseNameInput.value.trim();
  gradeState.status = gradeFilterStatusSelect.value;
  gradeState.page = 1;
  await fetchGrades();
});
gradeResetBtn.addEventListener("click", async () => {
  gradeSearchInput.value = "";
  gradeFilterClassNameInput.value = "";
  gradeFilterCourseNameInput.value = "";
  gradeFilterStatusSelect.value = "";
  gradeSortBySelect.value = "id";
  gradeSortOrderSelect.value = "desc";
  gradePageSizeSelect.value = "10";
  gradeState.keyword = "";
  gradeState.className = "";
  gradeState.courseName = "";
  gradeState.status = "";
  gradeState.sortBy = "id";
  gradeState.sortOrder = "desc";
  gradeState.pageSize = 10;
  gradeState.page = 1;
  await fetchGrades();
});
gradeSortBySelect.addEventListener("change", async () => {
  gradeState.sortBy = gradeSortBySelect.value;
  gradeState.page = 1;
  await fetchGrades();
});
gradeSortOrderSelect.addEventListener("change", async () => {
  gradeState.sortOrder = gradeSortOrderSelect.value;
  gradeState.page = 1;
  await fetchGrades();
});
gradePageSizeSelect.addEventListener("change", async () => {
  gradeState.pageSize = Number(gradePageSizeSelect.value);
  gradeState.page = 1;
  await fetchGrades();
});
gradePrevPageBtn.addEventListener("click", async () => {
  if (gradeState.page <= 1) return;
  gradeState.page -= 1;
  await fetchGrades();
});
gradeNextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(gradeState.total / gradeState.pageSize));
  if (gradeState.page >= totalPages) return;
  gradeState.page += 1;
  await fetchGrades();
});
logSearchBtn.addEventListener("click", async () => {
  logState.keyword = logSearchInput.value.trim();
  logState.module = logFilterModuleSelect.value;
  logState.actionType = logFilterActionTypeSelect.value;
  logState.page = 1;
  await fetchSystemLogs();
  await fetchLogStats();
});
logResetBtn.addEventListener("click", async () => {
  logSearchInput.value = "";
  logFilterModuleSelect.value = "";
  logFilterActionTypeSelect.value = "";
  logSortBySelect.value = "createdAt";
  logSortOrderSelect.value = "desc";
  logPageSizeSelect.value = "10";
  logState.keyword = "";
  logState.module = "";
  logState.actionType = "";
  logState.sortBy = "createdAt";
  logState.sortOrder = "desc";
  logState.pageSize = 10;
  logState.page = 1;
  await fetchSystemLogs();
  await fetchLogStats();
});
logSortBySelect.addEventListener("change", async () => {
  logState.sortBy = logSortBySelect.value;
  logState.page = 1;
  await fetchSystemLogs();
});
logSortOrderSelect.addEventListener("change", async () => {
  logState.sortOrder = logSortOrderSelect.value;
  logState.page = 1;
  await fetchSystemLogs();
});
logPageSizeSelect.addEventListener("change", async () => {
  logState.pageSize = Number(logPageSizeSelect.value);
  logState.page = 1;
  await fetchSystemLogs();
});
logPrevPageBtn.addEventListener("click", async () => {
  if (logState.page <= 1) return;
  logState.page -= 1;
  await fetchSystemLogs();
});
logNextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(logState.total / logState.pageSize));
  if (logState.page >= totalPages) return;
  logState.page += 1;
  await fetchSystemLogs();
});
attendanceStudentSelect.addEventListener("change", () => {
  syncAttendanceStudentReadonlyFields();
});
attendanceSearchBtn.addEventListener("click", async () => {
  attendanceState.keyword = attendanceSearchInput.value.trim();
  attendanceState.className = attendanceFilterClassNameInput.value.trim();
  attendanceState.date = attendanceFilterDateInput.value;
  attendanceState.status = attendanceFilterStatusSelect.value;
  attendanceState.page = 1;
  await fetchAttendance();
});
attendanceResetBtn.addEventListener("click", async () => {
  attendanceSearchInput.value = "";
  attendanceFilterClassNameInput.value = "";
  attendanceFilterDateInput.value = "";
  attendanceFilterStatusSelect.value = "";
  attendanceSortBySelect.value = "id";
  attendanceSortOrderSelect.value = "desc";
  attendancePageSizeSelect.value = "10";
  attendanceState.keyword = "";
  attendanceState.className = "";
  attendanceState.date = "";
  attendanceState.status = "";
  attendanceState.sortBy = "id";
  attendanceState.sortOrder = "desc";
  attendanceState.pageSize = 10;
  attendanceState.page = 1;
  await fetchAttendance();
});
attendanceSortBySelect.addEventListener("change", async () => {
  attendanceState.sortBy = attendanceSortBySelect.value;
  attendanceState.page = 1;
  await fetchAttendance();
});
attendanceSortOrderSelect.addEventListener("change", async () => {
  attendanceState.sortOrder = attendanceSortOrderSelect.value;
  attendanceState.page = 1;
  await fetchAttendance();
});
attendancePageSizeSelect.addEventListener("change", async () => {
  attendanceState.pageSize = Number(attendancePageSizeSelect.value);
  attendanceState.page = 1;
  await fetchAttendance();
});
attendancePrevPageBtn.addEventListener("click", async () => {
  if (attendanceState.page <= 1) return;
  attendanceState.page -= 1;
  await fetchAttendance();
});
attendanceNextPageBtn.addEventListener("click", async () => {
  const totalPages = Math.max(1, Math.ceil(attendanceState.total / attendanceState.pageSize));
  if (attendanceState.page >= totalPages) return;
  attendanceState.page += 1;
  await fetchAttendance();
});

if (dashStudentTotal) {
  dashStudentTotal.style.cursor = "pointer";
  dashStudentTotal.addEventListener("click", async () => {
    switchSection("section-students");
    await fetchStudentsSafe();
  });
}
if (dashClassTotal) {
  dashClassTotal.style.cursor = "pointer";
  dashClassTotal.addEventListener("click", async () => {
    switchSection("section-classes");
    await fetchClasses();
  });
}
if (dashGradeTotal) {
  dashGradeTotal.style.cursor = "pointer";
  dashGradeTotal.addEventListener("click", async () => {
    switchSection("section-grades");
    await fetchGrades();
  });
}
if (dashAttendanceTotal) {
  dashAttendanceTotal.style.cursor = "pointer";
  dashAttendanceTotal.addEventListener("click", async () => {
    switchSection("section-attendance");
    await fetchAttendance();
  });
}

if (dashClassDistribution) {
  dashClassDistribution.addEventListener("click", async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('button[data-dashboard-action="students-by-class"]');
    if (!button) return;
    const className = String(button.getAttribute("data-class-name") || "").trim();
    if (!className) return;
    await navigateToStudentsByKeyword(className);
  });
}
if (dashGradeStatus) {
  dashGradeStatus.addEventListener("click", async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('button[data-dashboard-action="grade-status"]');
    if (!button) return;
    const status = String(button.getAttribute("data-status") || "").trim();
    if (!status) return;
    await navigateToGradesByStatus(status);
  });
}
if (dashAttendanceStatus) {
  dashAttendanceStatus.addEventListener("click", async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('button[data-dashboard-action="attendance-status"]');
    if (!button) return;
    const status = String(button.getAttribute("data-status") || "").trim();
    if (!status) return;
    await navigateToAttendanceByStatus(status);
  });
}
if (dashRecentFeed) {
  dashRecentFeed.addEventListener("click", async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('button[data-dashboard-action="feed-jump"]');
    if (!button) return;
    const feedText = String(button.getAttribute("data-feed-text") || "").trim();
    const section = getSectionFromFeedText(feedText);
    switchSection(section);
    if (section === "section-students") await fetchStudentsSafe();
    if (section === "section-classes") await fetchClasses();
    if (section === "section-courses") await fetchCourses();
    if (section === "section-grades") await fetchGrades();
    if (section === "section-attendance") await fetchAttendance();
  });
}
cancelDeleteBtn.addEventListener("click", () => {
  deleteConfirmModal.style.display = "none";
  deleteState.mode = "";
  deleteState.targetId = null;
  deleteState.ids = [];
});
deleteConfirmModal.addEventListener("click", (e) => {
  if (e.target === deleteConfirmModal) {
    deleteConfirmModal.style.display = "none";
    deleteState.mode = "";
    deleteState.targetId = null;
    deleteState.ids = [];
  }
});
exportBtn.addEventListener("click", () => (window.location.href = "/api/students/export"));
exportFailedBtn.addEventListener("click", () => (window.location.href = "/api/students/import-failed/export"));
importBtn.addEventListener("click", async () => {
  const file = importFile.files[0];
  if (!file) return showMessage(MSG.importNeedFile, "error");
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiFetch("/api/students/import", { method: "POST", body: formData });
  if (!res.ok) return showMessage(await getErrorMessage(res, "导入失败"), "error");
  showMessage(MSG.importSuccess, "success");
  await refreshAll();
});
if (resetStudentFormBtn) {
  resetStudentFormBtn.addEventListener("click", resetStudentForm);
}
if (quickAddStudentBtn) {
  quickAddStudentBtn.addEventListener("click", () => {
    switchSection("section-students");
    resetStudentForm();
    studentNoInput.focus();
  });
}
if (quickImportBtn) {
  quickImportBtn.addEventListener("click", () => importFile.click());
}

safeCheckLogin();

try {
  const lastSection = localStorage.getItem(LAST_SECTION_KEY);
  if (lastSection) {
    switchSection(lastSection);
  }
} catch (_error) {
  // Ignore storage read failures.
}

featureMenu.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const sectionId = target.dataset.section;
  if (!sectionId) return;
  switchSection(sectionId);
});
