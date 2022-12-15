import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_USER, LON_AND_LAT, SET_SCREEN_MODE } from "../../redux/types";
import { findLonAndLat } from "./userLocation";
import { validate } from "../../validation";
import { formToObject } from "./utils";
import Range from "./Range";
import ProfilePicture from "./ProfilePicture";
import SignupFields from "./SignupFields";
import { Container, Form, Button } from "react-bootstrap";

const Signup = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("User Information", formObj);

    async function findLocation(postcode) {
      const result = await findLonAndLat(postcode);
      dispatch({ type: LON_AND_LAT, payload: result });
    }

    if (result === true) {
      findLocation(formObj.postcode);
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
          <ProfilePicture />
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
