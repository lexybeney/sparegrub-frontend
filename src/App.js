import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "./redux/types";
import Interface from "./components/Interface";
// import "./App.css";
import "./App.scss";
import Loading from "./components/Loading";
import { Button } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const payload = user.userId ? "Login" : "Signup";
      dispatch({ type: SET_SCREEN_MODE, payload });
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Button onClick={() => localStorage.clear()}>Clear Local Storage</Button>
      {loading ? <Loading /> : <Interface />}
    </>
  );
};

export default App;
