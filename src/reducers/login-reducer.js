import { accountApi } from "../Api/accountApi";
import { createNotificationActionCreator } from "./navbar-reducer";
import { loadRolesActionCreator } from "./profile-reducer";

const SET_LOGIN = "SET_LOGIN";
const RESPONSE_RESULT = "RESPONSE_RESULT";
const LOADING_LOGIN = "LOADING_LOGIN";

let initialState = {
  login: {
    email: "gymboss@gachi.com",
    password: "B0yNextD00r",
  },
  isLoading: false,
  numberResponse: 0,
  textResponse: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          [action.name]: action.value,
        },
      };
    case RESPONSE_RESULT:
      if (action.numberResponse === 200) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Успешная авторизация. [${action.numberResponse}]`,
        };
      }
      if (action.numberResponse === 400) {
        return {
          ...state,
          numberResponse: action.numberResponse,
          textResponse: `Неверный логин или пароль. [${action.numberResponse}]`,
        };
      }
      return state;
    case LOADING_LOGIN:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function setLoginActionCreator(name, value) {
  return {
    type: SET_LOGIN,
    name,
    value,
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
    type: LOADING_LOGIN,
    isLoading,
  };
}

export function loginThunkCreator(login) {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    accountApi
      .login(login)
      .then((status) => {
        if (status === 200) {
          dispatch(loadRolesActionCreator(false, false, false, true));
        }
        dispatch(createNotificationActionCreator(status, "login"));
        dispatch(responseResultActionCreator(status));
        dispatch(loadingActionCreator(false));
      })
      .catch((error) => {
        dispatch(responseResultActionCreator(error.response.status));
        dispatch(loadingActionCreator(false));
      });
  };
}

export default loginReducer;
