import { accountApi } from "../Api/accountApi";
import { createNotificationActionCreator } from "./navbar-reducer";
import { loadRolesActionCreator } from "./profile-reducer";

const SET_REGISTRATION = "SET_REGISTRATION";
const REGISTRATION = "REGISTRATION";
const RESPONSE_RESULT = "RESPONSE_RESULT";
const LOADING_REGISTRATION = "LOADING_REGISTRATION";

let initialState = {
  registration: {
    fullName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  isLoading: false,
  numberResponse: 0,
  textResponse: "",
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTRATION:
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.name]: action.value,
        },
      };
    case REGISTRATION:

      return state;
    case RESPONSE_RESULT:
      if (action.numberResponse === 200) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Пользователь создан успешно. [${action.numberResponse}]`,
        };
      }
      if (action.numberResponse === 400) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Невалидный ввод данных. [${action.numberResponse}]`,
        };
      }
      if (action.numberResponse === 409) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Пользователь с таким Email уже существует. [${action.numberResponse}]`,
        };
      }
      return state;
    case LOADING_REGISTRATION:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function setRegistrationActionCreator(name, value) {
  return {
    type: SET_REGISTRATION,
    name,
    value,
  };
}

export function registrationActionCreator() {
  return {
    type: REGISTRATION,
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
    type: LOADING_REGISTRATION,
    isLoading,
  };
}

export function registrationThunkCreator(registration) {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    accountApi
      .registration(registration)
      .then((status) => {
        if (status === 200) {
          dispatch(loadRolesActionCreator(false, false, false, true));
        }
        dispatch(createNotificationActionCreator(status, "registration"))
        dispatch(responseResultActionCreator(status));
        dispatch(loadingActionCreator(false));
      })
      .catch((error) => {
        dispatch(responseResultActionCreator(error.response.status));
        dispatch(loadingActionCreator(false));
      });
  };
}

export default registrationReducer;
