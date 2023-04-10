import React, { useState, useEffect } from "react";
import "../../css/InsertarCursoCalendario.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const EditarRamo = ({
  isActiveEditRamo,
  cambiarEstado,
  IDRamo,
  ramos,
  setRamos,
}) => {
  // ----------------------CONSTANTES----------------------------

  const [listRelatores, setListRelatores] = useState([""]);
  const [codigoRamo, setCodigoRamo] = useState("");
  const [nombreRamo, setNombreRamo] = useState("");
  const [hh_academicas, set_hh_academicas] = useState("");
  const listRamos = ramos;
  const [nombreRelator, setRelator] = useState("");
  const [idRelator, setidRelator] = useState("");
  const [responseID, setResponseID] = useState([""]);

  const show = isActiveEditRamo;

  const handleClose = () => {
    cambiarEstado(false);
    setCodigoRamo(responseID[0].codigoRamo);
    setNombreRamo(responseID[0].nombreRamo);
    set_hh_academicas(responseID[0].hh_academicas);
    setRelator(responseID[0].nombre);
    setidRelator(responseID[0].idRelator);
  };

  // ----------------------FUNCIONES----------------------------

  function obtenerRelatores() {
    const url = "TASKS/auxiliar/ListadoRelatores.php?listadoRelatores";
    getDataService(url).then((relatores) => setListRelatores(relatores));
  }

  function getData() {
    const url = "TASKS/coe-selectCursos.php";
    const operationUrl = "ID";
    const data = { ID: IDRamo };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setCodigoRamo(response[0].codigoRamo);
      setNombreRamo(response[0].nombreRamo);
      set_hh_academicas(response[0].hh_academicas);
      setRelator(response[0].nombre);
      setidRelator(response[0].idRelator);
    });
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editRamo.php";
    const operationUrl = "editarRamo";
    var data = {
      ID: IDRamo,
      idRelator: idRelator === "" ? responseID[0].idRelator : idRelator,
      codigoRamo: codigoRamo === "" ? responseID[0].codigoRamo : codigoRamo,
      nombreRamo: nombreRamo === "" ? responseID[0].nombreRamo : nombreRamo,
      hh_academicas:
        hh_academicas === "" ? responseID[0].hh_academicas : hh_academicas,
      nombreRelator:
        nombreRelator === "" ? responseID[0].idRelator : nombreRelator,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...ramo } = response[0];
      TopAlerts(successEdited);
      actualizarRamo(ramo);
    });
  }
  function actualizarRamo(ramo) {
    const nuevosRamos = listRamos.map((r) => (r.ID === ramo.ID ? ramo : r));
    setRamos(nuevosRamos);
  }

  useEffect(
    function () {
      if (IDRamo !== null) {
        getData();
        obtenerRelatores();
      }
    },
    [IDRamo]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            {/* <div>
              <label htmlFor="input_codigoRamo">Código del ramo: </label>
              <input
                type="text"
                placeholder="Ejemplo: JAV"
                id="input_codigoRamo"
                name="input_codigoRamo"
                className="form-control"
                onChange={({ target }) => setCodigoRamo(target.value)}
                value={codigoRamo || ""}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
              <input
                value={nombreRamo || ""}
                type="text"
                placeholder="Ejemplo: JAV"
                id="input_nombreRamo"
                name="input_nombreRamo"
                className="form-control"
                onChange={({ target }) => setNombreRamo(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_hhAcademicas">Horas académicas</label>
              <input
                value={hh_academicas || ""}
                type="number"
                className="form-control"
                name="input_hhAcademicas"
                id="input_hhAcademicas"
                onChange={({ target }) => set_hh_academicas(target.value)}
                required
              />
            </div> */}
            <div>
              <label htmlFor="input_tipoCliente">Relator:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setidRelator(target.value)}
              >
                {listRelatores.map((valor) => (
                  <option
                    selected={valor.nombre === nombreRelator ? "selected" : ""}
                    value={valor.ID}
                  >
                    {valor.nombre}
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
export default EditarRamo;
