import React, { useState } from "react";
import { EDIT_PROFILE } from "../../redux/types";
import Navigation from "../Navigation/Index";
import ProfileFields from "./ProfileFields";
import { useDispatch, useSelector } from "react-redux";
import { formToObject } from "../../components/Signup/utils";
import { validate } from "../../validation";
import axios from "axios";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import { getUserData } from "../../sparegrubApi";

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

        await axios.put(
          `${apiUrl}/update/user`,
          {
            email,
            password,
            phone_number,
            postcode,
            range_preference,
            user_name,
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

  return (
    <>
      <h1>My Profile</h1>
      <form onSubmit={onSubmit}>
        <button type="submit">{editing ? "Save" : "Edit"}</button>
        <ProfileFields editing={editing} errors={errors} />
      </form>
      <button>DELETE MY ACCOUNT</button>
      <Navigation />
    </>
  );
};

export default Profile;
