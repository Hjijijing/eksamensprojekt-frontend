import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";

export default function ItemCreator({ items }) {
  const [enabled, setEnabled] = useState(true);
  const [item, setItem] = useState({});

  function submitHandler(data) {
    console.log(data);
    setEnabled(false);
    axios.post("http://localhost:5000/items", data).then((res) => {
      setEnabled(true);
      alert("Item created");
      setItem({});
    });
  }

  return (
    <ItemForm
      submitHandler={submitHandler}
      enabled={enabled}
      item={item}
      items={items}
    />
  );
}
