import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminRelatores() {
  const [relatores, setRelatores] = useState([""]);
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
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...relator } = response[0];
      actualizarRelator(relator);
      TopAlerts(successEdited);
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
          <th id="th_switch">Habilitar o Deshabilitar</th>
        </tr>
      </thead>
      <tbody>
        {relatores.map((relator) => (
          <tr key={relator.ID}>
            <td>{relator.ID}</td>
            <td>{relator.nombre}</td>
            <td>{relator.date}</td>
            <td onChange={() => handleChangeisActiveRelatores(relator.ID)}>
              <SwitchToggle isActive={relator.isActive} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
