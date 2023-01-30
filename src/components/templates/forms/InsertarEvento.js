import React, { useState } from "react";
import "../../css/InsertarEvento.css";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEvento = ({ isActiveEvento, cambiarEstado }) => {
  // ----------------------CONSTANTES----------------------------
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");

  const [valoresFechas, setValoresFechas] = useState([new DateObject()]);
  const fechasFormateadas = [];
  const fechasOrdenadas = [];

  const show = isActiveEvento;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function handleChangeFechas(values) {
    setValoresFechas(values);
  }
  function handleChange(values) {
    setDuracion(values);
  }

  function SendData() {
    const url = "TASKS/coe-insertarEvento.php";
    const operationUrl = "insertarEvento";
    var data = {
      fechasOrdenadas: fechasOrdenadas[0],
      titulo: titulo,
      descripcion: descripcion,
      duracion: duracion,
    };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      TopAlerts(response[0]);
    });
  }

  // ----------------------COMPONENTES----------------------------
  function CustomButton() {
    return (
      <>
        <input
          type="button"
          value="Aplicar"
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
  const mapDays = ({ date }) => {
    let isWeekend = [0, 6].includes(date.weekDay.index);
    if (isWeekend)
      return {
        disabled: true,
        style: { color: "#ccc" },
      };
  };

  function mapeadoFechas() {
    valoresFechas.map((item, index) =>
      fechasFormateadas.push(valoresFechas[index].format())
    );
    fechasOrdenadas.push(fechasFormateadas.sort());
    TopAlerts("changesSaved");
  }

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
          <Modal.Title>Insertar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_fechaInicio">Título: </label>
              <input
                placeholder="Elige un titulo"
                name="titulo"
                className="form-control"
                onChange={({ target }) => setTitulo(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_fechaInicio">Descripción: </label>
              <input
                placeholder="Escriba una descripción"
                name="descripcion"
                className="form-control"
                onChange={({ target }) => setDescripcion(target.value)}
                required
              />
            </div>
            <div>
              <label>Duración: </label>
              <Form.Select
                required
                onChange={({ target }) => handleChange(target.value)}
              >
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
                required
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
export default InsertarEvento;
