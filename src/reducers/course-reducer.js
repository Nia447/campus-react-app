import { courseGroupApi } from "../Api/courseGroupApi";
import { createNotificationActionCreator } from "./navbar-reducer";

const LOAD_COURSE_INFO = "LOAD_COURSE_INFO";
const LOAD_TEACHERS_TO_ADD_IN_COURSE = "LOAD_TEACHERS_TO_ADD_IN_COURSE";
const CHECK_IS_IN_COURSE = "CHECK_IS_IN_COURSE"; 
const SET_PARAMS_EDIT_COURSE = "SET_PARAMS_EDIT_COURSE";
const SET_NOTIFICATION_PARAMS = "SET_NOTIFICATION_PARAMS"
const SET_ID_TEACHER_COURSE = "SET_ID_TEACHER_COURSE";
const SET_EDIT_PARAMS = "SET_EDIT_PARAMS";
const SET_PARAMS_STUDENT_MARK = "SET_PARAMS_STUDENT_MARK";
const ENROLL_COURSE = "ENROLL_COURSE"; 
const CHANGE_MODE_MODAL_EDIT_COURSE = "CHANGE_MODE_MODAL_EDIT_COURSE";
const CHANGE_MODE_MODAL_EDIT_COURSE_STATUS =
  "CHANGE_MODE_MODAL_EDIT_COURSE_STATUS";
const CHANGE_MODE_MODAL_ADD_TEACHER = "CHANGE_MODE_MODAL_ADD_TEACHER";
const CHANGE_MODE_MODAL_CREATE_NOTIFICATION =
  "CHANGE_MODE_MODAL_CREATE_NOTIFICATION";
const CHANGE_MODE_MODAL_EDIT_STUDENT_MARK =
  "CHANGE_MODE_MODAL_EDIT_STUDENT_MARK";
const LOADING_COURSE = "LOADING_COURSE";

let initialState = {
  course: {
    name: "",
    year: 0,
    totalNumberOfSeats: 0,
    studentsEnrolledCount: 0,
    studentsInQueueCount: 0, 
    semester: "",
    requirements: "",
    annotations: "",
    status: "",
  },
  editCourse: {
    requirements: "",
    annotations: "",
  },
  teachers: [],
  students: [],
  notifications: [],
  possibleTeachers: [],
  modeEditCourse: false,
  modeEditCourseStatus: false,
  modeAddTeacher: false,
  modeCreateNotification: false,
  modeEditStudentMark: false,
  student: {
    id: "asd",
    name: "asd",
    status: "",
    attestation: "",
  },
  notification: {
    text: "",
    isImportant: true,
  },
  status: "",
  idTeacher: "",
  isLoading: false,
  isInCourse: false,
  isMyCourse: false,
  isTeacherInCourse: false,
  isMain: false,
  isAdmin: localStorage.getItem("delivery-is-admin") === "true" ? true : false,
  myEmail: localStorage.getItem("delivery-email"),
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSE_INFO:
      let myEmail = localStorage.getItem("delivery-email"); 

      return {
        ...state,
        course: action.course,
        teachers: action.teachers,
        students: action.students,
        notifications: action.notifications,
        isInCourse: action.teachers.some((teacher) => teacher.email === myEmail) || action.students.some((student) => student.email === myEmail),
        isTeacherInCourse: action.teachers.some((teacher) => teacher.email === myEmail),
        isMain: action.teachers.some((teacher) => teacher.email === myEmail && teacher.isMain),
      };
    case LOAD_TEACHERS_TO_ADD_IN_COURSE:
      let filtredPossibleTeachers = action.possibleTeachers.filter(human => !state.teachers.some(teacher => teacher.name === human.fullName) && !state.students.some(student => student.name === human.fullName));
      return {
        ...state,
        possibleTeachers: filtredPossibleTeachers,
        idTeacher: filtredPossibleTeachers[0].id,
      }
    case CHECK_IS_IN_COURSE:
      return {
        ...state,
        isMyCourse: action.courses.find(course => course.id === action.id) === undefined ? false : true,
      }
    case SET_PARAMS_EDIT_COURSE:
      return {
        ...state,
        editCourse: {
          ...state.editCourse,
          [action.name]: action.value,
        },
      };
    case SET_NOTIFICATION_PARAMS:
      let bool = 
        action.name === "isImportant" && action.value === 'true' 
          ? true 
          : (action.name === "isImportant" && action.value === 'false' 
          ? false 
          : null);
      return {
        ...state,
        notification: {
          ...state.notification,
          [action.name]: bool === null ? action.value : bool,
        }
      }
    case SET_ID_TEACHER_COURSE:
      return {
        ...state,
        idTeacher: action.id,
      };
    case SET_EDIT_PARAMS:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_PARAMS_STUDENT_MARK:
      return {
        ...state,
        student: {
          ...state.student,
          [action.name]: action.value,
        },
      };
    case ENROLL_COURSE:
      return {
        ...state,
        isInCourse: true,
      }
    case CHANGE_MODE_MODAL_EDIT_COURSE:
      return {
        ...state,
        modeEditCourse: action.modeEditCourse ? false : true,
        editCourse: {
          requirements: state.course.requirements,
          annotations: state.course.annotations,
        },
      };
    case CHANGE_MODE_MODAL_EDIT_COURSE_STATUS:
      return {
        ...state,
        modeEditCourseStatus: action.modeEditCourseStatus ? false : true,
      };
    case CHANGE_MODE_MODAL_ADD_TEACHER:
      return {
        ...state,
        modeAddTeacher: action.modeAddTeacher ? false : true,
      };
    case CHANGE_MODE_MODAL_CREATE_NOTIFICATION:
      return {
        ...state,
        modeCreateNotification: action.modeCreateNotification ? false : true,
        notification: {
          text: "",
          isImportant: null,
        },
      };
    case CHANGE_MODE_MODAL_EDIT_STUDENT_MARK:
      return {
        ...state,
        modeEditStudentMark: action.modeEditStudentMark ? false : true,
      };
    case LOADING_COURSE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function loadCourseInfoActionCreator(course, teachers, students, notifications) {
  return { type: LOAD_COURSE_INFO, course, teachers, students, notifications };
}

export function loadTeachersToAddInCourseActionCreator(possibleTeachers) {
  return { type: LOAD_TEACHERS_TO_ADD_IN_COURSE, possibleTeachers };
}

export function checkIsInCourseActionCreator(courses, id) {
  return { type: CHECK_IS_IN_COURSE, courses, id };
}

export function setParamsEditCourseActionCreator(name, value) {
  return { type: SET_PARAMS_EDIT_COURSE, name, value };
}

export function setNotificationParamsActionCreator(name, value) {
  return { type: SET_NOTIFICATION_PARAMS, name, value };
}

export function setIdTeacherCourseActionCreator(id) {
  return { type: SET_ID_TEACHER_COURSE, id };
}

export function setEditParamsActionCreator(name, value) {
  return { type: SET_EDIT_PARAMS, name, value };
}

export function setParamsStudentMarkActionCreator(name, value) {
  return { type: SET_PARAMS_STUDENT_MARK, name, value };
}

export function enrollCourseActionCreator() {
  return { type: ENROLL_COURSE };
}

export function changeModeModalEditCourseActionCreator(modeEditCourse) {
  return { type: CHANGE_MODE_MODAL_EDIT_COURSE, modeEditCourse };
}

export function changeModeModalEditCourseStatusActionCreator(modeEditCourseStatus) {
  return { type: CHANGE_MODE_MODAL_EDIT_COURSE_STATUS, modeEditCourseStatus };
}

export function changeModeModalAddTeacherActionCreator(modeAddTeacher) {
  return { type: CHANGE_MODE_MODAL_ADD_TEACHER, modeAddTeacher };
}

export function changeModeModalCreateNotificationActionCreator(modeCreateNotification) {
  return { type: CHANGE_MODE_MODAL_CREATE_NOTIFICATION, modeCreateNotification };
}

export function changeModeModalEditStudentMarkActionCreator(modeEditStudentMark) {
  return { type: CHANGE_MODE_MODAL_EDIT_STUDENT_MARK, modeEditStudentMark };
}

export function loadingActionCreator(isLoading) {
  return { type: LOADING_COURSE, isLoading };
}

export function loadCourseInfoThunkCreator(idCourse) {
  return (dispatch) => {
      dispatch(loadingActionCreator(true));
      courseGroupApi.getCourseDetails(idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(loadingActionCreator(false));
    });
  };
}

export function loadTeachersToAddInCourseThunkCreator() {
  return (dispatch) => {
    courseGroupApi.getTeachers().then((data) => {
      dispatch(loadTeachersToAddInCourseActionCreator(data));
    })
  }
}

export function checkIsInCourseThunkCreator(id) {
  return (dispatch) => {
    courseGroupApi.getMyCourses().then((data) => {
      dispatch(checkIsInCourseActionCreator(data, id));
    })
  }
}

export function editCourseThunkCreator(editCourse, idCourse) {
  return (dispatch) => {
    courseGroupApi.editCourse(editCourse, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(changeModeModalEditCourseActionCreator(true));
      dispatch(createNotificationActionCreator(data.status, "editCourse"));
    });
  };
}

export function deleteCourseThunkCreator(idCourse) {
  return (dispatch) => {
    courseGroupApi.deleteCourse(idCourse).then((status) => {
      dispatch(createNotificationActionCreator(status, "deleteCourse"));
      return status;
    });
  };
}

export function enrollCourseThunkCreator(idCourse) {
  return (dispatch) => {
    courseGroupApi.enrollCourse(idCourse).then((status) => {
      dispatch(enrollCourseActionCreator());
      dispatch(loadCourseInfoThunkCreator(idCourse));
      dispatch(checkIsInCourseThunkCreator(idCourse));
      dispatch(createNotificationActionCreator(status, "enrollCourse"));
      return status;  
    })
  }
}

export function editCourseStatusThunkCreator(status, idCourse) {
  return (dispatch) => {
    courseGroupApi.editCourseStatus(status, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(changeModeModalEditCourseStatusActionCreator(true));
      dispatch(createNotificationActionCreator(data.status, "editCourseStatus"));
    })
  }
}

export function addTeacherThunkCreator(idTeacher, idCourse) {
  return (dispatch) => {
    courseGroupApi.addTeacherToCourse(idTeacher, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(changeModeModalAddTeacherActionCreator(true));
      dispatch(createNotificationActionCreator(data.status, "addTeacher"));
    })
  }
}

export function createNotificationThunkCreator(notification, idCourse) {
  return (dispatch) => {
    courseGroupApi.createNotificationInCourse(notification, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(changeModeModalCreateNotificationActionCreator(true));
      dispatch(createNotificationActionCreator(data.status, "createNotification"));
    })
  }
}

export function editStudentMarkThunkCreator(student, idCourse) {
  return (dispatch) => {
    courseGroupApi.editStudentMarkInCourse(student, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      dispatch(changeModeModalEditStudentMarkActionCreator(true));
      dispatch(createNotificationActionCreator(data.status, "editStatusStudent"));
    })
  }
}

export function editStudentStatusThunkCreator(status, idStudent, idCourse) {
  return (dispatch) => {
    courseGroupApi.editStudentStatusInCourse(status, idStudent, idCourse).then((data) => {
      dispatch(loadCourseInfoActionCreator(data.course, data.teachers, data.students, data.notifications));
      if (status === "Accepted") {
        dispatch(createNotificationActionCreator(data.status, "acceptStudent"));
      } else if (status === "Declined") {
        dispatch(createNotificationActionCreator(data.status, "declineStudent"));
      }
    })
  }
}

export default courseReducer;
