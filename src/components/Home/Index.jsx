import React from "react";
import Search from "./Search";
import AvailableItems from "./AvailableItems";
import Navigation from "../../components/Navigation/Index";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Home 2</h1>
      <Search />
      <AvailableItems />
      <button
        onClick={() => {
          dispatch({ type: SET_SCREEN_MODE, payload: "AddToListing" });
        }}
      >
        Add Item To Listing
      </button>
      <Navigation />
    </>
  );
};

export default Home;
