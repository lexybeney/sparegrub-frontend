import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListingItem from "./ListingItem";
import { Accordion } from "react-bootstrap";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";
import { getUserListing } from "../../sparegrubApi";
import { SET_USER_LISTING } from "../../redux/types";

const UserListing = () => {
  // const userListing = useSelector((state) => state.userListing);
  const token = useSelector((state) => state.token);
  let [listing, setListing] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // async function getListing() {
    //   const result = await axios.get(`${apiUrl}/read/listing`, {
    //     headers: { token },
    //   });
    //   if (result.data.status === 1) {
    //     setListing(result.data.results);
    //   }
    // }
    // getListing();

    async function getListing() {
      const userListing = await getUserListing(token);
      if (userListing === "No items listed for this user") {
        return;
      }
      setListing(userListing);
      dispatch({ type: SET_USER_LISTING, payload: userListing });
    }
    getListing();
  }, []);

  if (listing !== null) {
    return (
      <>
        <Accordion>
          {listing.map((item) => {
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
