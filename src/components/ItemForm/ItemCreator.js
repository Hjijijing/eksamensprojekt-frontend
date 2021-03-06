import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useItems from "../../hooks/useItems";
import ItemForm from "./ItemForm";

export default function ItemCreator() {
  const [enabled, setEnabled] = useState(true);
  const [item, setItem] = useState({});
  const items = useItems();
  const { createItem } = items;
  const navigate = useNavigate();

  function submitHandler(data) {
    setEnabled(false);

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("item", JSON.stringify(data.item));

    createItem(formData).then(() => {
      setEnabled(true);
      setItem({});
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
