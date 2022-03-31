import React from "react";
import PictureItemListItem from "./PictureItemListItem";

export default function PictureItemList({ items }) {
  return (
    <div className="picture-itemlist">
      {items.map((item) => {
        return <PictureItemListItem item={item} key={item._id} />;
      })}
    </div>
  );
}
