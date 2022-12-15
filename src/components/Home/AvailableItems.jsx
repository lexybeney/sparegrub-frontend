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
        <h2>Available Items</h2>
        {items.map((item) => {
          return <Item key={item.itemId} item={item} />;
        })}
      </>
    );
  } else {
    return (
      <>
        <h2>Available Items</h2>
        <p>Sorry, there are no items available in your area</p>
      </>
    );
  }
};

export default AvailableItems;
