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
  const [, params] = useRoute("/EDD/ResultadoAnalistas/:CodigoEvaluacion");
  const [resultadosAnalistas, setResultadosAnalistas] = useState([""]);
  // const [paginador, setPaginadorCursos] = useState([]);
  const url = "EDD/visualizacion/resultadoListadoAnalistas.php";
//   const urlPaginador = "paginador/botones_Cuenta.php";
//   const operationUrl = "pagina";

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
      codigoEvaluacion:params.CodigoEvaluacion,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setResultadosAnalistas(data);
      console.log(data);
    });
  }

  //PAGINADOR ---------------------


  useEffect(
    function () {
    //   obtenerDatosPaginador();
      handleChangePaginador();
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
          <h1 id="TitlesPages">Resultado de evaluaciónes para analistas</h1>
        </div>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código del curso</th>
              <th>Código de la Cuenta</th>
              <th>Nombre del curso</th>
              <th>Sesión</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.ID}>
                <td>{curso.ID}</td>
                <td>{curso.codigoCurso}</td>
                <td>{curso.codigoCuenta}</td>
                <td>{curso.nombreRamo}</td>
                <th>{curso.sesion}</th>
                <td>{curso.inicio}</td>
                <td>{curso.fin}</td>
                <td>{curso.estado}</td>                  
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
