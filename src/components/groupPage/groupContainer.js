import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Group from "./group";
import {
  loadCoursesActionCreator,
  loadTeachersActionCreator,
  setParamsCourseActionCreator,
  setIdTeacherActionCreator,
  changeModeModalCreateCourseActionCreator,
  loadingActionCreator,
  loadCoursesThunkCreator,
  loadTeachersThunkCreator,
  createCourseThunkCreator,
  getGroupDetailsThunkCreator
} from "../../reducers/course-group-reducer";
import { baseUrl } from "../../Api/accountApi";
import validate from "./validation/validator";

function MiddleGroupComponent({ loadCoursesThunkCreator, getGroupDetailsThunkCreator, ...props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getGroupDetailsThunkCreator(id);
    loadCoursesThunkCreator(id);
  }, [loadCoursesThunkCreator, getGroupDetailsThunkCreator, id]);

  const handleOnClickTeacher = (e) => {
    const select = e.target;
    const option = select.options[select.selectedIndex];
    props.setIdTeacherActionCreator(option.id);
  }

  const handleOnChange = (e) => {
    props.setParamsCourseActionCreator(e.target.name, e.target.value);
  };

  const handleOnChangeTextArea = (name, value) => {
    props.setParamsCourseActionCreator(name, value);
  }

  const handleOnCreateCourse = () => {
    const errors = validate(props.createCourse);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.createCourseThunkCreator(props.createCourse, id, props.idTeacher);
    }
  };

  const handleOnChangeModeModalCreateCourse = () => {
    props.changeModeModalCreateCourseActionCreator(props.modeCreateCourse);
    if (!props.modeCreateCourse) {
      props.loadTeachersThunkCreator();
    }
  };

  const handleOnClickCourse = (idCourse) => {
    navigate(`/courses/${idCourse}`);
  }

  return (
    <Group
      {...props}
      handleOnChange={handleOnChange}
      handleOnChangeModeModalCreateCourse={handleOnChangeModeModalCreateCourse}
      handleOnCreateCourse={handleOnCreateCourse}
      handleOnClickCourse={handleOnClickCourse}
      handleOnChangeTextArea={handleOnChangeTextArea}
      handleOnClickTeacher={handleOnClickTeacher}
      errors={errors}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    nameGroup: state.courseGroupPage.nameGroup,
    courses: state.courseGroupPage.courses,
    teachers: state.courseGroupPage.teachers,
    createCourse: state.courseGroupPage.createCourse,
    modeCreateCourse: state.courseGroupPage.modeCreateCourse,
    idTeacher: state.courseGroupPage.idTeacher,
    isLoading: state.courseGroupPage.isLoading,
    isAdmin: state.profilePage.isAdmin,
    isStudent: state.profilePage.isStudent,
    isTeacher: state.profilePage.isTeacher,
  };
};

const GroupContainer = connect(mapStateToProps, {
  loadCoursesActionCreator,
  loadTeachersActionCreator,
  setParamsCourseActionCreator,
  setIdTeacherActionCreator,
  changeModeModalCreateCourseActionCreator,
  loadingActionCreator,
  loadCoursesThunkCreator,
  loadTeachersThunkCreator,
  createCourseThunkCreator,
  getGroupDetailsThunkCreator,
})(MiddleGroupComponent);

export default GroupContainer;
