import {
  Badge,
  Button,
  ListGroup,
  Placeholder,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { RichTextViewer } from "../../richTextEditor/richTextEditor";
import NotificationItem from "./notificationItem";

const NotificationTabTitle = ({ title, badgeContent }) => {
  return (
    <div>
      {title}
      {badgeContent !== 0 ? (
        <Badge className="mx-2" bg="primary">
          {badgeContent}
        </Badge>
      ) : null}
    </div>
  );
};

function CourseSpecialty(props) {
  return (
    <Tabs defaultActiveKey="requirements" id="tab" fill>
      <Tab eventKey="requirements" title="Требования к курсу">
        {props.isLoading ? (
          <Row>
            <Placeholder
              className="mx-4"
              as="p"
              size="lg"
              xs={12}
              animation="glow"
            >
              <Placeholder xs={8} />
            </Placeholder>
          </Row>
        ) : (
          <RichTextViewer
            {...props}
            nameTextArea="requirements"
            valueTextArea={props.course.requirements}
          ></RichTextViewer>
        )}
      </Tab>
      <Tab eventKey="annotations" title="Аннотация">
        <RichTextViewer
          {...props}
          nameTextArea="annotations"
          valueTextArea={props.course.annotations}
        ></RichTextViewer>
      </Tab>
      <Tab
        eventKey="notifications"
        title={
          <NotificationTabTitle
            title="Уведомления"
            badgeContent={props.notifications.length}
          />
        }
      >
        <Button
          className={
            "my-2 mx-1 " +
            (props.isTeacherInCourse || props.isAdmin ? "" : "d-none")
          }
          variant="primary"
          onClick={props.handleOnChangeModeModalCreateNotification}
        >
          Создать уведомление
        </Button>
        <ListGroup variant="flush" className="my-3">
          {props.notifications.map((value, index) => {
            return (
              <NotificationItem
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

export default CourseSpecialty;
