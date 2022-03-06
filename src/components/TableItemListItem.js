import React from "react";
import useItems from "../hooks/useItems";
import { Link } from "react-router-dom";
import ItemLink from "./ItemLink";

export default function TableItemListItem({
  item,
  selected = false,
  setSelected,
}) {
  const items = useItems();
  const storedIn = items.getItemById(item.storedIn);

  return (
    <tr className="itemlist-item">
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => setSelected(item)}
        />
      </td>
      <td>
        <ItemLink item={item} />
      </td>
      <td>{storedIn ? <ItemLink item={storedIn} /> : ""}</td>
    </tr>
  );
}
