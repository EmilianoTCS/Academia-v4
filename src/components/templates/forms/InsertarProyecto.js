import React, { useEffect, useState } from "react";

import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const InsertarProyecto = ({ isActiveProyecto, cambiarEstado, proyecto }) => {
  // ----------------------CONSTANTES----------------------------
  const [cliente, setCliente] = useState("");
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [cuentaJP, setCuentaJP] = useState("");
  const [listadoClientes, setListClientes] = useState([""]);
  const [servicio, setServicio] = useState("");
  const listProyecto = proyecto;

  const show = isActiveProyecto;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarProyecto.php";
    const operationUrl = "insertarProyecto";
    var data = {
      nombreProyecto: nombreProyecto,
      cliente: cliente,
      cuentaJP: cuentaJP,
      servicio: servicio,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...proyecto } = response[0];
      TopAlerts(successCreated);
      actualizarProyecto(proyecto);
    });
  }

  function actualizarProyecto(response) {
    listProyecto.push(response);
  }

  function obtenerClientes() {
    const url = "TASKS/auxiliar/ListadoClientes.php?listadoClientes";
    getDataService(url).then((clientes) => {
      setListClientes(clientes);
    });
  }

  useEffect(() => {
    obtenerClientes();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreEquipo">Nombre del proyecto:</label>
              <input
                placeholder="Escriba nombre del proyecto"
                type="text"
                className="form-control"
                name="input_nombreEquipo"
                id="input_nombreEquipo"
                onChange={({ target }) => setNombreProyecto(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Cliente: </label>
              <select
                required
                className="form-control"
                name="input_Cliente"
                id="input_Cliente"
                onChange={({ target }) => setCliente(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                {listadoClientes.map((valor) => (
                  <option value={valor.nombreCliente}>
                    {valor.nombreCliente}
                  </option>
                ))}
              </select>
              <div>
                <label htmlFor="input_nombreEquipo">Cuenta JP:</label>
                <input
                  placeholder="Escriba nombre de Cuenta JP"
                  type="text"
                  className="form-control"
                  name="input_nombreEquipo"
                  id="input_nombreEquipo"
                  onChange={({ target }) => setCuentaJP(target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="input_nombreEquipo">Servicio:</label>
                <input
                  placeholder="Escriba nombre de Cuenta JP"
                  type="text"
                  className="form-control"
                  name="input_nombreEquipo"
                  id="input_nombreEquipo"
                  onChange={({ target }) => setServicio(target.value)}
                  required
                />
              </div>
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
export default InsertarProyecto;
