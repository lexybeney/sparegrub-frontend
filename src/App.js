import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "./redux/types";
import Interface from "./components/Interface";
// import "./App.css";
import "./App.scss";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.token);

  useEffect(() => {
    setTimeout(() => {
      const payload = userToken ? "Home" : "Login";
      dispatch({ type: SET_SCREEN_MODE, payload });
      setLoading(false);
    }, 2500);
  }, []);

  return <>{loading ? <Loading /> : <Interface />}</>;
};

export default App;
