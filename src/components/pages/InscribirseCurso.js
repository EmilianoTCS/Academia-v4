import { Card, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Header from "../templates/Header";
import Select from "react-select";
import getDataService from "../../services/GetDataService";
import React, { useState, useEffect } from "react";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../templates/alerts/TopAlerts";
import "../css/IncribirseCurso.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function InscribirseCurso() {
  // ----------------------CONSTANTES----------------------------
  const [listCuentas, setListCuentas] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);

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
      const { message, ...data } = response;
      TopAlerts(message);
      console.log(message);
      console.log(data);
    });
  }

  useEffect(function () {
    obtenerCuentas();
    obtenerDatosCursos();
  }, []);

  // ----------------------MAPEADOS----------------------------
  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
    value: label.ID,
  }));
  const optionsCursos = listadoCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <div id="containerTablas">
        <h1 id="TitlesPages">Inscripción de cursos</h1>
        <Form id="formPrerequisitos" onSubmit={SendData}>
          <Row>
            <Col>
              <Card id="CardsPrerequisitos">
                <h1 id="Subtitles"> Selecciona tu cuenta</h1>
                <Select
                  placeholder="Elige una cuenta"
                  name="cuenta"
                  options={optionsCuentas}
                  onChange={({ value }) => setCodigoCuenta(value)}
                />
              </Card>
            </Col>
            <Col>
              <Card id="CardsPrerequisitos">
                <h1 id="Subtitles"> Curso al que desea inscribirse:</h1>
                <Select
                  placeholder="Elige un curso"
                  name="cursos"
                  options={optionsCursos}
                  onChange={({ value }) => setCursoSeleccionado(value)}
                />
              </Card>
            </Col>
          </Row>
          <button id="CardsPrerequisitos" className="enviar" type="submit">
            Enviar
          </button>
        </Form>
      </div>
    </>
  ) : (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}
