import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import useItems from "../hooks/useItems";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemEditor() {
  const [enabled, setEnabled] = useState(true);
  const items = useItems();

  const { id } = useParams();
  const item = items.getItemById(id);
  const navigate = useNavigate();

  function submitHandler(data) {
    setEnabled(false);
    axios.put(`http://localhost:5000/items/${item._id}`, data).then(() => {
      setEnabled(true);
      alert("Item updated");
      items.refreshItems();
    });
  }

  function cancelHandler(e) {
    setEnabled(false);
    axios.delete(`http://localhost:5000/items/${item._id}`).then(() => {
      items.refreshItems();
      navigate("/");
      alert("item deleted");
    });
  }

  return (
    <ItemForm
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      labels={{ submit: "Update", cancel: "Delete" }}
      item={item ?? {}}
      enabled={enabled}
    />
  );
}
