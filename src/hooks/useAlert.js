import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

const AlertContext = React.createContext();

export default function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const alert = useCallback(
    (message, level) => {
      setAlerts((current) => [...current, { message, level: level }]);
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

  const result = { alert, warning, info, success, error };

  return (
    <AlertContext.Provider value={result}>
      {children}
      {alerts.map((alert) => {
        return <AlertBox {...alert} />;
      })}
    </AlertContext.Provider>
  );
}
