import React, { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarColaborador = ({ isActiveColaborador, cambiarEstado }) => {
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [subgerencia, setSubgerencia] = useState("");
  const [correo, setCorreo] = useState("");
  const [listCuentas, setListCuentas] = useState([""]);

  const show = isActiveColaborador;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    // e.preventDefault();
    const url = "TASKS/coe-insertarColaborador.php";
    const operationUrl = "insertarColaborador";
    var data = {
      codigoCuenta: codigoCuenta,
      nombre_completo: nombreCompleto,
      usuario: usuario,
      area: area,
      subgerencia: subgerencia,
      correo: correo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }

  useEffect(function () {
    obtenerCuentas();
  }, []);

  // ----------------------MAPEADOS----------------------------

  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
    value: label.ID,
  }));

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
              <label htmlFor="input_fechaInicio">Cuenta: </label>
              <Select
                placeholder="Elige una cuenta"
                name="cuenta"
                options={optionsCuentas}
                onChange={({ value }) => setCodigoCuenta(value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreCompleto">Nombre completo:</label>
              <input
                type="text"
                className="form-control"
                name="input_nombreCompleto"
                id="input_nombreCompleto"
                onChange={({ target }) => setNombreCompleto(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_usuario">Usuario:</label>
              <input
                type="text"
                className="form-control"
                name="input_usuario"
                id="input_usuario"
                onChange={({ target }) => setUsuario(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_area">??rea:</label>
              <input
                type="text"
                className="form-control"
                name="input_area"
                id="input_area"
                onChange={({ target }) => setArea(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_subgerencia">Subgerencia:</label>
              <input
                type="text"
                className="form-control"
                name="input_subgerencia"
                id="input_subgerencia"
                onChange={({ target }) => setSubgerencia(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_correo">Correo:</label>
              <input
                type="email"
                className="form-control"
                name="input_correo"
                id="input_correo"
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

export default InsertarColaborador;
