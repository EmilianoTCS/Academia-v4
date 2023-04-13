import React, { useState } from "react";

import "../../css/InsertarRamo.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEmpleado = ({ isActiveEmpleado, cambiarEstado, empleado }) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreApellido, setNombreApellido] = useState("");
  const [cargo, setNombreCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const listEmpleado = empleado;

  const show = isActiveEmpleado;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarEmpleados.php";
    const operationUrl = "insertarEmpleado";
    var data = {
        nombreApellido: nombreApellido,
        cargo: cargo,
        correo: correo,
        usuario: usuario,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...empleado } = response[0];
      TopAlerts(successCreated);
      actualizarEmpleados(empleado);
    });
  }

  function actualizarEmpleados(response) {
    listEmpleado.push(response);
  }

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            {/* <div className="form-group">
              <label htmlFor="input_tipoCliente">Tipo de cliente: </label>
              <select
                required
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                placeholder="hola"
                onChange={({ target }) => setTipoClientes(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div> */}

            <div>
              <label htmlFor="input_nombreCliente">Nombre del empleado:</label>
              <input
                placeholder="Escriba nombre completo"
                type="text"
                className="form-control"
                name="input_nombreEmpleado"
                id="input_nombreEmpleado"
                onChange={({ target }) => setNombreApellido(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_nombreCliente">Cargo</label>
              <input
                placeholder="Escriba cargo del empleado"
                type="text"
                className="form-control"
                name="input_cargoEmpleado"
                id="input_cargoEmpleado"
                onChange={({ target }) => setNombreCargo(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_usuario">Usuario:</label>
              <input
                placeholder="Escriba usuario"
                type="text"
                className="form-control"
                name="input_usuario"
                id="input_usuario"
                onChange={({ target }) => setUsuario(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_correoEmpleado">
                Correo del empleado:
              </label>
              <input
                placeholder="Escriba correo del empleado"
                type="email"
                className="form-control"
                name="input_correoEmpleado"
                id="input_correoEmpleado"
                onChange={({ target }) => setCorreo(target.value)}
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
export default InsertarEmpleado;
