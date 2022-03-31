import React from "react";
import useItems from "../../../hooks/useItems";
import ItemImage from "../../Generic/ItemImage";
import ItemLink from "../../Generic/ItemLink";

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
        <p>{new Date(item.createdAt).toLocaleDateString("en-gb")}</p>
        {storedIn && (
          <>
            {"Stored In: "}
            <ItemLink item={storedIn} />
          </>
        )}
      </div>

      <ItemImage image={item.image} />
    </div>
  );
}
