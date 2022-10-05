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

export default function ListadoRamos() {
  const [ramos, setRamos] = useState([""]);
  const [paginador, setPaginadorRamos] = useState([""]);
  const url = "TASKS/coe-listCursos.php";
  const urlPaginador = "paginador/botones_Cursos.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  function obtenerDatosRamos() {
    getDataService(url).then((ramos) => setRamos(ramos));
  }
  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRamos(paginador)
    );
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = { num_boton: targetActual };
    SendDataService(url, operationUrl, data).then((data) => setRamos(data));
  }
  useEffect(function () {
    obtenerDatosRamos();
    obtenerDatosPaginador();
  }, []);

  return userData ? (
    <>
      <Header></Header>
      <div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID del ramo</th>
              <th>Nombre del ramo</th>
              <th>HH académicas</th>
              <th>Pre-requisito</th>
              <th>Relator</th>
              <th>Área</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {ramos.map((ramo) => (
              <tr key={ramo.ID}>
                <td>{ramo.codigoRamo}</td>
                <td>{ramo.nombreRamo}</td>
                <td>{ramo.hh_academicas}</td>
                <td>{ramo.pre_requisito}</td>
                <td>{ramo.nombre}</td>
                <td>{ramo.nombreArea}</td>
                <td>
                  <button
                    title="Editar ramo"
                    id="OperationBtns"
                    onClick={() => this.loadDataEdit(ramo.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => this.alertDelete(ramo.ID)}
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
