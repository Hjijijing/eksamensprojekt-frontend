import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";
import ItemEditor from "./components/ItemEditor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PictureItemList from "./components/PictureItemList";

function App() {
  return (
    <Router>
      <ItemsProvider>
        <div className="everything">
          <Navbar />
          <div className="parent">
            <Routes>
              {/* <Route path="/" element={<ItemList />} /> */}
              <Route path="/" element={<PictureItemList />} />
              <Route path="/create" element={<ItemCreator />} />
              <Route path="/edit/:id" element={<ItemEditor />} />
            </Routes>
          </div>
        </div>
      </ItemsProvider>
    </Router>
  );
}

export default App;
