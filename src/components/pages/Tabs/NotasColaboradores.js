import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";

export default function NotasColaboradores() {
  const [notas, setNotas] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [CursoSelected, setCursoSelected] = useState("");
  const [usuarioSelected, setUsuarioSelected] = useState("");

  function obtenerDatos() {
    const url = "TASKS/auxiliar/NotasColaboradores.php";
    getDataService(url).then((notas) => setNotas(notas));
  }
  function obtenerDatosPaginador() {
    const url = "paginador/botones_Evaluaciones.php";
    getDataService(url).then((paginador) => setPaginador(paginador));
    console.log(paginador);
  }
  function handleChangePaginador(e) {
    const targetActual = e.target.value;
    var data = {
      num_boton: targetActual,
      idCursosSelected: CursoSelected,
      usuarioSelected: usuarioSelected,
    };
    const url = "TASKS/auxiliar/NotasColaboradores.php";
    const operationUrl = "NotasColaboradores";
    SendDataService(url, operationUrl, data).then((data) => setNotas(data));
  }

  useEffect(function () {
    obtenerDatos();
    obtenerDatosPaginador();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Usuario</th>
            <th>Examenes</th>
            <th>Nota</th>
            <th>Promedio</th>
            <th>% Aprobación</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.ID}>
              <td>{nota.codigoCurso}</td>
              <td>{nota.usuario}</td>
              <td>{nota.num_evaluaciones}</td>
              <td>{nota.nota}</td>
              <td>{nota.promedio}</td>
              <td>{nota.porcentaje}</td>
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
