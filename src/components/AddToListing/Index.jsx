import React, { useState } from "react";
import ListingFields from "./ListingFields";
import { useDispatch, useSelector } from "react-redux";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import {
  ADD_TO_LISTING,
  SET_SCREEN_MODE,
  SET_USER_LISTING,
} from "../../redux/types";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";
import { getUserListing } from "../../sparegrubApi";
import { Container, Form, Button } from "react-bootstrap";

const AddToListing = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formObj = formToObject(e.target.elements);
    const result = validate("Add item to listing", formObj);

    const {
      item_name,
      quantity,
      collection_location,
      collection_details,
      extra_details,
    } = formObj;

    if (result === true) {
      await axios.post(
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

      dispatch({ type: ADD_TO_LISTING, payload: formObj });
      dispatch({ type: SET_SCREEN_MODE, payload: "Listing" });
      const userListing = await getUserListing(token);
      dispatch({ type: SET_USER_LISTING, payload: userListing });
    } else {
      setErrors((errors = result));
    }
  };

  return (
    <Container className="addToListingPage">
      <div className="closeButton">
        <button
          onClick={() => {
            dispatch({ type: SET_SCREEN_MODE, payload: "Listing" });
          }}
        >
          X
        </button>
      </div>
      <h1>Add an Item</h1>
      <Form onSubmit={onSubmit} type="submit">
        <ListingFields errors={errors} />
        <div className="listingButton">
          <Button className="mt-4" type="submit" variant="primary">
            Add to my listing
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddToListing;
