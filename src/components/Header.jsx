import React from "react";
import logo from "../assets/images/logos/logo_dark_bg.svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";

const Header = () => {
  const dispatch = useDispatch();
  const screenMode = useSelector((state) => state.screenMode);

  const onClick = (payload) => {
    dispatch({ type: SET_SCREEN_MODE, payload });
  };
  return (
    <>
      <div className="header">
        <img onClick={() => onClick("Home")} src={logo} alt="SpareGrub Logo" />
        <div
          className={
            screenMode === "Login" || screenMode === "Signup"
              ? "hideNav"
              : "largeScreenNav"
          }
        >
          <button
            onClick={() => onClick("Home")}
            className={screenMode === "Home" ? "activePage" : ""}
          >
            Home
          </button>
          <button
            onClick={() => onClick("Basket")}
            className={screenMode === "Basket" ? "activePage" : ""}
          >
            Basket
          </button>
          <button
            onClick={() => onClick("Profile")}
            className={screenMode === "Profile" ? "activePage" : ""}
          >
            Profile
          </button>
          <button
            onClick={() => onClick("Listing")}
            className={screenMode === "Listing" ? "activePage" : ""}
          >
            Listing
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
