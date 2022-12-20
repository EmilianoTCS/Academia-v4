import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
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
import Paginador from "../templates/Paginador";

export default function ListadoRamos() {
  const [ramos, setRamos] = useState([""]);
  const [paginador, setPaginadorRamos] = useState([""]);
  const url = "TASKS/coe-listCursos.php";
  const urlPaginador = "paginador/botones_Cursos.php";
  const operationUrl = "pagina";

  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveInsertRamo, setIsActiveInsertRamo] = useState(false);
  const [IDRamo, setIDRamo] = useState(null);
  const [isActiveEditRamo, setIsActiveEditRamo] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [num_boton, setNumBoton] = useState(1);

  useEffect(
    function () {
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
    setIsActiveInsertRamo(false);
  }
  function editarRamo(ID) {
    setIsActiveEditRamo(!isActiveEditRamo);
    setIDRamo(ID);
  }
  function insertarRamo() {
    setIsActiveInsertRamo(!isActiveInsertRamo);
    setIsActiveInsertCurso(false);
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

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <div id="containerTablas">
        <h1 id="TitlesPages">Listado de ramos</h1>
        <Button id="btnCursoListado" onClick={insertarCurso}>
          Insertar Curso
        </Button>
        <Button id="btnCursoListado" onClick={insertarRamo}>
          Insertar Ramos
        </Button>

        <InsertarCurso
          isActiveCurso={isActiveInsertCurso}
          cambiarEstado={setIsActiveInsertCurso}
        ></InsertarCurso>
        <InsertarRamo
          isActiveRamo={isActiveInsertRamo}
          cambiarEstado={setIsActiveInsertRamo}
        ></InsertarRamo>
        <EditarRamo
          isActiveEditRamo={isActiveEditRamo}
          cambiarEstado={setIsActiveEditRamo}
          IDRamo={IDRamo}
        ></EditarRamo>
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
