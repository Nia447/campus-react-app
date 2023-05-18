import { courseGroupApi } from "../Api/courseGroupApi";

const LOAD_MY_COURSES = "LOAD_MY_COURSES";
const LOADING_MY_GROUP = "LOADING_MY_GROUP";

let initialState = {
  courses: [],
  isLoading: false,
};

const myCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_COURSES:
      console.log("LOAD_MY_COURSES"); // TODO: delete later
      return {
        ...state,
        courses: action.courses,
      };
    case LOADING_MY_GROUP:
      console.log("LOADING_MY_GROUP"); // TODO: delete later
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function loadMyCoursesActionCreator(courses) {
  return { type: LOAD_MY_COURSES, courses };
}

export function loadingActionCreator(isLoading) {
  return { type: LOADING_MY_GROUP, isLoading };
}

export function loadMyCoursesThunkCreator() {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    courseGroupApi.getMyCourses().then((data) => {
      dispatch(loadMyCoursesActionCreator(data));
      dispatch(loadingActionCreator(false));
    });
  };
}

export default myCoursesReducer;
