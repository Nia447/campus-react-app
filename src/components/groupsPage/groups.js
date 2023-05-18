import React from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import GroupItem from "./groupItem";
import CreateGroupModal from "./modals/createGroupModal";
import Loading from "../loading";
import EditGroupModal from "./modals/editGroupModal";

function Groups(props) {
  return (
    <Container className="my-3">
      <h1>Группы кампусных курсов</h1>
      <Button className={"my-2 " + (props.isAdmin ? "" : "d-none")} variant="primary" onClick={props.handleOnChangeModeModalCreateGroup}>
        Создать
      </Button>
      <CreateGroupModal {...props}></CreateGroupModal>
      <EditGroupModal {...props}></EditGroupModal>
      <ListGroup className="my-3">
        {props.isLoading ? <Loading/> : null}
        {props.courseGroups.map((value) => {
          return <GroupItem name={value.name} key={value.id} id={value.id} {...props} />;
        })}
      </ListGroup>
    </Container>
  );
}

export default Groups;
