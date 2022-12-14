import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import "../css/LoginPage.css";
import { useLocation } from "wouter";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();

  useEffect(() => {
    console.log(isLogged);
    if (isLogged) navigate("/home");
  }, [isLogged, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div>
      <h3 id="pageTitleLogin">Academia de formación</h3>
      {isLoginLoading && <strong>Checking Credentials</strong>}
      {!isLoginLoading && (
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
                required
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
                required
              />
            </div>
            <div>
              <button
                type="submit"
                id="btn_acceder"
                className="btn btn-primary"
              >
                Acceder
              </button>
              <a id="forgot_password" className="small" href="password.html">
                Olvidaste la contraseña?
              </a>
            </div>
          </form>
        </div>
      )}
      {hasLoginError && <strong>Invalid Credentials</strong>}
    </div>
  );
}
