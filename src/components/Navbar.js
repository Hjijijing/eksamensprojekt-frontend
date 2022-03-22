import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import provider from "../firebase/firebaseAuth";
import { getAuth } from "firebase/auth";
const auth = getAuth();

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
