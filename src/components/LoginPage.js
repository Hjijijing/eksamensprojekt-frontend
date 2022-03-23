import React, { useState } from "react";
import FacebookButton from "./FacebookButton";
import GithubButton from "./GithubButton";
import GoogleButton from "./GoogleButton";
import TwitterButton from "./TwitterButton";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    loginWithGoogle,
    loginWithTwitter,
    loginWithFacebook,
    loginWithGithub,
    loginWithEmail,
  } = useUser();

  const submitHandler = (e) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  return (
    <div className="loginpage card">
      <form id="loginform" onSubmit={submitHandler}>
        <input
          value={email}
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="card"
          required
        />
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="card"
          required
        />
        <button type="submit" form="loginform" name="login" className="card">
          Login
        </button>
        <p onClick={() => navigate("/signup")}>
          Click here to create an account
        </p>
      </form>
      <div className="loginproviders">
        <GoogleButton text="Login with Google" clickHandler={loginWithGoogle} />
        <TwitterButton
          text="Login with Twitter"
          clickHandler={loginWithTwitter}
        />
        {/* <FacebookButton
          text="Login with Facebook"
          clickHandler={loginWithFacebook}
        /> */}
        <GithubButton text="Login with Github" clickHandler={loginWithGithub} />
      </div>
    </div>
  );
}
