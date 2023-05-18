import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import Loading from "../loading";
import CourseItem from "../groupPage/courseItem";

function Courses(props) {
  return (
    <Container className="my-3">
      <h1>{props.titleName}</h1>
      <ListGroup className="my-3">
        {props.isLoading ? <Loading/> : null}
        {props.courses.map((value) => {
          return <CourseItem value={value} key={value.id} id={value.id} {...props} />;
        })}
      </ListGroup>
    </Container>
  );
}

export default Courses;
