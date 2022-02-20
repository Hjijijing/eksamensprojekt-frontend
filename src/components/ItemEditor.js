import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";

export default function ItemEditor({ item }) {
  const [enabled, setEnabled] = useState(true);

  function submitHandler(data) {
    setEnabled(false);
    axios.put(`http://localhost:5000/items/${item._id}`, data).then(() => {
      setEnabled(true);
      alert("Item updated");
    });
  }

  return (
    <ItemForm submitHandler={submitHandler} item={item} enabled={enabled} />
  );
}
