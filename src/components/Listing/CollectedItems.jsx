import React from "react";
import { useSelector } from "react-redux";
import CollectItem from "./CollectItem";
import { Accordion } from "react-bootstrap";

const CollectedItems = () => {
  const items = useSelector((state) => state.itemsToBeCollected);

  if (items.length === 0) {
    return (
      <div className="collectedItems">
        <h6>Items to be collected:</h6>
        <p>None of your items are currently waiting to be collected</p>
      </div>
    );
  } else {
    return (
      <div className="collectedItems">
        <h6>Items to be collected:</h6>
        <Accordion>
          {items.map((item) => {
            return <CollectItem key={item.item_id} item={item} />;
          })}
        </Accordion>
      </div>
    );
  }
};

export default CollectedItems;
