import { connect } from "react-redux";
import Registration from "./registration";
import {
  setRegistrationActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  registrationThunkCreator,
} from "../../reducers/registration-reducer";
import validate from "./validation/validator";
import { useState } from "react";

function MiddleRegistrationComponent({ ...props }) {
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    props.setRegistrationActionCreator(e.target.name, e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const errors = validate(props.registration)
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.registrationThunkCreator(props.registration);
    }
  };

  return (
    <Registration
      {...props}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      errors={errors}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    registration: state.registrationPage.registration,
    isLoading: state.registrationPage.isLoading,
    numberResponse: state.registrationPage.numberResponse,
    textResponse: state.registrationPage.textResponse,
  };
};

const RegistrationContainer = connect(mapStateToProps, {
  setRegistrationActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  registrationThunkCreator,
})(MiddleRegistrationComponent);

export default RegistrationContainer;
