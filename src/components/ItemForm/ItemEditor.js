import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useItems from "../../hooks/useItems";
import ItemForm from "./ItemForm";

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
