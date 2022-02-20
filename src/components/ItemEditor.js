import React from "react";

export default function ItemEditor() {
  return (
    <form>
      <input type="text" name="itemname" placeholder="Item Name" />
      <input type="text" name="description" placeholder="Description" />
      <input type="checkbox" name="iscontainer" />
      <input type="submit" name="submit" value="Submit" />
    </form>
  );
}
