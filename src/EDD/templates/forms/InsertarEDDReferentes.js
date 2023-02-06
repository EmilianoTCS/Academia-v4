import React, { useState, useEffect } from "react";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TopAlerts from "../../../components/templates/alerts/TopAlerts";
const InsertarEDDReferentes = ({
  isActiveInsertEDDReferente,
  cambiarEstado,
}) => {
  // ----------------------CONSTANTES----------------------------

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [listClientes, setlistClientes] = useState([]);
  const [listProyectos, setlistProyectos] = useState([]);
  const [listEquipos, setlistEquipos] = useState([]);
  const show = isActiveInsertEDDReferente;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "EDD/creacion/InsertarEvaluacionReferentes.php";
    const operationUrl = "insertarEDDReferentes";
    var data = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      proyecto: proyecto,
      cliente: cliente,
    };
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts(response);
    });
  }
  function obtenerClientes() {
    const url = "EDD/seleccion/ListadoClientes.php?listadoClientes";
    getDataService(url).then((response) => setlistClientes(response));
  }
  function obtenerEquipos() {
    const url = "EDD/seleccion/listadoEquipos.php?listadoEquipos";
    getDataService(url).then((response) => setlistEquipos(response));
  }
  function obtenerProyectos() {
    const url = "EDD/seleccion/ListadoProyectos.php?listadoProyectos";
    getDataService(url).then((response) => setlistProyectos(response));
  }

  useEffect(function () {
    obtenerClientes();
    obtenerProyectos();
    obtenerEquipos();
  }, []);

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
          <Modal.Title>Insertar evaluación de referentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Seleccione su cliente:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setNombreCliente(target.value)}
              >
                {listClientes.map((valor) => (
                  <option value={valor.nombreCliente}>
                    {valor.nombreCliente}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Seleccione un equipo:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setNombreEquipo(target.value)}
              >
                {listEquipos.map((valor) => (
                  <option value={valor.nombreEquipo}>
                    {valor.nombreEquipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="md-form md-outline input-with-post-icon datepicker">
              <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
              <input
                type="date"
                id="input_fechaInicio"
                name="input_fechaInicio"
                className="form-control"
                onChange={({ target }) => setFechaInicio(target.value)}
                required
              />
            </div>
            <div className="md-form md-outline input-with-post-icon datepicker">
              <label htmlFor="input_fechaInicio">Fecha Fin: </label>
              <input
                type="date"
                id="input_fechaFin"
                name="input_fechaFin"
                className="form-control"
                onChange={({ target }) => setFechaFin(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">
                Seleccione su proyecto:{" "}
              </label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setProyecto(target.value)}
                value={proyecto || ""}
              >
                {listProyectos.map((valor) => (
                  <option value={valor.nombreProyecto}>
                    {valor.nombreProyecto}
                  </option>
                ))}
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
export default InsertarEDDReferentes;
