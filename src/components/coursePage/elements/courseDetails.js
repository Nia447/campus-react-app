import { Button, Col, ListGroup, Placeholder, Row } from "react-bootstrap";

function CourseDetails(props) {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Row className="align-items-center mx-1">
          <Col>
            <Row className="font-weight-bold">Статус курса</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={4}
                  animation="glow"
                >
                  <Placeholder xs={3} />
                </Placeholder>
              </Row>
            ) : (
              <Row
                className={
                  "small font-weight-bold " +
                  (props.course.status === "OpenForAssigning"
                    ? " text-success"
                    : "") +
                  (props.course.status === "Started" ? " text-primary" : "") +
                  (props.course.status === "Finished" ? " text-danger" : "") +
                  (props.course.status === "Created" ? " text-muted" : "")
                }
              >
                {(props.course.status === "OpenForAssigning"
                  ? "Открыт для записи"
                  : "") +
                  (props.course.status === "Started"
                    ? "В процессе обучения"
                    : "") +
                  (props.course.status === "Finished" ? "Закрыт" : "") +
                  (props.course.status === "Created" ? "Создан" : "")}
              </Row>
            )}
          </Col>
          <Col md="auto">
            <Button
              className={
                "my-2 " +
                (props.course.status !== "Finished" &&
                (props.isTeacherInCourse || props.isAdmin)
                  ? ""
                  : "d-none")
              }
              variant="primary"
              onClick={props.handleOnChangeModeModalEditCourseStatus}
            >
              Изменить
            </Button>
            <Button
              className={
                "my-2 mx-1 " +
                (!props.isInCourse &&
                !props.isMyCourse &&
                props.course.status === "OpenForAssigning"
                  ? ""
                  : "d-none")
              }
              variant="primary"
              onClick={props.handleOnEnrollCourse}
            >
              Записаться на курс
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row className="mx-1">
          <Col>
            <Row className="font-weight-bold">Учебный год</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={6}
                  animation="glow"
                >
                  <Placeholder xs={5} />
                </Placeholder>
              </Row>
            ) : (
              <Row>
                {props.course.semester === "Spring"
                  ? (parseInt(props.course.year) - 1).toString() +
                    "-" +
                    props.course.year
                  : props.course.year +
                    "-" +
                    (parseInt(props.course.year) + 1).toString()}
              </Row>
            )}
          </Col>
          <Col>
            <Row className="font-weight-bold">Семестр</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={6}
                  animation="glow"
                >
                  <Placeholder xs={5} />
                </Placeholder>
              </Row>
            ) : (
              <Row>
                {props.course.semester === "Spring" ? "Весенний" : "Осенний"}
              </Row>
            )}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row className="mx-1">
          <Col>
            <Row className="font-weight-bold">Всего мест</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={6}
                  animation="glow"
                >
                  <Placeholder xs={2} />
                </Placeholder>
              </Row>
            ) : (
              <Row>{props.course.totalNumberOfSeats}</Row>
            )}
          </Col>
          <Col>
            <Row className="font-weight-bold">Студентов зачислено</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={6}
                  animation="glow"
                >
                  <Placeholder xs={2} />
                </Placeholder>
              </Row>
            ) : (
            <Row>{props.course.studentsEnrolledCount}</Row>)}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row className="mx-1">
          <Row className="font-weight-bold">Заявок на рассмотрении</Row>
            {props.isLoading ? (
              <Row>
                <Placeholder
                  className="px-0 mb-0"
                  as="p"
                  xs={6}
                  animation="glow"
                >
                  <Placeholder xs={1} />
                </Placeholder>
              </Row>
            ) : (
          <Row>{props.course.studentsInQueueCount}</Row>)}
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default CourseDetails;
