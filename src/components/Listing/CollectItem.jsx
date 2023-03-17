import React from "react";
import { Accordion } from "react-bootstrap";

const CollectItem = (props) => {
  let {
    item_name,
    quantity,
    extra_details,
    collection_details,
    date_added,
    item_id,
    collection_location,
  } = props.item;

  if (!extra_details) {
    extra_details = "Not added";
  }

  if (!collection_details) {
    collection_details = "Not added";
  }

  return (
    <>
      <Accordion.Item eventKey={item_id}>
        <Accordion.Header>{item_name}</Accordion.Header>
        <Accordion.Body>
          <p>Quantity: {quantity}</p>
          <p>Extra details: {extra_details}</p>
          <p>Collection details: {collection_details}</p>
          <p>Collect from: {collection_location}</p>
          <p>Added on: {new Date(date_added).toDateString()}</p>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default CollectItem;
