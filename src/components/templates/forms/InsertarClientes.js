import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";
import "../../css/InsertarRamo.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";

export default function InsertarClientes(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.Props.isActiveInsertCliente);
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(!isActive);
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarCliente.php";
    const operationUrl = "insertarCliente";
    var data = {
      tipo_cliente: tipo_cliente,
      nombreCliente: nombreCliente,
      referente: referente,
      correoReferente: correoReferente,
      telefonoReferente: telefonoReferente,
      cargoReferente: cargoReferente,
    };

    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      setisActive(props.Props.isActiveInsertCliente);
    },
    [props]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <div id="containerForm" className={isActive ? "active" : ""}>
        <form id="form_insertarData" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Insertar Cliente</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>

          <div className="form-group">
            <label htmlFor="input_tipoCliente">Tipo de cliente: </label>
            <select
              className="form-control"
              name="input_tipoCliente"
              id="input_tipoCliente"
              onChange={({ target }) => setTipoClientes(target.value)}
            >
              <option value="interno">Interno</option>
              <option value="externo">Externo</option>
            </select>
          </div>

          <div>
            <label htmlFor="input_nombreCliente">Nombre del cliente:</label>
            <input
              type="text"
              className="form-control"
              name="input_nombreCliente"
              id="input_nombreCliente"
              onChange={({ target }) => setNombreCliente(target.value)}
            />
          </div>

          <div>
            <label htmlFor="input_referente">Referente:</label>
            <input
              type="text"
              className="form-control"
              name="input_referente"
              id="input_referente"
              onChange={({ target }) => setReferente(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_correoReferente">Correo del referente:</label>
            <input
              type="text"
              className="form-control"
              name="input_correoReferente"
              id="input_correoReferente"
              onChange={({ target }) => setCorreoReferente(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_cargoReferente">Cargo del referente:</label>
            <input
              type="text"
              className="form-control"
              name="input_cargoReferente"
              id="input_cargoReferente"
              onChange={({ target }) => setCargoReferente(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_telefonoReferente">
              Teléfono del referente:
            </label>
            <input
              type="text"
              className="form-control"
              name="input_telefonoReferente"
              id="input_telefonoReferente"
              onChange={({ target }) => setTelefonoReferente(target.value)}
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Registrar" />
          </div>
        </form>
      </div>
    </>
  );
}
