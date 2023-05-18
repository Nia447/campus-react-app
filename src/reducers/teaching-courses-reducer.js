import { courseGroupApi } from "../Api/courseGroupApi";

const LOAD_TEACHING_COURSES = "LOAD_MY_COURSES";
const LOADING_TEACHING_GROUP = "LOADING_MY_GROUP";

let initialState = {
  courses: [],
  isLoading: false,
};

const teachingCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEACHING_COURSES:
      console.log("LOAD_TEACHING_COURSES"); // TODO: delete later
      return {
        ...state,
        courses: action.courses,
      };
    case LOADING_TEACHING_GROUP:
      console.log("LOADING_TEACHING_GROUP"); // TODO: delete later
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export function loadTeachingCoursesActionCreator(courses) {
  return { type: LOAD_TEACHING_COURSES, courses };
}

export function loadingActionCreator(isLoading) {
  return { type: LOADING_TEACHING_GROUP, isLoading };
}

export function loadTeachingCoursesThunkCreator() {
  return (dispatch) => {
    dispatch(loadingActionCreator(true));
    courseGroupApi.getTeachingCourses().then((data) => {
      dispatch(loadTeachingCoursesActionCreator(data));
      dispatch(loadingActionCreator(false));
    });
  };
}

export default teachingCoursesReducer;
