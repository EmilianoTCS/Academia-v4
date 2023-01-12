import React, { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarColaborador = ({
  isActiveEditColaborador,
  cambiarEstado,
  IDColaborador,
}) => {
  const [idCuenta, setIDCuenta] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [subgerencia, setSubgerencia] = useState("");
  const [correo, setCorreo] = useState("");
  const [listCuentas, setListCuentas] = useState([""]);
  const [responseID, setResponseID] = useState([""]);

  const show = isActiveEditColaborador;

  const handleClose = () => {
    cambiarEstado(false);

  };
  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectColaborador.php";
    const operationUrl = "ID";
    const data = { ID: IDColaborador };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setIDCuenta(response[0].idCuenta);
      setNombreCompleto(response[0].nombre_completo);
      setUsuario(response[0].usuario);
      setArea(response[0].area);
      setSubgerencia(response[0].subgerencia);
      setCorreo(response[0].correo);
    });
  }


  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editColaborador.php";
    const operationUrl = "editarColaborador";
    var data = {
      ID: IDColaborador,
      idCuenta: idCuenta === "" ? responseID[0].idCuentaEdit : idCuenta,
      nombre_completo:
        nombreCompleto === "" ? responseID[0].nombre_completo : nombreCompleto,
      usuario: usuario === "" ? responseID[0].usuario : usuario,
      area: area === "" ? responseID[0].area : area,
      subgerencia: subgerencia === "" ? responseID[0].subgerencia : subgerencia,
      correo: correo === "" ? responseID[0].correo : correo,
    };

    SendDataService(url, operationUrl, data).then(
      (response) => TopAlerts(response),
      resetStates()
    );
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }

  useEffect(
    function () {
      if (IDColaborador !== null) {
        getData();
        obtenerCuentas();
      }
    },
    [IDColaborador]
  );

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
          <Modal.Title>Editar Colaborador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_fechaInicio">Cuenta: </label>
              <Select
                placeholder="Elige una cuenta"
                name="cuenta"
                options={optionsCuentas}
                onChange={({ value }) => setIDCuenta(value)}
                required
                defaultValue={idCuenta}
              />
            </div>
            <div>
              <label htmlFor="input_nombreCompleto">Nombre completo:</label>
              <input
                type="text"
                value={nombreCompleto || ""}
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
                value={usuario || ""}
                className="form-control"
                name="input_usuario"
                id="input_usuario"
                onChange={({ target }) => setUsuario(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_area">Área:</label>
              <input
                type="text"
                value={area || ""}
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
                value={subgerencia || ""}
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
                value={correo || ""}
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
export default EditarColaborador;
