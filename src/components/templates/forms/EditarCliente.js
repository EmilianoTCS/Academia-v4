import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarClientes = ({ isActiveEditCliente, cambiarEstado, IDCliente }) => {
  // ----------------------CONSTANTES----------------------------
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");
  const [responseID, setResponseID] = useState([""]);

  const show = isActiveEditCliente;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectClientes.php";
    const operationUrl = "ID";
    const data = { ID: IDCliente };
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
      ID: IDCliente,
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
      getData();
    },
    [IDCliente]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              value={nombreCliente || ""}
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
              value={referente || ""}
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
              value={correoReferente || ""}
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
              value={cargoReferente || ""}
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
              value={telefonoReferente || ""}
              className="form-control"
              name="input_telefonoReferente"
              id="input_telefonoReferente"
              onChange={({ target }) => setTelefonoReferente(target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            id="btn_registrar"
            value="Registrar"
            onClick={SendData}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarClientes;
