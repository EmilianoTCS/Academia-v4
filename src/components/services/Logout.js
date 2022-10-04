import getDataService from "./GetDataService";
import React from "react";
import { useState } from "react";
import { Redirect } from "wouter";
export default function Logout() {
  const url = "logout.php?logout";
  const [response, setResponse] = useState([""]);

  function handleLogout() {
    getDataService(url).then((response) => setResponse(response));
    if (response.statusConnected === false) {
      localStorage.removeItem("loggedUser");
    }
  }

  return response.statusConnected === false ? (
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
