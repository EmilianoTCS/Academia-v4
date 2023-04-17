import React, { useState, useEffect } from "react";
// import SendDataService from "../../../services/SendDataService";
import getDataService from "../../services/GetDataService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import TopAlerts from "../../../components/templates/alerts/TopAlerts";
const InsertarUsuarioEvaluaciones = ({
  isActiveUsuarioEvaluaciones,
  cambiarEstado,
}) => {
  // ----------------------CONSTANTES----------------------------

  // const [nombreEquipo, setNombreEquipo] = useState("");
  const [listEquipos, setlistEquipos] = useState([]);

  const show = isActiveUsuarioEvaluaciones;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------
  function obtenerEquipos() {
    const url = "EDD/seleccion/listadoEquipos.php?listadoEquipos";
    getDataService(url).then((response) => setlistEquipos(response));
  }

  // function SendData(e) {
  //   e.preventDefault();
  //   const url = "EDD/creacion/InsertarEvaluacionAnalistas.php";
  //   const operationUrl = "insertarEDDAnalistas";
  //   var data = {
  //     nombreEquipo: nombreEquipo,
  //   };
  //   SendDataService(url, operationUrl, data).then((response) => {
  //     TopAlerts(response);
  //   });
  // }

  useEffect(function () {
    obtenerEquipos();
  }, []);

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
          <Modal.Title>Insertar usuario a evaluación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={SendData}> */}
          <form>
          
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Seleccione un equipo:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setNombreEquipo(target.value)}
              >
                {listEquipos.map((valor) => (
                  <option value={valor.nombreEquipo}>
                    {valor.nombreEquipo}
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
export default InsertarUsuarioEvaluaciones;
