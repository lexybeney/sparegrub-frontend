import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

const AvailableItems = () => {
  const availableItems = useSelector((state) => state.availableItems);
  const searchTerm = useSelector((state) => state.searchTerm);

  let items = [...availableItems];

  if (searchTerm) {
    items = items.filter((product) => {
      return product.item.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  if (items.length > 0) {
    return (
      <>
        {items.map((item) => {
          return <Item key={item.itemId} item={item} />;
        })}
      </>
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
