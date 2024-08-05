import React from "react";
import "./SearchBox.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box">
      <label htmlFor="search-input">Find contacts by name</label>
      <input id="search-input" type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBox;
