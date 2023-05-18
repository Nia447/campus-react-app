import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Loading from "../loading";
import { Alert, Col, Row } from "react-bootstrap";

function Registration(props) {
  return (
    <div className="d-flex justify-content-center">
      <Card className="mx-5 mt-5" style={{ width: "50rem" }}>
        {props.isLoading ? <Loading /> : null}
        <Card.Body>
          <Card.Title>Регистрация нового пользователя</Card.Title>
          <Form onSubmit={props.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ФИО"
                name="fullName"
                value={props.registration.fullName}
                onChange={props.handleOnChange}
                isInvalid={props.errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={props.registration.birthDate}
                onChange={props.handleOnChange}
                isInvalid={props.errors.birthDate}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.birthDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите Email"
                name="email"
                value={props.registration.email}
                onChange={props.handleOnChange}
                isInvalid={props.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.email}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Email будет использоваться для входа в систему
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                name="password"
                value={props.registration.password}
                onChange={props.handleOnChange}
                isInvalid={props.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль ещё раз"
                name="confirmPassword"
                value={props.registration.confirmPassword}
                onChange={props.handleOnChange}
                isInvalid={props.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="align-items-center">
              <Col sm="auto">
                <Button className="mb-3" variant="primary" type="submit">
                Зарегистрироваться
                </Button>
              </Col>
              <Col className={props.textResponse === "" ? "d-none" : "my-alert"} sm="auto" xs="auto">
                <Alert variant={props.numberResponse === 200 ? "success" : "danger"}>{props.textResponse}</Alert>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Registration;
