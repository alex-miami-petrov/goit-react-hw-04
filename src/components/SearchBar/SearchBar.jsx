import React, { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(query);
    setQuery("");
  };
  return (
    <header>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          id="search-input"
          name="searchQuery"
          value={query}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
