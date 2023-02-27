import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_BASKET, REPLACE_BASKET } from "../../redux/types";
import { Card, Button } from "react-bootstrap";
import addButton from "../../assets/images/icons/plus_sign_white.svg";
import locationIcon from "../../assets/images/icons/location_blue.svg";
import axios from "axios";
import { apiUrl } from "../../sparegrubApi/apiUrl";
import { getUserBasket, getUserData } from "../../sparegrubApi";

const Item = (props) => {
  const token = useSelector((state) => state.token);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  let {
    item_name,
    quantity,
    collection_location,
    extra_details,
    collection_details,
    item_id,
  } = props.item;
  const dispatch = useDispatch();

  const add = async () => {
    const user = await getUserData(token);
    const user_id = user.id;
    setAdding(true);
    const result = await axios.post(`${apiUrl}/create/in_basket`, {
      user_id,
      item_id,
    });

    if (result.data.status === 1) {
      setAdded(true);
      await axios.put(
        `${apiUrl}/update/item`,
        {
          id: item_id,
          status: "in_basket",
          token: token,
        },
        {
          headers: { token: token },
        }
      );

      dispatch({ type: ADD_TO_BASKET, payload: props.item });
      const user = await getUserData(token);
      const user_id = user.id;
      const basket = await getUserBasket(token, user_id);
      dispatch({ type: REPLACE_BASKET, payload: basket });
    } else {
      setError(true);
    }
  };

  if (
    extra_details === null ||
    extra_details === undefined ||
    extra_details === ""
  ) {
    extra_details = "N/A";
  }

  if (
    collection_details === null ||
    collection_details === undefined ||
    collection_details === ""
  ) {
    collection_details = "N/A";
  }

  return (
    <Card body>
      <h5>{item_name}</h5>
      <p>{`Quantity: ${quantity}`}</p>
      <p>{`Extra details: ${extra_details}`}</p>
      <p>{`Collection details: ${collection_details}`}</p>
      <div className="location">
        <img alt="Location icon" src={locationIcon} />
        <p>{collection_location}</p>
      </div>

      <Button
        className="btn-listing"
        onClick={() => {
          add();
        }}
      >
        <img
          className={adding ? "addingItem" : ""}
          alt="Add sign"
          src={addButton}
        />
        <p>
          {error
            ? "Error adding to basket"
            : added
            ? "Added to basket!"
            : adding
            ? "Adding..."
            : "Add to basket"}
        </p>
      </Button>
    </Card>
  );
};

export default Item;
