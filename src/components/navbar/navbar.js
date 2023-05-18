import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoTSU from "./../../logoTSU.svg";

function NavbarCourse(props) {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand className="mx-5" onClick={() => props.handleOnClickNavLink("/")}>
        <img
          alt=""
          src={logoTSU}
          width="40"
          height="40"
          className="d-inline-block"
        />{" "}
        TSU.Course 
      </Navbar.Brand> 
      <Nav className="">
        <Nav.Link className={(props.authorized ? "" : "d-none")} onClick={() => props.handleOnClickNavLink("/groups")}>Группы курсов</Nav.Link>
        <Nav.Link className={(props.isStudent ? "" : "d-none")} onClick={() => props.handleOnClickNavLink("/courses/my")}>Мои курсы</Nav.Link>
        <Nav.Link className={(props.isTeacher ? "" : "d-none")} onClick={() => props.handleOnClickNavLink("/courses/teaching")}>Преподаваемые курсы</Nav.Link>
      </Nav>
      <Nav className="ms-auto mx-5">
        <Nav.Link className={(props.authorized ? "" : "d-none")} onClick={() => props.handleOnClickNavLink("/profile")}>{props.email}</Nav.Link>
        <Nav.Link className={(props.authorized ? "" : "d-none")} onClick={() => props.handleOnClickLogout()}>Выход</Nav.Link>
        <Nav.Link className={(props.authorized ? "d-none" : "")} onClick={() => props.handleOnClickNavLink("/registration")}>Регистрация</Nav.Link>
        <Nav.Link className={(props.authorized ? "d-none" : "")} onClick={() => props.handleOnClickNavLink("/login")}>Вход</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarCourse;
