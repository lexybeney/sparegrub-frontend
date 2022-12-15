import React from "react";
import { useDispatch } from "react-redux";
import { SEARCH_TERM } from "../../redux/types";

const Search = () => {
  const dispatch = useDispatch();
  return (
    <>
      <input
        type="text"
        placeholder="Search for an item"
        onInput={(e) =>
          dispatch({ type: SEARCH_TERM, payload: e.target.value })
        }
      />
    </>
  );
};

export default Search;
