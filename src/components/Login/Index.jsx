import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import { Button, Form, Container } from "react-bootstrap";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const signup = () => {
    dispatch({ type: SET_SCREEN_MODE, payload: "Signup" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Login", formObj);

    if (result === true) {
      const user_name = formObj.username;
      const password = formObj.password;
      const results = await axios.post("https://api.sparegrub.co.uk/login", {
        user_name: { user_name },
        password: { password },
      });

      console.log(results);
    } else {
      console.log(result);
      setErrors((errors = result));
    }
  };

  return (
    <>
      <Container className="loginPage">
        <h1>Login</h1>
        <Form id="loginForm" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter your username"
            />
            <Form.Text className="text-danger">
              {errors.username ? errors.username : " "}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <Form.Text className="text-danger">
              {errors.password ? errors.password : " "}
            </Form.Text>
          </Form.Group>

          <Button className="mt-4 loginButton" type="submit" variant="primary">
            Login
          </Button>
        </Form>

        <p>
          Don't have an account? <Button onClick={signup}>Sign up here</Button>
        </p>
        {/* Just for testing */}
        <button
          onClick={() => {
            dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
          }}
        >
          To Home
        </button>
      </Container>
    </>
  );
};

export default Login;
