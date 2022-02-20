import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const ItemsContext = React.createContext();

export default function useItems() {
  return useContext(ItemsContext);
}

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  function getItemById(id) {
    return items.find((item) => item._id === id);
  }

  function refreshItems() {
    axios.get("http://localhost:5000/items").then((res) => {
      setItems(res.data);
    });
  }

  useEffect(() => {
    refreshItems();
  }, []);

  const result = { items, getItemById, refreshItems };

  return (
    <ItemsContext.Provider value={result}>{children}</ItemsContext.Provider>
  );
}
