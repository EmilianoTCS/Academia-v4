import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const EditarProyecto = ({
  isActiveEditProyecto,
  cambiarEstado,
  IDProyecto,
  proyecto,
  setProyectos,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [cliente, setCliente] = useState("");
  const [cuentaJP, setCuentaJP] = useState("");
  const [servicio, setServicio] = useState("");
  const [responseID, setResponseID] = useState([""]);
  const [listadoClientes, setListClientes] = useState([""]);

  const listProyectos = proyecto;

  const show = isActiveEditProyecto;

  const handleClose = () => {
    cambiarEstado(false);
    setCliente(responseID[0].cliente);
    setNombreProyecto(responseID[0].nombreProyecto);
    setCuentaJP(responseID[0].cuentaJP);
    setServicio(responseID[0].servicio);
  };

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectProyectos.php";
    const operationUrl = "ID";
    const data = { ID: IDProyecto };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setNombreProyecto(response[0].nombreProyecto);
      setCliente(response[0].cliente);
      setCuentaJP(response[0].cuentaJP);
      setServicio(response[0].servicio);
    });
  }

  function obtenerClientes() {
    const url = "TASKS/auxiliar/ListadoClientes.php?listadoClientes";
    getDataService(url).then((clientes) => {
      setListClientes(clientes);
    });
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editProyectos.php";

    const operationUrl = "editProyectos";
    var data = {
      ID: IDProyecto,
      cliente: cliente === "" ? responseID[0].cliente : cliente,
      nombreProyecto:
        nombreProyecto === "" ? responseID[0].nombreProyecto : nombreProyecto,
      cuentaJP: cuentaJP === "" ? responseID[0].cuentaJP : cuentaJP,
      servicio: servicio === "" ? responseID[0].servicio : servicio,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      response;

      const { successEdited, ...proyecto } = response[0];
      TopAlerts(successEdited);
      actualizarProyecto(proyecto);
    });

    function actualizarProyecto(response) {
      const nuevosProyectos = listProyectos.map((p) =>
        p.ID === response.ID ? response : p
      );
      setProyectos(nuevosProyectos);
    }
  }

  useEffect(
    function () {
      if (IDProyecto !== null) {
        getData();
        obtenerClientes();
      }
    },
    [IDProyecto]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proyecto</Modal.Title>
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
                value={nombreProyecto || ""}
                onChange={({ target }) => setNombreProyecto(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Cliente: </label>
              <select
                required
                className="form-control"
                defaultValue={cliente || ""}
                name="input_Cliente"
                id="input_Cliente"
                onChange={({ target }) => setCliente(target.value)}
              >
                {listadoClientes.map((valor) => (
                  <option
                    value={valor.nombreCliente}
                    defaultValue={
                      valor.nombreCliente === cliente ? "selected" : ""
                    }
                  >
                    {valor.nombreCliente}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="input_nombreEquipo">Cuenta JP:</label>
              <input
                placeholder="Escriba nombre de Cuenta JP"
                type="text"
                value={cuentaJP || ""}
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
                value={servicio || ""}
                onChange={({ target }) => setServicio(target.value)}
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

export default EditarProyecto;
