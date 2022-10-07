import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([""]);
  const [paginador, setPaginador] = useState([""]);

  function obtenerDatos() {
    const url = "TASKS/coe-listColaboradores.php";
    getDataService(url).then((colaboradores) =>
      setColaboradores(colaboradores)
    );
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
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Área</th>
            <th>CodigoCuenta</th>
            <th>Correo</th>
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
