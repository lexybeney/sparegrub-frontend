import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import addButton from "../../assets/images/icons/plus_sign_white.svg";
import locationIcon from "../../assets/images/icons/location_blue.svg";

const Item = (props) => {
  let {
    item_name,
    quantity,
    collection_location,
    extra_details,
    collection_details,
  } = props.item;
  const dispatch = useDispatch();

  const add = () => {
    dispatch({ type: ADD_TO_BASKET, payload: props.item });
  };

  if (extra_details === null) {
    extra_details = "N/A";
  }

  if (collection_details === null) {
    collection_details = "N/A";
  }

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
        className="btn-listing"
        onClick={() => {
          add();
        }}
      >
        <img alt="Add sign" src={addButton} />
        <p>Add to basket</p>
      </Button>
    </Card>
  );
};

export default Item;
