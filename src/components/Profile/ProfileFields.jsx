import React from "react";
import { profileSchema } from "./profileSchema";
import { useSelector } from "react-redux";
import { rangeOptions } from "../Signup/rangeOptions";

const ProfileFields = (props) => {
  const userProfile = useSelector((state) => state.user);

  const { editing, passwordIsHidden, errors, showPassword } = props;
  let hiddenPassword = "";
  for (let i = 0; i < userProfile.password.length; i++) {
    hiddenPassword += "*";
  }

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
            name="range"
            placeholder="Range"
            defaultValue={userProfile.range}
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
          userProfile.range
        )}
      </div>
      <div>
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
      </div>
    </>
  );
};

export default ProfileFields;
