import { Button, Form, Modal } from "react-bootstrap";

function EditCourseStatusModal(props) {
  return (
    <Modal
      show={props.modeEditCourseStatus}
      onHide={props.handleOnChangeModeModalEditCourseStatus}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Изменение статуса курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <div>
              <Form.Check
                inline
                label="Открыт для записи"
                name="status"
                type="radio"
                value="OpenForAssigning"
                id={`OpenForAssigning`}
                onClick={props.handleOnChangeEditParam}
                isInvalid={props.errors.status}
                className={props.course.status === "Created" ? "" : "d-none"}
              />
              <Form.Check
                inline
                label="В процессе"
                name="status"
                type="radio"
                value="Started"
                id={`Started`}
                onClick={props.handleOnChangeEditParam}
                isInvalid={props.errors.status}
                className={
                  props.course.status === "Created" ||
                  props.course.status === "OpenForAssigning"
                    ? ""
                    : "d-none"
                }
              />
              <Form.Check
                inline
                label="Завершен"
                name="status"
                type="radio"
                value="Finished"
                id={`Finished`}
                onClick={props.handleOnChangeEditParam}
                isInvalid={props.errors.status}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalEditCourseStatus}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnEditCourseStatus}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCourseStatusModal;
