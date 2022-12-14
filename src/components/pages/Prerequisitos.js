import React from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { Redirect } from "wouter";
import Header from "../templates/Header";
import Select from "react-select";
import { useState, useEffect } from "react";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import SwitchToggle from "../templates/SwitchToggle";
import "../css/Prerequisitos.css";
import useUser from "../../hooks/useUser";

export default function Prerequisitos() {
  const [listadoCursos, setlistadoCursos] = useState([""]);
  const [listadoCursosInsert, setlistadoCursosInsert] = useState([""]);
  const [value, setValue] = useState([""]);
  const [valueInsert, setValueInsert] = useState([""]);
  const [listadoPrerequisitos, setListadoPrerequisitos] = useState([""]);
  const { isLogged } = useUser();
  const userData = JSON.parse(sessionStorage.getItem("userData"));


  // ------------------------- FUNCIONES -------------------------
  function getListadoCursos() {
    const url = "TASKS/auxiliar/idCurso.php?idCurso";
    getDataService(url).then((cursos) => setlistadoCursos(cursos));
  }
  function getListadoPrerequisitos(value) {
    const url = "TASKS/auxiliar/prerequisitos.php";
    const operationUrl = "ID";
    var data = { ID: value.value };
    SendDataService(url, operationUrl, data).then((cursos) =>
      setListadoPrerequisitos(cursos)
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
    console.log(ID);
    const url = "TASKS/coe-updateStatePrerequisito.php";
    var data = { ID: ID };
    var operationUrl = "updateStatePrerequisito";
    SendDataService(url, operationUrl, data);
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
      PrerequisitoAInsertar: valueInsert[0].value,
    };
    console.log(data);
    SendDataService(url, operationUrl, data);
    getListadoPrerequisitos(value.value);
  }
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

  return isLogged ? (
    <>
      <Header></Header>
      <h1 id="TitlesPages">Administración de prerequisitos</h1>

      <Form onSubmit={handleSubmit} id="formPrerequisitos">
        <Card id="CardsPrerequisitos">
          <h1 id="Subtitles"> Selecciona un curso</h1>
          <Select
            options={options}
            onChange={handleChangeSelect}
            value={value}
            defaultInputValue={options[0].nombreRamo}
          />
        </Card>
        <Card id="CardsPrerequisitos">
          <h1 id="Subtitles"> Selecciona el pre requisito a insertar</h1>

          <Select
            options={optionsInsert}
            onChange={handleChangeSelectInsert}
            value={valueInsert}
          />
        </Card>
        <Button id="CardsPrerequisitos" type="submit">
          Enviar
        </Button>
      </Form>
      <Card id="itemsPrerequisitos">
        <h1 id="Subtitles"> Prerequisitos activos</h1>

        <Table responsive>
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
      </Card>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
