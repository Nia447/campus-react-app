import { Button, Form, Modal } from "react-bootstrap";
import { RichTextEditor } from "../../richTextEditor/richTextEditor";

function CreateNotificationModal(props) {
  return (
    <Modal
      show={props.modeCreateNotification}
      onHide={props.handleOnChangeModeModalCreateNotification}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание уведомления</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              name="text"
              value={props.notification.text}
              onChange={props.handleOnChangeNotification}
              isInvalid={props.errors.text}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.text}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <div>
              <Form.Check
                inline
                label="Важное"
                name="isImportant"
                type="radio"
                value={true}
                id={`important`}
                onClick={props.handleOnChangeNotification}
                isInvalid={props.errors.isImportant}
              />
              <Form.Check
                inline
                label="Обычное"
                name="isImportant"
                type="radio"
                value={false}
                id={`common`}
                onClick={props.handleOnChangeNotification}
                isInvalid={props.errors.isImportant}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalCreateNotification}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnCreateNotification}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateNotificationModal;
