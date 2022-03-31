import React from "react";
import { Link } from "react-router-dom";

export default function ItemLink({ item, children }) {
  return <Link to={`/edit/${item._id}`}>{children ?? item.itemName}</Link>;
}
