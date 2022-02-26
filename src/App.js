import React from "react";
import { ItemsProvider } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";

function App() {
  return (
    <ItemsProvider>
      <div class="parent">
        {/* <ItemList /> */}
        <ItemCreator />
      </div>
    </ItemsProvider>
  );
}

export default App;
