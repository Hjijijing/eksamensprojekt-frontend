import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemListItem from "./ItemListItem";
import "../styles/itemlist.css";

export default function ItemList({ items }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="itemlist-container">
      <input
        className="itemlist-search"
        type="text"
        placeholder="Search Items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="itemlist-list">
        <tr>
          <th>Item Name</th>
          <th>Stored In</th>
        </tr>
        {items.map((item) => {
          if (item.itemName.includes(searchTerm))
            return <ItemListItem key={item._id} item={item} />;
        })}
      </table>
    </div>
  );
}
