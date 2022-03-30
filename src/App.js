import React from "react";
import "./firebase/firebaseConfig";
import { ItemsProvider } from "./hooks/useItems";
import { UserProvider } from "./hooks/useUser";
import { BrowserRouter as Router } from "react-router-dom";
import MainContent from "./MainContent";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <ItemsProvider>
          <MainContent />
        </ItemsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
