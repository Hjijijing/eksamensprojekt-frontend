import React, { useEffect, useState } from "react";
import axios from "axios";
import TableItemListItem from "./TableItemListItem";
import useItems from "../hooks/useItems";
import "../styles/itemlist.css";
import Searchbar from "./Searchbar";

export default function TableItemList({ items }) {
  return (
    <div className="itemlist-container">
      <table className="itemlist-list card">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Stored In</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return <TableItemListItem key={item._id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
