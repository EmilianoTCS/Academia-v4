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

export default function ListadoRelator() {
  const [relator, setRelator] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listOrador.php";
  const urlPaginador = "paginador/botones_Relator.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  function obtenerDatosRelator() {
    getDataService(url).then((relatores) => setRelator(relatores));
  }
  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRelator(paginador)
    );
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    SendDataService(url, operationUrl, data).then((data) => setRelator(data));
  }
  useEffect(function () {
    obtenerDatosRelator();
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
                    onClick={() => this.loadDataEdit(relator.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => this.alertDelete(relator.ID)}
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
