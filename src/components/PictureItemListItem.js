import React from "react";
import useItems from "../hooks/useItems";
import ItemImage from "./ItemImage";
import ItemLink from "./ItemLink";

export default function PictureItemListItem({ item }) {
  const items = useItems();
  const storedIn = items.getItemById(item.storedIn);

  return (
    <div className="picture-itemlist-item">
      <div className="iteminfo">
        <ItemLink item={item}>
          <p id="itemName">{item.itemName}</p>
        </ItemLink>
        <p id="description">{item.description}</p>
        {storedIn && (
          <>
            {"Stored In: "}
            <ItemLink item={storedIn} />
          </>
        )}
      </div>
      <div id="itemimage">
        <ItemImage image={item.image} />
      </div>
    </div>
  );
}
