import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";

export default function DetalleNotas() {
  const [data, setData] = useState([""]);

  function obtenerDatos() {
    const url = "TASKS/auxiliar/Notas.php";
    getDataService(url).then((response) => setData(response));
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
