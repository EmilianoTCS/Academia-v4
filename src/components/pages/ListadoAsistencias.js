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
import TopAlerts from "../templates/alerts/TopAlerts";
import { Checkbox } from "@mui/material";

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

  function handleChange(ID) {
    const url = "TASKS/coe-updateStateAsistencias.php";
    const operationUrl = "updateStateAsistencias";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then(
      (response) => TopAlerts(response),
      obtenerDatos()
    );
  }

  useEffect(function () {
    obtenerDatosCursos();
    obtenerDatosFechas();
  }, []);

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
  function CustomButtonSearch() {
    return (
      <>
        <input
          type="button"
          value="Buscar"
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
            className="react-select-container"
            placeholder="Elige un curso"
            name="cuenta"
            options={optionsCursos}
            onChange={({ value }) => setCursoSeleccionado(value)}
          />

          <Select
            className="react-select-container"
            placeholder="Elige una fecha"
            name="fechas"
            options={optionsFechas}
            onChange={({ value }) => setfechaSeleccionada(value)}
          />
          <CustomButtonSearch></CustomButtonSearch>
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
              <tr key={item.ID}>
                <td>{item.usuario}</td>
                {item.valor === "1" ? <td>Presente</td> : <td>Ausente</td>}
                <td onClick={() => handleChange(item.ID)}>
                  <Checkbox
                    checked={item.valor === "1" ? true : false}
                  ></Checkbox>
                </td>
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
