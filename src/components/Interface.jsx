import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home/Index";
import Signup from "./Signup/Index";
import Basket from "./Basket/Index";
import Profile from "./Profile/Index";
import Listing from "./Listing/Index";
import AddToListing from "./AddToListing/Index";
import Login from "./Login/Index";
import Header from "./Header";
import CollectionConfirmationWindow from "./CollectionConfirmationWindow/CollectionConfirmationWindow";
import {
  EDIT_PROFILE,
  SET_USER_LISTING,
  SET_LISTING_COLLECTION,
  REPLACE_BASKET,
} from "../redux/types";
import {
  getUserData,
  getUserListing,
  getUserBasket,
} from "../sparegrubApi/index";
import {
  HOME,
  LOGIN,
  SIGNUP,
  BASKET,
  PROFILE,
  LISTING,
  ADD_TO_LISTING,
  COLLECTION_CONFIRMATION_WINDOW,
} from "../components/consts";

const Interface = () => {
  const screenMode = useSelector((state) => state.screenMode);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const syncData = async () => {
    const user = await getUserData(token);
    dispatch({ type: EDIT_PROFILE, payload: user });
    const userListing = await getUserListing(token);
    if (userListing === "No items listed for this user") {
      dispatch({
        type: SET_USER_LISTING,
        payload: [],
      });
      dispatch({
        type: SET_LISTING_COLLECTION,
        payload: [],
      });
    } else {
      dispatch({
        type: SET_USER_LISTING,
        payload: userListing.availableItems,
      });
      dispatch({
        type: SET_LISTING_COLLECTION,
        payload: userListing.itemsToBeCollected,
      });
    }
    const user_id = user.id;
    const basket = await getUserBasket(token, user_id);
    dispatch({ type: REPLACE_BASKET, payload: basket });
  };

  useEffect(() => {
    setInterval(() => {
      syncData();
    }, 300000);
  }, []);

  return (
    <>
      <Header />
      <div className="mainContainer">
        {screenMode === LOGIN && <Login />}
        {screenMode === SIGNUP && <Signup />}
        {screenMode === HOME && <Home />}
        {screenMode === BASKET && <Basket />}
        {screenMode === PROFILE && <Profile />}
        {screenMode === LISTING && <Listing />}
        {screenMode === ADD_TO_LISTING && <AddToListing />}
        {screenMode === COLLECTION_CONFIRMATION_WINDOW && (
          <CollectionConfirmationWindow />
        )}
      </div>
    </>
  );
};

export default Interface;
