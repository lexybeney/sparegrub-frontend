import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_BASKET } from "../../redux/types";

const Item = (props) => {
  const { item, quantity, location } = props.item;
  const dispatch = useDispatch();

  const add = () => {
    dispatch({ type: ADD_TO_BASKET, payload: props.item });
  };

  return (
    <>
      <h3>{item}</h3>
      <p>{`${quantity}, ${location}`}</p>
      <button
        onClick={() => {
          add();
        }}
      >
        Add to basket
      </button>
    </>
  );
};

export default Item;
