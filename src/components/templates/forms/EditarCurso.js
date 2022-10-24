import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsX } from "react-icons/bs";
import "../../css/InsertarCurso.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
export default function EditarCurso(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.Props.isActiveEditCurso);
  const [responseID, setResponseID] = useState([""]);
  const [listCuentas, setListCuentas] = useState([""]);
  const [listRamos, setListRamos] = useState([""]);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(false);
  }
  function getData() {
    const url = "TASKS/coe-selectCuentas.php";
    const operationUrl = "ID";
    const data = { ID: props.Props.IDCurso };
    SendDataService(url, operationUrl, data).then(
      (response) => setResponseID(response),
      console.log(responseID),
      setFechaInicio(responseID[0].fechaInicioEdit),
      setFechaFin(responseID[0].fechaFinEdit),
      setHoraInicio(responseID[0].horaInicioEdit),
      setHoraFin(responseID[0].horaFinEdit),
      setCodigoCuenta(responseID[0].codigoCuentaEdit),
      setCodigoRamo(responseID[0].codigoRamoEdit)
    );
    obtenerCuentas();
    obtenerRamos();
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function obtenerRamos() {
    const url = "TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos";
    getDataService(url).then((ramos) => setListRamos(ramos));
  }
  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editCurso.php";
    const operationUrl = "editarCurso";
    var data = {
      ID: props.Props.IDCurso,
      codigoCuenta: codigoCuenta,
      codigoRamo: codigoRamo,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      horaInicio: horaInicio,
      horaFin: horaFin,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      getData();
      setisActive(props.Props.isActiveEditCurso);
      console.log(props.Props.IDCurso);
    },
    [props.Props.IDCurso]
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
      <div id="containerForm" className={isActive ? "active" : ""}>
        <form id="form_insertarData" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Editar Curso</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Cuenta: </label>
            <Select
              placeholder="Elige una cuenta"
              name="cuenta"
              options={optionsCuentas}
              onChange={({ value }) => setCodigoCuenta(value)}
              defaultInputValue={codigoCuenta}
            />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Ramo: </label>
            <Select
              placeholder="Elige un ramo"
              name="codigoRamo"
              options={optionsRamos}
              onChange={({ value }) => setCodigoRamo(value)}
              defaultInputValue={codigoRamo}
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
              value={fechaInicio}
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
              value={fechaFin}
            />
          </div>
          <div className="md-form md-outline">
            <label htmlFor="input_horaInicio">Hora Inicio: </label>
            <input
              type="time"
              name="input_horaInicio"
              className="form-control"
              id="input_horaInicio"
              value={horaInicio}
              onChange={({ target }) => setHoraInicio(target.value)}
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
              value={horaFin}
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Actualizar" />
          </div>
        </form>
      </div>
    </>
  );
}
