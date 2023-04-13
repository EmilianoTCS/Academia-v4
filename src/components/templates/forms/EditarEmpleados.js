import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarEmpleados = ({
  isActiveEditEmpleado,
  cambiarEstado,
  IDEmpleado,
  empleado,
  setEmpleado,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreApellido, setNombreApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [responseID, setResponseID] = useState([""]);
  const listEmpleados = empleado;

  const show = isActiveEditEmpleado;

  const handleClose = () => {
    cambiarEstado(false);
    setNombreApellido(responseID[0].nombreApellido);
    setCargo(responseID[0].cargo);
  };

  // ----------------------FUNCIONES----------------------------

  const getData = useCallback(() => {
    const url = "TASKS/coe-selectEmpleados.php";
    const operationUrl = "ID";
    const data = { ID: IDEmpleado };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setNombreApellido(response[0].nombreApellido);
      setCargo(response[0].cargo);
    });
  }, [IDEmpleado]);

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editEmpleados.php";

    const operationUrl = "editEmpleados";
    var data = {
      ID: IDEmpleado,
      nombreApellido:nombreApellido === "" ? responseID[0].nombreApellido : nombreApellido,
      cargo:cargo === "" ? responseID[0].cargo : cargo,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...empleado } = response[0];
      TopAlerts(successEdited);
      actualizarEmpleado(empleado);
    });

    function actualizarEmpleado(empleado) {
      const nuevosEmpleados = listEmpleados.map((c) =>
        c.ID === empleado.ID ? empleado : c
      );
      setEmpleado(nuevosEmpleados);
    }
  }

  useEffect(
    function () {
      if (IDEmpleado !== null) {
        getData();
      }
    },
    [IDEmpleado, getData]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreApellido">Nombre del empleado:</label>
              <input
                value={nombreApellido || ""}
                type="text"
                className="form-control"
                name="input_nombreApellido"
                id="input_nombreApellido"
                onChange={({ target }) => setNombreApellido(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_Cargo">Cargo</label>
              <input
                value={cargo || ""}
                type="text"
                className="form-control"
                name="input_Cargo"
                id="input_Cargo"
                onChange={({ target }) => setCargo(target.value)}
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

export default EditarEmpleados;
