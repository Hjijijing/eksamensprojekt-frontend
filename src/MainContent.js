import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Account/LoginPage";
import SignupPage from "./components/Account/SignupPage";
import UserPage from "./components/Account/UserPage";
import ItemCreator from "./components/ItemForm/ItemCreator";
import ItemEditor from "./components/ItemForm/ItemEditor";
import ItemList from "./components/ItemLists/ItemList";
import Redirector from "./components/Navigation/LoginRedirector";
import Navbar from "./components/Navigation/Navbar";
import useUser from "./hooks/useUser";

export default function MainContent() {
  const { token } = useUser();

  return (
    <div className="everything">
      <Navbar />
      <div className="parent">
        <Routes>
          {token !== "" ? (
            <>
              <Route
                exact
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
              <Route path="/edit/:id" element={<ItemEditor />} />
              <Route path="/account" element={<UserPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage></LoginPage>} />
              <Route path="/signup" element={<SignupPage></SignupPage>} />
            </>
          )}
          <Route
            path="*"
            element={
              token === "" ? <Redirector to="/login" /> : <Redirector to="/" />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
