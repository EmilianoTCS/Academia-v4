import React, { useState } from "react";
import "../css/LoginPage.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../templates/alerts/TopAlerts";
import Alert from "react-bootstrap/Alert";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [show, setShow] = useState(false);

  const SendData = (e) => {
    e.preventDefault();
    const url = "TASKS/RecuperarPassword.php";
    const operationUrl = "recuperarPassword";
    var data = {
      email: email,
    };

    SendDataService(url, operationUrl, data).then((...response) => {
      const { success, message } = response[0];
      TopAlerts(message);
      setIsSuccess(success);
      if (!success) setShow(true);
    });
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
          <Alert.Heading>El correo ingresado no es válido.</Alert.Heading>
        </Alert>
      );
  };

  return (
    <div>
      <h3 id="pageTitleLogin">Academia de formación</h3>

      <div id="background">
        <form id="form_login" onSubmit={SendData}>
          <h3>Recuperar Contraseña</h3>
          <div>
            <h4 htmlFor="input_Email">Email:</h4>
            <input
              type="email"
              name="username"
              id="input_Email"
              placeholder="Ingresa el email de tu cuenta"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" id="btn_acceder" className="btn btn-primary">
              Enviar
            </button>
          </div>
          {!isSuccess && <ErrorMessage></ErrorMessage>}
        </form>
      </div>
    </div>
  );
};

export default RecuperarPassword;
