import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { getAvailableItems } from "../../sparegrubApi";
import Spinner from "react-bootstrap/Spinner";

const AvailableItems = () => {
  // const availableItems = useSelector((state) => state.availableItems);
  const searchTerm = useSelector((state) => state.searchTerm);
  const token = useSelector((state) => state.token);
  let [liveItems, setLiveItems] = useState([]);
  const [itemsRetrieved, setItemsRetrieved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getAvailableItems(token);
      setLiveItems(response);
      // setItemsRetrieved(true);
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
        <h2 className="emptyErrorMessage">Loading...</h2>
        <Spinner animation="border" />
      </>
    );
  }

  if (items.length > 0) {
    return (
      <div className="availableItemListing">
        {items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="emptyErrorMessage">
        <h4>There are no items available within your range!</h4>
        <br></br>
        <h4>
          Try editing your range preference under your profile to see more
          items.
        </h4>
      </div>
    );
  }
};

export default AvailableItems;
