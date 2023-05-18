import { Button, ListGroup, Tab, Tabs } from "react-bootstrap";
import TeacherItem from "./teacherItem";
import StudentItem from "./studentItem";

function CoursePeople(props) {
  return (
    <Tabs defaultActiveKey="teachers" id="tab" fill>
      <Tab eventKey="teachers" title="Преподаватели">
        <Button
          className={"my-2 mx-1 " + (props.isMain || props.isAdmin ? "" : "d-none")}
          variant="primary"
          onClick={props.handleOnChangeModeModalAddTeacher}
        >
          Добавить преподавателя
        </Button>
        <ListGroup variant="flush" className="my-3">
          {props.teachers.map((value, index) => {
            return (
              <TeacherItem
                value={value}
                key={index}
                id={index}
                {...props}
              />
            );
          })}
        </ListGroup>
      </Tab>
      <Tab eventKey="students" title="Студенты">
      <ListGroup variant="flush" className="my-3">
          {props.students.map((value, index) => {
            return (
              <StudentItem
                value={value}
                key={index}
                id={index}
                {...props}
              />
            );
          })}
        </ListGroup>
      </Tab>
    </Tabs>
  );
}

export default CoursePeople;
