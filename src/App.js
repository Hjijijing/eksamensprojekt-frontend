import "./App.css";
import React, { useState, useEffect } from "react";
import { ItemsProvider } from "./hooks/useItems";
import axios from "axios";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";

function App() {
  return (
    <ItemsProvider>
      <div>
        <ItemList />
        <ItemCreator />
      </div>
    </ItemsProvider>
  );
}

export default App;
