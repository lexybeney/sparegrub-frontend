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
  CHECKOUT,
  ADD_TOKEN,
  SET_USER_LISTING,
  REPLACE_BASKET,
  LOGOUT,
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
      const { user_name, phone_number, postcode, range_preference, email } =
        action.payload;
      const user = {
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

      const {
        collection_details,
        collection_location,
        date_added_to_basket,
        date_item_listed,
        extra_details,
        item_id,
        item_name,
        quantity,
      } = item;

      const newItem = {
        collection_details,
        collection_location,
        date_added_to_basket,
        date_item_listed,
        extra_details,
        item_id,
        item_name,
        quantity,
      };

      const basket = state.basket ? [...state.basket] : [];

      basket.push(newItem);

      const newState = { ...state, basket };

      storeItem("store", newState);

      return newState;
    }
    case REMOVE_FROM_BASKET: {
      const basket = [...state.basket];

      const indexOfBasketItem = findIndexUsingId(
        basket,
        action.payload.item_id
      );
      basket.splice(indexOfBasketItem, 1);

      const newState = { ...state, basket };

      storeItem("store", newState);

      return newState;
    }
    case REPLACE_BASKET: {
      const basket = action.payload;

      const newState = { ...state, basket };

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
      const userListing = state.userListing;

      const item = action.payload;
      item.date_added = Date.now();

      userListing.items.push(item);

      const newState = { ...state, userListing };

      storeItem("store", newState);

      return newState;
    }
    case REMOVE_FROM_LISTING: {
      const listingItems = [...state.userListing.items];

      const indexOfListedItem = findIndexUsingId(
        listingItems,
        action.payload.item_id
      );

      listingItems.splice(indexOfListedItem, 1);

      const newState = {
        ...state,
        userListing: { ...state.userListing, items: [...listingItems] },
      };

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
    case LOGOUT: {
      const token = action.payload;

      const newState = { ...state, token };

      return newState;
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

    default:
      return state;
  }
}
