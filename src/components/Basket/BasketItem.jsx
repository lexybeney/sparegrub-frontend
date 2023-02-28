import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import locationIcon from "../../assets/images/icons/location_blue.svg";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";

const BasketItem = (props) => {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState(false);
  const token = useSelector((state) => state.token);

  let {
    item_name,
    quantity,
    collection_location,
    extra_details,
    collection_details,
    item_id,
  } = props.item;
  const dispatch = useDispatch();

  if (extra_details === null || undefined) {
    extra_details = "N/A";
  }

  if (collection_details === null || undefined) {
    collection_details = "N/A";
  }

  const remove = async () => {
    setRemoving(true);
    const result = await axios.put(
      `${apiUrl}/update/item`,
      { status: "removed", id: item_id },
      { headers: { token } }
    );
    console.log(result);
    if (result.data.status === 1) {
      dispatch({ type: REMOVE_FROM_BASKET, payload: props.item });
    } else {
      setError(true);
    }
  };

  return (
    <Card body>
      <h5>{item_name}</h5>
      <p>{`Quantity: ${quantity}`}</p>
      <p>{`Extra details: ${extra_details}`}</p>
      <p>{`Collection details: ${collection_details}`}</p>
      <div className="location">
        <img alt="Location icon" src={locationIcon} />
        <p>{collection_location}</p>
      </div>
      <Button
        variant="outline-info"
        onClick={() => {
          remove();
        }}
      >
        {error
          ? "Error removing from basket"
          : removing
          ? "Removing..."
          : "Remove from basket"}
      </Button>
      <Button>Checkout item</Button>
    </Card>
  );
};

export default BasketItem;
