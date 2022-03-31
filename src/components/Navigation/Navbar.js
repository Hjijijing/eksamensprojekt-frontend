import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { FaSignOutAlt } from "react-icons/fa";
import { getAuth } from "firebase/auth";
const auth = getAuth();

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo, logOut } = useUser();

  let displayName = "";
  if (userInfo && userInfo.userName) displayName = userInfo.userName;
  else if (auth.currentUser && auth.currentUser.email)
    displayName = auth.currentUser.email;
  return (
    <div className="header">
      {auth.currentUser && (
        <div className="header-user">
          <p
            className="buttonrise"
            onClick={() => {
              navigate("/account");
            }}
          >
            {displayName}
          </p>
          <FaSignOutAlt
            size="1.5em"
            className="buttonrise"
            onClick={() => {
              navigate("/login");
              logOut();
            }}
            alt="Sign Out"
          />
        </div>
      )}
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
