import { Button, Form, Modal } from "react-bootstrap";
import { RichTextEditor } from "../../richTextEditor/richTextEditor";

function CreateCourseModal(props) {
  return (
    <Modal
      show={props.modeCreateCourse}
      onHide={props.handleOnChangeModeModalCreateCourse}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название курса</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={props.createCourse.name}
              onChange={props.handleOnChange}
              isInvalid={props.errors.name}
              placeholder="Введите название группы"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Год начала курса</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={props.createCourse.year}
              onChange={props.handleOnChange}
              isInvalid={props.errors.year}
              placeholder="Введите год начала курса"
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.year}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Общее количество мест</Form.Label>
            <Form.Control
              type="number"
              name="totalNumberOfSeats"
              value={props.createCourse.totalNumberOfSeats}
              onChange={props.handleOnChange}
              isInvalid={props.errors.totalNumberOfSeats}
              placeholder="Введите общее количество мест"
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.totalNumberOfSeats}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Семестр</Form.Label>
            <div>
              <Form.Check
                inline
                label="Осенний"
                name="semester"
                type="radio"
                value="Autumn"
                id={`autumn`}
                onClick={props.handleOnChange}
                isInvalid={props.errors.semester}
              />
              <Form.Check
                inline
                label="Весенний"
                name="semester"
                type="radio"
                value="Spring"
                id={`spring`}
                onClick={props.handleOnChange}
                isInvalid={props.errors.semester}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Требования</Form.Label>
            <RichTextEditor
              nameTextArea="requirements"
              valueTextArea={props.createCourse.requirements}
              {...props}
            ></RichTextEditor>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Аннотация</Form.Label>
            <RichTextEditor
              nameTextArea="annotations"
              valueTextArea={props.createCourse.annotations}
              {...props}
            ></RichTextEditor>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Основной преподаватель курса</Form.Label>
            <Form.Select onChange={props.handleOnClickTeacher}>
              {props.teachers.map((value) => {
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
          onClick={props.handleOnChangeModeModalCreateCourse}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={props.handleOnCreateCourse}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCourseModal;
