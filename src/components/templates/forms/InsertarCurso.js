import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsX } from "react-icons/bs";
import "../../css/InsertarCurso.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
export default function InsertarCurso(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.isActive);
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
    const url = "TASKS/coe-insertarCurso.php";
    const operationUrl = "insertarCurso";
    var data = {
      codigoCuenta: codigoCuenta,
      codigoRamo: codigoRamo,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      horaInicio: horaInicio,
      horaFin: horaFin,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      console.log(response)
    );
  }
  useEffect(
    function () {
      obtenerCuentas();
      obtenerRamos();
      setisActive(props.isActive);
    },
    [props]
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
            <h3 id="titleForm">Insertar Curso</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Cuenta: </label>
            <Select
              placeholder="Elige una cuenta"
              name="cuenta"
              options={optionsCuentas}
              onChange={({ value }) => setCodigoCuenta(value)}
            />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Ramo: </label>
            <Select
              placeholder="Elige un ramo"
              name="codigoRamo"
              options={optionsRamos}
              onChange={({ value }) => setCodigoRamo(value)}
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
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Registrar" />
          </div>
        </form>
      </div>
    </>
  );
}
