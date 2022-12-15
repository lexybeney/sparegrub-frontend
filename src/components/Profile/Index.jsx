import React, { useState } from "react";
import { EDIT_PROFILE, LON_AND_LAT } from "../../redux/types";
import Navigation from "../Navigation/Index";
import ProfileFields from "./ProfileFields";
import { useSelector, useDispatch } from "react-redux";
import { formToObject } from "../../components/Signup/utils";
import { validate } from "../../validation";
import { findLonAndLat } from "../Signup/userLocation";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user);
  const [passwordIsHidden, setpasswordIsHidden] = useState(true);

  const showPassword = () => {
    setpasswordIsHidden(!passwordIsHidden);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const formObj = formToObject(e.target.elements);

      async function findLocation(postcode) {
        const result = await findLonAndLat(postcode);
        dispatch({ type: LON_AND_LAT, payload: result });
      }

      const result = validate("User Information", formObj);
      if (result === true) {
        findLocation(formObj.postcode);
        dispatch({ type: EDIT_PROFILE, payload: formObj });
        setErrors((errors = {}));
        setEditing(!editing);
        setpasswordIsHidden(true);
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
      <img
        src="https://www.scotsman.com/webimg/b25lY21zOmFmM2U5NGMyLTMxNDgtNGFhMS05MmRlLTQwNjc2NGM0Mjg0YToyMWI3MWI0OC02MDM3LTRiMTctYWVlMi1lMDFmOTUwY2FjYmM=.jpg?quality=65&smart&width=990"
        alt={user.username}
        height="60px"
        className="profilePicture"
      />
      <form onSubmit={onSubmit}>
        <button type="submit">{editing ? "Save" : "Edit"}</button>
        <ProfileFields
          editing={editing}
          errors={errors}
          passwordIsHidden={passwordIsHidden}
          showPassword={showPassword}
        />
      </form>
      <button>DELETE MY ACCOUNT</button>
      <Navigation />
    </>
  );
};

export default Profile;
