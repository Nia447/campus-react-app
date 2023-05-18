import React from "react";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import Loading from "../loading";
import CourseDetails from "./elements/courseDetails";
import EditCourseModal from "./modals/editCourseModal";
import CourseSpecialty from "./elements/courseSpecialty";
import EditCourseStatusModal from "./modals/editCourseStatusModal";
import CreateNotificationModal from "./modals/createNotificationModal";
import CoursePeople from "./elements/coursePeople";
import AddTeacherModal from "./modals/addTeacherModal";
import EditStudentMarkModal from "./modals/editStudentMarkModal";

function Course(props) {
  return (
    <Container className="my-3 pr-0">
      {props.isLoading ? <Loading /> : null}
      <Row>
        <Col>
          {props.isLoading ? (
            <Placeholder as="p" xs={12} animation="glow">
              <Placeholder className="mt-3" size="lg" xs={6} />
            </Placeholder>
          ) : (
            <h1>{props.course.name}</h1>
          )}
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col className="font-weight-bold">Основные данные курса</Col>
        <Col md="auto">
          <Button
            className={"my-2 mx-1 " + (props.isTeacherInCourse || props.isAdmin ? "" : "d-none")}
            variant="primary"
            onClick={props.handleOnChangeModeModalEditCourse}
          >
            Редактировать
          </Button>
          <Button
            className={"my-2 mx-1 " + (props.isMain || props.isAdmin ? "" : "d-none")}
            variant="primary"
            onClick={props.handleOnDeleteCourse}
          >
            Удалить
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <CourseDetails {...props}></CourseDetails>
      </Row>
      <Row className="mb-3">
        <CourseSpecialty {...props}></CourseSpecialty>
      </Row>
      <Row className="mb-3">
        <CoursePeople {...props}></CoursePeople>
      </Row>
      {/* <ListGroup className="my-3">
        {props.courses.map((value) => {
          return <CourseItem value={value} key={value.id} id={value.id} {...props} />;
        })}
      </ListGroup> */}
      <EditCourseModal {...props}></EditCourseModal>
      <EditCourseStatusModal {...props}></EditCourseStatusModal>
      <CreateNotificationModal {...props}></CreateNotificationModal>
      <AddTeacherModal {...props}></AddTeacherModal>
      <EditStudentMarkModal {...props}></EditStudentMarkModal>
    </Container>
  );
}

export default Course;
