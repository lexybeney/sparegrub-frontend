import React from "react";
import Search from "./Search";
import AvailableItems from "./AvailableItems";
import Navigation from "../../components/Navigation/Index";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import { Button, Container } from "react-bootstrap";
import addButton from "../../assets/images/icons/plus_sign_white.svg";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Container className="homePage">
        <h1>Home</h1>
        <Search />
        <AvailableItems />
      </Container>
      <div className="addToListing">
        <Button
          className="btn-listing"
          onClick={() => {
            dispatch({ type: SET_SCREEN_MODE, payload: "AddToListing" });
          }}
        >
          <img src={addButton} alt="Add button" />
          <p>Add to my listing</p>
        </Button>
      </div>

      <Navigation />
    </>
  );
};

export default Home;
