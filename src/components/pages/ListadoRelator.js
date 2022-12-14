import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import InsertarRelator from "../templates/forms/InsertarRelator";
import EditarRelator from "../templates/forms/EditarRelator";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../css/BtnInsertar.css";
import useUser from "../../hooks/useUser";


export default function ListadoRelator() {
  const [relator, setRelator] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listOrador.php";
  const urlPaginador = "paginador/botones_Relator.php";
  const operationUrl = "pagina";
  const [isActiveInsertRelator, setIsActiveInsertRelator] = useState(false);
  const [IDRelator, setIDRelator] = useState(null);
  const [isActiveEditRelator, setIsActiveEditRelator] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const {isLogged} = useUser()
  const userData = JSON.parse(sessionStorage.getItem("userData"));


  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRelator(paginador)
    );
  }

  function insertarRelator() {
    setIsActiveInsertRelator(!isActiveInsertRelator);
  }
  function editarRelator(ID) {
    setIsActiveEditRelator(!isActiveEditRelator);
    setIDRelator(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateRelator.php";
        var operationUrl = "updateStateRelator";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
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
    SendDataService(url, operationUrl, data).then((data) => setRelator(data));
  }
  //PAGINADOR ---------------------

  return isLogged ? (
    <>
      <Header></Header>
      <div id="containerTablas">
        <h1 id="TitlesPages">Listado de relatores</h1>
        <Button id="btn" onClick={insertarRelator}>
          Insertar Relator
        </Button>
        <InsertarRelator
          isActiveRelator={isActiveInsertRelator}
          cambiarEstado={setIsActiveInsertRelator}
        ></InsertarRelator>

        <EditarRelator
          isActiveEditRelator={isActiveEditRelator}
          cambiarEstado={setIsActiveEditRelator}
          IDRelator={IDRelator}
        ></EditarRelator>

        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Relator</th>
              <th>Área</th>
              <th>Cuenta</th>
              <th>Código Ramo</th>
              <th>Nombre del ramo</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {relator.map((relator) => (
              <tr>
                <td>{relator.ID}</td>
                <td>{relator.nombre}</td>
                <td>{relator.nombreArea}</td>
                <td>{relator.codigoCuenta}</td>
                <td>{relator.codigoRamo}</td>
                <td>{relator.nombreRamo}</td>
                <td>
                  <button
                    title="Editar relator"
                    id="OperationBtns"
                    onClick={() => editarRelator(relator.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => eliminar(relator.ID)}
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
    <Redirect to="/login"></Redirect>
  );
}
