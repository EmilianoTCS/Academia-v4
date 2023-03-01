import React, { useState, useContext } from "react";
import "../css/LoginPage.css";
import { useNavigate, Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const { login, isLogged, hasError, isLoading, tipoUsuario } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLogged) {
      if (tipoUsuario === "administrador" || tipoUsuario === "capital_humano") {
        navigate("/home");
      } else if (tipoUsuario === "colaborador") {
        navigate("/homeColaboradores");
      }
    }
  }, [isLogged, navigate, tipoUsuario]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  //COMPONENTES
  const ErrorMessage = () => {
    if (show)
      return (
        <Alert
          variant="danger"
          onClose={() => {
            setShow(false);
          }}
          dismissible
        >
          <Alert.Heading>El usuario o contraseña es incorrecto.</Alert.Heading>
        </Alert>
      );
  };

  return (
    <div>
      <h3 id="pageTitleLogin">Academia de formación</h3>
      {isLoading && <strong>Checking Credentials</strong>}
      {!isLoading && (
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
              <Link id="forgot_password" className="small" style={{color:"white"}} to="/RecuperarPassword">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            {hasError && <ErrorMessage></ErrorMessage>}
          </form>
        </div>
      )}
    </div>
  );
}
