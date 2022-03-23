import React, { useState } from "react";
import FacebookButton from "./FacebookButton";
import GithubButton from "./GithubButton";
import GoogleButton from "./GoogleButton";
import TwitterButton from "./TwitterButton";
import useUser from "../hooks/useUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loginWithGoogle,
    loginWithTwitter,
    loginWithFacebook,
    loginWithGithub,
  } = useUser();

  return (
    <div className="loginpage card">
      <form id="loginform">
        <input
          value={email}
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="card"
        />
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="card"
        />

        <button type="submit" form="loginform" name="login" className="card">
          Login
        </button>
      </form>

      <div className="loginproviders">
        <GoogleButton text="Login with Google" clickHandler={loginWithGoogle} />
        <TwitterButton
          text="Login with Twitter"
          clickHandler={loginWithTwitter}
        />
        <FacebookButton
          text="Login with Facebook"
          clickHandler={loginWithFacebook}
        />
        <GithubButton text="Login with Github" clickHandler={loginWithGithub} />
      </div>
    </div>
  );
}
