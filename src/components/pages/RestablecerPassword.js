import React, { useState } from "react";
import "../css/LoginPage.css";
import SendDataService from "../../services/SendDataService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import TopAlerts from "../templates/alerts/TopAlerts";

const RestablecerPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { ID, correo } = useParams();
  const [verified, setVerified] = useState(false);
  const [show, setShow] = useState(true);

  const SendData = (e) => {
    e.preventDefault();
    const url = "TASKS/RestablecerPassword.php";
    const operationUrl = "restablecerPassword";
    var data = {
      ID: ID,
      correo: correo,
      password: password1,
    };
    if (verified) {
      SendDataService(url, operationUrl, data).then((...response) => {
        const { message } = response[0];
        TopAlerts(message);
      });
    }
  };

  const Verificacion = () => {
    if (password1 === password2) {
      setVerified(true);
    } else {
      setVerified(false);
      setShow(true);
    }
  };

  useEffect(() => {
    Verificacion();
  }, [password1, password2]);

  //COMPONENTES
  const WarningMessage = () => {
    if (show)
      return (
        <Alert
          variant="warning"
          onClose={() => {
            setShow(false);
          }}
          dismissible
        >
          <Alert.Heading>Las contraseñas deben ser iguales.</Alert.Heading>
        </Alert>
      );
  };

  return (
    <div>
      <h3 id="pageTitleLogin">Academia de formación</h3>

      <div id="background">
        <form id="form_login" onSubmit={SendData}>
          <h3>Restablecer Contraseña</h3>
          <div>
            <h4 htmlFor="input_password1">Nueva contraseña:</h4>
            <input
              type="password"
              name="password1"
              id="input_password1"
              placeholder="Ingresa una nueva contraseña"
              value={password1}
              onChange={({ target }) => setPassword1(target.value)}
              required
            />
          </div>
          <div>
            <h4 htmlFor="input_password2">Repite la contraseña:</h4>
            <input
              type="password"
              name="password2"
              id="input_password2"
              placeholder="Repite la nueva contraseña"
              value={password2}
              onChange={({ target }) => setPassword2(target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" id="btn_acceder" className="btn btn-primary">
              Enviar
            </button>
          </div>
          {!verified && <WarningMessage></WarningMessage>}
        </form>
      </div>
    </div>
  );
};

export default RestablecerPassword;
