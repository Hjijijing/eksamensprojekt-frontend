import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import useItems from "../hooks/useItems";

export default function ItemCreator() {
  const [enabled, setEnabled] = useState(true);
  const [item, setItem] = useState({});
  const items = useItems();

  function submitHandler(data) {
    console.log(data);
    setEnabled(false);
    axios.post("http://localhost:5000/items", data).then((res) => {
      setEnabled(true);
      setItem({});
      items.refreshItems();
      alert("Item created");
    });
  }

  return (
    <ItemForm submitHandler={submitHandler} enabled={enabled} item={item} />
  );
}
