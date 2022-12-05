import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import "../css/InsertarCursoListadoCursosYRamos.css";
import InsertarCurso from "../templates/forms/InsertarCurso";
import InsertarRamo from "../templates/forms/InsertarRamo";
// import EditarCurso from "../templates/forms/EditarCurso";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";

export default function ListadoCursos() {
  const [cursos, setCursos] = useState([""]);
  const [paginador, setPaginadorCursos] = useState([""]);
  const url = "TASKS/coe-listCuentas.php";
  const urlPaginador = "paginador/botones_Cuenta.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);
  const [IDCurso, setIDCurso] = useState(2);
  const [isActiveInsertRamo, setIsActiveInsertRamo] = useState(false);

  //PAGINADOR ---------------------

  const [num_boton, setNumBoton] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorCursos(paginador)
    );
  }
  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) => setCursos(data));
  }

  //PAGINADOR ---------------------

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateState.php";
        var operationUrl = "updateStateCursos";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
  }
  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
  }
  function editarCurso(ID) {
    setIsActiveEditCurso(true);
    setIDCurso(ID);
  }
  function insertarRamo() {
    setIsActiveInsertRamo(!isActiveInsertRamo);
  }

  useEffect(
    function () {
      // obtenerDatosCursos();
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  return userData ? (
    <>
      <Header></Header>
      <div>
        <div>
          <h1 id="TitlesPages">Listado de cursos</h1>
          <Button id="btnCursoListado" onClick={insertarCurso}>
            Insertar Curso
          </Button>
          <Button id="btnCursoListado" onClick={insertarRamo}>
            Insertar Ramos
          </Button>
          <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
          <InsertarRamo isActiveRamo={isActiveInsertRamo}></InsertarRamo>
          {/* <EditarCurso Props={{ IDCurso, isActiveEditCurso }}></EditarCurso> */}
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Código del curso</th>
              <th>Código de la Cuenta</th>
              <th>Nombre del curso</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.ID}>
                <td>{curso.codigoCurso}</td>
                <td>{curso.codigoCuenta}</td>
                <td>{curso.nombreRamo}</td>
                <td>{curso.inicio}</td>
                <td>{curso.fin}</td>
                <td>{curso.estado}</td>
                <td>
                  <button
                    title="Editar curso"
                    id="OperationBtns"
                    onClick={() => editarCurso(curso.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => eliminar(curso.ID)}
                    id="OperationBtns"
                  >
                    <BsTrash />
                  </button>
                </td>
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
              disabled={num_boton === paginador.length ? true : false}
            >
              Next
            </button>
          </li>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
