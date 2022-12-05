import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";
import "../../css/InsertarRamo.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarClientes = ({ isActiveCliente, cambiarEstado }) => { 
  // ----------------------CONSTANTES----------------------------
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");
  
  const show = isActiveCliente;

  const handleClose = () => cambiarEstado(false);


  // ----------------------FUNCIONES----------------------------

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
          <Modal.Title>Insertar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
}
export default InsertarClientes;
