import React from "react";
import logo from "../assets/images/logos/logo_dark_bg.svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";
import { BASKET, HOME, LISTING, LOGIN, PROFILE, SIGNUP } from "./consts";

const Header = () => {
  const dispatch = useDispatch();
  const screenMode = useSelector((state) => state.screenMode);

  const onClick = (payload) => {
    dispatch({ type: SET_SCREEN_MODE, payload });
  };
  return (
    <>
      <div className="header">
        <img onClick={() => onClick(HOME)} src={logo} alt="SpareGrub Logo" />
        <div
          className={
            screenMode === LOGIN || screenMode === SIGNUP
              ? "hideNav"
              : "largeScreenNav"
          }
        >
          <button
            onClick={() => onClick(HOME)}
            className={screenMode === HOME ? "activePage" : ""}
          >
            Home
          </button>
          <button
            onClick={() => onClick(BASKET)}
            className={screenMode === BASKET ? "activePage" : ""}
          >
            Basket
          </button>
          <button
            onClick={() => onClick(PROFILE)}
            className={screenMode === PROFILE ? "activePage" : ""}
          >
            Profile
          </button>
          <button
            onClick={() => onClick(LISTING)}
            className={screenMode === LISTING ? "activePage" : ""}
          >
            Listing
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
