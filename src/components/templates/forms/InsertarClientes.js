import React, { useState } from "react";

import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarClientes = ({ isActiveCliente, cambiarEstado, cliente }) => {
  // ----------------------CONSTANTES----------------------------
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");
  const listClientes = cliente;

  const show = isActiveCliente;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    // e.preventDefault();
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

    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cliente } = response[0];
      TopAlerts(successCreated);
      actualizarCliente(cliente);
    });
  }

  function actualizarCliente(response) {
    listClientes.push(response);
  }

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Tipo de cliente: </label>
              <select
                required
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                placeholder="hola"
                onChange={({ target }) => setTipoClientes(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div>

            <div>
              <label htmlFor="input_nombreCliente">Nombre del cliente:</label>
              <input
                placeholder="Escriba nombre completo"
                type="text"
                className="form-control"
                name="input_nombreCliente"
                id="input_nombreCliente"
                onChange={({ target }) => setNombreCliente(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_referente">Referente:</label>
              <input
                placeholder="Escriba referente"
                type="text"
                className="form-control"
                name="input_referente"
                id="input_referente"
                onChange={({ target }) => setReferente(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_correoReferente">
                Correo del referente:
              </label>
              <input
                placeholder="Escriba correo del referente"
                type="email"
                className="form-control"
                name="input_correoReferente"
                id="input_correoReferente"
                onChange={({ target }) => setCorreoReferente(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_cargoReferente">Cargo del referente:</label>
              <input
                placeholder="Escriba cargo del referente"
                type="text"
                className="form-control"
                name="input_cargoReferente"
                id="input_cargoReferente"
                onChange={({ target }) => setCargoReferente(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_telefonoReferente">
                Teléfono del referente:
              </label>
              <input
                placeholder="Escriba telefono del referente"
                type="number"
                className="form-control"
                name="input_telefonoReferente"
                id="input_telefonoReferente"
                onChange={({ target }) => setTelefonoReferente(target.value)}
                required
              />
            </div>
            <Button
              variant="secondary"
              type="submit"
              id="btn_registrar"
              value="Registrar"
            >
              Registrar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InsertarClientes;
