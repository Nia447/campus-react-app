import { connect } from "react-redux";
import NavbarCourse from "./navbar";
import { useNavigate } from "react-router-dom";
import {
  logoutThunkCreator,
  loadRolesThunkCreator,
} from "../../reducers/navbar-reducer";
import { useEffect } from "react";

function MiddleNavbarComponent({ loadRolesThunkCreator, ...props }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.authorized === true) {
      loadRolesThunkCreator();
    }
  }, [loadRolesThunkCreator, props.authorized]);

  const handleOnClickLogout = () => {
    props.logoutThunkCreator();
    navigate("/login");
  };

  const handleOnClickNavLink = (url) => {
    navigate(`${url}`);
  };

  return (
    <NavbarCourse
      {...props}
      handleOnClickLogout={handleOnClickLogout}
      handleOnClickNavLink={handleOnClickNavLink}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    authorized: state.profilePage.authorized,
    isAdmin: state.profilePage.isAdmin,
    isStudent: state.profilePage.isStudent,
    isTeacher: state.profilePage.isTeacher,
    email: state.profilePage.email,
  };
};

const NavbarContainer = connect(mapStateToProps, {
  logoutThunkCreator,
  loadRolesThunkCreator,
})(MiddleNavbarComponent);

export default NavbarContainer;
