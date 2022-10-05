import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsX, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";

export default function ListadoClientes() {
  const [cliente, setCliente] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listClientes.php";
  const urlPaginador = "paginador/botones_Clientes.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  function obtenerDatosClientes() {
    getDataService(url).then((clientes) => setCliente(clientes));
  }
  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRelator(paginador)
    );
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    SendDataService(url, operationUrl, data).then((data) => setCliente(data));
  }
  useEffect(function () {
    obtenerDatosClientes();
    obtenerDatosPaginador();
  }, []);

  return userData ? (
    <>
      <Header></Header>
      <div>
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
                    onClick={() => this.loadDataEdit(cliente.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => this.alertDelete(cliente.ID)}
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
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
