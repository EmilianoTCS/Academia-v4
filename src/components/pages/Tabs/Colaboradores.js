import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import InsertarColaborador from "../../templates/forms/InsertarColaborador";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import EditarColaborador from "../../templates/forms/EditarColaborador";
import ConfirmAlert from "../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import "../../css/BtnInsertar.css";
import Paginador from "../../templates/Paginador";

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [isActiveInsertColaborador, setIsActiveInsertColaborador] =
    useState(false);
  const [isActiveEditColaborador, setIsActiveEditColaborador] = useState(false);
  const [IDColaborador, setIDColaborador] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateColaborador.php";
        var operationUrl = "updateStateColaborador";
        var data = { ID: ID, usuario: userData.username };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts("successEdited")
        );
      }
    });
  }
  function insertarColaborador() {
    setIsActiveInsertColaborador(!isActiveInsertColaborador);
  }

  function editarColaborador(ID) {
    setIsActiveEditColaborador(!isActiveEditColaborador);
    setIDColaborador(ID);
  }

  function obtenerDatosPaginador() {
    const url = "paginador/botones_Colaboradores.php";
    getDataService(url).then((paginador) => setPaginador(paginador));
  }

  useEffect(
    function () {
      handleChangePaginador();
      obtenerDatosPaginador();
    },
    [num_boton]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    const url = "TASKS/coe-listColaboradores.php";
    const operationUrl = "pagina";
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) =>
      setColaboradores(data)
    );
  }

  //PAGINADOR ---------------------

  return (
    <>
      <Button
        id="btn"
        style={{ marginTop: "10px " }}
        onClick={insertarColaborador}
      >
        Insertar Colaborador
      </Button>
      <InsertarColaborador
        isActiveColaborador={isActiveInsertColaborador}
        cambiarEstado={setIsActiveInsertColaborador}
      ></InsertarColaborador>

      <EditarColaborador
        isActiveEditColaborador={isActiveEditColaborador}
        cambiarEstado={setIsActiveEditColaborador}
        IDColaborador={IDColaborador}
      ></EditarColaborador>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Área</th>
            <th>Código Cuenta</th>
            <th>Correo</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <tr key={colaborador.ID}>
              <td>{colaborador.ID}</td>
              <td>{colaborador.nombre_completo}</td>
              <td>{colaborador.usuario}</td>
              <td>{colaborador.area}</td>
              <td>{colaborador.codigoCuenta}</td>
              <td>{colaborador.correo}</td>
              <td>
                <button
                  title="Editar ramo"
                  id="OperationBtns"
                  onClick={() => editarColaborador(colaborador.ID)}
                >
                  <RiEditBoxFill id="icons" />
                </button>
                {/* <button title="Examinar curso" id="OperationBtns">
                <HiEye id="icons" />
                </button> */}
                <button
                  title="Eliminar curso"
                  id="OperationBtns"
                  onClick={() => eliminar(colaborador.ID)}
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
    </>
  );
}
