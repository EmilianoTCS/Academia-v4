import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatosProyectos() {
    const url = "TASKS/coe-adminProyectos.php?proyectos";
    getDataService(url).then((response) => {
      setProyectos(response);
    });
  }
  function handleChangeisActiveProyectos(ID) {
    const url = "TASKS/coe-updateStateProyectos.php";
    const operationUrl = "updateStateProyectos";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...proyecto } = response[0];
      actualizarProyecto(proyecto);
      TopAlerts(successEnabled);
    });
  }
  function actualizarProyecto(proyecto) {
    const nuevosProyectos = proyectos.map((p) =>
      p.ID === proyecto.ID ? proyecto : p
    );
    setProyectos(nuevosProyectos);
  }

  useEffect(function () {
    obtenerDatosProyectos();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre del proyecto</th>
          <th>Cliente</th>
          <th>CuentaJP</th>
          <th>Servicio</th>
          <th>Fecha de modificación </th>
          <th>Modificado por </th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {proyectos.map((proyecto) => (
          <tr key={proyecto.ID}>
            <td>{proyecto.ID}</td>
            <td>{proyecto.nombreProyecto}</td>
            <td>{proyecto.cliente}</td>
            <td>{proyecto.cuentaJP}</td>
            <td>{proyecto.servicio}</td>
            <td>{proyecto.date}</td>
            <td>{proyecto.usuario}</td>
            <td onChange={() => handleChangeisActiveProyectos(proyecto.ID)}>
              <SwitchToggle isActive={proyecto.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
