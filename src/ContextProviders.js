import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import { UserProvider } from "./hooks/useUser";
import { AlertProvider } from "./hooks/useAlert";

export default function ContextProviders({ children }) {
  return (
    <AlertProvider>
      <UserProvider>
        <ItemsProvider>{children}</ItemsProvider>
      </UserProvider>
    </AlertProvider>
  );
}
