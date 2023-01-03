import React from "react";
import { profileSchema } from "./profileSchema";
import { useSelector } from "react-redux";
import { rangeOptions } from "../Signup/rangeOptions";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfileFields = (props) => {
  const token = useSelector((state) => state.token);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("https://api.sparegrub.co.uk/read/user", {
        headers: {
          token,
        },
      });
      setUserProfile(result.data.results[0]);
    }
    fetchData();
  }, []);

  const { editing, passwordIsHidden, errors, showPassword } = props;
  // let hiddenPassword = "";
  // for (let i = 0; i < userProfile.password.length; i++) {
  //   hiddenPassword += "*";
  // }

  return (
    <>
      {profileSchema.map((field) => {
        const fieldName = field.name;
        return (
          <div key={field.name}>
            {field.label}:{" "}
            {editing ? (
              <>
                <input
                  name={field.name}
                  type={field.type}
                  defaultValue={userProfile[fieldName]}
                />
                <p>{errors ? errors[fieldName] && errors[fieldName] : ""}</p>
              </>
            ) : (
              userProfile[fieldName]
            )}
          </div>
        );
      })}
      <div>
        Range:{" "}
        {editing ? (
          <select
            name="range_preference"
            placeholder="Range"
            defaultValue={userProfile.range_preference}
          >
            {rangeOptions.map((distance) => {
              return (
                <option key={distance.value} value={distance.value}>
                  {distance.value}
                </option>
              );
            })}
          </select>
        ) : (
          userProfile.range_preference
        )}
      </div>
      {/* <div>
        Password:{" "}
        {editing ? (
          <>
            <input
              name="password"
              type={passwordIsHidden ? "password" : "text"}
              defaultValue={userProfile.password}
            />
            <p>{errors && errors.password ? errors.password : ""}</p>
          </>
        ) : passwordIsHidden ? (
          hiddenPassword
        ) : (
          userProfile.password
        )}
        <button type="button" onClick={showPassword}>
          {passwordIsHidden ? "Show password" : "Hide password"}
        </button>
      </div> */}
    </>
  );
};

export default ProfileFields;
