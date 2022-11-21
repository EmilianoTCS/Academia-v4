import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import Select from "react-select";
import SwitchToggle from "../templates/SwitchToggle";
import DateObject from "react-date-object";
import "../css/CustomButton.css";
import "../css/ListadoAsistencias.css";

export default function ListadoAsistencias() {
  const userData = localStorage.getItem("loggedUser");
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [listadoFechas, setListadoFechas] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("2");
  const [fechaSeleccionada, setfechaSeleccionada] = useState("");

  function obtenerDatosCursos() {
    var url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => setListadoCursos(response));
  }

  function obtenerDatos() {
    var url = "TASKS/coe-listAsistencias.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado, fecha: fechaSeleccionada };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) =>
      setAsistencias(response)
    );
  }
  function obtenerDatosFechas() {
    var url = "TASKS/auxiliar/fechasAsistencia.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado };
    SendDataService(url, operationUrl, data).then((response) =>
      setListadoFechas(response)
    );
  }

  useEffect(
    function () {
      obtenerDatosCursos();
      obtenerDatosFechas();
    },
    [cursoSeleccionado]
  );

  //-----------------------COMPONENTES
  function CustomButton() {
    return (
      <>
        <input
          type="button"
          value="Guardar"
          id="btn_guardarFecha"
          onClick={obtenerDatos}
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

  const optionsCursos = listadoCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));
  const optionsFechas = listadoFechas.map((label) => ({
    label: label.fechas,
    value: label.fechas,
  }));

  // ----------------------RENDER----------------------------

  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de asistencias</h1>
        <div id="FiltrosAsistencias">
          <Select
            placeholder="Elige un curso"
            name="cuenta"
            options={optionsCursos}
            onChange={({ value }) => setCursoSeleccionado(value)}
          />

          <Select
            placeholder="Elige una fecha"
            name="fechas"
            options={optionsFechas}
            onChange={({ value }) => setfechaSeleccionada(value)}
          />
          <CustomButton></CustomButton>
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Usuarios</th>
              <th>Estado</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((item) => (
              <tr>
                <td>{item.usuario}</td>
                {item.valor === "1" ? <td>Presente</td> : <td>Ausente</td>}
                <SwitchToggle isActive={item.valor}></SwitchToggle>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  ) : (
    <>
      <Redirect to="/login"></Redirect>
    </>
  );
}
