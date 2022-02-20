import React, { useState, useEffect } from "react";

export default function ItemForm({ submitHandler, enabled, item, items }) {
  const [itemName, setItemName] = useState(item.itemName ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  const [isContainer, setIsContainer] = useState(item.isContainer ?? false);
  const [storedIn, setStoredIn] = useState("None");

  useEffect(() => {
    setItemName(item.itemName ?? "");
    setDescription(item.description ?? "");
    setIsContainer(item.isContainer ?? "false");
  }, [item]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (enabled)
          submitHandler({
            itemName,
            description,
            isContainer,
            storedIn: storedIn === "None" ? null : storedIn,
          });
      }}
    >
      <input
        value={itemName}
        type="text"
        name="itemname"
        placeholder="Item Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        value={description}
        type="text"
        name="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        value={isContainer ? "on" : "off"}
        type="checkbox"
        name="iscontainer"
        onChange={(e) => setIsContainer(e.target.checked)}
      />
      <select
        value={storedIn}
        onChange={(e) => {
          setStoredIn(e.target.value);
        }}
      >
        <option value="None">None</option>
        {items.map((item) => {
          if (item.isContainer)
            return (
              <option value={item._id} key={item._id}>
                {item.itemName}
              </option>
            );
        })}
      </select>
      <input type="submit" name="submit" value="Submit" />
    </form>
  );
}
