import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import "../css/InsertarCursoListadoCursosYRamos.css";
import InsertarCurso from "../templates/forms/InsertarCurso";
import InsertarRamo from "../templates/forms/InsertarRamo";
import EditarCurso from "../templates/forms/EditarCurso";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Paginador from "../templates/Paginador";

export default function ListadoCursos() {
  const [cursos, setCursos] = useState([""]);
  const [paginador, setPaginadorCursos] = useState([]);
  const url = "TASKS/coe-listCuentas.php";
  const urlPaginador = "paginador/botones_Cuenta.php";
  const operationUrl = "pagina";
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);
  const [IDCurso, setIDCurso] = useState(null);
  const [isActiveInsertRamo, setIsActiveInsertRamo] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  //PAGINADOR ---------------------

  const [num_boton, setNumBoton] = useState(1);

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
    setIsActiveInsertRamo(false);
  }
  function editarCurso(ID) {
    setIsActiveEditCurso(true);
    setIDCurso(ID);
  }
  function insertarRamo() {
    setIsActiveInsertRamo(!isActiveInsertRamo);
    setIsActiveInsertCurso(false);
  }

  useEffect(
    function () {
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <div>
        <div>
          <h1 id="TitlesPages">Listado de cursos</h1>
          <Button id="btnCursoListado" onClick={insertarCurso}>
            Insertar Curso
          </Button>
          <Button id="btnCursoListado" onClick={insertarRamo}>
            Insertar Ramo
          </Button>
          <InsertarCurso
            isActiveCurso={isActiveInsertCurso}
            cambiarEstado={setIsActiveInsertCurso}
          ></InsertarCurso>
          <InsertarRamo
            isActiveRamo={isActiveInsertRamo}
            cambiarEstado={setIsActiveInsertRamo}
          ></InsertarRamo>

          <EditarCurso
            isActiveEditCurso={isActiveEditCurso}
            cambiarEstado={setIsActiveEditCurso}
            IDCurso={IDCurso}
          ></EditarCurso>
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{curso.ID}</td>
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
                  <Link to={`/Examinar/${curso.codigoCurso}`}>
                    <button title="Examinar curso" id="OperationBtns">
                      <BiShowAlt />
                    </button>
                  </Link>
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
        <Paginador
          paginas={paginador}
          cambiarNumero={setNumBoton}
          num_boton={num_boton}
        ></Paginador>
      </div>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
