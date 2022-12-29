import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "wouter";
import Header from "../templates/Header";
import Select from "react-select";
import getDataService from "../../services/GetDataService";
import React, { useState, useEffect } from "react";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../templates/alerts/TopAlerts";
import useUser from "../../hooks/useUser";

export default function InscribirseCurso() {
  // ----------------------CONSTANTES----------------------------
  const [listCuentas, setListCuentas] = useState([""]);
  const [listadoCursos, setListadoCursos] = useState([""]);
  const {isLogged} = useUser()
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("userData"));


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
      usuario: userData[0].username,
      idCurso: cursoSeleccionado,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
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

  return userData ? (
    <>
      <Header></Header>
      <h1 id="TitlesPages">Inscripción de cursos</h1>
      <Form id="formPrerequisitos" onSubmit={SendData}>
        <Card id="CardsPrerequisitos">
          <h1 id="Subtitles"> Selecciona tu cuenta</h1>
          <Select
            placeholder="Elige una cuenta"
            name="cuenta"
            options={optionsCuentas}
            onChange={({ value }) => setCodigoCuenta(value)}
          />
        </Card>
        <Card id="CardsPrerequisitos">
          <h1 id="Subtitles"> Curso al que desea inscribirse:</h1>
          <Select
            placeholder="Elige un curso"
            name="cursos"
            options={optionsCursos}
            onChange={({ value }) => setCursoSeleccionado(value)}
          />
        </Card>
        <Button id="CardsPrerequisitos" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  ) : (
    <>
      <Redirect to="/login"></Redirect>
    </>
  );
}
