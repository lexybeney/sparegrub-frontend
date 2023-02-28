import React from "react";
import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";
import emptyBasket from "../../assets/images/icons/empty_basket_green.svg";

const Basket = () => {
  const basket = useSelector((state) => state.basket);

  if (basket && basket.length > 0) {
    return (
      <>
        {basket.map((item) => {
          return <BasketItem key={item.item_id} item={item} />;
        })}
      </>
    );
  } else {
    return (
      <div className="emptyBasket">
        <img alt="Empty basket" src={emptyBasket} />
        <h5>Your basket is empty</h5>
      </div>
    );
  }
};

export default Basket;
