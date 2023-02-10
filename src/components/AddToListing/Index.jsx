import React, { useState } from "react";
import ListingFields from "./ListingFields";
import { useDispatch } from "react-redux";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import { ADD_TO_LISTING, SET_SCREEN_MODE } from "../../redux/types";
import AddToListingButton from "./AddToListingButton";

const AddToListing = () => {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Add item to listing", formObj);

    if (result === true) {
      dispatch({ type: ADD_TO_LISTING, payload: formObj });
      dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
    } else {
      console.log(result);
      setErrors((errors = result));
    }
  };

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
        }}
      >
        Close
      </button>
      <h1>Add Item to My Listing</h1>
      <form onSubmit={onSubmit}>
        <ListingFields errors={errors} />
        <AddToListingButton />
      </form>
    </>
  );
};

export default AddToListing;
