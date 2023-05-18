import { Button, Form, Modal } from "react-bootstrap";
import { RichTextEditor } from "../../richTextEditor/richTextEditor";

function EditCourseModal(props) {
  return (
    <Modal
      show={props.modeEditCourse}
      onHide={props.handleOnChangeModeModalEditCourse}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Редактирование курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Требования</Form.Label>
            <RichTextEditor
              nameTextArea="requirements"
              valueTextArea={props.editCourse.requirements}
              {...props}
            ></RichTextEditor>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Аннотация</Form.Label>
            <RichTextEditor
              nameTextArea="annotations"
              valueTextArea={props.editCourse.annotations}
              {...props}
            ></RichTextEditor>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalEditCourse}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnEditCourse}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCourseModal;
