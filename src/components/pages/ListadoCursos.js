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
import EditarCurso from "../templates/forms/EditarCurso";

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

  function obtenerDatosCursos() {
    getDataService(url).then((cursos) => setCursos(cursos));
  }
  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorCursos(paginador)
    );
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    SendDataService(url, operationUrl, data).then((data) => setCursos(data));
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
  useEffect(function () {
    obtenerDatosCursos();
    obtenerDatosPaginador();
  }, []);

  return userData ? (
    <>
      <Header></Header>
      <div>
        <div>
          <h1 id="TitlesPages">Listado de cursos</h1>

          <button id="formButtons" onClick={insertarCurso}>
            Insertar Curso
          </button>
          <button id="formButtons" onClick={insertarRamo}>
            Insertar Ramo
          </button>
          <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
          <InsertarRamo isActiveRamo={isActiveInsertRamo}></InsertarRamo>
          <EditarCurso Props={{ IDCurso, isActiveEditCurso }}></EditarCurso>
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
                    onClick={() => this.alertDelete(curso.ID)}
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
