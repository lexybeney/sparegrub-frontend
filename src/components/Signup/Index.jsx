import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TOKEN, CREATE_USER, SET_SCREEN_MODE } from "../../redux/types";
import { validate } from "../../validation";
import { formToObject } from "./utils";
import Range from "./Range";
import SignupFields from "./SignupFields";
import { Container, Form, Button } from "react-bootstrap";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Signup", formObj);

    if (result === true) {
      setErrors({});
      const {
        email,
        password,
        phoneNumber: phone_number,
        postcode,
        range_preference,
        username: user_name,
      } = formObj;

      const results = await axios.post(`${apiUrl}/create/user`, {
        email,
        password,
        phone_number,
        postcode,
        range_preference,
        user_name,
      });

      if (results.data.status === 0) {
        console.log(results.data.error);
      } else {
        const token = results.data.token;
        const userData = await axios.get(`${apiUrl}/read/user`, {
          headers: {
            token,
          },
        });
        const user = userData.data.results[0];
        dispatch({ type: CREATE_USER, payload: user });
        dispatch({ type: ADD_TOKEN, payload: token });
        dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
      }
    } else {
      console.log(result);
      setErrors((errors = result));
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      <p>
        Our mission is to reduce food wastage by sharing what we have with
        others. We hope you enjoy using the app!
      </p>
      <div>
        <Form id="signupForm" onSubmit={onSubmit}>
          <SignupFields errors={errors} />
          <Range />
          <div className="submitButton">
            <Button size="lg" className="mt-4" type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      {/* Just for testing */}
      <button
        onClick={() => {
          dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
        }}
      >
        To Home
      </button>
    </Container>
  );
};

export default Signup;
