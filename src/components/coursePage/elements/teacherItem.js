import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";

function TeacherItem(props) {
  return (
    <ListGroup.Item variant="light" className="no-padding">
      <Container className="my-0" key={props.id}>
        <Row className="font-weight-bold justify-content-start">
          <Col md="auto">{props.value.name}</Col>
          <Col md="auto" className={props.value.isMain ? "" : "d-none"}>
            <Badge bg="primary">Основной</Badge>{" "}
          </Col>
        </Row>
        <Row className="text-muted my-1">
          <Col>{props.value.email}</Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

export default TeacherItem;
