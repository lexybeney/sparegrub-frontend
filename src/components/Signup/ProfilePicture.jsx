import React from "react";
import { Form } from "react-bootstrap";

const ProfilePicture = () => {
  return (
    <Form.Group>
      <Form.Label>Upload a profile picture</Form.Label>
      <Form.Control id="profilePicture" name="profilePicture" type="file" />
    </Form.Group>
  );
};

export default ProfilePicture;
