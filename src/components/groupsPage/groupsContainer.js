import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Groups from "./groups";
import {
  loadCourseGroupsThunkCreator,
  loadCourseGroupsActionCreator,
  setNameGroupActionCreator,
  setIdGroupActionCreator,
  changeModeModalCreateGroupActionCreator,
  changeModeModalEditGroupActionCreator,
  loadingActionCreator,
  createCourseGroupThunkCreator,
  editCourseGroupThunkCreator,
  deleteCourseGroupThunkCreator,
} from "../../reducers/course-groups-reducer";
import { baseUrlLocalHost } from "../../Api/accountApi";
import validate from "./validation/validator";
import { useNavigate } from "react-router-dom";

function MiddleGroupsComponent({ loadCourseGroupsThunkCreator,  refreshProps, ...props }) {
  const navigate = useNavigate();

  useEffect(() => {
    loadCourseGroupsThunkCreator();
  }, [loadCourseGroupsThunkCreator]);

  const [errors, setErrors] = useState({})

  const handleOnChange = (e) => {
    props.setNameGroupActionCreator(e.target.name, e.target.value);
  }

  const handleOnCreateGroup = () => {
    const errors = validate(props.createNameGroup);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.createCourseGroupThunkCreator(props.createNameGroup);
    }
  }

  const handleOnEditGroup = () => {
    const errors = validate(props.editNameGroup);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.editCourseGroupThunkCreator(props.editNameGroup, props.idGroup);
    }
  }

  const handleOnDeleteGroup = (id) => {
    props.deleteCourseGroupThunkCreator(id);
  }

  const handleOnChangeModeModalCreateGroup = () => {
    props.changeModeModalCreateGroupActionCreator(props.modeCreateGroup);
  };

  const handleOnChangeModeModalEditGroup = (idGroup) => {
    props.setIdGroupActionCreator(idGroup);
    props.changeModeModalEditGroupActionCreator(props.modeEditGroup);
  };

  const handleOnClickGroup = (id) => {
    navigate(`/groups/${id}`);
  }

  return (
    <Groups
      {...props}
      handleOnChange={handleOnChange}
      handleOnChangeModeModalCreateGroup={handleOnChangeModeModalCreateGroup}
      handleOnChangeModeModalEditGroup={handleOnChangeModeModalEditGroup}
      handleOnCreateGroup={handleOnCreateGroup}
      handleOnEditGroup={handleOnEditGroup}
      handleOnDeleteGroup={handleOnDeleteGroup}
      handleOnClickGroup={handleOnClickGroup}
      errors={errors}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    courseGroups: state.courseGroupsPage.courseGroups,
    createNameGroup: state.courseGroupsPage.createNameGroup,
    modeCreateGroup: state.courseGroupsPage.modeCreateGroup,
    editNameGroup: state.courseGroupsPage.editNameGroup,
    modeEditGroup: state.courseGroupsPage.modeEditGroup,
    idGroup: state.courseGroupsPage.idGroup,
    isLoading: state.courseGroupsPage.isLoading,
    isAdmin: state.profilePage.isAdmin,
    isStudent: state.profilePage.isStudent,
    isTeacher: state.profilePage.isTeacher,
  };
};

const GroupsContainer = connect(mapStateToProps, {
  loadCourseGroupsThunkCreator,
  loadCourseGroupsActionCreator,
  setNameGroupActionCreator,
  setIdGroupActionCreator,
  changeModeModalCreateGroupActionCreator,
  changeModeModalEditGroupActionCreator,
  loadingActionCreator,
  createCourseGroupThunkCreator,
  editCourseGroupThunkCreator,
  deleteCourseGroupThunkCreator,
})(MiddleGroupsComponent);

export default GroupsContainer;
