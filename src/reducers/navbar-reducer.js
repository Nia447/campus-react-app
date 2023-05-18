import { accountApi } from "../Api/accountApi";
import { loadRolesActionCreator } from "./profile-reducer";
import { toast } from "react-toastify";

const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";

let initialState = {};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      if (action.status === 401) {
        toast.error(`Токен авторизации недействителен [${action.status}]`);
        break;
      }
      switch (action.action) {
        case "login":
          switch (action.status) {
            case 200:
              toast.success(`Авторизация успешна. [${action.status}]`);
              break;
            default:
              toast.error(`Неверный логин или пароль. [${action.status}]`);
              break;
          }
          break;
        case "registration":
          switch (action.status) {
            case 200:
              toast.success(`Аккаунт создан. [${action.status}]`);
              break;
            case 409:
              toast.error(`Пользователь с таким Email уже существует. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при создании аккаунта. [${action.status}]`);
              break;
          }
          break;
        case "logout":
          switch (action.status) {
            case 200:
              toast.success(`Выход из системы. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при выходе из системы. [${action.status}]`);
              break;
          }
          break;
        case "profile":
          switch (action.status) {
            case 200:
              toast.success(`Профиль изменен. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при изменении профиля. [${action.status}]`);
              break;
          }
          break;
        case "createGroup":
          switch (action.status) {
            case 200:
              toast.success(`Группа создана. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при создании группы. [${action.status}]`);
              break;
          }
          break;
        case "editGroup":
          switch (action.status) {
            case 200:
              toast.success(`Группа изменена. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при изменении группы. [${action.status}]`);
              break;
          }
          break;
        case "deleteGroup":
          switch (action.status) {
            case 200:
              toast.success(`Группа удалена. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при удалении группы. [${action.status}]`);
              break;
          }
          break;
        case "editCourse":
          switch (action.status) {
            case 200:
              toast.success(`Курс изменен. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при изменении курса. [${action.status}]`);
              break;
          }
          break;
        case "editCourseStatus":
          switch (action.status) {
            case 200:
              toast.success(`Стутус курса изменен. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при изменении статуса курса. [${action.status}]`
              );
              break;
          }
          break;
        case "createCourse":
          switch (action.status) {
            case 200:
              toast.success(`Курс создан. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при создании курса. [${action.status}]`);
              break;
          }
          break;
        case "deleteCourse":
          switch (action.status) {
            case 200:
              toast.success(`Курс удален. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(`Ошибка при удалении курса. [${action.status}]`);
              break;
          }
          break;
        case "enrollCourse":
          switch (action.status) {
            case 200:
              toast.success(`Заявка подана. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при подачи заявки к курсу. [${action.status}]`
              );
              break;
          }
          break;
        case "createNotification":
          switch (action.status) {
            case 200:
              toast.success(`Уведомление добавлено. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при создании уведомления. [${action.status}]`
              );
              break;
          }
          break;
        case "addTeacher":
          switch (action.status) {
            case 200:
              toast.success(`Преподаватель добавлен. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при добавлении преподавателя. [${action.status}]`
              );
              break;
          }
          break;
        case "acceptStudent":
          switch (action.status) {
            case 200:
              toast.success(`Студент зачислен на курс. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при зачислении на курс. [${action.status}]`
              );
              break;
          }
          break;
        case "declineStudent":
          switch (action.status) {
            case 200:
              toast.success(`Студент отклонен от курса . [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при отказе студента. [${action.status}]`
              );
              break;
          }
          break;
        case "editStatusStudent":
          switch (action.status) {
            case 200:
              toast.success(`Отметка поставлена. [${action.status}]`);
              break;
            case 403:
              toast.error(`Отказано в доступе. [${action.status}]`);
              break;
            default:
              toast.error(
                `Ошибка при постановлении отметки студента. [${action.status}]`
              );
              break;
          }
          break;
        default:
          break;
      }
      return state;
    default:
      return state;
  }
};

export function createNotificationActionCreator(status, action) {
  return {
    type: CREATE_NOTIFICATION,
    status,
    action,
  };
}

export function logoutThunkCreator() {
  return (dispatch) => {
    accountApi
      .logout()
      .then((status) => {
        if (status === 200) {
          dispatch(loadRolesActionCreator(false, false, false));
        }
        dispatch(createNotificationActionCreator(status, "logout"));
      })
      .catch((error) => {
        dispatch(loadRolesActionCreator(false, false, false)); //TODO: delete later
        dispatch(createNotificationActionCreator(200, "logout"));
      });
  };
}

export function loadRolesThunkCreator() {
  return (dispatch) => {
    accountApi
      .roles()
      .then((response) => {
        if (response.status === 200) {
          let isAdmin = localStorage.getItem("delivery-is-admin");
          let isTeacher = localStorage.getItem("delivery-is-teacher");
          let isStudent = localStorage.getItem("delivery-is-student");
          dispatch(loadRolesActionCreator(isAdmin, isTeacher, isStudent));
        } else if (response.status === 401) {
          dispatch(loadRolesActionCreator(false, false, false));
        }
      })
      .catch((error) => {
        dispatch(loadRolesActionCreator(false, false, false)); //TODO: delete later
      });
  };
}

export default navbarReducer;
