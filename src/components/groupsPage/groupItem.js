import { Col, ListGroup, Row } from "react-bootstrap";
import { Button } from "react-bootstrap/";

function GroupItem(props) {
  return (
    <ListGroup.Item
      action
      variant="light"
      onClick={() => {
        props.handleOnClickGroup(props.id);
      }}
    >
      <Row className="align-items-center">
        <Col>
          <span>{props.name}</span>
        </Col>
        <Col md="auto" className={props.isAdmin ? "" : "d-none"}>
          <Button
            className="mx-1"
            onClick={(e) => {
              e.stopPropagation();
              props.handleOnChangeModeModalEditGroup(props.id);
            }}
          >
            Изменить
          </Button>
          <Button
            className="mx-1"
            onClick={(e) => {
              e.stopPropagation();
              props.handleOnDeleteGroup(props.id);
            }}
          >
            Удалить
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default GroupItem;
