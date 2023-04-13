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
import InsertarEmpleado from "../templates/forms/InsertarEmpleado";
import EditarEmpleados from "../templates/forms/EditarEmpleados";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../css/BtnInsertar.css";


export default function ListadoEmpleados() {
  const [empleado, setEmpleado] = useState([""]);
//   const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listEmpleados.php";
//   const urlPaginador = "paginador/botones_Empleado.php";
  const operationUrl = "pagina";
  const [isActiveInsertEmpleado, setIsActiveInsertEmpleado] = useState(false);
  const [isActiveEditEmpleado, setIsActiveEditEmpleado] = useState(false);
  const [IDEmpleado, setIDEmpleado] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function insertarEmpleado() {
    setIsActiveInsertEmpleado(!isActiveInsertEmpleado);
  }
  function editarEmpleado(ID) {
    setIsActiveEditEmpleado(!isActiveEditEmpleado);
    setIDEmpleado(ID);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateEmpleados.php";
        var operationUrl = "updateStateEmpleados";
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
    SendDataService(url, operationUrl, data).then((data) => setEmpleado(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de empleados</h1>

           <Button id="btn" onClick={insertarEmpleado}>
            Insertar Empleado
          </Button> 

          <InsertarEmpleado
            isActiveEmpleado={isActiveInsertEmpleado}
            cambiarEstado={setIsActiveInsertEmpleado}
            empleado={empleado}
          ></InsertarEmpleado>

          <EditarEmpleados
            isActiveEditEmpleado={isActiveEditEmpleado}
            cambiarEstado={setIsActiveEditEmpleado}
            IDEmpleado={IDEmpleado}
            setEmpleado={setEmpleado}
            empleado={empleado}
          ></EditarEmpleados> 

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Apellido</th>
                <th>Cargo</th>
                <th>Correo</th>
                <th>Usuario</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {empleado.map((empleado) => (
                <tr key={empleado.ID}>
                  <td>{empleado.ID}</td>
                  <td>{empleado.nombreApellido}</td>
                  <td>{empleado.cargo}</td>
                  <td>{empleado.correo}</td>
                  <td>{empleado.usuario}</td>
                  <td>
                    <button
                      title="Editar cliente"
                      id="OperationBtns"
                      onClick={() => editarEmpleado(empleado.ID)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button> 
                    <button
                      title="Eliminar curso"
                      onClick={() => eliminar(empleado.ID)}
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
