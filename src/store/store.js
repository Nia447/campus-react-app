import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import courseGroupsReducer from "../reducers/course-groups-reducer";
import courseGroupReducer from "../reducers/course-group-reducer";
import thunk from "redux-thunk";
import registrationReducer from "../reducers/registration-reducer";
import loginReducer from "../reducers/login-reducer";
import navbarReducer from "../reducers/navbar-reducer";
import profileReducer from "../reducers/profile-reducer";
import myCoursesReducer from "../reducers/my-courses-reducer";
import teachingCoursesReducer from "../reducers/teaching-courses-reducer";
import courseReducer from "../reducers/course-reducer";

let reducers = combineReducers({
  courseGroupsPage: courseGroupsReducer,
  courseGroupPage: courseGroupReducer,
  coursePage: courseReducer,
  myCoursesPage: myCoursesReducer,
  teachingCoursesPage: teachingCoursesReducer,
  registrationPage: registrationReducer,
  loginPage: loginReducer,
  navbarElement: navbarReducer,
  profilePage: profileReducer,
});

let store = configureStore({ reducer: reducers }, applyMiddleware(thunk));
export default store;
