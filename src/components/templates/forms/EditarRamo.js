import React, { useState, useEffect } from "react";
import "../../css/InsertarCursoCalendario.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarRamo = ({ isActiveEditRamo, cambiarEstado, IDRamo }) => {
  // ----------------------CONSTANTES----------------------------

  const [codigoRamo, setCodigoRamo] = useState("");
  const [nombreRamo, setNombreRamo] = useState("");
  const [hh_academicas, set_hh_academicas] = useState("");

  const [responseID, setResponseID] = useState([""]);

  const show = isActiveEditRamo;

  const handleClose = () => {
    cambiarEstado(false);
    resetStates();
  };

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectCursos.php";
    const operationUrl = "ID";
    const data = { ID: IDRamo };
    SendDataService(url, operationUrl, data).then((response) =>
      setResponseID(response)
    );
  }
  function resetStates() {
    setCodigoRamo("");
    setNombreRamo("");
    set_hh_academicas("");
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editRamo.php";
    const operationUrl = "editarRamo";
    var data = {
      ID: IDRamo,
      codigoRamo: codigoRamo === "" ? responseID[0].codigoRamo : codigoRamo,
      nombreRamo: nombreRamo === "" ? responseID[0].nombreRamo : nombreRamo,
      hh_academicas:
        hh_academicas === "" ? responseID[0].hh_academicas : hh_academicas,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      if (IDRamo !== null) {
        getData();
      }
    },
    [IDRamo]
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
          <Modal.Title>Editar Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_codigoRamo">Código del ramo: </label>
              <input
                type="text"
                placeholder="Ejemplo: JAV"
                id="input_codigoRamo"
                name="input_codigoRamo"
                className="form-control"
                onChange={({ target }) => setCodigoRamo(target.value)}
                value={
                  codigoRamo === ""
                    ? responseID[0].codigoRamo || ""
                    : codigoRamo || ""
                }
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
              <input
                value={
                  nombreRamo === ""
                    ? responseID[0].nombreRamo || ""
                    : nombreRamo || ""
                }
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
                value={
                  hh_academicas === ""
                    ? responseID[0].hh_academicas || ""
                    : hh_academicas || ""
                }
                type="text"
                className="form-control"
                name="input_hhAcademicas"
                id="input_hhAcademicas"
                onChange={({ target }) => set_hh_academicas(target.value)}
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default EditarRamo;
