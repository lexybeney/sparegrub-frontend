import React from "react";
import Navigation from "../Navigation/Index";
import Basket from "./Basket";

const BasketPage = () => {
  return (
    <>
      <h1>My Basket</h1>
      <Basket />
      <button>Checkout</button>
      <Navigation />
    </>
  );
};

export default BasketPage;
