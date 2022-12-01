import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import InsertarColaborador from "../../templates/forms/InsertarColaborador";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import EditarColaborador from "../../templates/forms/EditarColaborador";
import ConfirmAlert from "../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../templates/alerts/TopAlerts";
export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [isActiveInsertColaborador, setIsActiveInsertColaborador] =
    useState(false);
  const [isActiveEditColaborador, setIsActiveEditColaborador] = useState(false);
  const [IDColaborador, setIDColaborador] = useState(2);

  function obtenerDatos() {
    const url = "TASKS/coe-listColaboradores.php";
    getDataService(url).then((colaboradores) =>
      setColaboradores(colaboradores)
    );
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateColaborador.php";
        var operationUrl = "updateStateColaborador";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then(
          (response) => TopAlerts(response),
          obtenerDatos()
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
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    const url = "TASKS/coe-listColaboradores.php";
    const operationUrl = "pagina";
    SendDataService(url, operationUrl, data).then((data) =>
      setColaboradores(data)
    );
  }
  useEffect(function () {
    obtenerDatos();
    obtenerDatosPaginador();
  }, []);

  return (
    <>
      <button id="formButtons" onClick={insertarColaborador}>
        Insertar Colaborador
      </button>
      <InsertarColaborador
        Props={{ isActiveInsertColaborador }}
      ></InsertarColaborador>
      <EditarColaborador
        Props={{ isActiveEditColaborador, IDColaborador }}
      ></EditarColaborador>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Área</th>
            <th>CodigoCuenta</th>
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
                  <BsPencilSquare />
                </button>
                <button title="Examinar curso" id="OperationBtns">
                  <BiShowAlt />
                </button>
                <button
                  title="Eliminar curso"
                  id="OperationBtns"
                  onClick={() => eliminar(colaborador.ID)}
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
    </>
  );
}
