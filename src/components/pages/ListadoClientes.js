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
import InsertarClientes from "../templates/forms/InsertarClientes";
import EditarClientes from "../templates/forms/EditarCliente";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../css/BtnInsertar.css";

export default function ListadoClientes() {
  const [cliente, setCliente] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listClientes.php";
  const urlPaginador = "paginador/botones_Clientes.php";
  const operationUrl = "pagina";
  const [isActiveInsertCliente, setIsActiveInsertCliente] = useState(false);
  const [isActiveEditCliente, setIsActiveEditCliente] = useState(false);
  const [IDCliente, setIDCliente] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function insertarCliente() {
    setIsActiveInsertCliente(!isActiveInsertCliente);
  }
  function editarCliente(ID) {
    setIsActiveEditCliente(!isActiveEditCliente);
    setIDCliente(ID);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateClientes.php";
        var operationUrl = "updateStateClientes";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
  }

  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRelator(paginador)
    );
  }

  useEffect(
    function () {
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) => setCliente(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de clientes</h1>

          <Button id="btn" onClick={insertarCliente}>
            Insertar Cliente
          </Button>

          <InsertarClientes
            isActiveCliente={isActiveInsertCliente}
            cambiarEstado={setIsActiveInsertCliente}
          ></InsertarClientes>

          <EditarClientes
            isActiveEditCliente={isActiveEditCliente}
            cambiarEstado={setIsActiveEditCliente}
            IDCliente={IDCliente}
          ></EditarClientes>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de cliente</th>
                <th>Nombre del cliente</th>
                <th>Referente</th>
                <th>Córreo referente</th>
                <th>Cargo referente</th>
                <th>Teléfono</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {cliente.map((cliente) => (
                <tr key={cliente.ID}>
                  <td>{cliente.ID}</td>
                  <td>{cliente.tipo_cliente}</td>
                  <td>{cliente.nombreCliente}</td>
                  <td>{cliente.referente}</td>
                  <td>{cliente.correoReferente}</td>
                  <td>{cliente.cargoReferente}</td>
                  <td>{cliente.telefonoReferente}</td>
                  <td>
                    <button
                      title="Editar cliente"
                      id="OperationBtns"
                      onClick={() => editarCliente(cliente.ID)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <button title="Examinar curso" id="OperationBtns">
                      <HiEye id="icons" />
                    </button>
                    <button
                      title="Eliminar curso"
                      onClick={() => eliminar(cliente.ID)}
                      id="OperationBtns"
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
