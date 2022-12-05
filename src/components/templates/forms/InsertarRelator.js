import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarRelator = ({ isActiveRelator, cambiarEstado }) => {
  const [relator, setRelator] = useState("");
  const [area, setArea] = useState("");

  const show = isActiveRelator;

  const handleClose = () => cambiarEstado(false);

  function SendData(e) {
    e.preventDefault();
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
          <div>
            <label htmlFor="input_Relator">Relator:</label>
            <input
              type="text"
              className="form-control"
              name="input_Relator"
              id="input_Relator"
              onChange={({ target }) => setRelator(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_area">Área:</label>
            <input
              type="text"
              className="form-control"
              name="input_area"
              id="input_area"
              onChange={({ target }) => setArea(target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            id="btn_registrar"
            value="Registrar"
            onClick={SendData}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default InsertarRelator;
