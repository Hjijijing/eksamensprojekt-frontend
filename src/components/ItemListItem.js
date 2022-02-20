import React from "react";

export default function ItemListItem({ item }) {
  return (
    <div>
      {item.itemName} {item.description} {"" + item.storedIn}{" "}
      {"" + item.isContainer}
    </div>
  );
}
