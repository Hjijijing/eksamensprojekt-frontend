import React, { useState, useEffect } from "react";
import useItems from "../hooks/useItems";
import ItemSelect from "./ItemSelect";
import PillSelector from "./PillSelector";

export default function ItemForm({
  submitHandler,
  cancelHandler,
  enabled,
  item,
  labels,
}) {
  const [itemName, setItemName] = useState(item.itemName ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  const [isContainer, setIsContainer] = useState(item.isContainer ?? false);
  const [storedIn, setStoredIn] = useState(item.storedIn ?? "None");

  function onSubmit(e) {
    e.preventDefault();
    if (enabled)
      submitHandler({
        itemName,
        description,
        isContainer,
        storedIn: storedIn === "None" ? null : storedIn,
      });
  }

  useEffect(() => {
    setItemName(item.itemName ?? "");
    setDescription(item.description ?? "");
    setIsContainer(item.isContainer ?? false);
    setStoredIn(item.storedIn ?? "None");
  }, [item]);

  return (
    <form className="item-form card" id="item-form" onSubmit={onSubmit}>
      <input
        value={itemName}
        type="text"
        name="itemname"
        placeholder="Item Name"
        id="item-form-itemname"
        onChange={(e) => setItemName(e.target.value)}
      />
      <textarea
        value={description}
        type="text"
        name="description"
        placeholder="Description"
        id="item-form-description"
        form="item-form"
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* <input
        value={isContainer ? "on" : "off"}
        type="checkbox"
        name="iscontainer"
        id="item-form-iscontainer"
        onChange={(e) => setIsContainer(e.target.checked)}
      /> */}
      <PillSelector
        options={[
          { value: false, label: "Item" },
          { value: true, label: "Container" },
        ]}
        value={isContainer}
        onChange={setIsContainer}
      />
      <ItemSelect
        filter={(item) => item.isContainer}
        value={storedIn}
        itemChanged={(e) => {
          setStoredIn(e.value);
        }}
      />
      <div id="item-form-buttonrow">
        <button
          type="submit"
          form="item-form"
          name="submit"
          value="Submit"
          id="item-form-submit"
        >
          {labels ? labels.submit : "Create"}
        </button>
        <button
          type="button"
          form="item-form"
          name="cancel"
          id="item-form-cancel"
          onClick={cancelHandler}
        >
          {labels ? labels.cancel : "Cancel"}
        </button>
      </div>
    </form>
  );
}
