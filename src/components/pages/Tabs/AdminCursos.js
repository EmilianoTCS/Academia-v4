import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminCursos() {
  const [cursos, setCursos] = useState([""]);

  function obtenerDatosCursos() {
    const url = "TASKS/coe-adminCursos.php?cursos";
    getDataService(url).then((cursos) => {
      setCursos(cursos);
    });
  }

  function handleChangeisActiveCursos(ID) {
    const url = "TASKS/coe-updateState.php";
    const operationUrl = "updateStateCursos";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...curso } = response[0];
      actualizarCurso(curso);
      TopAlerts(successEdited);
    });
  }
  function actualizarCurso(curso) {
    const nuevosCursos = cursos.map((c) => (c.ID === curso.ID ? curso : c));
    setCursos(nuevosCursos);
  }

  useEffect(function () {
    obtenerDatosCursos();
  }, []);

  return (
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código Curso</th>
            <th>Código Ramo</th>
            <th>Fecha de modificación</th>
            <th id="th_switch">Habilitar o Deshabilitar</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.ID}>
              <td>{curso.ID}</td>
              <td>{curso.codigoCurso}</td>
              <td>{curso.codigoRamo}</td>
              <td>{curso.date}</td>
              <td onChange={() => handleChangeisActiveCursos(curso.ID)}>
                <SwitchToggle isActive={curso.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

  );
}
