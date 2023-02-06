import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import Header from "../../components/templates/Header";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import Paginador from "../../components/templates/Paginador";
import TopAlerts from "../../components/templates/alerts/TopAlerts";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import "../../components/css/TablasStyles.css";
import InsertarEDDReferentes from "../templates/forms/InsertarEDDReferentes";

export default function ListadoReferentes() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [listReferentes, setListReferentes] = useState([""]);
  const [paginador, setPaginadorReferentes] = useState([""]);
  const [num_boton, setNumBoton] = useState(1);
  const [isActiveInsertEDDReferente, setIsActiveInsertEDDReferente] =
    useState(false);

  function obtenerDatosPaginador() {
    var urlPaginador = "paginador/botones_EDDReferentes.php";
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorReferentes(paginador)
    );
  }
  function insertarEDDReferentes() {
    setIsActiveInsertEDDReferente(!isActiveInsertEDDReferente);
  }
  function handleChangePaginador() {
    var url = "EDD/visualizacion/listadoEvaluacionesReferentes.php";
    var operationUrl = "pagina";
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      setListReferentes(response)
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
          <h1 id="TitlesPages">Listado de referentes</h1>
          <Button id="btn" onClick={insertarEDDReferentes}>
            Insertar evaluación de referentes
          </Button>
          <InsertarEDDReferentes
            isActiveInsertEDDReferente={isActiveInsertEDDReferente}
            cambiarEstado={setIsActiveInsertEDDReferente}
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
              {listReferentes.map((referente) => (
                <tr key={referente.ID}>
                  <td>{referente.codigoEvaluacion}</td>
                  <td>{referente.fechaInicio}</td>
                  <td>{referente.fechaFin}</td>
                  <td>{referente.proyecto}</td>
                  <td>{referente.nombreCliente}</td>
                  <td>{referente.estado}</td>
                  <td>
                    <button title="Editar curso" id="OperationBtns">
                      <RiEditBoxFill id="icons" />
                    </button>
                    <Link>
                      <button title="Examinar evaluación" id="OperationBtns">
                        <HiEye id="icons" />
                      </button>
                    </Link>
                    <button title="Eliminar curso" id="OperationBtns">
                      <BsFillTrashFill id="icons" />
                    </button>
                  </td>
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
