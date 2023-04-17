import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminEquipos() {
  const [equipos, setEquipos] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatosEquipos() {
    const url = "TASKS/coe-adminEquipos.php?equipos";
    getDataService(url).then((response) => {
        setEquipos(response);
    });
  }
  function handleChangeisActiveEquipos(nombreEquipo) {
    const url = "TASKS/coe-updateStateEquipos2.php";
    const operationUrl = "updateStateEquipos";
    var data = { nombreEquipo: nombreEquipo, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...equipo } = response[0];
      actualizarEquipo(equipo);
      TopAlerts(successEnabled);
    });
  }
  function actualizarEquipo(equipo) {
    const nuevosEquipos = equipos.map((e) =>
      e.ID === equipo.ID ? equipo : e
    );
    setEquipos(nuevosEquipos);
  }

  useEffect(function () {
    obtenerDatosEquipos();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre del equipo</th>
          <th>Cliente</th>
          <th>Fecha de modificación </th>
          <th>Modificado por </th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((equipo) => (
          <tr key={equipo.ID}>
            <td>{equipo.ID}</td>
            <td>{equipo.nombreEquipo}</td>
            <td>{equipo.cliente}</td>
            <td>{equipo.date}</td>
            <td>{equipo.usuario}</td>
            <td onChange={() => handleChangeisActiveEquipos(equipo.nombreEquipo)}>
              <SwitchToggle isActive={equipo.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
