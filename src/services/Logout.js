import { Redirect } from "wouter";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout, isLogged } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  // function handleLogout() {
  //   getDataService(url).then((response) => setResponse(response));
  //   if (response.statusConnected === false) {
  //     localStorage.removeItem("loggedUser");
  //   }
  // }
  function handleLogout() {
    logout();
  }

  return !isLogged || !userData.statusConected ? (
    <>
      <Redirect to="/login"></Redirect>
    </>
  ) : (
    <>
      <button onClick={handleLogout} id="logout">
        Logout
      </button>
    </>
  );
}
