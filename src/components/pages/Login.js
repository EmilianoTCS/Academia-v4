import React, { useState, useEffect } from "react";
import LoginService from "../services/LoginService";
import SetItemLoginService from "../services/SetItemLoginService";
import "../css/LoginPage.css";
import AutenticationLoginContext from "../hooks/AutenticationLogin";
import { Redirect, Route } from "wouter";
import HomePage from "./Homepage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await LoginService.loginService({
        username,
        password,
      });
      SetItemLoginService.SetItemLoginService(user);
      //   LoginContext(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  window.localStorage.setItem("loggedUser", JSON.stringify(user));

  useEffect(() => {
    const loggedStatus = window.localStorage.getItem("loggedUser", user);
    if ("loggedUser") {
      const user = JSON.parse(loggedStatus);
      setUser(user);
    }
  }, [user]);

  return user ? (
    <div>
      <AutenticationLoginContext.Provider value={user}>
        <Route path="/home" component={HomePage}></Route>
        <Redirect to="/home"></Redirect>
      </AutenticationLoginContext.Provider>
    </div>
  ) : (
    <div>
      <h3 id="pageTitleLogin">Academia de formación</h3>
      <div id="background">
        <form id="form_login" onSubmit={handleLogin}>
          <h3>Iniciar sesión</h3>
          <div>
            <h4 htmlFor="input_Usuario">Usuario:</h4>
            <input
              type="text"
              name="username"
              id="input_Usuario"
              placeholder="Usuario"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <h4 htmlFor="input_Usuario">Contraseña:</h4>
            <input
              type="password"
              name="password"
              id="input_password"
              placeholder="Contraseña"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit" id="btn_acceder" className="btn btn-primary">
              Acceder
            </button>
            <a id="forgot_password" className="small" href="password.html">
              Olvidaste la contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
