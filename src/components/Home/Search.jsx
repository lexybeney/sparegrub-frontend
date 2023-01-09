import React from "react";
import { useDispatch } from "react-redux";
import { SEARCH_TERM } from "../../redux/types";
import searchIcon from "../../assets/images/icons/search_filled_green.svg";

const Search = () => {
  const dispatch = useDispatch();
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search for an item"
        onInput={(e) =>
          dispatch({ type: SEARCH_TERM, payload: e.target.value })
        }
      />
      <img alt="Search Icon" src={searchIcon} />
    </div>
  );
};

export default Search;
