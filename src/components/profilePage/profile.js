import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loading from "../loading";
import { Alert, Col, Placeholder, Row } from "react-bootstrap";

function Profile(props) {
  return (
    <div className="d-flex justify-content-center">
      <Card className="mx-5 mt-5" style={{ width: "50rem" }}>
        {props.isLoading ? <Loading /> : null}
        <Card.Body>
          <Card.Title>Профиль</Card.Title>
          <Form onSubmit={props.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ФИО </Form.Label>
              {props.isLoading ? (
                <Placeholder bg="secondary" xs={12} aria-hidden="true">
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder className="mt-2 mx-2" xs={4} />
                  </Placeholder>
                </Placeholder>
              ) : (
                <Form.Control
                  disabled={props.editMode ? false : true}
                  type="text"
                  name="fullName"
                  value={
                    props.editMode
                      ? props.editProfile.fullName
                      : props.profile.fullName
                  }
                  onChange={props.handleOnChange}
                  isInvalid={props.errors.fullName}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {props.errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              {props.isLoading ? (
                <Placeholder bg="secondary" xs={12} aria-hidden="true">
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder className="mt-2 mx-2" xs={4} />
                  </Placeholder>
                </Placeholder>
              ) : (
              <Form.Control
                disabled={true}
                type="email"
                name="email"
                value={props.profile.email}
              />)}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>День рождения</Form.Label>
              {props.isLoading ? (
                <Placeholder bg="secondary" xs={12} aria-hidden="true">
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder className="mt-2 mx-2" xs={4} />
                  </Placeholder>
                </Placeholder>
              ) : (
              <Form.Control
                disabled={props.editMode ? false : true}
                type="date"
                name="birthDate"
                value={
                  props.editMode
                    ? props.editProfile.birthDate
                    : props.profile.birthDate
                }
                onChange={props.handleOnChange}
                isInvalid={props.errors.birthDate}
              />)}
              <Form.Control.Feedback type="invalid">
                {props.errors.birthDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="align-items-center">
              <Col className={props.editMode ? "d-none" : ""} sm="auto">
                <Button
                  className={"mb-3"}
                  variant="primary"
                  onClick={props.handleOnChangeEditMode}
                >
                  Изменить
                </Button>
              </Col>
              <Col className={props.editMode ? "" : "d-none"} sm="auto">
                <Button
                  className={"mb-3"}
                  variant="secondary"
                  onClick={props.handleOnChangeEditMode}
                >
                  Отмена
                </Button>
              </Col>
              <Col className={props.editMode ? "" : "d-none"} sm="auto">
                <Button className={"mb-3"} variant="primary" type="submit">
                  Подтвердить
                </Button>
              </Col>
              <Col
                className={props.textResponse === "" ? "d-none" : "my-alert"}
                sm="auto"
                xs="auto"
              >
                <Alert
                  variant={props.numberResponse === 200 ? "success" : "danger"}
                >
                  {props.textResponse}
                </Alert>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
