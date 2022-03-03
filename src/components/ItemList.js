import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemListItem from "./ItemListItem";
import useItems from "../hooks/useItems";
import "../styles/itemlist.css";

export default function ItemList({ filter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const items = useItems();

  return (
    <div className="itemlist-container">
      <input
        className="itemlist-search"
        type="text"
        placeholder="Search Items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="itemlist-list card">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Stored In</th>
          </tr>
        </thead>
        <tbody>
          {items.items.map((item) => {
            if (!filter || filter(item))
              if (
                item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return <ItemListItem key={item._id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
