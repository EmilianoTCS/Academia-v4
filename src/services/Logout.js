import getDataService from "./GetDataService";
import React from "react";
import { useState } from "react";
import { Redirect } from "wouter";
import useUser from "../hooks/useUser";

export default function Logout() {
  const url = "logout.php?logout";
  const [response, setResponse] = useState([""]);
  const { isLogged, logout } = useUser();

  // function handleLogout() {
  //   getDataService(url).then((response) => setResponse(response));
  //   if (response.statusConnected === false) {
  //     localStorage.removeItem("loggedUser");
  //   }
  // }
  function handleLogout() {
    logout();
  }

  return !isLogged ? (
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
