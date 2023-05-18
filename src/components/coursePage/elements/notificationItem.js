import { Alert, ListGroup } from "react-bootstrap";

function NotificationItem(props) {
  return (
    <ListGroup.Item variant="light" className="no-padding">
      <Alert className="my-alert my-0" key={props.id} variant={props.value.isImportant ? "danger" : "light"}>
        {props.value.text}
      </Alert>
    </ListGroup.Item>
  );
}

export default NotificationItem;
