import React, { useState } from "react";
import useItems, { sortByDate, sortByName } from "../../hooks/useItems";
import PictureItemList from "./PictureList/PictureItemList";
import PillSelector from "../Generic/PillSelector";
import Searchbar from "./Searchbar";
import TableItemList from "./TableList/TableItemList";

export default function ItemList({
  filter,
  tableMode = true,
  modeToggle = false,
  bulkactions = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [useTableMode, setUseTableMode] = useState(
    JSON.parse(localStorage.getItem("tablemode")) ?? tableMode
  );
  const { getSortedItems } = useItems();
  const items = getSortedItems();

  const itemsToShow = items.filter((item) => {
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
          onChange={(v) => {
            setUseTableMode(v);
            localStorage.setItem("tablemode", v);
          }}
        />
      )}
      {useTableMode ? (
        <TableItemList items={itemsToShow} bulkactions={bulkactions} />
      ) : (
        <PictureItemList items={itemsToShow} />
      )}
    </div>
  );
}
