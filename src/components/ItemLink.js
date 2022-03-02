import React from "react";
import { Link } from "react-router-dom";

export default function ItemLink({ item }) {
  return <Link to={`/edit/${item._id}`}>{item.itemName}</Link>;
}
