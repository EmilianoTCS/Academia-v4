import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../css/TablasStyles.css";

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
        var data = { ID: ID, usuario: userData.username };
        SendDataService(url, operationUrl, data).then((response) => {
          const { successEdited } = response[0];
          TopAlerts(successEdited);
        });
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
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de ramos</h1>

          <Button id="btnCursoListado" onClick={insertarRamo}>
            Insertar Ramo
          </Button>

          <InsertarRamo
            isActiveRamo={isActiveInsertRamo}
            cambiarEstado={setIsActiveInsertRamo}
            ramos={ramos}
          ></InsertarRamo>
          <EditarRamo
            isActiveEditRamo={isActiveEditRamo}
            cambiarEstado={setIsActiveEditRamo}
            IDRamo={IDRamo}
            setRamos={setRamos}
            ramos={ramos}
          ></EditarRamo>
          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID del ramo</th>
                <th>Nombre del ramo</th>
                <th>Cuenta (cliente)</th>
                <th>HH académicas</th>
                <th>Relator</th>
                <th>Área</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {ramos.map((ramo) => (
                <tr key={ramo.ID}>
                  <td>{ramo.ID}</td>
                  <td>{ramo.nombreRamo}</td>
                  <td>{ramo.codigoCuenta}</td>
                  <td>{ramo.hh_academicas}</td>
                  <td>{ramo.nombre}</td>
                  <td>{ramo.nombreArea}</td>
                  <td>
                    <button
                      title="Editar ramo"
                      id="OperationBtns"
                      onClick={() => editarRamo(ramo.ID)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar curso" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar curso"
                      id="OperationBtns"
                      onClick={() => eliminar(ramo.ID)}
                    >
                      <BsFillTrashFill id="icons" />
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
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
