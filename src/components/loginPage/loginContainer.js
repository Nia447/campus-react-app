import { connect } from "react-redux";
import Login from "./login";
import {
  setLoginActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  loginThunkCreator,
} from "../../reducers/login-reducer";

function MiddleLoginComponent({ refresh, ...props }) {
  const handleOnChange = (e) => {
    props.setLoginActionCreator(e.target.name, e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.loginThunkCreator(props.login);
  };

  return (
    <Login
      {...props}
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleOnChange}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    login: state.loginPage.login,
    isLoading: state.loginPage.isLoading,
    numberResponse: state.loginPage.numberResponse,
    textResponse: state.loginPage.textResponse,
  };
};

const LoginContainer = connect(mapStateToProps, {
  setLoginActionCreator,
  responseResultActionCreator,
  loadingActionCreator,
  loginThunkCreator,
})(MiddleLoginComponent);

export default LoginContainer;
