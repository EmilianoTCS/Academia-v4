import React, { useState, useEffect } from "react";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../../../components/templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const EditarEDDReferentes = ({
  isActiveEditEDDReferente,
  cambiarEstado,
  IDEvaluacionReferente,
}) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [estado, setEstado] = useState("");
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [listClientes, setlistClientes] = useState([]);
  const [listProyectos, setlistProyectos] = useState([]);
  const [responseID, setResponseID] = useState([]);
  const [listEquipos, setlistEquipos] = useState([]);

  const show = isActiveEditEDDReferente;

  const handleClose = () => {
    cambiarEstado(false);
  };

  function getData() {
    const url = "EDD/seleccion/selectEvaluacionReferentes.php";
    const operationUrl = "ID";
    const data = { IDEvaluacion: IDEvaluacionReferente };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setFechaInicio(response[0].fechaInicio);
      setFechaFin(response[0].fechaFin);
      setProyecto(response[0].proyecto);
      setNombreCliente(response[0].nombreCliente);
      setEstado(response[0].estado);
      setNombreEquipo(response[0].nombreEquipo);
    });
  }

  function SendData(e) {
    e.preventDefault();
    const url = "EDD/edicion/editarEvaluacionReferentes.php";
    const operationUrl = "editarEvaluacion";
    var data = {
      ID: IDEvaluacionReferente,
      fechaInicio: fechaInicio === "" ? responseID[0].fechaInicio : fechaInicio,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      proyecto: proyecto === "" ? responseID[0].proyecto : proyecto,
      nombreEquipo:
        nombreEquipo === "" ? responseID[0].nombreEquipo : nombreEquipo,
      nombreCliente:
        nombreCliente === "" ? responseID[0].nombreCliente : nombreCliente,
      estado: estado === "" ? responseID[0].estado : estado,
    };

    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
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
  useEffect(
    function () {
      if (IDEvaluacionReferente !== null) {
        obtenerClientes();
        obtenerProyectos();
        obtenerEquipos();
        getData();
      }
    },
    [IDEvaluacionReferente]
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
          <Modal.Title>Editar evaluación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Seleccione su cliente:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setNombreCliente(target.value)}
                value={nombreCliente || ""}
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
                  <option
                    value={valor.nombreEquipo}
                    selected={
                      valor.nombreEquipo === nombreEquipo ? "selected" : ""
                    }
                  >
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
                value={fechaInicio || ""}
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
                value={fechaFin || ""}
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
                  <option
                    selected={
                      valor.nombreProyecto === proyecto ? "selected" : ""
                    }
                    value={valor.nombreProyecto}
                  >
                    {valor.nombreProyecto}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Seleccione su estado: </label>

              <select
                required
                className="form-control"
                onChange={({ target }) => setEstado(target.value)}
                value={estado || ""}
              >
                <option selected="selected">Seleccione un estado nuevo</option>
                <option value="Programado">Programado</option>
                <option value="En progreso">En progreso</option>
                <option value="Finalizado">Finalizado</option>
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
export default EditarEDDReferentes;
