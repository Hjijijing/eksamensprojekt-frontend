import React from "react";

export default function ItemListItem({ item }) {
  return (
    <tr className="itemlist-item">
      <td>{item.itemName}</td>
      <td>{"" + item.storedIn}</td>
    </tr>
  );
}
