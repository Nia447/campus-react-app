import axios from "axios";
import { refreshInstance } from "./courseGroupApi";

export const baseUrl = "https://camp-courses.api.kreosoft.space/";
export const baseUrlLocalHost = "http://localhost:3000/"

let instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("delivery-jwt-token")}`,
  },
});

function refreshInstanceAccount() {
  instance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("delivery-jwt-token")}`,
    },
  });
}

function registration(json) {
  refreshInstanceAccount();
  refreshInstance();
  return instance
    .post("registration", {
      fullName: json.fullName,
      birthDate: json.birthDate,
      email: json.email,
      password: json.password,
      confirmPassword: json.confirmPassword,
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("delivery-jwt-token", response.data.token);
        localStorage.setItem("delivery-email", json.email);
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error.response.status);
      return error.response.status;
    });
}

function login(json) {
  refreshInstanceAccount();
  refreshInstance();
  return instance
    .post("login", {
      email: json.email,
      password: json.password,
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("delivery-jwt-token", response.data.token);
        localStorage.setItem("delivery-email", json.email);
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error.response.status);
      return error.response.status;
    });
}

function logout() {
  refreshInstanceAccount();
  refreshInstance();
  return instance
    .post("logout")
    .then((response) => {
      localStorage.removeItem("delivery-jwt-token"); // TODO: delete later
      localStorage.removeItem("delivery-is-student"); // TODO: delete later
      localStorage.removeItem("delivery-is-teacher"); // TODO: delete later
      localStorage.removeItem("delivery-is-admin"); // TODO: delete later
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      localStorage.removeItem("delivery-jwt-token"); // TODO: delete later
      localStorage.removeItem("delivery-is-student"); // TODO: delete later
      localStorage.removeItem("delivery-is-teacher"); // TODO: delete later
      localStorage.removeItem("delivery-is-admin"); // TODO: delete later
      console.log(error);
      return error;
    });
}

function getProfile() {
  return instance
    .get("profile")
    .then((response) => {
      if (response.status === 200) {
        return { status: response.status, data: response.data };
      }
    })
    .catch((error) => {
      console.log(error.response.data.error);
      return error;
    });
}

function editProfile(json) {
  return instance
    .put("profile", {
      fullName: json.fullName,
      birthDate: json.birthDate,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function roles() {
  refreshInstanceAccount();
  refreshInstance();
  return instance
    .get("roles")
    .then((response) => {
      console.log(response);
      if (response.data.isStudent) {
        localStorage.setItem("delivery-is-student", response.data.isStudent);
      }
      if (response.data.isTeacher) {
        localStorage.setItem("delivery-is-teacher", response.data.isTeacher);
      }
      if (response.data.isAdmin) {
        localStorage.setItem("delivery-is-admin", response.data.isAdmin);
      }
      if (response.status === 401) {
        logout();
      }
      return response;
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("delivery-jwt-token"); // TODO: delete later
      localStorage.removeItem("delivery-is-student"); // TODO: delete later
      localStorage.removeItem("delivery-is-teacher"); // TODO: delete later
      localStorage.removeItem("delivery-is-admin"); // TODO: delete later
      return error.response.status;
    });
}

export const accountApi = {
  registration: registration,
  login: login,
  logout: logout,
  getProfile: getProfile,
  editProfile: editProfile,
  roles: roles,
};
