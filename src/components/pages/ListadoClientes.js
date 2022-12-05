import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import InsertarClientes from "../templates/forms/InsertarClientes";
import EditarClientes from "../templates/forms/EditarCliente";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";
export default function ListadoClientes() {
  const [cliente, setCliente] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listClientes.php";
  const urlPaginador = "paginador/botones_Clientes.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [isActiveInsertCliente, setIsActiveInsertCliente] = useState(false);
  const [isActiveEditCliente, setIsActiveEditCliente] = useState(false);
  const [IDCliente, setIDCliente] = useState(1);

  const [num_boton, setNumBoton] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  const handleClick = (event) => {
    setNumBoton(Number(event.target.value));
  };
  const renderNumeros = paginador.map((pagina) => {
    if (
      pagina.paginas < maxPageNumberLimit + 1 &&
      pagina.paginas > minPageNumberLimit
    ) {
      return (
        <li key={pagina.paginas}>
          <button
            name="paginas"
            value={pagina.paginas}
            onClick={handleClick}
            className={num_boton === pagina.paginas ? "active" : null}
          >
            {pagina.paginas}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });
  const handlePrevbtn = () => {
    setNumBoton(num_boton - 1);
    if ((num_boton - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextbtn = () => {
    setNumBoton(num_boton + 1);

    if (num_boton + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const pageDecrementBtn = () => {
    if (minPageNumberLimit > 1) {
      return (
        <li>
          <button onClick={handlePrevbtn}> hola</button>
        </li>
      );
    }
  };

  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) => setCliente(data));
  }

  //PAGINADOR ---------------------

  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de clientes</h1>
        <button id="formButtons" onClick={insertarCliente}>
          Insertar Cliente
        </button>
        <InsertarClientes Props={{ isActiveInsertCliente }}></InsertarClientes>
        <EditarClientes
          Props={{ isActiveEditCliente, IDCliente }}
        ></EditarClientes>
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
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => eliminar(cliente.ID)}
                    id="OperationBtns"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div id="paginador">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={
                num_boton === paginador[0].paginas ||
                num_boton < paginador[0].paginas
                  ? true
                  : false
              }
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderNumeros}
          <li>
            <button
              onClick={handleNextbtn}
              disabled={num_boton === paginador.length ? true : false}
            >
              Next
            </button>
          </li>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
