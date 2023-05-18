import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Profile from "./profile";
import {
  setEditProfileActionCreator,
  changeModeProfileActionCreator,
  setProfileActionCreator,
  editProfileActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  getProfileThunkCreator,
  editProfileThunkCreator,
} from "../../reducers/profile-reducer";
import validate from "./validation/validator";

function MiddleProfileComponent({ getProfileThunkCreator, ...props }) {
  useEffect(() => {
    getProfileThunkCreator();
  }, [getProfileThunkCreator]);

  const [errors, setErrors] = useState({})

  const handleOnChangeEditMode = () => {
    props.changeModeProfileActionCreator(props.editMode);
    setErrors({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const errors = validate(props.editProfile)
    setErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      props.editProfileThunkCreator(props.editProfile);
    }
  };

  const handleOnChange = (e) => {
    props.setEditProfileActionCreator(e.target.name, e.target.value);
  };

  return (
    <Profile
      {...props}
      handleOnChangeEditMode={handleOnChangeEditMode}
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleOnChange}
      errors={errors}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    editProfile: state.profilePage.editProfile,
    editMode: state.profilePage.editMode,
    isLoading: state.profilePage.isLoading,
    numberResponse: state.profilePage.numberResponse,
    textResponse: state.profilePage.textResponse,
  };
};

const ProfileContainer = connect(mapStateToProps, {
  setEditProfileActionCreator,
  changeModeProfileActionCreator,
  setProfileActionCreator,
  editProfileActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  getProfileThunkCreator,
  editProfileThunkCreator,
})(MiddleProfileComponent);

export default ProfileContainer;
