import React, { useState, useEffect, useContext, useCallback } from "react";
import useAlert from "./useAlert";
import axios from "axios";
import useUser from "./useUser";

const ItemsContext = React.createContext();

export const sortByIsStoredIn =
  (reverse = false) =>
  (a, b) => {
    if (a.storedIn && !b.storedIn) return -1 * (reverse ? -1 : 1);
    else if (!a.storedIn && b.storedIn) return 1 * (reverse ? -1 : 1);
    else return 0;
  };

export const sortByDate =
  (reverse = false) =>
  (a, b) => {
    return (new Date(a.createdAt) - new Date(b.createdAt)) * (reverse ? -1 : 1);
  };

export const sortByIsContainer =
  (reverse = false) =>
  (a, b) => {
    if (a.isContainer && !b.isContainer) return -1 * (reverse ? -1 : 1);
    else if (!a.isContainer && b.isContainer) return 1 * (reverse ? -1 : 1);
    else return 0;
  };

export const sortByName =
  (reverse = false) =>
  (a, b) => {
    if (a.itemName.toUpperCase() < b.itemName.toUpperCase())
      return -1 * (reverse ? -1 : 1);
    else if (a.itemName.toUpperCase > b.itemName.toUpperCase())
      return 1 * (reverse ? -1 : 1);
    else return 0;
  };

export default function useItems() {
  return useContext(ItemsContext);
}

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const { success, error } = useAlert();
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
          success("Item Created");
          return true;
        })
        .catch((err) => {
          error("There was an error creating the item");
        });
    },
    [token, refreshItems, success, error]
  );

  const updateItem = useCallback(
    (id, formData) => {
      return axios
        .put(`${process.env.REACT_APP_API_LINK}/items/${id}`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          refreshItems();
          success("Item Updated");
          return true;
        })
        .catch((err) => {
          error("There was an error updating the item");
        });
    },
    [token, refreshItems, success, error]
  );

  const deleteItem = useCallback(
    (id, formData) => {
      return axios
        .delete(`${process.env.REACT_APP_API_LINK}/items/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          refreshItems();
          success("Item Deleted");
          return true;
        })
        .catch((err) => {
          error("There was an error deleting the item");
        });
    },
    [token, refreshItems, success, error]
  );

  const getSortedItems = useCallback(
    (filters = [sortByIsStoredIn(true), sortByDate()]) => {
      const sorted = [...items];

      if (typeof filters === "function") sorted.sort(filters);
      else if (Array.isArray(filters))
        sorted.sort((a, b) => {
          for (let i = 0; i < filters.length; i++) {
            const result = filters[i](a, b);
            if (result !== 0 || i === filters.length - 1) return result;
          }
          return 0;
        });
      else sorted.sort();

      return sorted;
    },
    [items]
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
    getSortedItems,
  };

  return (
    <ItemsContext.Provider value={result}>{children}</ItemsContext.Provider>
  );
}
