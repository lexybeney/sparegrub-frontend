import React from "react";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import { LISTING } from "../consts";

const CloseButton = () => {
  const dispatch = useDispatch();
  return (
    <div className="closeButton">
      <button
        onClick={() => {
          dispatch({ type: SET_SCREEN_MODE, payload: LISTING });
        }}
        type="button"
        className="btn-close"
      >
        <span className="icon-cross"></span>
        <span className="visually-hidden">Close</span>
      </button>
      <span className="cross-stand-alone"></span>
      <span className="cross-1px"></span>
    </div>
  );
};

export default CloseButton;
