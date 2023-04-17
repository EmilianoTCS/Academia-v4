import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../css/TablasStyles.css";
import InsertarProyecto from "../templates/forms/InsertarProyecto";
import EditarProyecto from "../templates/forms/EditarProyecto";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../css/BtnInsertar.css";

export default function ListadoProyectos() {
  const [proyectos, setProyectos] = useState([""]);
  //   const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listProyectos.php";
  //   const urlPaginador = "paginador/botones_Equipo.php";
  const operationUrl = "pagina";
  const [isActiveInsertProyecto, setIsActiveInsertProyecto] = useState(false);
  const [isActiveEditProyecto, setIsActiveEditProyecto] = useState(false);
  const [IDProyecto, setIDProyecto] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function insertarProyecto() {
    setIsActiveInsertProyecto(!isActiveInsertProyecto);
  }
  function editarProyecto(ID) {
    setIsActiveEditProyecto(!isActiveEditProyecto);
    setIDProyecto(ID);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateProyectos.php";
        var operationUrl = "updateStateProyectos";
        var data = { ID: ID, usuario: userData.username };
        SendDataService(url, operationUrl, data).then((response) => {
          const { successEdited } = response[0];
          TopAlerts(successEdited);
        });
      }
    });
  }

  //   function obtenerDatosPaginador() {
  //     getDataService(urlPaginador).then((paginador) =>
  //       setPaginadorRelator(paginador)
  //     );
  //   }

  useEffect(
    function () {
      //   obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      setProyectos(response)
    );
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de proyectos</h1>

          <Button id="btn" onClick={insertarProyecto}>
            Insertar Proyecto
          </Button>

          <InsertarProyecto
            isActiveProyecto={isActiveInsertProyecto}
            cambiarEstado={setIsActiveInsertProyecto}
            proyecto={proyectos}
          ></InsertarProyecto>

          <EditarProyecto
            isActiveEditProyecto={isActiveEditProyecto}
            cambiarEstado={setIsActiveEditProyecto}
            IDProyecto={IDProyecto}
            setProyectos={setProyectos}
            proyecto={proyectos}
          ></EditarProyecto>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del proyecto</th>
                <th>Cliente</th>
                <th>CuentaJP</th>
                <th>Servicio</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.ID}>
                  <td>{proyecto.ID}</td>
                  <td>{proyecto.nombreProyecto}</td>
                  <td>{proyecto.cliente}</td>
                  <td>{proyecto.cuentaJP}</td>
                  <td>{proyecto.servicio}</td>

                  <td>
                    <button
                      title="Editar Proyecto"
                      id="OperationBtns"
                      onClick={() => editarProyecto(proyecto.ID)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <button
                      title="Eliminar Proyecto"
                      onClick={() => eliminar(proyecto.ID)}
                      id="OperationBtns"
                    >
                      <BsFillTrashFill id="icons" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginador
            paginas={paginador}
            cambiarNumero={setNumBoton}
            num_boton={num_boton}
          ></Paginador> */}
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
