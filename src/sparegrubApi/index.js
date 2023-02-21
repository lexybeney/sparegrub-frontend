import axios from "axios";
import { apiUrl } from "./apiUrl";

export const getUserData = async (token) => {
  const result = await axios.get(`${apiUrl}/read/user`, {
    headers: {
      token,
    },
  });
  return result.data.results[0];
};

export const getAvailableItems = async (token, user_id) => {
  const result = await axios.get(`${apiUrl}/read/available-items`, {
    headers: {
      token,
      user_id,
    },
  });
  return result.data.results;
};

export const getUserListing = async (token) => {
  const result = await axios.get(`${apiUrl}/read/listing`, {
    headers: { token },
  });
  if (result.data.status === 1) {
    return result.data.results;
  } else {
    return "No items listed for this user";
  }
};
