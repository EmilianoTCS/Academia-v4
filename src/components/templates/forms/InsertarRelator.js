import React, { useEffect, useState } from "react";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";
import Select from "react-select";

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

  const optionsAreas = listArea.map((label) => ({
    label: label.nombreArea,
    value: label.ID,
  }));

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
          <Modal.Title>Insertar Ramo</Modal.Title>
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
                required
              />
            </div>
            <div>
              <label htmlFor="input_area">Área:</label>
              <Select
                placeholder="Elige el área"
                name="area"
                options={optionsAreas}
                onChange={({ value }) => setArea(value)}
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
export default InsertarRelator;
