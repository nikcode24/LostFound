import React from "react";
import { FaSearchLocation } from "react-icons/fa";

const SearchBar = ({ keyword, setKeyword, location, setLocation, onSearch }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Key in Nepal"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}  // 🎯 action listener
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)} // 🎯 action listener
      >
        <option>Nepal</option>
        <option>India</option>
      </select>

      <button onClick={onSearch}>
        <FaSearchLocation className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;