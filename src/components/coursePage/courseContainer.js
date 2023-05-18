import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Course from "./course";
import {
  loadCourseInfoActionCreator,
  loadTeachersToAddInCourseActionCreator,
  setParamsEditCourseActionCreator,
  setNotificationParamsActionCreator,
  setIdTeacherCourseActionCreator,
  setEditParamsActionCreator,
  setParamsStudentMarkActionCreator,
  enrollCourseActionCreator,
  changeModeModalEditCourseActionCreator,
  changeModeModalEditCourseStatusActionCreator,
  changeModeModalAddTeacherActionCreator,
  changeModeModalCreateNotificationActionCreator,
  changeModeModalEditStudentMarkActionCreator,
  loadingActionCreator,
  loadCourseInfoThunkCreator,
  loadTeachersToAddInCourseThunkCreator,
  checkIsInCourseThunkCreator,
  editCourseThunkCreator,
  editCourseStatusThunkCreator,
  deleteCourseThunkCreator,
  enrollCourseThunkCreator,
  addTeacherThunkCreator,
  createNotificationThunkCreator,
  editStudentMarkThunkCreator,
  editStudentStatusThunkCreator,
} from "../../reducers/course-reducer";
import validate from "./validation/validator";

function MiddleCourseComponent({ loadCourseInfoThunkCreator, loadTeachersToAddInCourseThunkCreator, checkIsInCourseThunkCreator, ...props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCourseInfoThunkCreator(id);
    checkIsInCourseThunkCreator(id);
    if (props.isTeacherInCourse || props.isAdmin) {
      loadTeachersToAddInCourseThunkCreator();
    }
  }, [loadCourseInfoThunkCreator, checkIsInCourseThunkCreator, loadTeachersToAddInCourseThunkCreator, id]);

  const handleOnClickTeacher = (e) => {
    const select = e.target;
    const option = select.options[select.selectedIndex];
    props.setIdTeacherCourseActionCreator(option.id);
  };

  const handleOnChangeTextArea = (name, value) => {
    props.setParamsEditCourseActionCreator(name, value);
  }

  const handleOnChangeEditParam = (e) => {
    props.setEditParamsActionCreator(e.target.name, e.target.value);
  };

  const handleOnChangeNotification = (e) => {
    props.setNotificationParamsActionCreator(e.target.name, e.target.value);
  };

  const handleOnChangeStudentMark = (e) => {
    props.setParamsStudentMarkActionCreator(e.target.name, e.target.value);
  };

  const handleOnClickStudentMark = (name, value) => {
    props.setParamsStudentMarkActionCreator(name, value);
  }

  const handleOnClickAcceptStudent = (idStudent) => {
    props.editStudentStatusThunkCreator("Accepted", idStudent, id)
  }

  const handleOnClickDeclineStudent = (idStudent) => {
    props.editStudentStatusThunkCreator("Declined", idStudent, id)
  }

  const handleOnEditCourse = () => {
    props.editCourseThunkCreator(props.editCourse, id);
  };

  const handleOnDeleteCourse = () => {
    props.deleteCourseThunkCreator(id)
    navigate(-2);
  }

  const handleOnEnrollCourse = () => {
    props.enrollCourseThunkCreator(id)
  }

  const handleOnEditCourseStatus = () => {
    const errors = validate(props.status, "status");
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.editCourseStatusThunkCreator(props.status, id);
    }
  };

  const handleOnAddTeacher = () => {
    props.addTeacherThunkCreator(props.idTeacher, id);
  };

  const handleOnCreateNotification = () => {
    const errors = validate(props.notification, "notification");
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.createNotificationThunkCreator(props.notification, id);
    }
  }

  const handleOnEditStudentMark = () => {
    const errors = validate(props.student.status, "status");
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.editStudentMarkThunkCreator(props.student, id);
    }
  }

  const handleOnChangeModeModalEditCourse = () => {
    props.changeModeModalEditCourseActionCreator(props.modeEditCourse);
  }

  const handleOnChangeModeModalEditCourseStatus = () => {
    props.changeModeModalEditCourseStatusActionCreator(props.modeEditCourseStatus);
  }
  const handleOnChangeModeModalAddTeacher = () => {
    props.changeModeModalAddTeacherActionCreator(props.modeAddTeacher);
  }
  const handleOnChangeModeModalCreateNotification = () => {
    props.changeModeModalCreateNotificationActionCreator(props.modeCreateNotification);
  }
  const handleOnChangeModeModalEditStudentMark = () => {
    props.changeModeModalEditStudentMarkActionCreator(props.modeEditStudentMark);
  }

  return (
    <Course
      {...props}
      handleOnClickTeacher = {handleOnClickTeacher}
      handleOnChangeTextArea = {handleOnChangeTextArea}
      handleOnChangeEditParam = {handleOnChangeEditParam}
      handleOnChangeNotification = {handleOnChangeNotification}
      handleOnChangeStudentMark = {handleOnChangeStudentMark}
      handleOnClickStudentMark = {handleOnClickStudentMark}
      handleOnClickAcceptStudent={handleOnClickAcceptStudent}
      handleOnClickDeclineStudent={handleOnClickDeclineStudent}
      handleOnEditCourse = {handleOnEditCourse}
      handleOnDeleteCourse = {handleOnDeleteCourse}
      handleOnEnrollCourse = {handleOnEnrollCourse}
      handleOnEditCourseStatus = {handleOnEditCourseStatus}
      handleOnAddTeacher = {handleOnAddTeacher}
      handleOnCreateNotification = {handleOnCreateNotification}
      handleOnEditStudentMark = {handleOnEditStudentMark}
      handleOnChangeModeModalEditCourse = {handleOnChangeModeModalEditCourse}
      handleOnChangeModeModalEditCourseStatus = {handleOnChangeModeModalEditCourseStatus}
      handleOnChangeModeModalAddTeacher = {handleOnChangeModeModalAddTeacher}
      handleOnChangeModeModalCreateNotification = {handleOnChangeModeModalCreateNotification}
      handleOnChangeModeModalEditStudentMark = {handleOnChangeModeModalEditStudentMark}
      errors={errors}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    course: state.coursePage.course,
    editCourse: state.coursePage.editCourse,
    teachers: state.coursePage.teachers,
    students: state.coursePage.students, 
    notifications: state.coursePage.notifications,
    possibleTeachers: state.coursePage.possibleTeachers,
    modeEditCourse: state.coursePage.modeEditCourse,
    modeEditCourseStatus: state.coursePage.modeEditCourseStatus,
    modeAddTeacher: state.coursePage.modeAddTeacher,
    modeCreateNotification: state.coursePage.modeCreateNotification,
    modeEditStudentMark: state.coursePage.modeEditStudentMark,
    student: state.coursePage.student,
    status: state.coursePage.status,
    notification: state.coursePage.notification,
    idTeacher: state.coursePage.idTeacher,
    isLoading: state.coursePage.isLoading,
    isInCourse:  state.coursePage.isInCourse,
    isMyCourse: state.coursePage.isMyCourse,
    isTeacherInCourse: state.coursePage.isTeacherInCourse,
    isMain:  state.coursePage.isMain,
    isAdmin: state.profilePage.isAdmin,
    isStudent: state.profilePage.isStudent,
    isTeacher: state.profilePage.isTeacher,
    myEmail: state.coursePage.myEmail
  };
};

const CourseContainer = connect(mapStateToProps, {
  loadCourseInfoActionCreator,
  loadTeachersToAddInCourseActionCreator,
  setParamsEditCourseActionCreator,
  setNotificationParamsActionCreator,
  setIdTeacherCourseActionCreator,
  setEditParamsActionCreator,
  setParamsStudentMarkActionCreator,
  enrollCourseActionCreator,
  changeModeModalEditCourseActionCreator,
  changeModeModalEditCourseStatusActionCreator,
  changeModeModalAddTeacherActionCreator,
  changeModeModalCreateNotificationActionCreator,
  changeModeModalEditStudentMarkActionCreator,
  loadingActionCreator,
  loadCourseInfoThunkCreator,
  loadTeachersToAddInCourseThunkCreator,
  checkIsInCourseThunkCreator,
  editCourseThunkCreator,
  deleteCourseThunkCreator,
  enrollCourseThunkCreator,
  editCourseStatusThunkCreator,
  addTeacherThunkCreator,
  createNotificationThunkCreator,
  editStudentMarkThunkCreator,
  editStudentStatusThunkCreator,
})(MiddleCourseComponent);

export default CourseContainer;
