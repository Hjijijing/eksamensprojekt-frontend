import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemListItem from "./ItemListItem";

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/items").then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      {items.map((item) => (
        <ItemListItem key={item._id} item={item} />
      ))}
    </div>
  );
}
