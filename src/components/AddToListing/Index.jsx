import React, { useState } from "react";
import ListingFields from "./ListingFields";
import { useDispatch, useSelector } from "react-redux";
import { formToObject } from "../Signup/utils";
import { validate } from "../../validation";
import {
  ADD_TO_LISTING,
  SET_SCREEN_MODE,
  SET_USER_LISTING,
  SET_LISTING_COLLECTION,
} from "../../redux/types";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";
import { getUserListing } from "../../sparegrubApi";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import CloseButton from "./CloseButton";
import { findLatAndLon } from "../../utils";

const AddToListing = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(false);

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
      setAdding(true);
      const location = await findLatAndLon(collection_location);
      const latitude = location.latitude;
      const longitude = location.longitude;

      await axios.post(
        `${apiUrl}/create/item`,
        {
          item_name,
          quantity,
          collection_location,
          collection_details,
          extra_details,
          latitude,
          longitude,
        },
        { headers: { token } }
      );

      dispatch({ type: ADD_TO_LISTING, payload: formObj });
      dispatch({ type: SET_SCREEN_MODE, payload: "Listing" });
      const userListing = await getUserListing(token);
      dispatch({
        type: SET_USER_LISTING,
        payload: userListing.availableItems,
      });
      dispatch({
        type: SET_LISTING_COLLECTION,
        payload: userListing.itemsToBeCollected,
      });
    } else {
      setErrors((errors = result));
      setAdding(false);
    }
  };

  return (
    <Container className="addToListingPage">
      <CloseButton />
      <h1>Add an Item</h1>
      <Form onSubmit={onSubmit} type="submit">
        <ListingFields errors={errors} />
        <div className="listingButton">
          <Button
            className="mt-4"
            type="submit"
            variant={adding ? "outline-primary" : "primary"}
          >
            {adding ? "Adding" : "Add to my listing"}
            <Spinner
              className={adding ? "show" : "hide"}
              animation="border"
              variant="primary"
            />
          </Button>
        </div>
      </Form>
      <div>
        <em>*Required field</em>
      </div>
    </Container>
  );
};

export default AddToListing;
