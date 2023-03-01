import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarClientes = ({
  isActiveEditCliente,
  cambiarEstado,
  IDCliente,
  cliente,
  setCliente,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [tipo_cliente, setTipoClientes] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [referente, setReferente] = useState("");
  const [correoReferente, setCorreoReferente] = useState("");
  const [cargoReferente, setCargoReferente] = useState("");
  const [telefonoReferente, setTelefonoReferente] = useState("");
  const [responseID, setResponseID] = useState([""]);
  const listClientes = cliente;

  const show = isActiveEditCliente;

  const handleClose = () => {
    cambiarEstado(false);
    setCargoReferente(responseID[0].cargoReferente);
    setTipoClientes(responseID[0].tipo_cliente);
    setNombreCliente(responseID[0].nombreCliente);
    setReferente(responseID[0].referente);
    setCorreoReferente(responseID[0].correoReferente);
    setTelefonoReferente(responseID[0].telefonoReferente);
  };

  // ----------------------FUNCIONES----------------------------

  const getData = useCallback(() => {
    const url = "TASKS/coe-selectClientes.php";
    const operationUrl = "ID";
    const data = { ID: IDCliente };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setCargoReferente(response[0].cargoReferente);
      setTipoClientes(response[0].tipo_cliente);
      setNombreCliente(response[0].nombreCliente);
      setReferente(response[0].referente);
      setCorreoReferente(response[0].correoReferente);
      setTelefonoReferente(response[0].telefonoReferente);
    });
  }, [IDCliente]);

  function SendData(e) {
    // e.preventDefault();
    const url = "TASKS/coe-editClientes.php";

    const operationUrl = "editarCliente";
    var data = {
      ID: IDCliente,
      tipo_cliente:
        tipo_cliente === "" ? responseID[0].tipo_cliente : tipo_cliente,
      nombreCliente:
        nombreCliente === "" ? responseID[0].nombreCliente : nombreCliente,
      referente: referente === "" ? responseID[0].referente : referente,
      correoReferente:
        correoReferente === ""
          ? responseID[0].correoReferente
          : correoReferente,
      telefonoReferente:
        telefonoReferente === ""
          ? responseID[0].telefonoReferente
          : telefonoReferente,
      cargoReferente:
        cargoReferente === "" ? responseID[0].cargoReferente : cargoReferente,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cliente } = response[0];
      TopAlerts(successEdited);
      actualizarCliente(cliente);
    });

    function actualizarCliente(cliente) {
      const nuevosClientes = listClientes.map((c) =>
        c.ID === cliente.ID ? cliente : c
      );
      setCliente(nuevosClientes);
    }
  }

  useEffect(
    function () {
      if (IDCliente !== null) {
        getData();
      }
    },
    [IDCliente, getData]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Tipo de cliente: </label>
              <select
                value={tipo_cliente || ""}
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                onChange={({ target }) => setTipoClientes(target.value)}
                required
              >
                <option hidden value="">Desplegar lista</option>
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
                required
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
                required
              />
            </div>
            <div>
              <label htmlFor="input_correoReferente">
                Correo del referente:
              </label>
              <input
                value={correoReferente || ""}
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
                value={cargoReferente || ""}
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
                type="number"
                value={telefonoReferente || ""}
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

export default EditarClientes;
