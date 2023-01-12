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
