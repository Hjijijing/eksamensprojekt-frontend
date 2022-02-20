import React from "react";
import useItems from "../hooks/useItems";

export default function ItemListItem({ item }) {
  const items = useItems();
  const storedIn = items.getItemById(item.storedIn);

  return (
    <tr className="itemlist-item">
      <td>{item.itemName}</td>
      <td>{storedIn ? storedIn.itemName : "None"}</td>
    </tr>
  );
}
