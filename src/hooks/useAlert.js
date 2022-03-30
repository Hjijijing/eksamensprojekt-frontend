import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

const AlertContext = React.createContext();

function getErrorMessage(err) {
  switch (err.code) {
    case "auth/account-exists-with-different-credential":
      return "Account is not linked with chosen provider";
    case "auth/invalid-credential":
      return "Invalid credentials";
    case "auth/user-disabled":
      return "This user has been disabled";
    case "auth/user-not-found":
      return "No user with the given email found";
    case "auth/wrong-password":
      return "Wrong password";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/weak-password":
      return "Password is too weak";
    default:
      return "Error";
  }
}

export default function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const queueAlertRemoval = () => {
    setTimeout(() => {
      setAlerts((current) => [...current.slice(1, current.length)]);
    }, 5500);
  };

  const alert = useCallback(
    (message, level) => {
      setAlerts((current) => [
        ...current,
        { key: Math.random(), alert: { message, level: level } },
      ]);
      queueAlertRemoval();
    },
    [setAlerts]
  );

  const warning = useCallback(
    (message) => {
      alert(message, "warning");
    },
    [alert]
  );

  const info = useCallback(
    (message) => {
      alert(message, "info");
    },
    [alert]
  );

  const error = useCallback(
    (message) => {
      alert(message, "error");
    },
    [alert]
  );

  const success = useCallback(
    (message) => {
      alert(message, "success");
    },
    [alert]
  );

  const handleError = useCallback(
    (err) => {
      error(getErrorMessage(err));
    },
    [error]
  );

  const result = { alert, warning, info, success, error, handleError };

  return (
    <AlertContext.Provider value={result}>
      {children}
      {alerts.map((alert) => {
        return <AlertBox key={alert.key} {...alert.alert} />;
      })}
    </AlertContext.Provider>
  );
}
