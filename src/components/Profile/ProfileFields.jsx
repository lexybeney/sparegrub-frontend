import React from "react";
import { profileSchema } from "./profileSchema";
import { useSelector } from "react-redux";
import { rangeOptions } from "../Signup/rangeOptions";
import { Row, Col, Form } from "react-bootstrap";

const ProfileFields = (props) => {
  const user = useSelector((state) => state.user);

  const { editing, errors } = props;

  return (
    <>
      {profileSchema.map((field) => {
        const fieldName = field.name;
        return (
          <Row key={field.name}>
            <Form.Group>
              <Col className="profileLabel">
                <Form.Label>{field.label} </Form.Label>
              </Col>
              <Col className="profileField">
                {editing ? (
                  <>
                    <Form.Control
                      name={field.name}
                      type={field.type}
                      defaultValue={user[fieldName]}
                    />
                    <Form.Text>
                      {errors ? errors[fieldName] && errors[fieldName] : ""}
                    </Form.Text>
                  </>
                ) : (
                  user[fieldName]
                )}
              </Col>
            </Form.Group>
          </Row>
        );
      })}
      <Row>
        <Form.Group>
          <Col className="profileLabel">
            <Form.Label>Range </Form.Label>
          </Col>
          <Col className="profileField">
            {editing ? (
              <Form.Select
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
              </Form.Select>
            ) : (
              user.range_preference
            )}
          </Col>
        </Form.Group>
      </Row>
    </>
  );
};

export default ProfileFields;
