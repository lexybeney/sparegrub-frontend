import React from "react";
import { signUpFormSchema } from "./signupFormSchema";
import { Form } from "react-bootstrap";

const SignupFields = (props) => {
  return (
    <>
      {signUpFormSchema.map((field) => {
        return (
          <Form.Group key={field.name}>
            <Form.Label className={field.required ? "required" : ""}>
              {field.label}
            </Form.Label>
            <Form.Control
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
            <Form.Text className="text-danger">
              {props.errors[field.name] ? props.errors[field.name] : " "}
            </Form.Text>
          </Form.Group>
        );
      })}
    </>
  );
};

export default SignupFields;
