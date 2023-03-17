import React from "react";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem";
import { Accordion } from "react-bootstrap";

const UserListing = () => {
  const userListing = useSelector((state) => state.userListing.items);

  if (
    userListing === "No items listed for this user" ||
    userListing.length === 0
  ) {
    return (
      <>
        <p>You haven't got any items listed!</p>
      </>
    );
  } else {
    return (
      <>
        <h6>Items still available:</h6>
        <Accordion>
          {userListing.map((item) => {
            return <ListingItem key={item.item_id} item={item} />;
          })}
        </Accordion>
      </>
    );
  }
};

export default UserListing;
