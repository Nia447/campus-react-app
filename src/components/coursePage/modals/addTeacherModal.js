import { Button, Form, Modal } from "react-bootstrap";

function AddTeacherModal(props) {
  return (
    <Modal
      show={props.modeAddTeacher}
      onHide={props.handleOnChangeModeModalAddTeacher}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавление преподавателя на курс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Выберите преподавателя</Form.Label>
            <Form.Select onChange={props.handleOnClickTeacher}>
              {props.possibleTeachers.map((value) => {
                return (
                  <option value={value} key={value.id} id={value.id}>
                    {value.fullName}
                  </option>
                );
              })} 
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleOnChangeModeModalAddTeacher}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnAddTeacher}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTeacherModal;
