import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/items").then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <ItemList items={items} />
      <ItemCreator items={items} />
    </div>
  );
}

export default App;
