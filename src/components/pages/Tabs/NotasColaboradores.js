import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Select from "react-select";
import "../../css/NotasColaboradores.css";
import Paginador from "../../templates/Paginador";
import Alert from "react-bootstrap/Alert";

export default function NotasColaboradores() {
  // ----------------------CONSTANTES----------------------------

  const [notas, setNotas] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [CursoSelected, setCursoSelected] = useState("");
  const [usuarioSelected, setUsuarioSelected] = useState("");
  const [listCursos, setListCursos] = useState([""]);
  const [listUsuarios, setListUsuarios] = useState([""]);
  const [num_boton, setNumBoton] = useState(1);
  const [resetFilters, setResetFilters] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nombreCursoSelected, SetNombreCursoSelected] = useState("");

  // ----------------------FUNCIONES----------------------------

  function obtenerDatosPaginador() {
    const url = "paginador/botones_Evaluaciones.php";
    getDataService(url).then((paginador) => setPaginador(paginador));
  }
  function obtenerDatosCursos() {
    const url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => {
      setListCursos(response);
    });
  }
  function obtenerDatosUsuarios() {
    const url = "TASKS/auxiliar/ListadoUsuarios.php?listadoUsuarios";
    getDataService(url).then((response) => setListUsuarios(response));
  }
  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
      idCursosSelected: CursoSelected,
      usuarioSelected: usuarioSelected,
    };
    const url = "TASKS/auxiliar/NotasColaboradores.php";
    const operationUrl = "NotasColaboradores";
    SendDataService(url, operationUrl, data).then((response) => {
      setIsEmpty(response[0].isEmpty);
      if (!isEmpty) {
        setNotas(response);
      } else {
        setNumBoton(1);
      }
    });
    setResetFilters(true);
  }

  function quitarFiltros() {
    setCursoSelected("");
    setUsuarioSelected("");
    SetNombreCursoSelected("");
    setNumBoton(1);
    setIsEmpty(false);
  }
  useEffect(
    function () {
      obtenerDatosPaginador();
      obtenerDatosCursos();
      obtenerDatosUsuarios();
      handleChangePaginador();
    },
    [CursoSelected, usuarioSelected, num_boton, isEmpty]
  );

  const Filtros = () => {
    return (
      <>
        <Select
          options={optionsCursos}
          placeholder="Elige un curso"
          onChange={({ value, label }) => {
            setCursoSelected(value), SetNombreCursoSelected(label);
          }}
          name="codigoCurso"
          defaultInputValue={nombreCursoSelected}
          className="reactSelect"
        />
        <Select
          options={optionsUsuarios}
          placeholder="Elige un usuario"
          name="usuario"
          onChange={({ value }) => setUsuarioSelected(value)}
          defaultInputValue={usuarioSelected}
          className="reactSelect"
        />
      </>
    );
  };

  const MainTable = () => {
    if (isEmpty) {
      return (
        <>
          <Alert variant="danger">
            <Alert.Heading>
              No existen registros para este filtro.
            </Alert.Heading>
          </Alert>
        </>
      );
    } else {
      return (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Usuario</th>
                <th>Examenes</th>
                <th>Estado</th>
                {/* <th>Nota</th>
                <th>Promedio</th> */}
                <th>% Aprobación</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.ID}>
                  <td>{nota.codigoCurso}</td>
                  <td>{nota.usuario}</td>
                  <td>{nota.num_evaluaciones}</td>
                  <td>{nota.estado}</td>
                  {/* <td>{nota.nota}</td>
                  <td>{nota.promedio}</td> */}
                  <td>{nota.porcentaje}</td>
                  <td>{nota.aprobado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  };
  // ----------------------MAPEADOS----------------------------
  const optionsCursos = listCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));
  const optionsUsuarios = listUsuarios.map((label) => ({
    label: label.usuario,
    value: label.usuario,
  }));

  return (
    <>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <Filtros></Filtros>
        <button
          id="btn_resetFilters"
          className={resetFilters ? "active" : ""}
          onClick={quitarFiltros}
        >
          Reiniciar filtros
        </button>
      </div>
      <MainTable></MainTable>
        <Paginador
          paginas={paginador}
          cambiarNumero={setNumBoton}
          num_boton={num_boton}
        ></Paginador>
    </>
  );
}
