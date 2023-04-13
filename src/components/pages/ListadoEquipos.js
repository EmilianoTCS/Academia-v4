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
import InsertarEquipo from "../templates/forms/InsertarEquipo";
import EditarEquipos from "../templates/forms/EditarEquipos";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../css/BtnInsertar.css";

export default function ListadoEquipos() {
  const [equipo, setEquipo] = useState([""]);
  //   const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listEquipos.php";
  //   const urlPaginador = "paginador/botones_Equipo.php";
  const operationUrl = "pagina";
  const [isActiveInsertEquipo, setIsActiveInsertEquipo] = useState(false);
  const [isActiveEditEquipo, setIsActiveEditEquipo] = useState(false);
  const [IDEquipo, setIDEquipo] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function insertarEquipo() {
    setIsActiveInsertEquipo(!isActiveInsertEquipo);
  }
  function editarEquipo(ID) {
    setIsActiveEditEquipo(!isActiveEditEquipo);
    setIDEquipo(ID);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateEquipos.php";
        var operationUrl = "updateStateEquipos";
        var data = { ID: ID, usuario: userData.username };
        SendDataService(url, operationUrl, data).then((response) => {
          console.log(response);
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
    SendDataService(url, operationUrl, data).then((data) => setEquipo(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de equipos</h1>

          <Button id="btn" onClick={insertarEquipo}>
            Insertar Equipo
          </Button>

           <InsertarEquipo
            isActiveEquipo={isActiveInsertEquipo}
            cambiarEstado={setIsActiveInsertEquipo}
            equipo={equipo}
          ></InsertarEquipo>

          <EditarEquipos
            isActiveEditEquipo={isActiveEditEquipo}
            cambiarEstado={setIsActiveEditEquipo}
            IDEquipo={IDEquipo}
            setEquipo={setEquipo}
            equipo={equipo}
          ></EditarEquipos>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de equipo</th>
                <th>Cliente</th>
                <th>Nombre del proyecto</th>
                <th>Empleados</th>
                <th>Area</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {equipo.map((equipo) => (
                <tr key={equipo.ID}>
                  <td>{equipo.ID}</td>
                  <td>{equipo.nombreEquipo}</td>
                  <td>{equipo.cliente}</td>
                  <td>{equipo.nombreProyecto}</td>
                  <td>{equipo.nombreApellido}</td>
                  <td>{equipo.nombreArea}</td>
                  <td>
                    <button
                      title="Editar cliente"
                      id="OperationBtns"
                      onClick={() => editarEquipo(equipo.ID)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <button
                      title="Eliminar curso"
                      onClick={() => eliminar(equipo.ID)}
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
