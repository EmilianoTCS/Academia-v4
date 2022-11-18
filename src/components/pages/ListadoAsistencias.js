import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import Select from "react-select";
import SwitchToggle from "../templates/SwitchToggle";

export default function ListadoAsistencias() {
  const userData = localStorage.getItem("loggedUser");
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [listadoFechas, setListadoFechas] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("2");
  const [FechaSeleccionada, setFechaSeleccionada] = useState([]);
  const setFechas = new Set();
  const setUsuarios = new Set();
  const setValor = new Set();

  function obtenerDatosCursos() {
    var url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => setListadoCursos(response));
  }
  function obtenerDatosFechas() {
    var url = "TASKS/auxiliar/fechasAsistencia.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado };
    SendDataService(url, operationUrl, data).then((response) =>
      setListadoFechas(response)
    );
  }
  function test() {
    console.log(FechaSeleccionada);
  }
  function obtenerDatos() {
    var url = "TASKS/coe-listAsistencias.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado };
    SendDataService(url, operationUrl, data).then((response) =>
      setAsistencias(response)
    );
  }
  useEffect(
    function () {
      obtenerDatos();
      obtenerDatosCursos();
      obtenerDatosFechas();
    },
    [cursoSeleccionado]
  );

  // ----------------------MAPEADOS----------------------------

  const optionsCursos = listadoCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));
  const optionsFechas = listadoFechas.map((label) => ({
    label: label.fechas,
    value: label.ID,
  }));

  asistencias.map((item) => setFechas.add(item.atributo));

  asistencias.map((item) => setUsuarios.add(item.usuario));

  asistencias.map((item) => setValor.add(item.valor));

  const valores = [];
  // ----------------------RENDER----------------------------
  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de asistencias</h1>
        <div>
          <label htmlFor="input_fechaInicio">Selecciona un curso: </label>
          <Select
            placeholder="Elige una cuenta"
            name="cuenta"
            options={optionsCursos}
            onChange={({ value }) => setCursoSeleccionado(value)}
          />
          <label htmlFor="input_fechaInicio">Selecciona una fecha: </label>
          <input type="button" onClick={test} value="test"></input>
          <Select
            placeholder="Elige una fecha"
            name="fechas"
            options={optionsFechas}
            onChange={(value) => setFechaSeleccionada(value)}
            isMulti
          />
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
            {Array.from(setUsuarios).map((usuario) => (
              <tr>
                <td>{usuario}</td>
                <td>Presente</td>
                <td>
                  <SwitchToggle />
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
