import React from "react";
import { profileSchema } from "./profileSchema";
import { useSelector } from "react-redux";
import { rangeOptions } from "../Signup/rangeOptions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProfileFields = (props) => {
  const user = useSelector((state) => state.user);

  const { editing, errors } = props;

  return (
    <>
      {profileSchema.map((field) => {
        const fieldName = field.name;
        return (
          <Row key={field.name}>
            <Col className="profileLabel" xs={5}>
              {field.label}{" "}
            </Col>
            <Col className="profileField">
              {" "}
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
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col className="profileLabel" xs={5}>
          Range{" "}
        </Col>
        <Col className="profileField">
          {editing ? (
            <select
              name="range_preference"
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
        </Col>
      </Row>
    </>
  );
};

export default ProfileFields;
