import React, { useState, useEffect } from "react";
import { Container,Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Header from "../../components/templates/Header";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Paginador from "../../components/templates/Paginador";
import TopAlerts from "../../components/templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import "../../components/css/TablasStyles.css";
import InsertarEDDAnalistas from "../templates/forms/insertarEDDAnalistas";

export default function ListadoAnalistas() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [listAnalistas, setListAnalistas] = useState([""]);
  const [paginador, setPaginadorAnalistas] = useState([""]);
  const [num_boton, setNumBoton] = useState(1);
  const [isActiveInsertEDDAnalistas, setIsActiveInsertEDDAnalistas] =
    useState(false);

  function obtenerDatosPaginador() {
    var urlPaginador = "paginador/botones_EDDAnalistas.php";
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorAnalistas(paginador)
    );
  }
  function insertarEDDAnalistas() {
    setIsActiveInsertEDDAnalistas(!isActiveInsertEDDAnalistas);
  }
  function handleChangePaginador() {
    var url = "EDD/visualizacion/listadoEvaluacionesAnalistas.php";
    var operationUrl = "pagina";
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      setListAnalistas(response)
    );
  }

  useEffect(
    function () {
      obtenerDatosPaginador();
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
        <h1 id="TitlesPages">Listado de Analistas</h1>
        <Button id="btn" onClick={insertarEDDAnalistas}>
          Insertar evaluación de Analistas
        </Button>
        <InsertarEDDAnalistas
          isActiveInsertEDDAnalistas={isActiveInsertEDDAnalistas}
          cambiarEstado={setIsActiveInsertEDDAnalistas}
        />

        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Código de evaluación</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Proyecto</th>
              <th>ID del Cliente</th>
              <th>Estado</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {listAnalistas.map((analistas) => (
              <tr key={analistas.ID}>
                <td>{analistas.codigoEvaluacion}</td>
                <td>{analistas.fechaInicio}</td>
                <td>{analistas.fechaFin}</td>
                <td>{analistas.proyecto}</td>
                <td>{analistas.idCliente}</td>
                <td>{analistas.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginador
          paginas={paginador}
          cambiarNumero={setNumBoton}
          num_boton={num_boton}
        ></Paginador>
      </div>
      </Container>
    </>
  ) : (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}
