import { courseGroupApi } from "../Api/courseGroupApi";
import { createNotificationActionCreator } from "./navbar-reducer";

const LOAD_COURSES = "LOAD_COURSES";
const LOAD_TEACHERS = "LOAD_TEACHERS";
const SET_PARAMS_COURSE = "SET_PARAMS_COURSE";
const SET_ID_TEACHER = "SET_ID_TEACHER";
const SET_CURRENT_NAME_GROUP = "SET_CURRENT_NAME_GROUP";
const CHANGE_MODE_MODAL_CREATE_COURSE = "CHANGE_MODE_MODAL_CREATE_COURSE";
const LOADING_GROUP = "LOADING_GROUP";

let initialState = {
  nameGroup: "",
  courses: [],
  teachers: [],
  createCourse: {
    name: "",
    year: 0,
    totalNumberOfSeats: 0,
    semester: "",
    requirements: "",
    annotations: "",
  },
  modeCreateCourse: false,
  idTeacher: "",
  isLoading: false,
  isAdmin: localStorage.getItem("delivery-is-admin") === "true" ? true : false,
};

const courseGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSES:
      return {
        ...state,
        courses: action.courses,
      };
    case LOAD_TEACHERS:
      return {
        ...state,
        teachers: action.teachers,
        idTeacher: action.teachers[0].id,
      };
    case SET_PARAMS_COURSE:
      return {
        ...state,
        createCourse: {
          ...state.createCourse,
          [action.name]: action.value,
        },
      };
    case SET_ID_TEACHER:
      return {
        ...state,
        idTeacher: action.id,
      };
    case SET_CURRENT_NAME_GROUP:
      return {
        ...state,
        nameGroup: action.nameGroup,
      };
    case CHANGE_MODE_MODAL_CREATE_COURSE:
      return {
        ...state,
        modeCreateCourse: action.modeCreateCourse ? false : true,
        createCourse: {
          name: "",
          year: 0,
          totalNumberOfSeats: 0,
          semester: "",
          requirements: "",
          annotations: "",
        },
      };
    case LOADING_GROUP:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function loadCoursesActionCreator(courses) {
  return { type: LOAD_COURSES, courses };
}

export function loadTeachersActionCreator(teachers) {
  return { type: LOAD_TEACHERS, teachers };
}

export function setParamsCourseActionCreator(name, value) {
  return { type: SET_PARAMS_COURSE, name, value };
}

export function setIdTeacherActionCreator(id) {
  return { type: SET_ID_TEACHER, id };
}

export function setCurrentNameGroupActionCreator(nameGroup) {
  return { type: SET_CURRENT_NAME_GROUP, nameGroup };
}

export function changeModeModalCreateCourseActionCreator(modeCreateCourse) {
  return { type: CHANGE_MODE_MODAL_CREATE_COURSE, modeCreateCourse };
}

export function loadingActionCreator(isLoading) {
  return { type: LOADING_GROUP, isLoading };
}

export function loadCoursesThunkCreator(idGroup) {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    courseGroupApi.getCourses(idGroup).then((data) => {
      dispatch(loadCoursesActionCreator(data));
      dispatch(loadingActionCreator(false));
    });
  };
}

export function loadTeachersThunkCreator() {
  return (dispatch) => {
    courseGroupApi.getTeachers().then((data) => {
      dispatch(loadTeachersActionCreator(data));
    });
  };
}

export function createCourseThunkCreator(createCourse, idGroup, idTeacher) {
  return (dispatch) => {
    courseGroupApi
      .createCourse(createCourse, idGroup, idTeacher)
      .then((status) => {
        if (status === 200) {
          dispatch(loadCoursesThunkCreator(idGroup));
          dispatch(changeModeModalCreateCourseActionCreator(true));
        }
        dispatch(createNotificationActionCreator(status, "createCourse"));
      });
  };
}

export function getGroupDetailsThunkCreator(id) {
  return (dispatch) => {
    courseGroupApi.getCourseGroups().then((data) => {
      const nameGroup = data.find(x => x.id === id).name;
      dispatch(setCurrentNameGroupActionCreator(nameGroup));
    });
  };
}

export default courseGroupReducer;
