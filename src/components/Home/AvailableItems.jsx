import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { getAvailableItems, getUserData } from "../../sparegrubApi";
import Spinner from "react-bootstrap/Spinner";
import { calcDistance } from "../../utils/index";

const AvailableItems = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  let [liveItems, setLiveItems] = useState([]);
  const [itemsRetrieved, setItemsRetrieved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const user = await getUserData(token);
      const user_id = user.id;
      const response = await getAvailableItems(token, user_id);
      setLiveItems(response);
      setItemsRetrieved(true);
    }
    fetchData();
  }, []);

  let items = [...liveItems];

  if (searchTerm) {
    items = items.filter((product) => {
      return product.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  if (itemsRetrieved === false) {
    return (
      <>
        <div className="emptyErrorMessage">
          {" "}
          <Spinner animation="border" />
        </div>
      </>
    );
  }
  const range_preference = user.range_preference.split(" ")[0];
  const itemsInRange = [];
  items.map((item) => {
    const dist = calcDistance(
      user.latitude,
      user.longitude,
      item.latitude,
      item.longitude,
      "M"
    );

    if (dist <= range_preference) {
      item.distance = dist;
      itemsInRange.push(item);
    }
  });

  if (items.length < 1 || itemsInRange < 1) {
    return (
      <div className="emptyErrorMessage">
        <h4>There are no items available within your range!</h4>
        <br></br>
        <h4 className="editProfileText">
          Try editing your range preference under your profile to see more
          items.
        </h4>
      </div>
    );
  } else {
    return (
      <div className="availableItemListing">
        {itemsInRange.map((item) => {
          return <Item key={item.item_id} item={item} />;
        })}
      </div>
    );
  }
};

export default AvailableItems;
