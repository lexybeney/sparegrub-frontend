import React from "react";
import Navigation from "../Navigation/Index";
import UserListing from "./UserListing";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import addButton from "../../assets/images/icons/plus_sign_white.svg";

const Listing = () => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: SET_SCREEN_MODE, payload: "AddToListing" });
  };

  return (
    <>
      <Container className="listingPage">
        <h1>My Listing</h1>
        <UserListing />
      </Container>
      <div className="addToListing">
        <Button className="btn-listing" onClick={addItem}>
          <img src={addButton} alt="Add button" />
          <p>Add to my listing</p>
        </Button>
      </div>
      <Navigation />
    </>
  );
};

export default Listing;
