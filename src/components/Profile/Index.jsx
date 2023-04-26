import React, { useState } from "react";
import { EDIT_PROFILE, LOGOUT, SET_SCREEN_MODE } from "../../redux/types";
import Navigation from "../Navigation/Index";
import ProfileFields from "./ProfileFields";
import { useDispatch, useSelector } from "react-redux";
import { formToObject } from "../../components/Signup/utils";
import { validate } from "../../validation";
import axios from "axios";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import { getUserData } from "../../sparegrubApi";
import { Button, Form } from "react-bootstrap";
import { findLatAndLon } from "../../utils";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});
  const token = useSelector((state) => state.token);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const formObj = formToObject(e.target.elements);
      const result = validate("Profile edit", formObj);
      if (result === true) {
        const {
          email,
          password,
          phone_number,
          postcode,
          range_preference,
          user_name,
        } = formObj;

        const location = await findLatAndLon(postcode);
        const latitude = location.latitude;
        const longitude = location.longitude;

        await axios.put(
          `${apiUrl}/update/user`,
          {
            email,
            password,
            phone_number,
            postcode,
            range_preference,
            user_name,
            latitude,
            longitude,
          },
          {
            headers: {
              token,
            },
          }
        );
        const user = await getUserData(token);
        dispatch({ type: EDIT_PROFILE, payload: user });
        setErrors((errors = {}));
        setEditing(!editing);
      } else {
        setErrors((errors = result));
      }
    } else {
      setEditing(!editing);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT, payload: "" });
    dispatch({ type: SET_SCREEN_MODE, payload: "Login" });
  };

  return (
    <div className="profilePage">
      <h1>My Profile</h1>
      <Form onSubmit={onSubmit}>
        <div className="profileButton">
          <button
            className={editing ? "saveButton" : "editButton"}
            type="submit"
          >
            {editing ? "Save changes" : "Edit my profile"}
          </button>
        </div>
        <ProfileFields editing={editing} errors={errors} />
      </Form>
      <div className="logout">
        <Button onClick={logout}>Logout</Button>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
