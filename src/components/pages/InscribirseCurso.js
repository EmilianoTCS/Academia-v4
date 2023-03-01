import { Card, Form, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Header from "../templates/Header";
import Select from "react-select";
import getDataService from "../../services/GetDataService";
import React, { useState, useEffect } from "react";
import SendDataService from "../../services/SendDataService";
import "../css/IncribirseCurso.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import TopAlerts from "../templates/alerts/TopAlerts";

export default function InscribirseCurso() {
  // ----------------------CONSTANTES----------------------------
  const [listCuentas, setListCuentas] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const [cambios, setCambios] = useState(false);

  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function obtenerDatosCursos() {
    var url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((response) => setListadoCursos(response));
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-inscripcionCurso.php";
    const operationUrl = "inscripcionCurso";
    var data = {
      idCuenta: codigoCuenta,
      usuario: userData.username,
      idCurso: cursoSeleccionado,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts(response[0]);
    });
  }

  const Alerts = () => {
    if (!cambios) {
      return (
        <>
          <br />
          <Alert variant="danger">
            <Alert.Heading>Por favor Selecciona las opciones.</Alert.Heading>
          </Alert>
          <br />
        </>
      );
    }
  };

  useEffect(function () {
    obtenerCuentas();
    obtenerDatosCursos();
  }, []);

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Inscripción de cursos</h1>
          <Form id="formPrerequisitos" onSubmit={SendData}>
            <Row>
              <Col>
                <Card id="CardsPrerequisitos">
                  <h1 id="Subtitles"> Selecciona tu cuenta</h1>
                  <select
                    required
                    className="form-control"
                    onChange={({ target }) => {
                      setCodigoCuenta(target.value), setCambios(true);
                    }}
                  >
                    <option hidden value="">Desplegar lista</option>
                    {listCuentas.map((valor) => (
                      <option value={valor.ID}>{valor.codigoCuenta}</option>
                    ))}
                  </select>
                </Card>
              </Col>
              <Col>
                <Card id="CardsPrerequisitos">
                  <h1 id="Subtitles"> Curso al que desea inscribirse:</h1>
                  <select
                    required
                    className="form-control"
                    onChange={({ target }) => {
                      setCursoSeleccionado(target.value);
                      setCambios(true);
                    }}
                  >
                    <option hidden value="">Desplegar lista</option>
                    {listadoCursos.map((valor) => (
                      <option value={valor.ID}>{valor.nombreRamo}</option>
                    ))}
                  </select>
                </Card>
              </Col>
            </Row>
            <button
              id="CardsPrerequisitos"
              className="enviar"
              type="submit"
              style={{ marginBottom: "20px" }}
              disabled={!cambios ? true : false}
            >
              Enviar
            </button>
          </Form>
        </div>
      </Container>
    </>
  ) : (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}
