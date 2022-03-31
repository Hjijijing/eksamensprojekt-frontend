import React from "react";
import Select from "react-select";
import useItems from "../../hooks/useItems";

export default function ItemSelect({ filter, value, itemChanged }) {
  const items = useItems();
  const options = [{ value: "None", label: "None" }];

  items.items.forEach((item) => {
    if (filter(item)) options.push({ value: item._id, label: item.itemName });
  });

  return (
    <Select
      options={options}
      form="item-form"
      id="item-form-storedin"
      defaultValue="None"
      value={{ value, label: items.getItemById(value)?.itemName ?? "None" }}
      onChange={itemChanged}
      placeholder="Store in"
    />
  );
}
