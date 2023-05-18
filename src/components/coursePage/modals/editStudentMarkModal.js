import { Button, Form, Modal } from "react-bootstrap";

function EditStudentMarkModal(props) {
  return (
    <Modal
      show={props.modeEditStudentMark}
      onHide={props.handleOnChangeModeModalEditStudentMark}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {"Изменение отметки для " +
            (props.student.attestation === "Midterm"
              ? "Промежуточная аттестация"
              : "") +
            (props.student.attestation === "Final"
              ? "Финальная аттестация"
              : "")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{"Студент - " + props.student.name}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <div>
              <Form.Check
                inline
                label="Пройдено"
                name="status"
                type="radio"
                value="Passed"
                id={`Passed`}
                onClick={props.handleOnChangeStudentMark}
                isInvalid={props.errors.status}
              />
              <Form.Check
                inline
                label="Зафейлено"
                name="status"
                type="radio"
                value="Failed"
                id={`Failed`}
                onClick={props.handleOnChangeStudentMark}
                isInvalid={props.errors.status}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalEditStudentMark}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnEditStudentMark}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditStudentMarkModal;
