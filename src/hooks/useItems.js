import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import useUser from "./useUser";

const ItemsContext = React.createContext();

export default function useItems() {
  return useContext(ItemsContext);
}

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  const { token } = useUser();

  function getItemById(id) {
    return items.find((item) => item._id === id);
  }

  function getItemsStoredIn(id) {
    return items.filter((item) => isStoredIn(item, id));
  }

  function isStoredIn(item, id) {
    return item.storedIn === id;
  }

  const refreshItems = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/items`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setItems([...res.data]);
      })
      .catch((error) => {
        setItems([]);
      });
  }, [token]);

  useEffect(() => {
    refreshItems();
    //console.log("HEA");
  }, [token, refreshItems]);

  const createItem = useCallback(
    (formData) => {
      return axios
        .post(`${process.env.REACT_APP_API_LINK}/items`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          refreshItems();
          alert("Item created");
          return true;
        });
    },
    [token, refreshItems]
  );

  const updateItem = useCallback(
    (id, formData) => {
      return axios
        .put(`${process.env.REACT_APP_API_LINK}/items/${id}`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          refreshItems();
          alert("Item updated");
          return true;
        });
    },
    [token, refreshItems]
  );

  const deleteItem = useCallback(
    (id, formData) => {
      return axios
        .delete(`${process.env.REACT_APP_API_LINK}/items/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          refreshItems();
          alert("item deleted");
          return true;
        });
    },
    [token, refreshItems]
  );

  //console.log(items);

  const result = {
    items,
    getItemById,
    refreshItems,
    isStoredIn,
    getItemsStoredIn,
    createItem,
    updateItem,
    deleteItem,
  };

  return (
    <ItemsContext.Provider value={result}>{children}</ItemsContext.Provider>
  );
}
