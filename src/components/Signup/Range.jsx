import React from "react";
import { rangeOptions } from "./rangeOptions";
import { Form } from "react-bootstrap";

const Range = () => {
  return (
    <>
      <Form.Group>
        <Form.Label>
          Select the maximum distance you are willing to travel
        </Form.Label>
        <Form.Select
          id="range"
          name="range_preference"
          placeholder="Range"
          defaultValue="5 miles"
        >
          {rangeOptions.map((distance) => {
            return (
              <option key={distance.value} value={distance.value}>
                {distance.value}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default Range;
