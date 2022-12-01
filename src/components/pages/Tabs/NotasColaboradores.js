import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Select from "react-select";
import "../../css/NotasColaboradores.css";

export default function NotasColaboradores() {
  // ----------------------CONSTANTES----------------------------

  const [notas, setNotas] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [CursoSelected, setCursoSelected] = useState("");
  const [usuarioSelected, setUsuarioSelected] = useState("");
  const [listCursos, setListCursos] = useState([""]);
  const [listUsuarios, setListUsuarios] = useState([""]);
  const [num_boton, setNumBoton] = useState("");
  const [resetFilters, setResetFilters] = useState(false);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // ----------------------FUNCIONES----------------------------

  function obtenerDatosPaginador() {
    const url = "paginador/botones_Evaluaciones.php";
    getDataService(url).then((paginador) => setPaginador(paginador));
  }
  function obtenerDatosCursos() {
    const url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => setListCursos(response));
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
    SendDataService(url, operationUrl, data).then((data) => setNotas(data));
    setResetFilters(true);
  }
  function quitarFiltros() {
    setCursoSelected("");
    setUsuarioSelected("");
  }
  useEffect(
    function () {
      obtenerDatosPaginador();
      obtenerDatosCursos();
      obtenerDatosUsuarios();
      handleChangePaginador();
    },
    [CursoSelected, usuarioSelected, num_boton]
  );

  // ----------------------MAPEADOS----------------------------
  const optionsCursos = listCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));
  const optionsUsuarios = listUsuarios.map((label) => ({
    label: label.usuario,
    value: label.usuario,
  }));
  const handleClick = (event) => {
    setNumBoton(Number(event.target.value));
  };

  const renderNumeros = paginador.map((pagina) => {
    if (
      pagina.paginas < maxPageNumberLimit + 1 &&
      pagina.paginas > minPageNumberLimit
    ) {
      return (
        <li key={pagina.paginas}>
          <button
            name="paginas"
            value={pagina.paginas}
            onClick={handleClick}
            className={num_boton === pagina.paginas ? "active" : null}
          >
            {pagina.paginas}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  const handlePrevbtn = () => {
    setNumBoton(num_boton - 1);
    if ((num_boton - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextbtn = () => {
    setNumBoton(num_boton + 1);

    if (num_boton + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const pageDecrementBtn = () => {
    if (minPageNumberLimit > 1) {
      return (
        <li>
          <button onClick={handlePrevbtn}> hola</button>
        </li>
      );
    }
  };

  return (
    <>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <Select
          options={optionsCursos}
          placeholder="Elige un curso"
          onChange={({ value }) => setCursoSelected(value)}
          name="codigoCurso"
          defaultInputValue={CursoSelected}
        />
        <Select
          options={optionsUsuarios}
          placeholder="Elige un usuario"
          name="usuario"
          onChange={({ value }) => setUsuarioSelected(value)}
          defaultInputValue={usuarioSelected}
        />
        <button
          id="btn_resetFilters"
          className={resetFilters ? "active" : ""}
          onClick={quitarFiltros}
        >
          Reiniciar filtros
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Usuario</th>
            <th>Examenes</th>
            <th>Nota</th>
            <th>Promedio</th>
            <th>% Aprobación</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.ID}>
              <td>{nota.codigoCurso}</td>
              <td>{nota.usuario}</td>
              <td>{nota.num_evaluaciones}</td>
              <td>{nota.nota}</td>
              <td>{nota.promedio}</td>
              <td>{nota.porcentaje}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div id="paginador">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={
              num_boton === paginador[0].paginas ||
              num_boton < paginador[0].paginas
                ? true
                : false
            }
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderNumeros}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={
              num_boton === paginador[paginador.length - 1] ? true : false
            }
          >
            Next
          </button>
        </li>
      </div>
    </>
  );
}
