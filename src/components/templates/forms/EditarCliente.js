import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";
import "../../css/InsertarRamo.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";

export default function EditarClientes(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.Props.isActiveEditCliente);
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");
  const [responseID, setResponseID] = useState([""]);

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(false);
  }

  function getData() {
    const url = "TASKS/coe-selectClientes.php";
    const operationUrl = "ID";
    const data = { ID: props.Props.IDCliente };
    SendDataService(url, operationUrl, data).then(
      (response) => setResponseID(response),
      setTipoClientes(responseID[0].tipo_cliente),
      setNombreCliente(responseID[0].nombreCliente),
      setReferente(responseID[0].referente),
      setCorreoReferente(responseID[0].correoReferente),
      setCargoReferente(responseID[0].cargoReferente),
      setTelefonoReferente(responseID[0].telefonoReferente)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editClientes.php";
    const operationUrl = "editarCliente";
    var data = {
      ID: props.Props.IDCliente,
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
      setisActive(props.Props.isActiveEditCliente);
      getData();
    },
    [props]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <div id="containerFormCurso" className={isActive ? "active" : ""}>
        <form id="form_insertarDataCurso" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Actualiazr Cliente</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>

          <div className="form-group">
            <label htmlFor="input_tipoCliente">Tipo de cliente: </label>
            <select
              value={tipo_cliente}
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
              value={nombreCliente}
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
              value={referente}
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
              value={correoReferente}
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
              value={cargoReferente}
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
              value={telefonoReferente}
              className="form-control"
              name="input_telefonoReferente"
              id="input_telefonoReferente"
              onChange={({ target }) => setTelefonoReferente(target.value)}
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Actualizar" />
          </div>
        </form>
      </div>
    </>
  );
}
