import React from "react";
import Navigation from "../Navigation/Index";
import UserListing from "./UserListing";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import addButton from "../../assets/images/icons/plus_sign_white.svg";
import CollectedItems from "./CollectedItems";
import { ADD_TO_LISTING } from "../consts";

const Listing = () => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: SET_SCREEN_MODE, payload: ADD_TO_LISTING });
  };

  return (
    <>
      <Container className="listingPage">
        <h1>My Listing</h1>
        <div className="wideListing">
          <UserListing />
          <CollectedItems />
        </div>
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
