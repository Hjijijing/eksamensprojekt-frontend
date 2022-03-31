import React from "react";
import useItems from "../../../hooks/useItems";
import ItemLink from "../../Generic/ItemLink";

export default function TableItemListItem({
  item,
  selected = false,
  setSelected,
  selectable = false,
}) {
  const items = useItems();
  const storedIn = items.getItemById(item.storedIn);

  return (
    <tr className="itemlist-item">
      {selectable && (
        <td id="checkbox">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(item)}
          />
        </td>
      )}
      <td>
        <ItemLink item={item} />
      </td>
      <td>{storedIn ? <ItemLink item={storedIn} /> : ""}</td>
    </tr>
  );
}
