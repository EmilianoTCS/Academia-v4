import React, { useState, useEffect, useContext } from "react";
import { useRoute, Redirect } from "wouter";
import Header from "../../templates/Header";
import { Table, Container } from "react-bootstrap";
import SendDataService from "../../../services/SendDataService";
import { AuthContext } from "../../../context/AuthContext";

export default function Analista() {
  const [, params] = useRoute("/Examinar/:params");
  const [AnalistaSeleccionado, setAnalistaSeleccionado] = useState([]);
  const { isLogged } = useContext(AuthContext);

  function obtenerDatos() {
    var url = "TASKS/Examinar/eddAnalistas.php";
    var operationUrl = "codigoEvaluacion";
    var data = { codigoEvaluacion: params.params };
    SendDataService(url, operationUrl, data).then((response) =>
    setAnalistaSeleccionado(response)
    );
  }

  useEffect(function () {
    obtenerDatos();
    console.log(params.params);
    console.log(AnalistaSeleccionado);
  }, []);

  return isLogged ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Información por analistas</h1>
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
        </Container>     
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
