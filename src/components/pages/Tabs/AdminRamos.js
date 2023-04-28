import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table, Container } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";
import Header from "../../templates/Header";
import LinkTab from "../../templates/LinkTab"


export default function AdminRamos() {
  const [ramos, setRamos] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  function obtenerDatosRamos() {
    const url = "TASKS/coe-adminRamos.php?ramos";
    getDataService(url).then((ramos) => setRamos(ramos));
  }
  function handleChangeisActiveRamos(ID) {
    const url = "TASKS/coe-updateStateRamos.php";
    const operationUrl = "updateStateRamos";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...ramo } = response[0];
      actualizarRamo(ramo);
      TopAlerts(successEnabled);
    });
  }
  function actualizarRamo(ramo) {
    const nuevosRamos = ramos.map((r) => (r.ID === ramo.ID ? ramo : r));
    setRamos(nuevosRamos);
  }

  useEffect(function () {
    obtenerDatosRamos();
  }, []);

  return (<div><LinkTab></LinkTab>

  <br></br>
  <br></br>

  <Container id="fondoTabla">
    <div id="containerTablas">
    <h1 id="TitlesPages">Administración de registros de ramos</h1>
    <h6 id="ustedEsta">Usted está en Administrador {'>'} Ramos</h6>
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Código Ramo</th>
          <th>Nombre del Ramo</th>
          <th>Fecha de modificación </th>
          <th>Modificado por </th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {ramos.map((ramo) => (
          <tr key={ramo.ID}>
            <td>{ramo.ID}</td>
            <td>{ramo.codigoRamo}</td>
            <td>{ramo.nombreRamo}</td>
            <td>{ramo.date}</td>
            <td>{ramo.usuario}</td>
            <td onChange={() => handleChangeisActiveRamos(ramo.ID)}>
              <SwitchToggle isActive={ramo.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table></div>      </Container>
    </div>
  );
}
