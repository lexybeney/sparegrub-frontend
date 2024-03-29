import React from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const ListingFields = (props) => {
  const user = useSelector((state) => state.user);
  const errors = props.errors;

  return (
    <div className="listingFields">
      <Form.Group>
        <Form.Label className="required" htmlFor="item_name">
          Item
        </Form.Label>
        <Form.Control
          type="text"
          name="item_name"
          placeholder="e.g. Apple, Bread"
        />
        <Form.Text> {errors.item_name ? errors.item_name : ""}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label className="required" htmlFor="quantity">
          Quantity
        </Form.Label>
        <Form.Control type="text" name="quantity" placeholder="e.g. 2 kg" />
        <Form.Text> {errors.quantity ? errors.quantity : ""}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label className="required" htmlFor="collection_location">
          Postcode for Collection
        </Form.Label>
        <Form.Control
          type="text"
          name="collection_location"
          defaultValue={user.postcode}
        />
        <Form.Text>
          {errors.collection_location ? errors.collection_location : ""}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="extra_details">Extra Details</Form.Label>
        <Form.Control
          as="textarea"
          cols="40"
          rows="5"
          name="extra_details"
          placeholder="Any other important information e.g. contains nuts"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="collection_details">
          Available for Collection
        </Form.Label>
        <Form.Control
          type="text"
          name="collection_details"
          placeholder="e.g Mon-Fri after 6pm"
        />
      </Form.Group>
    </div>
  );
};

export default ListingFields;
