import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import { Card, Table } from "react-bootstrap";
import Header from "../templates/Header";
import "../css/AdminStyles.css";
import SwitchToggle from "../templates/SwitchToggle";
import TopAlerts from "../templates/alerts/TopAlerts";
// import { BsTrash } from "react-icons/bs";
// import ConfirmAlert from "../templates/alerts/ConfirmAlert";

export default function Administrador() {
  const [cursos, setCursos] = useState([""]);
  const [ramos, setRamos] = useState([""]);
  const [clientes, setClientes] = useState([""]);
  const [relatores, setRelatores] = useState([""]);
  const [colaboradores, setColaboradores] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  // ---------------------------------------------------------------
  function obtenerDatosCursos() {
    const url = "TASKS/coe-adminCursos.php?cursos";
    getDataService(url).then((cursos) => {
      setCursos(cursos);
    });
  }
  function obtenerDatosRamos() {
    const url = "TASKS/coe-adminRamos.php?ramos";
    getDataService(url).then((ramos) => setRamos(ramos));
  }
  function obtenerDatosClientes() {
    const url = "TASKS/coe-adminClientes.php?clientes";
    getDataService(url).then((clientes) => setClientes(clientes));
  }
  function obtenerDatosColaboradores() {
    const url = "TASKS/coe-adminColaborador.php?colaborador";
    getDataService(url).then((colaboradores) =>
      setColaboradores(colaboradores)
    );
  }
  function obtenerDatosRelatores() {
    const url = "TASKS/coe-adminRelator.php?relator";
    getDataService(url).then((relatores) => setRelatores(relatores));
  }
  // -------------------------------------------------------------
  function handleChangeisActiveCursos(ID) {
    const url = "TASKS/coe-updateState.php";
    const operationUrl = "updateStateCursos";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...curso } = response[0];
      actualizarCurso(curso);
      TopAlerts(successEdited);
    });
  }
  function actualizarCurso(curso) {
    const nuevosCursos = cursos.map((c) => (c.ID === curso.ID ? curso : c));
    setCursos(nuevosCursos);
  }

  function handleChangeisActiveRamos(ID) {
    const url = "TASKS/coe-updateStateRamos.php";
    const operationUrl = "updateStateRamos";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...ramo } = response[0];
      actualizarRamo(ramo);
      TopAlerts(successEdited);
    });
  }
  function actualizarRamo(ramo) {
    const nuevosRamos = ramos.map((r) => (r.ID === ramo.ID ? ramo : r));
    setRamos(nuevosRamos);
  }

  function handleChangeisActiveColaborador(ID) {
    const url = "TASKS/coe-updateStateColaborador.php";
    const operationUrl = "updateStateColaborador";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...colaborador } = response[0];
      actualizarColaborador(colaborador);
      TopAlerts(successEdited);
    });
  }
  function actualizarColaborador(colaborador) {
    const nuevosColaboradores = colaboradores.map((c) =>
      c.ID === colaborador.ID ? colaborador : c
    );
    setColaboradores(nuevosColaboradores);
  }

  function handleChangeisActiveRelatores(ID) {
    const url = "TASKS/coe-updateStateRelator.php";
    const operationUrl = "updateStateRelator";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...relator } = response[0];
      actualizarRelator(relator);
      TopAlerts(successEdited);
    });
  }
  function actualizarRelator(relator) {
    const nuevosRelatores = relatores.map((r) =>
      r.ID === relator.ID ? relator : r
    );
    setRelatores(nuevosRelatores);
  }

  function handleChangeisActiveClientes(ID) {
    const url = "TASKS/coe-updateStateClientes.php";
    const operationUrl = "updateStateClientes";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cliente } = response[0];
      actualizarCliente(cliente);
      TopAlerts(successEdited);
    });
  }
  function actualizarCliente(cliente) {
    const nuevosClientes = clientes.map((c) =>
      c.ID === cliente.ID ? cliente : c
    );
    setClientes(nuevosClientes);
  }

  // function eliminarCurso(ID) {
  //   ConfirmAlert().then((response) => {
  //     if (response === true) {
  //       var url = "TASKS/coe-updateStateClientes.php";
  //       var operationUrl = "updateStateClientes";
  //       var data = { ID: ID };
  //       SendDataService(url, operationUrl, data).then(
  //         (response) => TopAlerts(response),
  //         obtenerDatosClientes()
  //       );
  //     }
  //   });
  // }

  // ------------------------------------------------------------------
  useEffect(function () {
    obtenerDatosClientes();
    obtenerDatosColaboradores();
    obtenerDatosCursos();
    obtenerDatosRamos();
    obtenerDatosRelatores();
  }, []);

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <div id="adminContainer">
        <h1 id="TitlesPages">Administración de registros</h1>

        <Card id="cardsTables" style={{ position: "unset" }}>
          <h1 id="cardsTitle">Cursos</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Código Curso</th>
                <th>Código Ramo</th>
                <th>Fecha de modificación</th>
                <th id="th_switch">Habilitar o Deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.ID}>
                  <td>{curso.ID}</td>
                  <td>{curso.codigoCurso}</td>
                  <td>{curso.codigoRamo}</td>
                  <td>{curso.date}</td>
                  <td onChange={() => handleChangeisActiveCursos(curso.ID)}>
                    <SwitchToggle isActive={curso.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card id="cardsTables" style={{ position: "unset" }}>
          <h1 id="cardsTitle">Ramos</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Código Ramo</th>
                <th>Nombre del Ramo</th>
                <th>Fecha de modificación </th>
                <th id="th_switch">Habilitar o Deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {ramos.map((ramo) => (
                <tr key={ramo.ID}>
                  <td>{ramo.ID}</td>
                  <td>{ramo.codigoRamo}</td>
                  <td>{ramo.nombreRamo}</td>
                  <td>{ramo.date}</td>
                  <td onChange={() => handleChangeisActiveRamos(ramo.ID)}>
                    <SwitchToggle isActive={ramo.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card id="cardsTables" style={{ position: "unset" }}>
          <h1 id="cardsTitle">Relatores</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha de modificación</th>
                <th id="th_switch">Habilitar o Deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {relatores.map((relator) => (
                <tr key={relator.ID}>
                  <td>{relator.ID}</td>
                  <td>{relator.nombre}</td>
                  <td>{relator.date}</td>
                  <td
                    onChange={() => handleChangeisActiveRelatores(relator.ID)}
                  >
                    <SwitchToggle isActive={relator.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card id="cardsTables" style={{ position: "unset" }}>
          <h1 id="cardsTitle">Colaboradores</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Área</th>
                <th>Fecha de modificación</th>
                <th id="th_switch">Habilitar o Deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores.map((colaborador) => (
                <tr key={colaborador.ID}>
                  <td>{colaborador.ID}</td>
                  <td>{colaborador.nombre_completo}</td>
                  <td>{colaborador.usuario}</td>
                  <td>{colaborador.area}</td>
                  <td>{colaborador.date}</td>
                  <td
                    onChange={() =>
                      handleChangeisActiveColaborador(colaborador.ID)
                    }
                  >
                    <SwitchToggle isActive={colaborador.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card id="cardsTables" style={{ position: "unset" }}>
          <h1 id="cardsTitle">Clientes</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de cliente</th>
                <th>Nombre del cliente</th>
                <th>Teléfono referente</th>
                <th>Correo referente</th>
                <th>Fecha de modificación</th>
                <th id="th_switch">Habilitar o Deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.ID}>
                  <td>{cliente.ID}</td>
                  <td>{cliente.tipo_cliente}</td>
                  <td>{cliente.nombreCliente}</td>
                  <td>{cliente.telefonoReferente}</td>
                  <td>{cliente.correoReferente}</td>
                  <td>{cliente.date}</td>
                  <td onChange={() => handleChangeisActiveClientes(cliente.ID)}>
                    <SwitchToggle isActive={cliente.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
