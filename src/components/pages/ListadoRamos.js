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
import InsertarCurso from "../templates/forms/InsertarCurso";
import InsertarRamo from "../templates/forms/InsertarRamo";
import EditarRamo from "../templates/forms/EditarRamo";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import "../css/InsertarCursoListadoCursosYRamos.css";
import Button from "react-bootstrap/Button";

export default function ListadoRamos() {
  const [ramos, setRamos] = useState([""]);
  const [paginador, setPaginadorRamos] = useState([""]);
  const url = "TASKS/coe-listCursos.php";
  const urlPaginador = "paginador/botones_Cursos.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveInsertRamo, setIsActiveInsertRamo] = useState(false);
  const [IDRamo, setIDRamo] = useState(2);
  const [isActiveEditRamo, setIsActiveEditRamo] = useState(false);

  const [num_boton, setNumBoton] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(
    function () {
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
  }
  function editarRamo(ID) {
    setIsActiveEditRamo(!isActiveEditRamo);
    setIDRamo(ID);
  }
  function insertarRamo() {
    setIsActiveInsertRamo(!isActiveInsertRamo);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateRamos.php";
        var operationUrl = "updateStateRamos";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
  }

  //PAGINADOR ---------------------

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
      setPaginadorRamos(paginador)
    );
  }
  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) => setRamos(data));
  }

  //PAGINADOR ---------------------

  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de ramos</h1>
        <Button id="btnCursoListado" onClick={insertarCurso}>
          Insertar Curso
        </Button>
        <Button id="btnCursoListado" onClick={insertarRamo}>
          Insertar Ramos
        </Button>

        <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
        <InsertarRamo isActiveRamo={isActiveInsertRamo}></InsertarRamo>
        {/* <EditarRamo Props={{ IDRamo, isActiveEditRamo }}></EditarRamo> */}
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID del ramo</th>
              <th>Nombre del ramo</th>
              <th>HH académicas</th>
              <th>Pre-requisito</th>
              <th>Relator</th>
              <th>Área</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {ramos.map((ramo) => (
              <tr key={ramo.ID}>
                <td>{ramo.codigoRamo}</td>
                <td>{ramo.nombreRamo}</td>
                <td>{ramo.hh_academicas}</td>
                <td>{ramo.pre_requisito}</td>
                <td>{ramo.nombre}</td>
                <td>{ramo.nombreArea}</td>
                <td>
                  <button
                    title="Editar ramo"
                    id="OperationBtns"
                    onClick={() => editarRamo(ramo.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    id="OperationBtns"
                    onClick={() => eliminar(ramo.ID)}
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
