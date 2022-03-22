import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginRedirector from "./components/LoginRedirector";
import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";
import ItemCreator from "./components/ItemCreator";
import ItemEditor from "./components/ItemEditor";
import useUser from "./hooks/useUser";
import Redirector from "./components/LoginRedirector";

export default function MainContent() {
  const { token } = useUser();

  return (
    <div className="everything">
      <Navbar />
      <div className="parent">
        <Routes>
          {/* <Route path="/" element={<ItemList />} /> */}
          {/* <Route path="/" element={<PictureItemList />} /> */}
          {}
          {token !== "" ? (
            <>
              {" "}
              <Route
                path="/"
                element={
                  <ItemList
                    tableMode={false}
                    modeToggle={true}
                    bulkactions={true}
                  />
                }
              />
              <Route path="/create" element={<ItemCreator />} />
              <Route path="/edit/:id" element={<ItemEditor />} />{" "}
              <Route path="/*" element={<Redirector to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<></>} />
              <Route path="/*" element={<Redirector to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}