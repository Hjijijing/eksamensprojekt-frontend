import React from "react";

export default function IconButton({ bg, col, icon, text, clickHandler }) {
  return (
    <button
      type="button"
      onClick={clickHandler}
      className="iconbutton card buttonrise"
      style={{ backgroundColor: bg, color: col }}
    >
      {icon}
      {text}
    </button>
  );
}
