import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_BASKET } from "../../redux/types";

const BasketItem = (props) => {
  const { item, quantity, location } = props.item;
  const dispatch = useDispatch();

  const remove = () => {
    dispatch({ type: REMOVE_FROM_BASKET, payload: props.item });
  };

  return (
    <>
      <h3>{item}</h3>
      <p>{`${quantity}, ${location}`}</p>
      <button
        onClick={() => {
          remove();
        }}
      >
        Remove from basket
      </button>
    </>
  );
};

export default BasketItem;
