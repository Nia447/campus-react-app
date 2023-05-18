import { Button, Form, Modal } from "react-bootstrap";

function EditGroupModal(props) {
  return (
    <Modal
      show={props.modeEditGroup}
      onHide={props.handleOnChangeModeModalEditGroup}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Изменение группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              type="text"
              name="editNameGroup"
              value={props.editNameGroup}
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
          onClick={props.handleOnChangeModeModalEditGroup}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnEditGroup}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditGroupModal;
