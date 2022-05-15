import axios from "axios";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FacebookProvider,
  GithubProvider,
  GoogleProvider,
  TwitterProvider,
} from "../firebase/firebaseAuth";
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
  const { handleError, info, success } = useAlert();

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
      info("Changing Password");
      updatePassword(auth.currentUser, newPassword)
        .then((result) => {
          success("Password changed");
        })
        .catch(handleError);
    },
    [handleError, info, success]
  );

  const linkProvider = useCallback(
    (provider) => {
      info("Linking provider");
      linkWithPopup(auth.currentUser, provider)
        .then((result) => {
          success("Provider linked");
        })
        .catch(handleError);
    },
    [handleError, info, success]
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
      info("Adding password");
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(auth.currentUser, credential)
        .then(() => {
          success("Password added");
        })
        .catch(handleError);
    },
    [handleError, info, success]
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
