import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../../css/InsertarCursoCalendario.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarCurso = ({ isActiveEditCurso, cambiarEstado, IDCurso }) => {
  // ----------------------CONSTANTES----------------------------
  const [responseID, setResponseID] = useState([""]);
  const [listCuentas, setListCuentas] = useState([""]);
  const [listRamos, setListRamos] = useState([""]);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const show = isActiveEditCurso;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectCuentas.php";
    const operationUrl = "ID";
    const data = { ID: IDCurso };
    SendDataService(url, operationUrl, data).then((response) =>
      setResponseID(response)
    );
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function resetStates() {
    setCodigoCuenta("");
    setCodigoRamo("");
    setFechaInicio("");
    setFechaFin("");
    setHoraInicio("");
    setHoraFin("");
    var data = {
      codigoCuenta,
      codigoRamo,
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
    };
    console.log(data);
  }
  function obtenerRamos() {
    const url = "TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos";
    getDataService(url).then((ramos) => setListRamos(ramos));
  }
  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editCurso.php";
    const operationUrl = "editarCurso";
    const data = {
      ID: IDCurso,
      codigoCuenta:
        codigoCuenta === "" ? responseID[0].idCuentaEdit : codigoCuenta,
      codigoRamo: codigoRamo === "" ? responseID[0].codigoRamoEdit : codigoRamo,
      fechaInicio:
        fechaInicio === "" ? responseID[0].fechaInicioEdit : fechaInicio,
      fechaFin: fechaFin === "" ? responseID[0].fechaFinEdit : fechaFin,
      horaInicio: horaInicio === "" ? responseID[0].horaInicioEdit : horaInicio,
      horaFin: horaFin === "" ? responseID[0].horaFinEdit : horaFin,
    };
    console.log(data);

    SendDataService(url, operationUrl, data).then(
      (response) => TopAlerts(response),
      resetStates(),
      getData()
    );
  }

  useEffect(
    function () {
      if (IDCurso !== null) {
        getData();
        obtenerCuentas();
        obtenerRamos();
      }
    },
    [IDCurso]
  );

  // ----------------------MAPEADOS----------------------------
  const optionsRamos = listRamos.map((label) => ({
    label: label.nombreRamo,
    value: label.codigoRamo,
  }));
  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
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
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="input_fechaInicio">Cuenta: </label>
            <Select
              placeholder="Elige una cuenta"
              name="cuenta"
              options={optionsCuentas}
              onChange={({ value }) => setCodigoCuenta(value)}
              defaultInputValue={responseID[0].codigoCuentaEdit || ""}
            />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Ramo: </label>
            <Select
              placeholder="Elige un ramo"
              name="codigoRamo"
              options={optionsRamos}
              onChange={({ value }) => setCodigoRamo(value)}
              defaultValue={responseID[0].codigoRamoEdit || ""}
            />
          </div>
          <div className="md-form md-outline input-with-post-icon datepicker">
            <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
            <input
              type="date"
              id="input_fechaInicio"
              name="input_fechaInicio"
              className="form-control"
              onChange={({ target }) => setFechaInicio(target.value)}
              value={responseID[0].fechaInicioEdit || ""}
            />
          </div>
          <div className="md-form md-outline input-with-post-icon datepicker">
            <label htmlFor="input_fechaInicio">Fecha Fin: </label>
            <input
              type="date"
              id="input_fechaInicio"
              name="input_fechaInicio"
              className="form-control"
              onChange={({ target }) => setFechaFin(target.value)}
              value={
                fechaInicio === "" ? responseID[0].fechaInicioEdit : fechaInicio
              }
            />
          </div>
          <div className="md-form md-outline">
            <label htmlFor="input_horaInicio">Hora Inicio: </label>
            <input
              type="time"
              name="input_horaInicio"
              className="form-control"
              id="input_horaInicio"
              onChange={({ target }) => setHoraInicio(target.value)}
              value={responseID[0].horaInicioEdit || ""}
            />
          </div>

          <div className="md-form md-outline">
            <label htmlFor="input_horaFin">Hora Fin: </label>
            <input
              type="time"
              name="input_horaFin"
              className="form-control"
              id="input_horaFin"
              onChange={({ target }) => setHoraFin(target.value)}
              value={responseID[0].horaFinEdit || ""}
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

export default EditarCurso;
