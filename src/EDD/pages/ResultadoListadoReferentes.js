import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Header from "../../components/templates/Header";
import "../../components/css/TablasStyles.css";
import Paginador from "../../components/templates/Paginador";

export default function ResultadoListadoAnalistas() {
  const [, params] = useRoute("/EDD/ResultadoReferentes/:params");
  const [resultadosReferentes, setResultadosReferentes] = useState([""]);
  // const [paginador, setPaginadorCursos] = useState([]);

  const url = "EDD/visualizacion/resultadoListadoReferentes.php";
  //   const urlPaginador = "paginador/botones_Cuenta.php";
  const operationUrl = "pagina";

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  //PAGINADOR ---------------------

  const [num_boton, setNumBoton] = useState(1);

  //   function obtenerDatosPaginador() {
  //     getDataService(urlPaginador).then((paginador) =>
  //       setPaginadorCursos(paginador)
  //     );
  //   }
  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
      codigoEvaluacion: params.params,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setResultadosReferentes(data);
      console.log(data);
    });
  }

  //PAGINADOR ---------------------

  useEffect(
    function () {
      //   obtenerDatosPaginador();
      handleChangePaginador();
      console.log(params);
    },
    [num_boton]
  );

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Resultado de evaluaciónes para referentes</h1>
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>codigoEvaluacion</th>
              <th>NomAp</th>
              <th>NomApRef</th>
              <th>numPregunta</th>
              <th>resultado</th>
            </tr>
          </thead>
          <tbody>
            {resultadosReferentes.map((resultado) => (
              <tr key={resultado.ID}>
                <td>{resultado.ID}</td>
                <td>{resultado.codigoEvaluacion}</td>
                <td>{resultado.NomAp}</td>
                <td>{resultado.NomApRef}</td>
                <th>{resultado.numPregunta}</th>
                <td>{resultado.resultado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Paginador
          paginas={paginador}
          cambiarNumero={setNumBoton}
          num_boton={num_boton}
        ></Paginador> */}
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
