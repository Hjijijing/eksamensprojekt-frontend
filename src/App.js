import React from "react";
import "./firebase/firebaseConfig";
import { ItemsProvider } from "./hooks/useItems";
import { UserProvider } from "./hooks/useUser";
import { AlertProvider } from "./hooks/useAlert";
import { BrowserRouter as Router } from "react-router-dom";
import MainContent from "./MainContent";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <AlertProvider>
        <UserProvider>
          <ItemsProvider>
            <MainContent />
          </ItemsProvider>
        </UserProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
