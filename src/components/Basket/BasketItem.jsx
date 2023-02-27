import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import locationIcon from "../../assets/images/icons/location_blue.svg";

const BasketItem = (props) => {
  let {
    item_name,
    quantity,
    collection_location,
    extra_details,
    collection_details,
  } = props.item;
  const dispatch = useDispatch();

  if (extra_details === null || undefined) {
    extra_details = "N/A";
  }

  if (collection_details === null || undefined) {
    collection_details = "N/A";
  }

  const remove = () => {
    dispatch({ type: REMOVE_FROM_BASKET, payload: props.item });
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
        Remove from basket
      </Button>
      <Button>Checkout item</Button>
    </Card>
  );
};

export default BasketItem;
