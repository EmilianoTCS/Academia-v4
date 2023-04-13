import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";
import { useCallback } from "react";

const EditarEquipos = ({
  isActiveEditEquipo,
  cambiarEstado,
  IDEquipo,
  equipo,
  setEquipo,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [nombreApellido, setNombreApellido] = useState("");
  const [nombreArea, setNombreArea] = useState("");
  const [responseID, setResponseID] = useState([""]);
  const [listadoEmpleados,setListEmpleados]=useState([""]);
  const [listadoClientes,setListClientes]=useState([""]);
  const [listadoProyectos,setListProyectos]=useState([""]);
  const [listadoArea,setListArea]=useState([""]);

  
  const listEquipos = equipo;

  const show = isActiveEditEquipo;

  const handleClose = () => {
    cambiarEstado(false);
    setNombreEquipo(responseID[0].nombreEquipo);
    setCliente(responseID[0].cliente);
    setNombreProyecto(responseID[0].nombreProyecto);
    setNombreApellido(responseID[0].nombreApellido);
    setNombreArea(responseID[0].nombreArea);
  };

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectEquipos.php";
    const operationUrl = "ID";
    const data = { ID: IDEquipo };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setNombreEquipo(response[0].nombreEquipo);
      setCliente(response[0].cliente);
      setNombreProyecto(response[0].nombreProyecto);
      setNombreApellido(response[0].nombreApellido);
      setNombreArea(response[0].nombreArea);
      console.log(response);
    });
}

  function obtenerEmpleados() {
    const url = "TASKS/auxiliar/ListadoEmpleados.php?listadoEmpleados";
    getDataService(url).then((empleados) => setListEmpleados(empleados));
  }

  function obtenerClientes() {
    const url = "TASKS/auxiliar/ListadoClientes.php?listadoClientes";
    getDataService(url).then((clientes) => setListClientes(clientes));
  }

  function obtenerProyectos() {
    const url = "TASKS/auxiliar/ListadoProyectos.php?listadoProyectos";
    getDataService(url).then((proyectos) => setListProyectos(proyectos));
  }

  function obtenerArea() {
    const url = "TASKS/auxiliar/ListadoAreas.php?listadoArea";
    getDataService(url).then((area) => setListArea(area));
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editEquipos.php";

    const operationUrl = "editEquipos";
    var data = {
      ID: IDEquipo,
      nombreApellido:nombreApellido === "" ? responseID[0].nombreApellido : nombreApellido,
      cargo:cargo === "" ? responseID[0].cargo : cargo,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...equipo } = response[0];
      TopAlerts(successEdited);
      actualizarEquipo(equipo);
    });

    function actualizarEquipo(equipo) {
      const nuevosEquipos = listEquipos.map((c) =>
        c.ID === equipo.ID ? equipo : c
      );
      setEquipo(nuevosEquipos);
    }
  }

  useEffect(
    function () {
      if (IDEquipo !== null) {
        getData();
        obtenerEmpleados();
        obtenerClientes();
        obtenerProyectos();
        obtenerArea();
      }
    },
    [IDEquipo]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Equipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreEquipo">Nombre del equipo:</label>
              <input
                placeholder="Escriba nombre de equipo"
                value={nombreEquipo || ""}
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
                value={cliente || ""}
                name="input_Cliente"
                id="input_Cliente"
                onChange={({ target }) => setCliente(target.value)}
              >
                {listadoClientes.map((valor) => (
                  <option
                    value={valor.nombreCliente}
                    selected={valor.nombreCliente === cliente ? "selected" : ""}
                  >
                    {valor.nombreCliente}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_proyecto">Nombre del proyecto: </label>
              <select
                required
                className="form-control"
                value={nombreProyecto || ""}
                name="input_proyecto"
                id="input_proyecto"
                onChange={({ target }) => setNombreProyecto(target.value)}
              >
                {listadoProyectos.map((valor) => (
                  <option
                    value={valor.ID}
                    selected={valor.nombreProyecto === nombreProyecto ? "selected" : ""}
                  >
                    {valor.nombreProyecto}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_nombreApellido">Nombre y apellido: </label>
              <select
                required
                className="form-control"
                name="input_nombreApellido"
                value={nombreApellido || ""}
                id="input_nombreApellido"
                onChange={({ target }) => setNombreApellido(target.value)}
              >
                {listadoEmpleados.map((valor) => (
                  <option
                    value={valor.ID}
                    selected={valor.nombreApellido === nombreApellido ? "selected" : ""}
                  >
                    {valor.nombreApellido}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label htmlFor="input_nombreArea">Nombre del area: </label>
              <select
                required
                className="form-control"
                name="input_nombreArea"
                value={nombreArea || ""}
                id="input_nombreArea"
                onChange={({ target }) => setNombreArea(target.value)}
              >
                {listadoArea.map((valor) => (
                  <option
                    value={valor.ID}
                    selected={valor.nombreArea === nombreArea ? "selected" : ""}
                  >
                    {valor.nombreArea}
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

export default EditarEquipos;
