import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

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

  return (
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
    </Table>
  );
}
