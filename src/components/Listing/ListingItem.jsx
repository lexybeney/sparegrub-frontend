import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Accordion } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import { REMOVE_FROM_LISTING } from "../../redux/types";

const ListingItem = (props) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);

  let {
    item_name,
    quantity,
    extra_details,
    collection_details,
    date_added,
    item_id,
    collection_location,
  } = props.item;

  const remove = async () => {
    setRemoving(true);
    await axios.put(
      `${apiUrl}/update/item`,
      {
        status: "removed",
        id: item_id,
      },
      {
        headers: {
          token,
        },
      }
    );
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
      <Accordion.Item eventKey={item_id}>
        <Accordion.Header>{item_name}</Accordion.Header>
        <Accordion.Body>
          <p>Quantity: {quantity}</p>
          <p>Extra details: {extra_details}</p>
          <p>Collection details: {collection_details}</p>
          <p>Collect from: {collection_location}</p>
          <p>Added on: {new Date(date_added).toDateString()}</p>
          <Button variant="outline-info" onClick={remove}>
            {removing ? "Removing" : "Remove"}
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default ListingItem;
