import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsX, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import InsertarCurso from "../templates/forms/InsertarCurso";
import InsertarRamo from "../templates/forms/InsertarRamo";
import EditarRamo from "../templates/forms/EditarRamo";

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
  function obtenerDatosRamos() {
    getDataService(url).then((ramos) => setRamos(ramos));
  }
  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRamos(paginador)
    );
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    SendDataService(url, operationUrl, data).then((data) => setRamos(data));
  }
  useEffect(function () {
    obtenerDatosRamos();
    obtenerDatosPaginador();
  }, []);

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

  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de ramos</h1>

        <button id="formButtons" onClick={insertarCurso}>
          Insertar Curso
        </button>
        <button id="formButtons" onClick={insertarRamo}>
          Insertar Ramo
        </button>
        <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
        <InsertarRamo isActiveRamo={isActiveInsertRamo}></InsertarRamo>
        <EditarRamo Props={{ IDRamo, isActiveEditRamo }}></EditarRamo>
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
                  <button title="Eliminar curso" id="OperationBtns">
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div id="paginador">
          {paginador.map((pagina) => (
            <li key={pagina.paginas}>
              <button
                name="paginas"
                value={pagina.paginas}
                onClick={handleChangePaginador}
              >
                {pagina.paginas}
              </button>
            </li>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
