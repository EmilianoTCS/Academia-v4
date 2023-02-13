import React, { useEffect, useState } from "react";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const InsertarRelator = ({ isActiveRelator, cambiarEstado }) => {
  const [relator, setRelator] = useState("");
  const [area, setArea] = useState("");
  const [listArea, setListArea] = useState([]);

  const show = isActiveRelator;

  const handleClose = () => cambiarEstado(false);

  function obtenerAreas() {
    const url = "TASKS/auxiliar/ListadoAreas.php?listadoArea";
    getDataService(url).then((response) => setListArea(response));
  }

  function SendData(e) {
    // e.preventDefault();
    const url = "TASKS/coe-insertarRelator.php";
    const operationUrl = "insertarRelator";
    var data = {
      area: area,
      nombre: relator,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(function () {
    obtenerAreas();
  }, []);
  // ----------------------MAPEADOS----------------------------

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insertar Relator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_Relator">Relator:</label>
              <input
              placeholder="Escriba el nombre del relator"
                type="text"
                className="form-control"
                name="input_Relator"
                id="input_Relator"
                onChange={({ target }) => setRelator(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Área:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setArea(target.value)}
              >
                <option hidden value="">Desplegar lista</option>

                {listArea.map((valor) => (
                  <option value={valor.ID}>{valor.nombreArea}</option>
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
export default InsertarRelator;
