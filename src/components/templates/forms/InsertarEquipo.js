import React, { useState } from "react";

import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEmpleado = ({ isActiveEquipo, cambiarEstado, equipo }) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [nombreApellido, setNombreApellido] = useState("");
  const [nombreArea, setNombreArea] = useState("");
  const listEquipo = equipo;

  const show = isActiveEquipo;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarEquipos.php";
    const operationUrl = "insertarEquipos";
    var data = {
        nombreEquipo: nombreEquipo,
        cliente: cliente,
        nombreProyecto: nombreProyecto,
        nombreApellido: nombreApellido,
        nombreArea:nombreArea,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...equipo } = response[0];
      TopAlerts(successCreated);
      actualizarEquipo(equipo);
    });
  }

  function actualizarEquipo(response) {
    listEquipo.push(response);
  }

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Equipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreEquipo">Nombre del equipo:</label>
              <input
                placeholder="Escriba nombre de equipo"
                type="text"
                className="form-control"
                name="input_nombreEquipo"
                id="input_nombreEquipo"
                onChange={({ target }) => setNombreEquipo(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Tipo de Cliente: </label>
              <select
                required
                className="form-control"
                name="input_Cliente"
                id="input_Cliente"
                onChange={({ target }) => setCliente(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_proyecto">Nombre del proyecto: </label>
              <select
                required
                className="form-control"
                name="input_proyecto"
                id="input_proyecto"
                onChange={({ target }) => setNombreProyecto(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_nombreApellido">Nombre y apellido: </label>
              <select
                required
                className="form-control"
                name="input_nombreApellido"
                id="input_nombreApellido"
                onChange={({ target }) => setNombreApellido(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div>


            <div className="form-group">
              <label htmlFor="input_nombreArea">Nombre del area: </label>
              <select
                required
                className="form-control"
                name="input_nombreArea"
                id="input_nombreArea"
                onChange={({ target }) => setNombreArea(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
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
export default InsertarEmpleado;
