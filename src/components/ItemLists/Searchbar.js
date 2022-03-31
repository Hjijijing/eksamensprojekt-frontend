import React from "react";

export default function Searchbar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="itemlist-search"
      type="text"
      placeholder="Search Items..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
