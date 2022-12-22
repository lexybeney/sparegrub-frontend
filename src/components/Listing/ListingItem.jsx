import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_LISTING } from "../../redux/types";
import { Button, Accordion } from "react-bootstrap";

const ListingItem = (props) => {
  let { item, quantity, extra_details, collection_details, dateAdded, itemId } =
    props.item;

  const dispatch = useDispatch();

  const remove = () => {
    dispatch({ type: REMOVE_FROM_LISTING, payload: props.item });
  };

  if (!extra_details) {
    extra_details = "Not added";
  }

  if (!collection_details) {
    collection_details = "Not added";
  }

  return (
    <>
      <Accordion.Item eventKey={itemId}>
        <Accordion.Header>{item}</Accordion.Header>
        <Accordion.Body>
          <p>Quantity: {quantity}</p>
          <p>Extra details: {extra_details}</p>
          <p>Collection details: {collection_details}</p>
          <p>Added on: {new Date(dateAdded).toDateString()}</p>
          <Button variant="outline-info" onClick={remove}>
            Remove
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default ListingItem;
