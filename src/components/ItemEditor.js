import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import useItems from "../hooks/useItems";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemEditor() {
  const [enabled, setEnabled] = useState(true);
  const items = useItems();
  const { updateItem, deleteItem } = items;

  const { id } = useParams();
  const item = items.getItemById(id);
  const navigate = useNavigate();

  function submitHandler(data) {
    setEnabled(false);

    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("item", JSON.stringify(data.item));

    updateItem(item._id, formData).then((res) => {
      setEnabled(true);
    });
  }

  function cancelHandler(e) {
    setEnabled(false);
    deleteItem(id).then(() => {
      navigate("/");
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
