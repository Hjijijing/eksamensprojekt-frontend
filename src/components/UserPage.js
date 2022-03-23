import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import GoogleButton from "./GoogleButton";
import TwitterButton from "./TwitterButton";
import FacebookButton from "./FacebookButton";
import GithubButton from "./GithubButton";
import useUser from "../hooks/useUser";

const auth = getAuth();

export default function UserPage() {
  const { linkWithGoogle, linkWithTwitter, linkWithFacebook, linkWithGithub } =
    useUser();

  const [google, setGoogle] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [github, setGithub] = useState(false);

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
          default:
            break;
        }
      });
    });
  }, []);

  return (
    <div className="card account">
      <p id="email">Email: {auth.currentUser.email}</p>
      <GoogleButton
        text={google ? "Linked" : "Connect to Google"}
        clickHandler={google ? null : linkWithGoogle}
      />
      <TwitterButton
        text={twitter ? "Linked" : "Connect to Twitter"}
        clickHandler={twitter ? null : linkWithTwitter}
      />
      <FacebookButton
        text={facebook ? "Linked" : "Connect to Facebook"}
        clickHandler={facebook ? null : linkWithFacebook}
      />
      <GithubButton
        text={github ? "Linked" : "Connect to Github"}
        clickHandler={github ? null : linkWithGithub}
      />
    </div>
  );
}