import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button
        className={"navbarlink" + (location.pathname === "/" ? " active" : "")}
        onClick={() => {
          navigate("/");
        }}
      >
        Items
      </button>
      <button
        className={
          "navbarlink" + (location.pathname === "/create" ? " active" : "")
        }
        onClick={() => {
          navigate("/create");
        }}
      >
        Add
      </button>
    </div>
  );
}
