import { initialState } from "./initialState";
import {
  CREATE_USER,
  SEARCH_TERM,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_SCREEN_MODE,
  ADD_TO_LISTING,
  REMOVE_FROM_LISTING,
  EDIT_PROFILE,
  ADDITIONAL_INFORMATION,
  CHECKOUT,
  CHECKED_OUT_ITEM_COLLECTED,
  ADD_TOKEN,
  SET_USER_LISTING,
} from "./types";
import { getItem } from "../localStorage";
import { storeItem } from "../localStorage";
import { findIndexUsingId } from "../utils";

export function reducer(state = getItem("store") || initialState, action) {
  switch (action.type) {
    case ADD_TOKEN: {
      const newState = { ...state, token: action.payload };
      storeItem("store", newState);
      return newState;
    }

    case CREATE_USER: {
      const { user_name, phone_number, postcode, range_preference, email, id } =
        action.payload;
      const user = {
        id,
        user_name,
        email,
        phone_number,
        postcode,
        range_preference,
      };

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }
    case SEARCH_TERM:
      return { ...state, searchTerm: action.payload };

    case ADD_TO_BASKET: {
      const item = action.payload;
      const availableItems = [...state.availableItems];

      const basket = state.basket ? [...state.basket] : [];

      basket.push(item);

      const indexOfItem = findIndexUsingId(availableItems, item.itemId);

      availableItems.splice(indexOfItem, 1);
      const newState = { ...state, basket, availableItems };

      storeItem("store", newState);

      return newState;
    }
    case REMOVE_FROM_BASKET: {
      const basket = [...state.basket];
      const availableItems = [...state.availableItems];

      const indexOfBasketItem = findIndexUsingId(basket, action.payload.itemId);
      basket.splice(indexOfBasketItem, 1);
      availableItems.push(action.payload);

      const newState = { ...state, basket, availableItems };

      storeItem("store", newState);

      return newState;
    }
    case SET_SCREEN_MODE: {
      const newState = { ...state, screenMode: action.payload };
      storeItem("store", newState);
      return newState;
    }

    case SET_USER_LISTING: {
      const userListing = {
        dateDataRetrieved: Date.now(),
        items: action.payload,
      };

      const newState = { ...state, userListing };

      storeItem("store", newState);

      return newState;
    }

    case ADD_TO_LISTING: {
      const userListing = state.userListing ? [...state.userListing] : [];

      const item = action.payload;

      userListing.push(item);

      const newState = { ...state, userListing };

      storeItem("store", newState);

      return newState;
    }
    case REMOVE_FROM_LISTING: {
      const userListing = { ...state.userListing };

      const indexOfListedItem = findIndexUsingId(
        userListing,
        action.payload.item_id
      );

      userListing.splice(indexOfListedItem, 1);

      const newState = { ...state, userListing };

      storeItem("store", newState);

      return newState;
    }
    case EDIT_PROFILE: {
      const {
        email,
        user_name,
        password,
        phone_number,
        postcode,
        range_preference,
      } = action.payload;
      const user = { ...state.user };

      user.email = email;
      user.user_name = user_name;
      user.password = password;
      user.phone_number = phone_number;
      user.postcode = postcode;
      user.range_preference = range_preference;

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case ADDITIONAL_INFORMATION: {
      const availableItems = { ...state.availableItems };

      const indexOfAvailableItem = findIndexUsingId(availableItems, action.id);

      return { ...state, additionalInformation: indexOfAvailableItem };
    }
    case CHECKOUT: {
      const basket = { ...state.basket };
      const availableItems = { ...state.availableItems };
      const checkedOutItems = { ...state.checkedOutItems };

      basket.forEach((item) => {
        checkedOutItems.push(item);
        const indexOfItem = findIndexUsingId(basket, item.id);
        availableItems.splice(indexOfItem, 1);
      });

      const newState = { ...state, checkedOutItems, basket: [] };

      storeItem("store", newState);

      return newState;
    }
    case CHECKED_OUT_ITEM_COLLECTED: {
      const checkedOutItems = { ...state.checkedOutItems };

      const indexOfItem = findIndexUsingId(checkedOutItems, action.payload);

      checkedOutItems.splice(indexOfItem, 1);

      const newState = { ...state, checkedOutItems };

      storeItem("store", newState);

      return newState;
    }

    default:
      return state;
  }
}
