import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import Select from "react-select";

export default function ListadoAsistencias() {
  const userData = localStorage.getItem("loggedUser");
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("2");
  const setFechas = new Set();
  const setUsuarios = new Set();
  const setValor = new Set();

  function obtenerDatosCursos() {
    var url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => setListadoCursos(response));
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
    },
    [cursoSeleccionado]
  );

  // ----------------------MAPEADOS----------------------------

  const optionsCursos = listadoCursos.map((label) => ({
    label: label.nombreRamo,
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
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Usuarios</th>
              {Array.from(setFechas).map((fecha) => (
                <th>{fecha}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(setUsuarios).map((usuario, index) => (
              <tr>
                <td>{usuario}</td>
                {Array.from(setFechas).forEach((valor, index2) => {
                  valores.push(<td>{[index2]?.[index]}</td>);
                })}
                {valores}
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
