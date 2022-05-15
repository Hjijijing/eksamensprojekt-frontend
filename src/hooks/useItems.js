import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useAlert from "./useAlert";
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
  const { success, error, info } = useAlert();
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
    (formData, { refresh = true, alert = true } = {}) => {
      if (alert) info("Creating item");
      return axios
        .post(`${process.env.REACT_APP_API_LINK}/items`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          if (refresh) refreshItems();
          if (alert) success("Item Created");
          return true;
        })
        .catch((err) => {
          error("There was an error creating the item");
        });
    },
    [token, refreshItems, success, error, info]
  );

  const updateItem = useCallback(
    (id, formData, { refresh = true, alert = true } = {}) => {
      if (alert) info("Updating item");
      return axios
        .put(`${process.env.REACT_APP_API_LINK}/items/${id}`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          if (refresh) refreshItems();
          if (alert) success("Item Updated");
          return true;
        })
        .catch((err) => {
          error("There was an error updating the item");
        });
    },
    [token, refreshItems, success, error, info]
  );

  const deleteItem = useCallback(
    (id, formData, { refresh = true, alert = true } = {}) => {
      if (alert) info("Deleting item");
      return axios
        .delete(`${process.env.REACT_APP_API_LINK}/items/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          if (refresh) refreshItems();
          if (alert) success("Item Deleted");
          return true;
        })
        .catch((err) => {
          error("There was an error deleting the item");
        });
    },
    [token, refreshItems, success, error, info]
  );

  const getSortedItems = useCallback(
    (
      filters = [sortByIsStoredIn(true), sortByIsContainer(true), sortByDate()]
    ) => {
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

  const bulkMoveItems = useCallback(
    (itemsToMove, moveTo, { refresh = true, alert = true } = {}) => {
      if (!itemsToMove) return;

      const promises = [];

      if (alert) info("Moving items");

      itemsToMove.forEach((item) => {
        const data = new FormData();
        data.append(
          "item",
          JSON.stringify({ storedIn: moveTo === "None" ? null : moveTo })
        );
        promises.push(
          updateItem(item._id, data, { refresh: false, alert: false })
        );
      });

      return Promise.all(promises).then(() => {
        if (alert) success("All items moved");
        if (refresh) refreshItems();
      });
    },
    [refreshItems, success, updateItem, info]
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
    bulkMoveItems,
  };

  return (
    <ItemsContext.Provider value={result}>{children}</ItemsContext.Provider>
  );
}
