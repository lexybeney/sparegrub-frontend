import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";

const CollectedItem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: SET_SCREEN_MODE, payload: "Basket" });
    }, 3700);
  }, []);

  return (
    <Container className="collectionConfirmationPage">
      <div class="wrapper">
        <svg
          class="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            class="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            class="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <div className="confirmationText">
        <h5>This item has been marked as collected</h5>
        <h5 className="collectionMessage">
          You will receive the collection details by email
        </h5>
      </div>
    </Container>
  );
};

export default CollectedItem;
