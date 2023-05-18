import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Loading from "../loading";
import { Alert, Col, Row } from "react-bootstrap";

function Login(props) {
  return (
    <div className="d-flex justify-content-center">
      <Card className="mx-5 mt-5" style={{ width: "50rem" }}>
        {props.isLoading ? <Loading /> : null}
        <Card.Body>
          <Card.Title>Авторизация</Card.Title>
          <Form onSubmit={props.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите Email"
                name="email"
                value={props.login.email}
                onChange={props.handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                name="password"
                value={props.login.password}
                onChange={props.handleOnChange}
              />
            </Form.Group>
            <Row className="align-items-center">
              <Col sm="auto">
                <Button className="mb-3" variant="primary" type="submit">
                Войти
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

export default Login;
