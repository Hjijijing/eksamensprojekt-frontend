import React, { useState } from "react";
import useItems from "../../../hooks/useItems";
import ItemSelect from "../../Generic/ItemSelect";
import TableItemListItem from "./TableItemListItem";

function toggleSelection(item) {
  return (arr) => {
    if (!arr.includes(item)) {
      arr.push(item);
    } else {
      const index = arr.indexOf(item);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    return arr;
  };
}

export default function TableItemList({ items, bulkactions }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { bulkMoveItems } = useItems();

  const [moveTo, setMoveTo] = useState(null);

  function selectItem(item) {
    const newSelection = toggleSelection(item)(selectedItems);
    setSelectedItems([...newSelection]);
  }

  const anyItemsSelected = selectAll || selectedItems.length > 0;

  return (
    <div className="itemlist-container">
      <div className="table-actions">
        {anyItemsSelected && (
          <>
            <ItemSelect
              filter={(item) => item.isContainer}
              value={moveTo}
              itemChanged={(e) => {
                setMoveTo(e.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                bulkMoveItems(selectAll ? items : selectedItems, moveTo);
              }}
            >
              Bulk move items
            </button>
          </>
        )}
      </div>
      <table className="itemlist-list card">
        <thead>
          <tr>
            {bulkactions && (
              <th id="checkbox">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    setSelectAll(e.target.checked);
                  }}
                ></input>
              </th>
            )}
            <th>Item Name</th>
            <th>Stored In</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item) || selectAll;
            return (
              <TableItemListItem
                key={item._id}
                item={item}
                selectable={bulkactions}
                selected={isSelected}
                setSelected={selectItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
