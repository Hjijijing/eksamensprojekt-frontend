import React, { useState } from "react";
import useItems from "../hooks/useItems";
import PictureItemList from "./PictureItemList";
import PillSelector from "./PillSelector";
import Searchbar from "./Searchbar";
import TableItemList from "./TableItemList";

export default function ItemList({
  filter,
  tableMode = true,
  modeToggle = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [useTableMode, setUseTableMode] = useState(tableMode);
  const items = useItems();

  const itemsToShow = items.items.filter((item) => {
    if (!filter || filter(item))
      return item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    return false;
  });

  return (
    <div className="itemlist">
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {modeToggle && (
        <PillSelector
          options={[
            { value: false, label: "Images" },
            { value: true, label: "Table" },
          ]}
          value={useTableMode}
          onChange={setUseTableMode}
        />
      )}
      {useTableMode ? (
        <TableItemList items={itemsToShow} />
      ) : (
        <PictureItemList items={itemsToShow} />
      )}
    </div>
  );
}
