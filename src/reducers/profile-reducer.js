import { accountApi } from "../Api/accountApi";
import { createNotificationActionCreator } from "./navbar-reducer";

const SET_EDIT_PROFILE = "SET_EDIT_PROFILE";
const CHANGE_MODE_PROFILE = "CHANGE_MODE_PROFILE";
const LOAD_PROFILE = "GET_PROFILE";
const LOAD_ROLES = "LOAD_ROLES";
const EDIT_PROFILE = "EDIT_PROFILE";
const RESPONSE_RESULT = "RESPONSE_RESULT";
const LOADING_PROFILE = "LOADING_PROFILE";

let initialState = {
  profile: {
    fullName: "",
    email: "",
    birthDate: "",
  },
  editProfile: {
    fullName: "",
    birthDate: "",
  },
  editMode: false,
  isLoading: false,
  numberResponse: 0,
  textResponse: "",
  email:
    localStorage.getItem("delivery-email") !== null
      ? localStorage.getItem("delivery-email")
      : "user@mail.ru",
  authorized:
    localStorage.getItem("delivery-jwt-token") !== null ? true : false,
  isAdmin: localStorage.getItem("delivery-is-admin") !== null ? true : false,
  isStudent:
    localStorage.getItem("delivery-is-teacher") !== null ? true : false,
  isTeacher:
    localStorage.getItem("delivery-is-student") !== null ? true : false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_PROFILE:
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          [action.name]: action.value,
        },
      };
    case CHANGE_MODE_PROFILE:
      return {
        ...state,
        editMode: action.editMode === true ? false : true,
        editProfile: {
          ...state.profile,
        },
        numberResponse: 0,
        textResponse: "",
      };
    case LOAD_PROFILE:
      let formatedDate = action.profile.birthDate.split("T")[0];
      action.profile.birthDate = formatedDate;
      return {
        ...state,
        profile: action.profile,
      };
    case LOAD_ROLES:
      return {
        ...state,
        isAdmin: action.isAdmin,
        isTeacher: action.isTeacher,
        isStudent: action.isStudent,
        authorized:
          action.authorized ||
          action.isAdmin ||
          action.isTeacher ||
          action.isStudent,
      };
    case EDIT_PROFILE:
      return state;
    case RESPONSE_RESULT:
      if (action.numberResponse === 200) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Профиль успешно изменен. [${action.numberResponse}]`,
        };
      }
      if (action.numberResponse === 400) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Невалидный ввод данных. [${action.numberResponse}]`,
        };
      }
      return state;
    case LOADING_PROFILE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function setEditProfileActionCreator(name, value) {
  return {
    type: SET_EDIT_PROFILE,
    name,
    value,
  };
}

export function changeModeProfileActionCreator(editMode) {
  return {
    type: CHANGE_MODE_PROFILE,
    editMode,
  };
}

export function setProfileActionCreator(profile) {
  return {
    type: LOAD_PROFILE,
    profile,
  };
}

export function loadRolesActionCreator(
  isAdmin,
  isTeacher,
  isStudent,
  authorized = false
) {
  return {
    type: LOAD_ROLES,
    isAdmin,
    isTeacher,
    isStudent,
    authorized,
  };
}

export function editProfileActionCreator() {
  return {
    type: EDIT_PROFILE,
  };
}

export function responseResultActionCreator(numberResponse) {
  return {
    type: RESPONSE_RESULT,
    numberResponse,
  };
}

export function loadingActionCreator(isLoading) {
  return {
    type: LOADING_PROFILE,
    isLoading,
  };
}

export function getProfileThunkCreator() {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    accountApi
      .getProfile()
      .then((response) => {
        if (response.status === 200) {
          dispatch(setProfileActionCreator(response.data));
        }
        dispatch(loadingActionCreator(false));
      })
      .catch((error) => {
        dispatch(loadingActionCreator(false));
      });
  };
}

export function editProfileThunkCreator(profile) {
  return (dispatch) => {
    accountApi
      .editProfile(profile)
      .then((status) => {
        if (status === 200) {
          dispatch(getProfileThunkCreator());
          dispatch(changeModeProfileActionCreator(true));
          dispatch(editProfileActionCreator());
        }
        dispatch(responseResultActionCreator(status));
        dispatch(createNotificationActionCreator(status, "profile"));
      })
      .catch((error) => {
        dispatch(responseResultActionCreator(error.response.status));
      });
  };
}

export default profileReducer;
