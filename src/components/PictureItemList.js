import React, { useState } from "react";
import useItems from "../hooks/useItems";
import PictureItemListItem from "./PictureItemListItem";
import Searchbar from "./Searchbar";

export default function PictureItemList({ items }) {
  return (
    <div className="picture-itemlist">
      {items.map((item) => {
        return <PictureItemListItem item={item} key={item._id} />;
      })}
    </div>
  );
}
