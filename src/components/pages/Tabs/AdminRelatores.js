import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table, Container } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";
import Header from "../../templates/Header";
import LinkTab from "../../templates/LinkTab"


export default function AdminRelatores() {
  const [relatores, setRelatores] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;


  function obtenerDatosRelatores() {
    const url = "TASKS/coe-adminRelator.php?relator";
    getDataService(url).then((relatores) => setRelatores(relatores));
  }
  function actualizarRelator(relator) {
    const nuevosRelatores = relatores.map((r) =>
      r.ID === relator.ID ? relator : r
    );
    setRelatores(nuevosRelatores);
  }

  function handleChangeisActiveRelatores(ID) {
    const url = "TASKS/coe-updateStateRelator.php";
    const operationUrl = "updateStateRelator";
    var data = { ID: ID , usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...relator } = response[0];
      actualizarRelator(relator);
      TopAlerts(successEnabled);
    });
  }

  useEffect(function () {
    obtenerDatosRelatores();
  }, []);

  return (<div><LinkTab></LinkTab>

  <br></br>
  <br></br>

  <Container id="fondoTabla">
    <div id="containerTablas">
    <h1 id="TitlesPages">Administración de registros de relatores</h1>
    <h6 id="ustedEsta">Usted está en Administrador {'>'} Relatores</h6>
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha de modificación</th>
          <th>Modificado por</th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {relatores.map((relator) => (
          <tr key={relator.ID}>
            <td>{relator.ID}</td>
            <td>{relator.nombre}</td>
            <td>{relator.date}</td>
            <td>{relator.usuario}</td>
            <td onChange={() => handleChangeisActiveRelatores(relator.ID)}>
              <SwitchToggle isActive={relator.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table></div>      </Container>
    </div>
  );
}
