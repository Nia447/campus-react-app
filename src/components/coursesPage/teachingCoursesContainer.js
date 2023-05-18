import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadingActionCreator,
  loadTeachingCoursesActionCreator,
  loadTeachingCoursesThunkCreator,
} from "../../reducers/teaching-courses-reducer";
import Courses from "./courses";

function MiddleTeachingGroupComponent({ loadTeachingCoursesThunkCreator, ...props }) {
  const navigate = useNavigate();

  useEffect(() => {
    loadTeachingCoursesThunkCreator();
  }, [loadTeachingCoursesThunkCreator]);

  const handleOnClickCourse = (idCourse) => {
    navigate(`/courses/${idCourse}`);
  };

  return (
    <Courses
      {...props}
      titleName="Преподаваемые курсы"
      handleOnClickCourse={handleOnClickCourse}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    courses: state.teachingCoursesPage.courses,
    isLoading: state.teachingCoursesPage.isLoading,
  };
};

const TeachingCoursesContainer = connect(mapStateToProps, {
  loadingActionCreator,
  loadTeachingCoursesActionCreator,
  loadTeachingCoursesThunkCreator,
})(MiddleTeachingGroupComponent);

export default TeachingCoursesContainer;
