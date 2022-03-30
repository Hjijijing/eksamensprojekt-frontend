import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import useUser from "../hooks/useUser";
import PasswordBox from "./PasswordBox";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { createEmailAccount } = useUser();
  const { error } = useAlert();

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (!(password === confirmPassword)) {
      error("Passwords don't match");
      return;
    }
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
        <PasswordBox
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <button
          type="submit"
          form="signupform"
          name="login"
          className="card buttonrise"
        >
          Sign Up
        </button>
        <p onClick={() => navigate("/login")}>
          Already have an account? Click here to sign in
        </p>
      </form>
    </div>
  );
}
