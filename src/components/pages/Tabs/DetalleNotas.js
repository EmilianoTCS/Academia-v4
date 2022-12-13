import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import SendDataService from "../../../services/SendDataService";

export default function DetalleNotas() {
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [data, setData] = useState([""]);

  function obtenerDatos() {
    const url = "TASKS/auxiliar/Notas.php";
    const operationUrl = "usuario";
    var data = { usuario: userData[0].username };
    SendDataService(url, operationUrl, data).then((response) =>
      setData(response)
    );
  }

  useEffect(function () {
    obtenerDatos();
  });
  return (
    <>
      <Card>
        <Table responsive>
          <thead className="thead-inverse">
            <tr>
              <th>CURSO</th>
              <th>EXAMENES</th>
              <th>NOTA</th>
              <th>PROMEDIO</th>
              <th>% APROBACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {data.map((nota) => (
              <tr>
                <td>{nota.codigoCurso}</td>
                <td>{nota.num_evaluaciones}</td>
                <td>{nota.nota}</td>
                <td>{nota.promedio}</td>
                <td>{nota.porcentaje}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
