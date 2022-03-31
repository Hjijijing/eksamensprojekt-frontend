import React from "react";
import ReactDOM from "react-dom";

export default function AlertBox({ message, level }) {
  return ReactDOM.createPortal(
    <div className={`alertbox alert-level-${level}`}>{message}</div>,
    document.getElementById("alerts")
  );
}
