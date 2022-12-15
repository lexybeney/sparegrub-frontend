import React from "react";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Login</h1>
      {/* Just for testing */}
      <button
        onClick={() => {
          dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
        }}
      >
        To Home
      </button>
    </>
  );
};

export default Login;
