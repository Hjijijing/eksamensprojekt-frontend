import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import provider from "../firebase/firebaseAuth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth();

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  console.log(token);

  useEffect(() => {
    auth.onAuthStateChanged((credentials) => {
      console.log(credentials);
      setToken(credentials.accessToken);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/items/test", {
      headers: { Authorization: "Bearer " + token },
    });
  }, [token]);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((credentials) => {
      console.log(credentials);
    });
  };

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
      <button
        className={
          "navbarlink" + (location.pathname === "/create" ? " active" : "")
        }
        onClick={loginWithGoogle}
      >
        Add
      </button>
    </div>
  );
}
