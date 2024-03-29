import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ADD_TOKEN,
  SET_SCREEN_MODE,
  CREATE_USER,
  SET_USER_LISTING,
  REPLACE_BASKET,
  SET_LISTING_COLLECTION,
} from "../../redux/types";
import { Button, Form, Container } from "react-bootstrap";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import axios from "axios";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import { getUserData, getUserListing, getUserBasket } from "../../sparegrubApi";
import { HOME } from "../consts";

const Login = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});
  let [loginError, setloginError] = useState();
  const [loggingIn, setLoggingIn] = useState(false);

  const signup = () => {
    dispatch({ type: SET_SCREEN_MODE, payload: "Signup" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Login", formObj);

    if (result === true) {
      setLoggingIn(true);
      setErrors((errors = {}));
      const results = await axios.post(`${apiUrl}/login`, {
        user_name: formObj.username,
        password: formObj.password,
      });

      if (results.data.status === 0) {
        setloginError((loginError = results.data.error));
        setLoggingIn(false);
      } else {
        const token = results.data.token;
        setloginError((loginError = ""));
        dispatch({ type: ADD_TOKEN, payload: token });
        dispatch({ type: SET_SCREEN_MODE, payload: HOME });
        const user = await getUserData(token);
        dispatch({ type: CREATE_USER, payload: user });
        const userListing = await getUserListing(token);
        if (userListing === "No items listed for this user") {
          dispatch({
            type: SET_USER_LISTING,
            payload: [],
          });
          dispatch({
            type: SET_LISTING_COLLECTION,
            payload: [],
          });
        } else {
          dispatch({
            type: SET_USER_LISTING,
            payload: userListing.availableItems,
          });
          dispatch({
            type: SET_LISTING_COLLECTION,
            payload: userListing.itemsToBeCollected,
          });
        }

        const user_id = user.id;
        const basket = await getUserBasket(token, user_id);
        dispatch({ type: REPLACE_BASKET, payload: basket });
      }
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
          <p className="text-danger">{loginError ? loginError : " "}</p>
          <div className="submitButton">
            <Button
              size="lg"
              className="mt-4"
              type="submit"
              variant={loggingIn ? "outline-primary" : "primary"}
            >
              {loggingIn ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Form>
        <div className="signUpLink">
          <p>Don't have an account? Sign up </p>
          <Button onClick={signup} className="linkText">
            {" "}
            here
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Login;
