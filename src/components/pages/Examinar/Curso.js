import React, { useState, useEffect } from "react";
import { useRoute, Redirect } from "wouter";
import Header from "../../templates/Header";
import { Table } from "react-bootstrap";
import SendDataService from "../../../services/SendDataService";
// import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function Curso() {
  const [, params] = useRoute("/Examinar/:params");
  const userData = localStorage.getItem("loggedUser");
  const [CursoSeleccionado, setCursoSeleccionado] = useState([]);

  function obtenerDatos() {
    var url = "TASKS/coe-list_infoidCurso.php";
    var operationUrl = "codigoCurso";
    var data = { codigoCurso: params.params };
    SendDataService(url, operationUrl, data).then((response) =>
      setCursoSeleccionado(response)
    );
  }

  useEffect(function () {
    obtenerDatos();
    console.log(params.params);
    console.log(CursoSeleccionado);
  }, []);

  return userData ? (
    <>
      <Header></Header>
      <div>
        <div id="containerTablas">
          <h1 id="TitlesPages">Información por curso</h1>
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Código del curso</th>
              <th>Fecha y hora</th>
              <th>Código del ramo</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Estado</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {CursoSeleccionado.map((curso) => (
              <tr key={curso.ID}>
                <td>{curso.codigoCurso}</td>
                <td>{curso.fecha_hora}</td>
                <td>{curso.codigoRamo}</td>
                <td>{curso.hora_inicio}</td>
                <td>{curso.hora_fin}</td>
                <td>{curso.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
