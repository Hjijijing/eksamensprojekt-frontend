import React from "react";
import { AlertProvider } from "./hooks/useAlert";
import { ItemsProvider } from "./hooks/useItems";
import { UserProvider } from "./hooks/useUser";

export default function ContextProviders({ children }) {
  return (
    <AlertProvider>
      <UserProvider>
        <ItemsProvider>{children}</ItemsProvider>
      </UserProvider>
    </AlertProvider>
  );
}
