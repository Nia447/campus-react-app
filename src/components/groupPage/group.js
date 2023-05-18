import React from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Placeholder,
  Row,
} from "react-bootstrap";
import CreateCourseModal from "./modals/createCourseModal";
import Loading from "../loading";
import CourseItem from "./courseItem";

function Group(props) {
  return (
    <Container className="my-3">
      <Row>
        <Col md="auto">
          <h1>Группа - </h1>
        </Col>
        <Col>
          {props.isLoading ? (
            <Placeholder as="p" xs={12} animation="glow">
              <Placeholder className="mt-3 mx-2" size="lg" xs={4} />
            </Placeholder>
          ) : (
            <h1>{props.nameGroup}</h1>
          )}
        </Col>
      </Row>
      <Button
        className={"my-2 " + (props.isAdmin ? "" : "d-none")}
        variant="primary"
        onClick={props.handleOnChangeModeModalCreateCourse}
      >
        Создать курс
      </Button>
      <CreateCourseModal {...props}></CreateCourseModal>
      <ListGroup className="my-3">
        {props.isLoading ? <Loading /> : null}
        {props.courses.map((value) => {
          return (
            <CourseItem value={value} key={value.id} id={value.id} {...props} />
          );
        })}
      </ListGroup>
    </Container>
  );
}

export default Group;
