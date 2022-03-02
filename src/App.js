import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";
import ItemEditor from "./components/ItemEditor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <ItemsProvider>
        <div className="parent">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<ItemCreator />} />
            <Route path="/edit/:id" element={<ItemEditor />} />
          </Routes>
        </div>
      </ItemsProvider>
    </Router>
  );
}

export default App;
