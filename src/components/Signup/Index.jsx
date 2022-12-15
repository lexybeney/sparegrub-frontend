import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_USER, SET_SCREEN_MODE } from "../../redux/types";
import { validate } from "../../validation";
import { formToObject } from "./utils";
import Range from "./Range";
import SignupFields from "./SignupFields";
import { Container, Form, Button } from "react-bootstrap";

const Signup = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Signup", formObj);

    if (result === true) {
      dispatch({ type: CREATE_USER, payload: formObj });
      dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
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
          <Button className="mt-4" type="submit" variant="primary">
            Submit
          </Button>
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
