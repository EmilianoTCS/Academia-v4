import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsX } from "react-icons/bs";
import "../../css/InsertarCurso.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import Form from "react-bootstrap/Form";

export default function InsertarCurso(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.isActive);
  const [listCuentas, setListCuentas] = useState([""]);
  const [listRamos, setListRamos] = useState([""]);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [duracion, setDuracion] = useState("");

  const [valoresFechas, setValoresFechas] = useState([new DateObject()]);
  const fechasFormateadas = [];

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
      duracion: duracion,
      fechasFormateadas,
      codigoCuenta: codigoCuenta,
      codigoRamo: codigoRamo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
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
  function handleChangeFechas(values) {
    setValoresFechas(values);
  }
  function handleChange(values) {
    setDuracion(values);
  }

  // ----------------------COMPONENTES----------------------------
  function CustomButton() {
    return (
      <>
        <input
          type="button"
          value="Guardar cambios"
          id="btn_guardarFecha"
          onClick={mapeadoFechas}
          style={{
            padding: "5px",
            margin: "1%",
            marginBottom: "2%",
          }}
        ></input>
      </>
    );
  }
  // ----------------------MAPEADOS----------------------------
  function mapeadoFechas() {
    valoresFechas.map((item, index) =>
      fechasFormateadas.push(valoresFechas[index].format())
    );
  }

  const optionsRamos = listRamos.map((label) => ({
    label: label.nombreRamo,
    value: label.codigoRamo,
  }));
  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
    value: label.ID,
  }));
  // ----------------------RENDER----------------------------
  const mapDays = ({ date }) => {
    let isWeekend = [0, 6].includes(date.weekDay.index);
    if (isWeekend)
      return {
        disabled: true,
        style: { color: "#ccc" },
      };
  };

  return (
    <>
      <div id="containerFormCurso" className="">
        <form id="form_insertarCurso" onSubmit={SendData}>
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
          <div>
            <label>Duración: </label>
            <Form.Select onChange={({ target }) => handleChange(target.value)}>
              <option default>Elige la duración</option>
              <option value="00:30:00">30min</option>
              <option value="01:00:00">1:00hs</option>
              <option value="01:30:00">1:30hs</option>
              <option value="02:00:00">2:00hs</option>
              <option value="02:30:00">2:30hs</option>
              <option value="03:00:00">3:00hs</option>
            </Form.Select>
          </div>
          <div id="datePickerContainer">
            <label>Fecha y hora: </label>
            <DatePicker
              id="input_fechaInicio"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleChangeFechas}
              inputClass="form-control"
              mapDays={mapDays}
              multiple
              placeholder="Elige una fecha y hora"
              plugins={[
                <DatePanel />,
                <TimePicker />,
                <CustomButton position="bottom" />,
              ]}
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
