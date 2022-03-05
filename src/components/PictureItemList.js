import React, { useState } from "react";
import useItems from "../hooks/useItems";
import PictureItemListItem from "./PictureItemListItem";
import Searchbar from "./Searchbar";

export default function PictureItemList({ filter }) {
  const items = useItems();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="picture-itemlist">
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {items.items.map((item) => {
        if (!filter || filter(item))
          if (item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
            return <PictureItemListItem item={item} />;
      })}
    </div>
  );
}
