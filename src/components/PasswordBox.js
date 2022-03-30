import React from "react";

export default function PasswordBox({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) {
  return (
    <>
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
    </>
  );
}
