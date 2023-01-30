import React, { useEffect, useState } from "react";
import { Container,Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import Select from "react-select";
import SwitchToggle from "../templates/SwitchToggle";
import "../css/CustomButton.css";
import "../css/ListadoAsistencias.css";
import TopAlerts from "../templates/alerts/TopAlerts";
import { RevolvingDot } from "react-loader-spinner";

export default function ListadoAsistencias() {
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [listadoFechas, setListadoFechas] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [fechaSeleccionada, setfechaSeleccionada] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [busqueda, setBusqueda] = useState(false);

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
    SendDataService(url, operationUrl, data).then(
      (response) => setAsistencias(response),
      setBusqueda(true)
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
    var data = {
      IDRegistro: ID,
      IDCurso: cursoSeleccionado,
      Fecha: fechaSeleccionada,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...asistencia } = response[0];
      actualizarAsistencia(asistencia);
      TopAlerts(successEdited);
    });
  }
  function actualizarAsistencia(asistencia) {
    const nuevasAsistencias = asistencias.map((a) =>
      a.ID === asistencia.ID ? asistencia : a
    );
    setAsistencias(nuevasAsistencias);
  }

  useEffect(
    function () {
      obtenerDatosCursos();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cursoSeleccionado, fechaSeleccionada]
  );

  //-----------------------COMPONENTES

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

  const MainTable = () => {
    if (busqueda) {
      return (
        <Table id="mainTable" hover responsive>
          <thead>
            <tr key={1}>
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
      );
    }
    return (
      <RevolvingDot
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{ margin: "100px 150px" }}
        wrapperClass="dna-wrapper"
        color="#e10b1c"
      ></RevolvingDot>
    );
  };

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

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
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
        </div>
        <MainTable></MainTable>
      </div>
      </Container>
    </>
  ) : (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}
