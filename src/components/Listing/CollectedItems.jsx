import React from "react";
import { useSelector } from "react-redux";
import CollectItem from "./CollectItem";
import { Accordion } from "react-bootstrap";

const CollectedItems = () => {
  const items = useSelector((state) => state.itemsToBeCollected);

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
};

export default CollectedItems;
