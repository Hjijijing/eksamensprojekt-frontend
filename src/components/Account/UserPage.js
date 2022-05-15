import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import useAlert from "../../hooks/useAlert";
import useUser from "../../hooks/useUser";
import GithubButton from "../IconButtons/GithubButton";
import GoogleButton from "../IconButtons/GoogleButton";
import TwitterButton from "../IconButtons/TwitterButton";
import PasswordBox from "./PasswordBox";

const auth = getAuth();

export default function UserPage() {
  const {
    linkWithGoogle,
    linkWithTwitter,
    linkWithFacebook,
    linkWithGithub,
    linkWithEmail,
    changeUserPassword,
  } = useUser();

  const [google, setGoogle] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [github, setGithub] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error } = useAlert();

  const submitNewPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      error("Passwords don't match");
      return;
    }
    if (hasPassword) changeUserPassword(password);
    else linkWithEmail(auth.currentUser.email, password);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((cred) => {
      auth.currentUser.providerData.forEach((provider) => {
        switch (provider.providerId) {
          case "google.com":
            setGoogle(true);
            break;
          case "twitter.com":
            setTwitter(true);
            break;
          case "facebook.com":
            setFacebook(true);
            break;
          case "github.com":
            setGithub(true);
            break;
          case "password":
            setHasPassword(true);
            break;
          default:
            break;
        }
      });
    });
  }, []);

  return (
    <div className="card account">
      <div id="credentials">
        <p id="email">Email: {auth.currentUser.email}</p>
        {hasPassword && <p id="password">Password: ••••••••••••</p>}
        <form id="passwordchange" onSubmit={submitNewPassword}>
          <PasswordBox
            {...{ password, confirmPassword, setPassword, setConfirmPassword }}
          />
          <input
            className="card buttonrise"
            type="submit"
            id="submitpassword"
            value="Change Password"
          />
        </form>
      </div>
      <GoogleButton
        text={google ? "Linked" : "Connect to Google"}
        clickHandler={google ? null : linkWithGoogle}
      />
      <TwitterButton
        text={twitter ? "Linked" : "Connect to Twitter"}
        clickHandler={twitter ? null : linkWithTwitter}
      />
      {/* <FacebookButton
        text={facebook ? "Linked" : "Connect to Facebook"}
        clickHandler={facebook ? null : linkWithFacebook}
      /> */}
      <GithubButton
        text={github ? "Linked" : "Connect to Github"}
        clickHandler={github ? null : linkWithGithub}
      />
    </div>
  );
}
