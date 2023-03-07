import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import SwitchToggle from "../templates/SwitchToggle";
import "../css/CustomButton.css";
import "../css/ListadoAsistencias.css";
import TopAlerts from "../templates/alerts/TopAlerts";
import Alert from "react-bootstrap/Alert";
import { RevolvingDot } from "react-loader-spinner";

export default function ListadoAsistencias() {
  const [asistencias, setAsistencias] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [listadoFechas, setListadoFechas] = useState([""]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [fechaSeleccionada, setfechaSeleccionada] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [busqueda, setBusqueda] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyFechas, setIsEmptyFechas] = useState(false);

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
    SendDataService(url, operationUrl, data).then((response) => {
      setAsistencias(response);
      const { isEmpty } = response[0];
      setBusqueda(true);
      setIsEmpty(isEmpty);
    });
  }
  function obtenerDatosFechas() {
    var url = "TASKS/auxiliar/fechasAsistencia.php";
    var operationUrl = "ID";
    var data = { ID: cursoSeleccionado };
    SendDataService(url, operationUrl, data).then((response) => {
      const { isEmpty } = response[0];
      setIsEmptyFechas(isEmpty);
      setListadoFechas(response);
    });
  }

  function handleChange(ID) {
    const url = "TASKS/coe-updateStateAsistencias.php";
    const operationUrl = "updateStateAsistencias";
    var data = {
      IDRegistro: ID,
      IDCurso: cursoSeleccionado,
      Fecha: fechaSeleccionada,
      usuarioModi: userData.username,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...asistencia } = response[0];
      actualizarAsistencia(asistencia);
      TopAlerts(successEnabled);
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
          id={isEmptyFechas ? "btn_guardarFechaDisabled" : "btn_guardarFecha"}
          onClick={obtenerDatos}
          disabled={isEmptyFechas ? true : false}
        ></input>
      </>
    );
  }

  const MainTable = () => {
    if (busqueda) {
      if (!isEmpty) {
        return (
          <Table id="mainTable" hover responsive>
            <thead>
              <tr key={1}>
                <th>Usuarios</th>
                <th>Estado</th>
                <th>Modificado por </th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((item) => (
                <tr key={item.ID}>
                  <td>{item.usuario}</td>
                  {item.valor === "1" ? <td>Presente</td> : <td>Ausente</td>}
                  <td>{item.usuarioModi}</td>
                  <td onChange={() => handleChange(item.ID)}>
                    <SwitchToggle isActive={item.valor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      } else {
        return (
          <>
            <br />
            <Alert variant="danger">
              <Alert.Heading>
                No existen registros para este filtro.
              </Alert.Heading>
            </Alert>
            <br />
          </>
        );
      }
    }
    return <div className="spinner"></div>;
  };

  // ----------------------RENDER----------------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla1">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de asistencias</h1>
          <div id="FiltrosAsistencias">
            <div className="form-group">
              <select
                required
                className="form-control"
                onChange={({ target }) => setCursoSeleccionado(target.value)}
              >
                <option hidden value="">
                  Elige un curso
                </option>

                {listadoCursos.map((valor) => (
                  <option value={valor.ID}>{valor.nombreRamo}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <select
                required
                className="form-control"
                onChange={({ target }) => setfechaSeleccionada(target.value)}
              >
                <option hidden value="">
                  Elige una fecha
                </option>
                {listadoFechas.map((valor) => (
                  <option value={valor.fechas}>{valor.fechas}</option>
                ))}
              </select>
            </div>

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
