import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadingActionCreator,
  loadMyCoursesActionCreator,
  loadMyCoursesThunkCreator,
} from "../../reducers/my-courses-reducer";
import Courses from "./courses";

function MiddleMyGroupComponent({ loadMyCoursesThunkCreator, ...props }) {
  const navigate = useNavigate();

  useEffect(() => {
    loadMyCoursesThunkCreator();
  }, [loadMyCoursesThunkCreator]);

  const handleOnClickCourse = (idCourse) => {
    navigate(`/courses/${idCourse}`);
  };

  return (
    <Courses
      {...props}
      titleName="Мои курсы"
      handleOnClickCourse={handleOnClickCourse}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    courses: state.myCoursesPage.courses,
    isLoading: state.myCoursesPage.isLoading,
  };
};

const MyCoursesContainer = connect(mapStateToProps, {
  loadingActionCreator,
  loadMyCoursesActionCreator,
  loadMyCoursesThunkCreator,
})(MiddleMyGroupComponent);

export default MyCoursesContainer;
