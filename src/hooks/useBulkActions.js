import axios from "axios";
import { useCallback } from "react";
import useItems from "./useItems";

export default function useBulkActions() {
  const { items: allItems, refreshItems } = useItems();

  const bulkMoveTo = useCallback(
    async (items, moveTo) => {
      if (!items) return;

      const promises = [];
      items.forEach((item) => {
        const data = new FormData();
        data.append(
          "item",
          JSON.stringify({
            ...item,
            storedIn: moveTo === "None" ? null : moveTo,
          })
        );
        promises.push(
          axios.put(`http://localhost:5000/items/${item._id}`, data)
        );
      });

      await Promise.all(promises);
      alert("Items moved!");
      refreshItems();
    },
    [refreshItems]
  );

  return { bulkMoveTo };
}
