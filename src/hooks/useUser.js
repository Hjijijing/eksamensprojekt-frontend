import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import provider from "../firebase/firebaseAuth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const auth = getAuth();

const UserContext = React.createContext();

export default function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const loginWithGoogle = useCallback(() => {
    signInWithPopup(auth, provider).then((credentials) => {
      console.log(credentials);
    });
  }, []);

  const logOut = useCallback(() => {
    auth.signOut().then(() => {
      setToken("");
      setUserInfo(null);
    });
  });

  useEffect(() => {
    auth.onAuthStateChanged((credentials) => {
      if (!credentials) {
        setToken("");
        return;
      }
      console.log(credentials);
      setToken(credentials.accessToken);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items/user", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  }, [token]);

  const result = {
    token,
    loginWithGoogle,
    logOut,
    userInfo,
  };

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
}
