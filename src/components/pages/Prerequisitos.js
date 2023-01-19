import React from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import Header from "../templates/Header";
import Select from "react-select";
import { useState, useEffect } from "react";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import SwitchToggle from "../templates/SwitchToggle";
import "../css/Prerequisitos.css";
import TopAlerts from "../templates/alerts/TopAlerts";
import { RevolvingDot } from "react-loader-spinner";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Prerequisitos() {
  const [listadoCursos, setlistadoCursos] = useState([""]);
  const [listadoCursosInsert, setlistadoCursosInsert] = useState([""]);
  const [value, setValue] = useState([""]);
  const [valueInsert, setValueInsert] = useState([""]);
  const [listadoPrerequisitos, setListadoPrerequisitos] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [busqueda, setBusqueda] = useState(false);

  // ------------------------- FUNCIONES -------------------------
  function getListadoCursos() {
    const url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((cursos) => setlistadoCursos(cursos));
  }
  function getListadoPrerequisitos(value) {
    const url = "TASKS/auxiliar/prerequisitos.php";
    const operationUrl = "ID";
    var data = { ID: value.value };
    SendDataService(url, operationUrl, data).then(
      (cursos) => setListadoPrerequisitos(cursos),
      setBusqueda(true)
    );
  }
  function getListadoCursosInsert(value) {
    const url = "TASKS/auxiliar/idCursoInsert.php";
    const operationUrl = "idCurso";
    var data = { ID: value.value };
    SendDataService(url, operationUrl, data).then((cursos) =>
      setlistadoCursosInsert(cursos)
    );
  }
  function toggleisActivePrerequisito(ID) {
    const url = "TASKS/coe-updateStatePrerequisito.php";
    var data = { ID: ID, IDCurso: value.value };
    var operationUrl = "updateStatePrerequisito";
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...prerequisitos } = response[0];
      actualizarPrerequisitos(prerequisitos);
      TopAlerts(successEdited);
    });
  }
  function actualizarPrerequisitos(prerequisitos) {
    const nuevosPrerequisitos = listadoPrerequisitos.map((p) =>
      p.ID === prerequisitos.ID ? prerequisitos : p
    );
    setListadoPrerequisitos(nuevosPrerequisitos);
  }

  function handleChangeSelect(value) {
    setValue(value);
    getListadoCursosInsert(value);
    getListadoPrerequisitos(value);
  }
  function handleChangeSelectInsert(valueInsert) {
    setValueInsert(valueInsert);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarPrerequisito.php";
    const operationUrl = "insertarPrerequisito";
    var data = {
      CursoaConsultar: value.value,
      PrerequisitoAInsertar: valueInsert.value,
    };
    console.log(data);
    SendDataService(url, operationUrl, data);
    getListadoPrerequisitos(value.value);
  }

  const MainTable = () => {
    if (busqueda) {
      return (
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre del ramo</th>
              <th>ID del pre_requisito</th>
              <th>Fecha de modificación</th>
              <th>Habilitar o Deshabilitar</th>
            </tr>
          </thead>
          <tbody>
            {listadoPrerequisitos.map((prerequisito) => (
              <tr key={prerequisito.ID}>
                <td>{prerequisito.codigoRamo}</td>
                <td>{prerequisito.nombreRamo}</td>
                <td>{prerequisito.pre_requisito}</td>
                <td>{prerequisito.fechaActualizacion}</td>
                <td
                  onChange={() => toggleisActivePrerequisito(prerequisito.ID)}
                >
                  <SwitchToggle isActive={prerequisito.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <RevolvingDot
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{ margin: "auto auto" }}
        wrapperClass="dna-wrapper"
        color="#e10b1c"
      ></RevolvingDot>
    );
  };
  // ------------------------- CONSTANTES -------------------------

  const options = listadoCursos.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));

  const optionsInsert = listadoCursosInsert.map((label) => ({
    label: label.nombreRamo,
    value: label.ID,
  }));

  // ------------------------- USEEFFECT -------------------------

  useEffect(function () {
    getListadoCursos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------- RETURN -------------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <div id="containerTablas">
        <h1 id="TitlesPages">Administración de prerrequisitos</h1>

        <Form onSubmit={handleSubmit} id="formPrerequisitos">


            <Row>

              <Col>
                <Card id="CardsPrerequisitos">
                  <h1 id="Subtitles"> Selecciona un curso</h1>
                  <Select
                    options={options}
                    onChange={handleChangeSelect}
                    value={value}
                    defaultInputValue={options[0].nombreRamo}
                  />
                </Card>
              </Col>

              <Col>
                <Card id="CardsPrerequisitos">
                  <h1 id="Subtitles">
                    {" "}
                    Selecciona el prerrequisito a insertar
                  </h1>

                  <Select
                    options={optionsInsert}
                    onChange={handleChangeSelectInsert}
                    value={valueInsert}
                  />
                </Card>
              </Col>

            </Row>


          <button id="CardsPrerequisitos" className="enviar" type="submit">
            Enviar
          </button>
        </Form>

        <Card id="itemsPrerequisitos">
          <h1 id="Subtitles"> Prerequisitos activos</h1>

          <MainTable></MainTable>
        </Card>
      </div>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
