import React from "react";
import Navigation from "../Navigation/Index";
import Basket from "./Basket";
import { Container } from "react-bootstrap";

const BasketPage = () => {
  return (
    <Container className="basketPage">
      <h1>My Basket</h1>
      <Basket />
      <Navigation />
    </Container>
  );
};

export default BasketPage;
