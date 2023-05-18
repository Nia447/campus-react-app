import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";

function StudentItem(props) {
  return (
    <ListGroup.Item variant="light" className="no-padding">
      <Container className="my-1" key={props.id}>
        <Row className="align-items-center">
          <Col>
            <Row className="font-weight-bold justify-content-start">
              <Col>{props.value.name}</Col>
            </Row>
            <Row className="justify-content-start">
              <Col md="auto">{"Статус -"}</Col>
              <Col
                md={
                  "auto " +
                  (props.value.status === "InQueue" ? "text-primary" : "") +
                  (props.value.status === "Accepted" ? "text-success" : "") +
                  (props.value.status === "Declined" ? "text-danger" : "")
                }
              >
                {(props.value.status === "InQueue" ? "в очереди" : "") +
                  (props.value.status === "Accepted" ? "принят в группу" : "") +
                  (props.value.status === "Declined" ? "отклонен" : "")}
              </Col>
            </Row>
            <Row className="text-muted my-1">
              <Col>{props.value.email}</Col>
            </Row>
          </Col>
          <Col>
            {props.value.status === "Accepted" &&
            (props.isTeacher ||
              props.isAdmin ||
              props.myEmail === props.value.email) ? (
              <Row className="justify-content-start">
                <Col
                  md="auto"
                  className="text-primary text-decoration-underline"
                  onClick={() => {
                    props.handleOnClickStudentMark("id", props.value.id);
                    props.handleOnClickStudentMark("name", props.value.name);
                    props.handleOnClickStudentMark("attestation", "Midterm");
                    props.handleOnChangeModeModalEditStudentMark();
                  }}
                >
                  Промежуточная аттестация
                </Col>
                <Col md="auto">{" - "}</Col>
                <Col md="auto">
                  <Badge
                    bg={
                      (props.value.midtermResult === "Passed"
                        ? "success"
                        : "") +
                      (props.value.midtermResult === "Failed" ? "danger" : "") +
                      (props.value.midtermResult === "NotDefined"
                        ? "secondary"
                        : "")
                    }
                  >
                    {(props.value.midtermResult === "Passed"
                      ? "успешно пройдена"
                      : "") +
                      (props.value.midtermResult === "Failed"
                        ? "зафейлена"
                        : "") +
                      (props.value.midtermResult === "NotDefined"
                        ? "отметки нет"
                        : "")}
                  </Badge>
                </Col>
              </Row>
            ) : null}
          </Col>
          <Col className="align-items-center">
            {props.value.status === "Accepted" &&
            (props.isTeacher ||
              props.isAdmin ||
              props.myEmail === props.value.email) ? (
              <Row className="justify-content-start">
                <Col
                  md="auto"
                  className="text-primary text-decoration-underline"
                  onClick={() => {
                    props.handleOnClickStudentMark("id", props.value.id);
                    props.handleOnClickStudentMark("name", props.value.name);
                    props.handleOnClickStudentMark("attestation", "Final");
                    props.handleOnChangeModeModalEditStudentMark();
                  }}
                >
                  Финальная аттестация
                </Col>
                <Col md="auto">{" - "}</Col>
                <Col md="auto">
                  <Badge
                    bg={
                      (props.value.finalResult === "Passed" ? "success" : "") +
                      (props.value.finalResult === "Failed" ? "danger" : "") +
                      (props.value.finalResult === "NotDefined"
                        ? "secondary"
                        : "")
                    }
                  >
                    {(props.value.finalResult === "Passed"
                      ? "успешно пройдена"
                      : "") +
                      (props.value.finalResult === "Failed"
                        ? "зафейлена"
                        : "") +
                      (props.value.finalResult === "NotDefined"
                        ? "отметки нет"
                        : "")}
                  </Badge>
                </Col>
              </Row>
            ) : props.value.status === "InQueue" &&
              (props.isTeacher || props.isAdmin) ? (
              <Row className="justify-content-end">
                <Col md="auto">
                  <Button
                    onClick={() => {
                      props.handleOnClickAcceptStudent(props.value.id);
                    }}
                  >
                    Принять
                  </Button>
                </Col>
                <Col md="auto" className="mx-3">
                  <Button
                    onClick={() => {
                      props.handleOnClickDeclineStudent(props.value.id);
                    }}
                  >
                    Отклонить
                  </Button>
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

export default StudentItem;
