import React, { useState, useEffect } from "react";
import Select from "react-select";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCurso = ({ isActiveCurso, cambiarEstado }) => {
  // ----------------------CONSTANTES----------------------------
  const [listCuentas, setListCuentas] = useState([""]);
  const [listRamos, setListRamos] = useState([""]);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [duracion, setDuracion] = useState("");

  const [valoresFechas, setValoresFechas] = useState([new DateObject()]);
  const fechasFormateadas = [];
  const fechasOrdenadas = [];

  const show = isActiveCurso;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------
  // function CloseForm() {
  //   setisActive(false);
  // }

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
      fechasOrdenadas,
      codigoCuenta: codigoCuenta,
      codigoRamo: codigoRamo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      console.log(response)
    );
  }
  useEffect(
    function () {
      obtenerCuentas();
      obtenerRamos();
    },
    []
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
    fechasOrdenadas.push(fechasFormateadas.sort());
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insertar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
export default InsertarCurso;
