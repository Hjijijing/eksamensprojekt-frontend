import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import TableItemList from "./components/TableItemList";
import ItemCreator from "./components/ItemCreator";
import ItemEditor from "./components/ItemEditor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PictureItemList from "./components/PictureItemList";
import ItemList from "./components/ItemList";

function App() {
  return (
    <Router>
      <ItemsProvider>
        <div className="everything">
          <Navbar />
          <div className="parent">
            <Routes>
              {/* <Route path="/" element={<ItemList />} /> */}
              {/* <Route path="/" element={<PictureItemList />} /> */}
              <Route
                path="/"
                element={<ItemList tableMode={false} modeToggle={true} />}
              />
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
