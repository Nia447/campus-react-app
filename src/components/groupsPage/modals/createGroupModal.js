import { Button, Form, Modal } from "react-bootstrap";

function CreateGroupModal(props) {
  return (
    <Modal
      show={props.modeCreateGroup}
      onHide={props.handleOnChangeModeModalCreateGroup}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              type="text"
              name="createNameGroup"
              value={props.createNameGroup}
              onChange={props.handleOnChange}
              isInvalid={props.errors.nameGroup}
              placeholder="Введите название группы"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
                {props.errors.nameGroup}
              </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalCreateGroup}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnCreateGroup}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateGroupModal;
