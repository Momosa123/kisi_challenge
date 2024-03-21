import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom'
// import useHistory here.
import config from "../envConfig";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? config.production.baseUrl
    : config.development.baseUrl;
const Search = () => {
  let navigate = useNavigate();
  const searchInputRef = useRef();

  const onSearchHandler = e => {
    e.preventDefault();
    const searchQuery = new URLSearchParams({
      name: searchInputRef.current.value,
    }).toString();

    // imperatively redirect with navigate
    navigate(`${baseUrl}/search?${searchQuery}`);
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
