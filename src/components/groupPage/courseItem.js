import { Col, ListGroup, Row } from "react-bootstrap";

function CourseItem(props) {
  return (
    <ListGroup.Item
      action
      variant="light"
      onClick={() => {
        props.handleOnClickCourse(props.id);
      }}
    >
      <Row className="align-items-center">
        <Col>
          <h4 className="text-dark">{props.value.name}</h4>
        </Col>
        <Col md="auto" className="mx-3">
          <p
            className={
              "small font-weight-bold " +
              (props.value.status === "OpenForAssigning" ? " text-success" : "") +
              (props.value.status === "Started" ? " text-primary" : "") +
              (props.value.status === "Finished" ? " text-danger" : "") +
              (props.value.status === "Created" ? " text-muted" : "")
            }
          >
            {(props.value.status === "OpenForAssigning" ? "Открыт для записи" : "") +
              (props.value.status === "Started" ? "В процессе обучения" : "") +
              (props.value.status === "Finished" ? "Закрыт" : "") +
              (props.value.status === "Created" ? "Создан" : "")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginBottom: "0" }}>
            {"Учебный год - " +
              (props.value.semester === "Spring"
                ? (parseInt(props.value.startYear) - 1).toString() +
                  "-" +
                  props.value.startYear
                : props.value.startYear +
                  "-" +
                  (parseInt(props.value.startYear) + 1).toString())}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginBottom: "4px" }}>
            {"Семестр - " +
              (props.value.semester === "Spring" ? "Весенний" : "Осенний")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginBottom: "2px" }} className="text-muted small">
            {"Мест всего - " + props.value.maximumStudentsCount}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginBottom: "2px" }} className="text-muted small">
            {"Мест свободно - " + props.value.remainingSlotsCount}
          </p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CourseItem;
