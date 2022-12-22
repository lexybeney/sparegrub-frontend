import React from "react";
import { Container } from "react-bootstrap";
import logo from "../assets/images/logos/logo_dark_bg.svg";

const Loading = () => {
  return (
    <div className="welcomePage">
      <img src={logo} alt="SpareGrub Logo" />
      <h1>Welcome!</h1>
    </div>
  );
};

export default Loading;
