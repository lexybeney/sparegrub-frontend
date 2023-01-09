import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import addButton from "../../assets/images/icons/plus_sign_white.svg";
import locationIcon from "../../assets/images/icons/location_blue.svg";

const Item = (props) => {
  const { item, quantity, location } = props.item;
  const dispatch = useDispatch();

  const add = () => {
    dispatch({ type: ADD_TO_BASKET, payload: props.item });
  };

  return (
    <Card body>
      <h4>{item}</h4>
      <p>{quantity}</p>
      <div className="location">
        <img alt="Location icon" src={locationIcon} />
        <p>{location}</p>
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
