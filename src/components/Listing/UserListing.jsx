import React from "react";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem";
import { Accordion } from "react-bootstrap";

const UserListing = () => {
  const userListing = useSelector((state) => state.userListing.items);

  if (userListing !== "No items listed for this user") {
    return (
      <>
        <Accordion>
          {userListing.map((item) => {
            return <ListingItem key={item.item_id} item={item} />;
          })}
        </Accordion>
      </>
    );
  } else {
    return (
      <>
        <p>You haven't got any items listed!</p>
      </>
    );
  }
};

export default UserListing;
