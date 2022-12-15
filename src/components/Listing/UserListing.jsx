import React from "react";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem";
import { Accordion } from "react-bootstrap";

const UserListing = () => {
  const userListing = useSelector((state) => state.userListing);

  if (userListing) {
    return (
      <>
        <Accordion>
          {userListing.map((item) => {
            return <ListingItem key={item.itemId} item={item} />;
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
