import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem";
import { Accordion } from "react-bootstrap";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";

const UserListing = () => {
  // const userListing = useSelector((state) => state.userListing);
  const token = useSelector((state) => state.token);
  let [listing, setListing] = useState(null);

  useEffect(() => {
    async function getListing() {
      const result = await axios.get(`${apiUrl}/read/listing`, {
        headers: { token },
      });
      if (result.data.status === 1) {
        setListing(result.data.results);
      }
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
