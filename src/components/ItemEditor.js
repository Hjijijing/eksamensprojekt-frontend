import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import useItems from "../hooks/useItems";

export default function ItemEditor({ item }) {
  const [enabled, setEnabled] = useState(true);
  const items = useItems();
  item = items.items[0];

  function submitHandler(data) {
    setEnabled(false);
    axios.put(`http://localhost:5000/items/${item._id}`, data).then(() => {
      setEnabled(true);
      alert("Item updated");
      items.refreshItems();
    });
  }

  return (
    <ItemForm
      submitHandler={submitHandler}
      item={item ?? {}}
      enabled={enabled}
    />
  );
}
