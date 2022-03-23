import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { createEmailAccount } = useUser();

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (!(password === confirmPassword)) return;
    createEmailAccount(email, password);
  }

  return (
    <div className="signuppage card">
      <form id="signupform" onSubmit={submitHandler}>
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
        <input
          value={confirmPassword}
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={"card" + (password === confirmPassword ? "" : " nomatch")}
          required
        />
        <button type="submit" form="signupform" name="login" className="card">
          Sign Up
        </button>
        <p onClick={() => navigate("/login")}>
          Already have an account? Click here to sign in
        </p>
      </form>
    </div>
  );
}
