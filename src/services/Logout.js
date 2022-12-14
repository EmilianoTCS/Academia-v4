import getDataService from "./GetDataService";
import { Redirect } from "wouter";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const url = "logout.php?logout";
  const [response, setResponse] = useState([""]);
  const {logout, isLogged} = useContext(AuthContext);

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
