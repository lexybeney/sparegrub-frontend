import React, { useState } from "react";
import ListingFields from "./ListingFields";
import { useDispatch, useSelector } from "react-redux";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import { ADD_TO_LISTING, SET_SCREEN_MODE } from "../../redux/types";
import AddToListingButton from "./AddToListingButton";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";

const AddToListing = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Add item to listing", formObj);
    console.log(formObj);

    const {
      item_name,
      quantity,
      collection_location,
      collection_details,
      extra_details,
    } = formObj;

    if (result === true) {
      const result = await axios.post(
        `${apiUrl}/create/item`,
        {
          item_name,
          quantity,
          collection_location,
          collection_details,
          extra_details,
        },
        { headers: { token } }
      );
      console.log(result);
      // dispatch({ type: ADD_TO_LISTING, payload: formObj });
      // dispatch({ type: SET_SCREEN_MODE, payload: "Home" });
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
