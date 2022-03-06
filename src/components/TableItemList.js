import React, { useEffect, useState } from "react";
import axios from "axios";
import TableItemListItem from "./TableItemListItem";
import useItems from "../hooks/useItems";
import "../styles/itemlist.css";
import Searchbar from "./Searchbar";

function toggleSelection(item) {
  return (arr) => {
    if (!arr.includes(item._id)) {
      arr.push(item._id);
    } else {
      const index = arr.indexOf(item._id);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    return arr;
  };
}

export default function TableItemList({ items }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  function selectItem(item) {
    setSelectedItems(toggleSelection(item));

    console.log(selectedItems);
  }

  console.log("Hello");
  return (
    <div className="itemlist-container">
      <table className="itemlist-list card">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(e.target.checked);
                }}
              ></input>
            </th>
            <th>Item Name</th>
            <th>Stored In</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item._id) || selectAll;
            return (
              <TableItemListItem
                key={item._id}
                item={item}
                selected={isSelected}
                setSelected={selectItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
