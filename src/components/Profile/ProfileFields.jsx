import React from "react";
import { profileSchema } from "./profileSchema";
import { useSelector } from "react-redux";
import { rangeOptions } from "../Signup/rangeOptions";

const ProfileFields = (props) => {
  const user = useSelector((state) => state.user);

  const { editing, errors } = props;

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
                  defaultValue={user[fieldName]}
                />
                <p>{errors ? errors[fieldName] && errors[fieldName] : ""}</p>
              </>
            ) : (
              user[fieldName]
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
            defaultValue={user.range_preference}
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
          user.range_preference
        )}
      </div>
    </>
  );
};

export default ProfileFields;
