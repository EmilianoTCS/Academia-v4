import React, { useState } from "react";
import SendDataService from "../../../services/SendDataService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TopAlerts from "../../../components/templates/alerts/TopAlerts";
const InsertarEDDAnalistas = ({
  isActiveInsertEDDAnalistas,
  cambiarEstado,
}) => {
  // ----------------------CONSTANTES----------------------------

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [cliente, setCliente] = useState("");

  const show = isActiveInsertEDDAnalistas;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "EDD/creacion/InsertarEvaluacionAnalistas.php";
    const operationUrl = "insertarEDDAnalistas";
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
          <Modal.Title>Insertar evaluación de analista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
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
            <div>
              <label htmlFor="input_Relator">Proyecto:</label>
              <input
                type="text"
                className="form-control"
                name="input_Proyecto"
                id="input_Proyecto"
                onChange={({ target }) => setProyecto(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_Relator">Seleccione su cliente:</label>
              <input
                type="text"
                className="form-control"
                name="input_cliente"
                id="input_cliente"
                onChange={({ target }) => setCliente(target.value)}
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
export default InsertarEDDAnalistas;
