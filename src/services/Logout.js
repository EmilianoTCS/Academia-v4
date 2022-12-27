import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout, isLogged } = useContext(AuthContext);


  function handleLogout() {
    logout();
  }

  return !isLogged ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <>
      <button onClick={handleLogout} id="logout">
        Logout
      </button>
    </>
  );
}
