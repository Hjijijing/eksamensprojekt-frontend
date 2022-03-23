import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import {
  GoogleProvider,
  TwitterProvider,
  FacebookProvider,
  GithubProvider,
} from "../firebase/firebaseAuth";
import {
  getAuth,
  signInWithPopup,
  signOut,
  linkWithPopup,
} from "firebase/auth";
const auth = getAuth();

const UserContext = React.createContext();

export default function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const loginWithProvider = useCallback((provider) => {
    signInWithPopup(auth, provider).then((credentials) => {
      //console.log(credentials);
    });
  }, []);

  const linkProvider = useCallback((provider) => {
    linkWithPopup(auth.currentUser, provider).then((result) => {});
  }, []);

  const loginWithGoogle = useCallback(() => {
    loginWithProvider(GoogleProvider);
  }, [loginWithProvider]);

  const loginWithTwitter = useCallback(() => {
    loginWithProvider(TwitterProvider);
  }, [loginWithProvider]);

  const loginWithFacebook = useCallback(() => {
    loginWithProvider(FacebookProvider);
  }, [loginWithProvider]);

  const loginWithGithub = useCallback(() => {
    loginWithProvider(GithubProvider);
  }, [loginWithProvider]);

  const linkWithGoogle = useCallback(() => {
    linkProvider(GoogleProvider);
  }, [linkProvider]);
  const linkWithTwitter = useCallback(() => {
    linkProvider(TwitterProvider);
  }, [linkProvider]);
  const linkWithFacebook = useCallback(() => {
    linkProvider(FacebookProvider);
  }, [linkProvider]);
  const linkWithGithub = useCallback(() => {
    linkProvider(GithubProvider);
  }, [linkProvider]);

  const logOut = useCallback(() => {
    auth.signOut().then(() => {
      setToken("");
      setUserInfo(null);
    });
  });

  useEffect(() => {
    return auth.onAuthStateChanged((credentials) => {
      if (!credentials) {
        setToken("");
        return;
      }
      //console.log(credentials);
      setToken(credentials.accessToken);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/items/user`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  }, [token]);

  const result = {
    token,
    loginWithGoogle,
    loginWithTwitter,
    loginWithFacebook,
    loginWithGithub,
    linkWithGoogle,
    linkWithTwitter,
    linkWithFacebook,
    linkWithGithub,
    logOut,
    userInfo,
  };

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
}
