import React from "react";
import { useSelector } from "react-redux";

const ListingFields = (props) => {
  const user = useSelector((state) => state.user);
  const errors = props.errors;

  return (
    <>
      <label htmlFor="item_name">Item:</label>
      <input type="text" name="item_name" placeholder="e.g. Apple, Bread" />
      <p> {errors.item_name ? errors.item_name : ""}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input type="text" name="quantity" placeholder="e.g. 2 kg" />
      <p> {errors.quantity ? errors.quantity : ""}</p>
      <label htmlFor="collection_location">Postcode for Collection:</label>
      <input
        type="text"
        name="collection_location"
        defaultValue={user.postcode}
      ></input>
      <p> {errors.collection_location ? errors.collection_location : ""}</p>
      <label htmlFor="extra_details">Extra Details:</label>
      <textarea
        cols="40"
        rows="5"
        name="extra_details"
        placeholder="Any other important information e.g. contains nuts"
      ></textarea>
      <label htmlFor="collection_details">Available for collection:</label>
      <input
        type="text"
        name="collection_details"
        placeholder="e.g Mon-Fri after 6pm"
      ></input>
    </>
  );
};

export default ListingFields;
