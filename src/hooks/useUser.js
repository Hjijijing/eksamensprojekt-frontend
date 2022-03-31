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
  linkWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import useAlert from "./useAlert";
const auth = getAuth();

const UserContext = React.createContext();

export default function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("firebaseToken") ?? ""
  );
  const [userInfo, setUserInfo] = useState(null);
  const { handleError } = useAlert();

  const loginWithProvider = useCallback(
    (provider) => {
      signInWithPopup(auth, provider)
        .then((credentials) => {})
        .catch(handleError);
    },
    [handleError]
  );

  const changeUserPassword = useCallback(
    (newPassword) => {
      updatePassword(auth.currentUser, newPassword)
        .then((result) => {})
        .catch(handleError);
    },
    [handleError]
  );

  const linkProvider = useCallback(
    (provider) => {
      linkWithPopup(auth.currentUser, provider)
        .then((result) => {})
        .catch(handleError);
    },
    [handleError]
  );

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

  const loginWithEmail = useCallback(
    (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {})
        .catch(handleError);
    },
    [handleError]
  );

  const createEmailAccount = useCallback(
    (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {})
        .catch(handleError);
    },
    [handleError]
  );

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
  const linkWithEmail = useCallback(
    (email, password) => {
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(auth.currentUser, credential)
        .then(() => {})
        .catch(handleError);
    },
    [handleError]
  );

  const logOut = useCallback(() => {
    auth
      .signOut()
      .then(() => {
        setUserInfo(null);
        setToken("");
      })
      .catch(handleError);
  }, [handleError]);

  useEffect(() => {
    return auth.onAuthStateChanged((credentials) => {
      if (!credentials) {
        setToken("");
        localStorage.removeItem("firebaseToken");
        return;
      }
      //console.log(credentials);
      setToken(credentials.accessToken);
      localStorage.setItem("firebaseToken", credentials.accessToken);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/items/user`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUserInfo({ ...res.data });
      });
  }, [token]);

  const result = {
    token,
    loginWithGoogle,
    loginWithTwitter,
    loginWithFacebook,
    loginWithGithub,
    loginWithEmail,
    linkWithGoogle,
    linkWithTwitter,
    linkWithFacebook,
    linkWithGithub,
    linkWithEmail,
    createEmailAccount,
    changeUserPassword,
    logOut,
    userInfo,
  };

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
}
