import React from "react";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import { Nav, Container } from "react-bootstrap";
import homeIcon from "../../assets/images/icons/home_dark.svg";
import basketIcon from "../../assets/images/icons/basket_dark.svg";
import profileIcon from "../../assets/images/icons/profile_dark.svg";
import notificationsIcon from "../../assets/images/icons/notifications_dark.svg";
import listingIcon from "../../assets/images/icons/listing_dark.svg";
import { navigationSchema } from "./navigationSchema";

const Navigation = () => {
  const dispatch = useDispatch();
  const icons = {
    homeIcon,
    basketIcon,
    profileIcon,
    notificationsIcon,
    listingIcon,
  };
  return (
    <>
      <nav>
        <Nav className="fixed-bottom">
          <Container className="d-flex justify-content-around gap-2 nav-justified">
            {navigationSchema.map((item) => {
              const itemName = item.name;

              return (
                <Nav.Item
                  key={item.name}
                  className="d-flex flex-column justify-content-center"
                  onClick={() => {
                    dispatch({ type: SET_SCREEN_MODE, payload: itemName });
                  }}
                >
                  <img src={icons[item.iconName]} alt={`${item.name} Icon`} />
                  <p>{item.name}</p>
                </Nav.Item>
              );
            })}
          </Container>
        </Nav>
      </nav>
    </>
  );
};

export default Navigation;
