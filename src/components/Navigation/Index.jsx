import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "../../redux/types";
import { Nav, Container } from "react-bootstrap";
import homeIconDark from "../../assets/images/icons/home_dark.svg";
import basketIconDark from "../../assets/images/icons/basket_dark.svg";
import profileIconDark from "../../assets/images/icons/profile_dark.svg";
import notificationsIconDark from "../../assets/images/icons/notifications_dark.svg";
import listingIconDark from "../../assets/images/icons/listing_dark.svg";
import { navigationSchema } from "./navigationSchema";
import homeIconGreen from "../../assets/images/icons/home_green.svg";
import basketIconGreen from "../../assets/images/icons/basket_green.svg";
import profileIconGreen from "../../assets/images/icons/profile_green.svg";
import notificationsIconGreen from "../../assets/images/icons/notifications_green.svg";
import listingIconGreen from "../../assets/images/icons/listing_green.svg";

const Navigation = () => {
  const dispatch = useDispatch();
  const darkIcons = {
    homeIconDark,
    basketIconDark,
    profileIconDark,
    notificationsIconDark,
    listingIconDark,
  };

  const greenIcons = {
    homeIconGreen,
    basketIconGreen,
    profileIconGreen,
    notificationsIconGreen,
    listingIconGreen,
  };

  const screenMode = useSelector((state) => state.screenMode);

  navigationSchema.map((item) => {
    if (item.name === screenMode) {
      return (item.screenMode = true);
    }
    return (item.screenMode = false);
  });

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
                  className="d-flex flex-column justify-content-center nav-icons"
                  onClick={() => {
                    dispatch({ type: SET_SCREEN_MODE, payload: itemName });
                  }}
                >
                  <img
                    src={
                      item.screenMode === false
                        ? darkIcons[item.iconName + "Dark"]
                        : greenIcons[item.iconName + "Green"]
                    }
                    alt={`${item.name} Icon`}
                  />
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
