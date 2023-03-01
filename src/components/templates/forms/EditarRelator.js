import React, { useState, useEffect } from "react";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const EditarRelator = ({ isActiveEditRelator, cambiarEstado, IDRelator }) => {
  const [relator, setRelator] = useState("");
  const [area, setArea] = useState("");
  const [responseID, setResponseID] = useState([""]);
  const [listArea, setListArea] = useState([]);

  const show = isActiveEditRelator;

  const handleClose = () => {
    cambiarEstado(false);
    setRelator(responseID[0].nombre);
    setArea(responseID[0].area);
  };

  function getData() {
    const url = "TASKS/coe-selectRelatores.php";
    const operationUrl = "ID";
    const data = { ID: IDRelator };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setRelator(response[0].nombre);
      setArea(response[0].area);
    });
  }

  function SendData(e) {
    // e.preventDefault();
    const url = "TASKS/coe-editRelatores.php";
    const operationUrl = "editarRelatores";
    var data = {
      ID: IDRelator,
      nombre: relator === "" ? responseID[0].nombre : relator,
      idArea: area === "" ? responseID[0].idArea : area,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  function obtenerAreas() {
    const url = "TASKS/auxiliar/ListadoAreas.php?listadoArea";
    getDataService(url).then((response) => setListArea(response));
  }
  useEffect(
    function () {
      if (IDRelator !== null) {
        getData();
        obtenerAreas();
      }
    },
    [IDRelator]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Relator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_Relator">Relator:</label>
              <input
                type="text"
                className="form-control"
                name="input_Relator"
                id="input_Relator"
                onChange={({ target }) => setRelator(target.value)}
                value={relator || ""}
                required
              />
            </div>

            <div>
              <label htmlFor="input_fechaInicio">Área: </label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setArea(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listArea.map((valor) => (
                  <option
                    selected={valor.nombreArea === area ? "selected" : ""}
                    value={valor.ID}
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
export default EditarRelator;
