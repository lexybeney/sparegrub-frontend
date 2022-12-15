import React from "react";
import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";

const Basket = () => {
  const basket = useSelector((state) => state.basket);

  if (basket && basket.length > 0) {
    return (
      <>
        {basket.map((item) => {
          return <BasketItem key={item.itemId} item={item} />;
        })}
      </>
    );
  } else {
    return (
      <>
        <p>Your basket is empty</p>
      </>
    );
  }
};

export default Basket;
