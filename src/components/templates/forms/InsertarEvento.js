import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";
import "../../css/InsertarEvento.css";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";

export default function InsertarEvento(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.isActive);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(false);
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarEvento.php";
    const operationUrl = "insertarEvento";
    var data = {
      titulo: titulo,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      horaInicio: horaInicio,
      horaFin: horaFin,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      setisActive(props.isActive);
    },
    [props]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <div id="containerFormEvento" className={isActive ? "active" : ""}>
        <form id="form_insertarEvento" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Insertar Evento</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Titulo: </label>
            <input
              placeholder="Elige un titulo"
              name="titulo"
              className="form-control"
              onChange={({ target }) => setTitulo(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Descripción: </label>
            <input
              placeholder="Escriba una descripción"
              name="descripcion"
              className="form-control"
              onChange={({ target }) => setDescripcion(target.value)}
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
