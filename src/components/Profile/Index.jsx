import React, { useState } from "react";
import { EDIT_PROFILE } from "../../redux/types";
import Navigation from "../Navigation/Index";
import ProfileFields from "./ProfileFields";
import { useDispatch } from "react-redux";
import { formToObject } from "../../components/Signup/utils";
import { validate } from "../../validation";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const formObj = formToObject(e.target.elements);

      const result = validate("Profile edit", formObj);
      if (result === true) {
        dispatch({ type: EDIT_PROFILE, payload: formObj });
        setErrors((errors = {}));
        setEditing(!editing);
      } else {
        console.log(result);
        setErrors((errors = result));
      }
    } else {
      setEditing(!editing);
    }
  };

  return (
    <>
      <h1>My Profile</h1>
      <p>Profile picture</p>
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
