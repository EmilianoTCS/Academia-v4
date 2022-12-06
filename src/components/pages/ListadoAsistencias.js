import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import Select from "react-select";
import SwitchToggle from "../templates/SwitchToggle";
import "../css/CustomButton.css";
import "../css/ListadoAsistencias.css";
import TopAlerts from "../templates/alerts/TopAlerts";

export default function ListadoAsistencias() {
  const userData = localStorage.getItem("loggedUser");
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [listadoFechas, setListadoFechas] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState();
  const [fechaSeleccionada, setfechaSeleccionada] = useState("");
  const [IDsChange, setIDsChange] = useState([]);

  function obtenerDatosCursos() {
    var url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then(
      (response) => setListadoCursos(response),
      obtenerDatosFechas()
    );
  }

  function obtenerDatos() {
    var url = "TASKS/coe-listAsistencias.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado, fecha: fechaSeleccionada };
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
    IDsChange.push(ID);
  }
  function enviarDatos() {
    const url = "TASKS/coe-updateStateAsistencias.php";
    const operationUrl = "updateStateAsistencias";
    var data = { IDsChange };
    SendDataService(url, operationUrl, data).then(
      (response) => TopAlerts(response),
      setIDsChange([]),
      obtenerDatos()
    );
  }

  useEffect(
    function () {
      obtenerDatosCursos();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cursoSeleccionado]
  );

  //-----------------------COMPONENTES
  function CustomButton() {
    return (
      <>
        <input
          type="button"
          value="Guardar cambios"
          id="btn_guardarFecha"
          onClick={enviarDatos}
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
      <div id="containerTablas">
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
                <td onChange={() => handleChange(item.ID)}>
                  <SwitchToggle isActive={item.valor} />
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
