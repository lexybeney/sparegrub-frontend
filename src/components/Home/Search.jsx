import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_TERM } from "../../redux/types";
import searchIcon from "../../assets/images/icons/search_green.svg";

const Search = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SEARCH_TERM, payload: "" });
  });

  return (
    <div className="searchArea">
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
    </div>
  );
};

export default Search;
