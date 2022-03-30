import React, { useState, useEffect } from "react";
import useItems from "../hooks/useItems";
import PictureForm from "./PictureForm";
import TableItemList from "./TableItemList";
import ItemSelect from "./ItemSelect";
import PillSelector from "./PillSelector";
import ItemList from "./ItemList";
import useAlert from "../hooks/useAlert";

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
  const [image, setImage] = useState(item.image ?? null);
  const items = useItems();
  const { warning } = useAlert();

  function onSubmit(e) {
    e.preventDefault();
    if (itemName === "") {
      warning("Item must have a name!");
      return;
    }
    if (enabled)
      submitHandler({
        image: image,
        item: {
          itemName,
          description,
          isContainer,
          storedIn: storedIn === "None" ? null : storedIn,
        },
      });
  }

  useEffect(() => {
    setItemName(item.itemName ?? "");
    setDescription(item.description ?? "");
    setIsContainer(item.isContainer ?? false);
    setStoredIn(item.storedIn ?? "None");
    setImage(item.image ?? null);
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
        className="card"
      />
      <textarea
        value={description}
        type="text"
        name="description"
        placeholder="Description"
        id="item-form-description"
        form="item-form"
        className="card"
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
      <PictureForm image={image} setImage={setImage} />
      <div id="item-form-buttonrow">
        <button
          type="submit"
          form="item-form"
          name="submit"
          value="Submit"
          id="item-form-submit"
          className="card"
        >
          {labels ? labels.submit : "Add"}
        </button>
        <button
          type="button"
          form="item-form"
          name="cancel"
          id="item-form-cancel"
          className="card"
          onClick={cancelHandler}
        >
          {labels ? labels.cancel : "Cancel"}
        </button>
      </div>

      {item._id && item.isContainer && (
        <span id="storedinthis">
          <p>Stored in this</p>
          <ItemList
            filter={(other) => items.isStoredIn(other, item._id)}
            modeToggle={false}
            tableMode={true}
          ></ItemList>
        </span>
      )}
    </form>
  );
}
