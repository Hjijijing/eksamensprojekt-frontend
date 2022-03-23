import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import provider from "../firebase/firebaseAuth";
import { getAuth } from "firebase/auth";
const auth = getAuth();

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo, logOut, loginWithGoogle } = useUser();

  return (
    <div className="header">
      <div className="header-user">
        {userInfo && (
          <>
            <p
              onClick={() => {
                navigate("/account");
              }}
            >
              {userInfo.userName}
            </p>
            <FaSignOutAlt size="1.5em" onClick={logOut} alt="Sign Out" />
          </>
        )}
      </div>
      <div className="navbar">
        <button
          className={
            "navbarlink" + (location.pathname === "/" ? " active" : "")
          }
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
    </div>
  );
}
