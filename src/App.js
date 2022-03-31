import React from "react";
import "./firebase/firebaseConfig";
import ContextProviders from "./ContextProviders";
import { BrowserRouter as Router } from "react-router-dom";
import MainContent from "./MainContent";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <ContextProviders>
        <MainContent />
      </ContextProviders>
    </Router>
  );
}

export default App;
