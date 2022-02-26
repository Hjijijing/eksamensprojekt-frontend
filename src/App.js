import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";
import ItemEditor from "./components/ItemEditor";

function App() {
  return (
    <ItemsProvider>
      <div className="parent">
        <ItemList />
        <ItemCreator />
        {/* <ItemEditor /> */}
      </div>
    </ItemsProvider>
  );
}

export default App;
