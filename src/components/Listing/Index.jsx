import React from "react";
import Navigation from "../Navigation/Index";
import UserListing from "./UserListing";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";

const Listing = () => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: SET_SCREEN_MODE, payload: "AddToListing" });
  };

  return (
    <>
      <Container>
        <h1>My Listing</h1>
        <UserListing />
        <Button onClick={addItem}>Add item to my listing</Button>
      </Container>
      <Navigation />
    </>
  );
};

export default Listing;
