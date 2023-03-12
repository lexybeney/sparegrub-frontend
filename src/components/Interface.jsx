import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home/Index";
import Signup from "./Signup/Index";
import Basket from "./Basket/Index";
import Profile from "./Profile/Index";
import Listing from "./Listing/Index";
import AddToListing from "./AddToListing/Index";
import Login from "./Login/Index";
import logo from "../assets/images/logos/logo_dark_bg.svg";
import { Button } from "react-bootstrap";
import CollectionConfirmationWindow from "./CollectionConfirmationWindow/CollectionConfirmationWindow";

const Interface = () => {
  const screenMode = useSelector((state) => state.screenMode);

  return (
    <>
      <div className="header">
        <img src={logo} alt="SpareGrub Logo" />
        <Button className="clearStorage" onClick={() => localStorage.clear()}>
          Clear Local Storage
        </Button>
      </div>
      <div className="mainContainer">
        {screenMode === "Login" && <Login />}
        {screenMode === "Signup" && <Signup />}
        {screenMode === "Home" && <Home />}
        {screenMode === "Basket" && <Basket />}
        {screenMode === "Profile" && <Profile />}
        {screenMode === "Listing" && <Listing />}
        {screenMode === "AddToListing" && <AddToListing />}
        {screenMode === "Collection Confirmation Window" && (
          <CollectionConfirmationWindow />
        )}
      </div>
    </>
  );
};

export default Interface;
