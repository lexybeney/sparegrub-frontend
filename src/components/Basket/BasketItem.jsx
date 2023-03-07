import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_BASKET, REPLACE_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import locationIcon from "../../assets/images/icons/location_blue.svg";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import axios from "axios";
import { getUserData, getUserBasket } from "../../sparegrubApi";
import bin from "../../assets/images/icons/bin_blue.svg";

const BasketItem = (props) => {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState(false);
  const token = useSelector((state) => state.token);

  let {
    item_name,
    quantity,
    collection_location,
    extra_details,
    collection_details,
    item_id,
  } = props.item;
  const dispatch = useDispatch();

  if (extra_details === null || undefined) {
    extra_details = "N/A";
  }

  if (collection_details === null || undefined) {
    collection_details = "N/A";
  }

  const remove = async () => {
    setRemoving(true);
    const result = await axios.put(
      `${apiUrl}/update/item`,
      { status: "available", id: item_id },
      { headers: { token } }
    );

    if (result.data.status === 1) {
      dispatch({ type: REMOVE_FROM_BASKET, payload: props.item });
      const user = await getUserData(token);
      const user_id = user.id;
      const basket = await getUserBasket(token, user_id);
      dispatch({ type: REPLACE_BASKET, payload: basket });
    } else {
      setError(true);
    }
  };

  const collect = async () => {
    const result = await axios.put(
      `${apiUrl}/update/item`,
      { status: "collected", id: item_id },
      { headers: { token } }
    );
  };

  return (
    <Card body>
      <div className="checkoutHeader">
        <h5>{item_name}</h5>
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => {
            remove();
          }}
        >
          {error ? (
            "Error removing from basket"
          ) : removing ? (
            "Removing..."
          ) : (
            <img alt="Move to bin" src={bin} />
          )}
        </Button>
      </div>
      <p>{`Quantity: ${quantity}`}</p>
      <p>{`Extra details: ${extra_details}`}</p>
      <p>{`Collection details: ${collection_details}`}</p>
      <div className="location">
        <img alt="Location icon" src={locationIcon} />
        <p>{collection_location}</p>
      </div>

      <Button
        onClick={() => {
          collect();
        }}
      >
        Collect item
      </Button>
    </Card>
  );
};

export default BasketItem;
