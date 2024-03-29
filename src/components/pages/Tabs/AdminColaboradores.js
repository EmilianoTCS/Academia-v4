import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminColaborador() {
  const [colaboradores, setColaboradores] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatosColaboradores() {
    const url = "TASKS/coe-adminColaborador.php?colaborador";
    getDataService(url).then((colaboradores) =>
      setColaboradores(colaboradores)
    );
  }
  function handleChangeisActiveColaborador(ID) {
    const url = "TASKS/coe-updateStateColaborador.php";
    const operationUrl = "updateStateColaborador";

    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...colaborador } = response[0];
      actualizarColaborador(colaborador);
      TopAlerts(successEnabled);
    });
  }
  function actualizarColaborador(colaborador) {
    const nuevosColaboradores = colaboradores.map((c) =>
      c.ID === colaborador.ID ? colaborador : c
    );
    setColaboradores(nuevosColaboradores);
  }

  useEffect(function () {
    obtenerDatosColaboradores();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Área</th>
          <th>Fecha de modificación</th>
          <th>Modificado por</th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {colaboradores.map((colaborador) => (
          <tr key={colaborador.ID}>
            <td>{colaborador.ID}</td>
            <td>{colaborador.nombre_completo}</td>
            <td>{colaborador.usuario1}</td>
            <td>{colaborador.area}</td>
            <td>{colaborador.date}</td>
            <td>{colaborador.usuario}</td>
            <td
              onChange={() => handleChangeisActiveColaborador(colaborador.ID)}
            >
              <SwitchToggle isActive={colaborador.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
