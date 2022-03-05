import React from "react";
import useItems from "../hooks/useItems";
import { Link } from "react-router-dom";
import ItemLink from "./ItemLink";

export default function TableItemListItem({ item }) {
  const items = useItems();
  const storedIn = items.getItemById(item.storedIn);

  return (
    <tr className="itemlist-item">
      <td>
        <ItemLink item={item} />
      </td>
      <td>{storedIn ? <ItemLink item={storedIn} /> : ""}</td>
    </tr>
  );
}