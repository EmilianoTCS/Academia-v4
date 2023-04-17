import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminEmpleados() {
  const [empleados, setEmpleados] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatosEmpleados() {
    const url = "TASKS/coe-adminEmpleados.php?empleados";
    getDataService(url).then((response) => {
      setEmpleados(response);
    });
  }
  function handleChangeisActiveEmpleados(ID) {
    const url = "TASKS/coe-updateStateEmpleados.php";
    const operationUrl = "updateStateEmpleados";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...empleado } = response[0];
      actualizarEmpleado(empleado);
      TopAlerts(successEnabled);
    });
  }
  function actualizarEmpleado(empleado) {
    const nuevosEmpleados = empleados.map((e) =>
      e.ID === empleado.ID ? empleado : e
    );
    setEmpleados(nuevosEmpleados);
  }

  useEffect(function () {
    obtenerDatosEmpleados();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre y apellido</th>
          <th>Cargo</th>
          <th>Fecha de modificación </th>
          <th>Modificado por </th>
          <th id="th_switch">Estado</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.ID}>
            <td>{empleado.ID}</td>
            <td>{empleado.nombreApellido}</td>
            <td>{empleado.cargo}</td>
            <td>{empleado.date}</td>
            <td>{empleado.ultimoUsuario}</td>
            <td onChange={() => handleChangeisActiveEmpleados(empleado.ID)}>
              <SwitchToggle isActive={empleado.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
