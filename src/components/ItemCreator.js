import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import useItems from "../hooks/useItems";
import { useNavigate } from "react-router-dom";

export default function ItemCreator() {
  const [enabled, setEnabled] = useState(true);
  const [item, setItem] = useState({});
  const items = useItems();
  const navigate = useNavigate();

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

  function cancelHandler(e) {
    navigate("/");
  }

  return (
    <ItemForm
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      enabled={enabled}
      item={item}
    />
  );
}
