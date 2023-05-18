import { courseGroupApi } from "../Api/courseGroupApi";
import { createNotificationActionCreator } from "./navbar-reducer";

const LOAD_COURSE_GROUPS = "LOAD_COURSE_GROUPS";
const SET_NAME_GROUP = "SET_NAME_GROUP";
const SET_ID_GROUP = "SET_ID";
const CHANGE_MODE_MODAL_CREATE_GROUP = "CHANGE_MODE_MODAL_CREATE_GROUP";
const CHANGE_MODE_MODAL_EDIT_GROUP = "CHANGE_MODE_MODAL_EDIT_GROUP";
const LOADING_GROUPS = "LOADING_GROUPS";

let initialState = {
  courseGroups: [],
  createNameGroup: "",
  modeCreateGroup: false,
  editNameGroup: "",
  modeEditGroup: false,
  idGroup: "",
  isLoading: false,
  isAdmin: localStorage.getItem("delivery-is-admin") === "true" ? true : false,
};

const courseGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSE_GROUPS:
      return {
        ...state,
        courseGroups: action.courseGroups,
      };
    case SET_NAME_GROUP:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_ID_GROUP:
      return {
        ...state,
        idGroup: action.idGroup,
      };
    case CHANGE_MODE_MODAL_CREATE_GROUP:
      return {
        ...state,
        modeCreateGroup: action.modeCreateGroup ? false : true,
        createNameGroup: "",
      };
    case CHANGE_MODE_MODAL_EDIT_GROUP:
      return {
        ...state,
        modeEditGroup: action.modeEditGroup ? false : true,
        editNameGroup: "",
      };
    case LOADING_GROUPS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function loadCourseGroupsActionCreator(courseGroups) {
  return { type: LOAD_COURSE_GROUPS, courseGroups };
}

export function loadCourseGroupsThunkCreator() {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    courseGroupApi.getCourseGroups().then((data) => {
      dispatch(loadCourseGroupsActionCreator(data));
      dispatch(loadingActionCreator(false));
    });
  };
}

export function setNameGroupActionCreator(name, value) {
  return { type: SET_NAME_GROUP, name, value };
}

export function setIdGroupActionCreator(idGroup) {
  return { type: SET_ID_GROUP, idGroup };
}

export function changeModeModalCreateGroupActionCreator(modeCreateGroup) {
  return { type: CHANGE_MODE_MODAL_CREATE_GROUP, modeCreateGroup };
}

export function changeModeModalEditGroupActionCreator(modeEditGroup) {
  return { type: CHANGE_MODE_MODAL_EDIT_GROUP, modeEditGroup };
}

export function loadingActionCreator(isLoading) {
  return {
    type: LOADING_GROUPS,
    isLoading,
  };
}

export function createCourseGroupThunkCreator(createNameGroup) {
  return (dispatch) => {
    courseGroupApi.createCourseGroup(createNameGroup).then((status) => {
      if (status === 200) {
        dispatch(loadCourseGroupsThunkCreator());
        dispatch(changeModeModalCreateGroupActionCreator(true));
      }
      dispatch(createNotificationActionCreator(status, "createGroup"));
    });
  };
}

export function editCourseGroupThunkCreator(editNameGroup, id) {
  return (dispatch) => {
    courseGroupApi.editCourseGroup(editNameGroup, id).then((status) => {
      if (status === 200) {
        dispatch(loadCourseGroupsThunkCreator());
        dispatch(changeModeModalEditGroupActionCreator(true));
      }
      dispatch(createNotificationActionCreator(status, "editGroup"));
    });
  };
}

export function deleteCourseGroupThunkCreator(id) {
  return (dispatch) => {
    courseGroupApi.deleteCourseGroup(id).then((status) => {
      if (status === 200) {
        dispatch(loadCourseGroupsThunkCreator());
      }
      dispatch(createNotificationActionCreator(status, "deleteGroup"));
    })
  }
}

export default courseGroupsReducer;
