import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table, Container } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";
import Header from "../../templates/Header";
import LinkTab from "../../templates/LinkTab"


export default function AdminCliente() {
  const [clientes, setClientes] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatosClientes() {
    const url = "TASKS/coe-adminClientes.php?clientes";
    getDataService(url).then((clientes) => setClientes(clientes));
  }
  function handleChangeisActiveClientes(ID) {
    const url = "TASKS/coe-updateStateClientes.php";
    const operationUrl = "updateStateClientes";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...cliente } = response[0];
      actualizarCliente(cliente);
      TopAlerts(successEnabled);
    });
  }
  function actualizarCliente(cliente) {
    const nuevosClientes = clientes.map((c) =>
      c.ID === cliente.ID ? cliente : c
    );
    setClientes(nuevosClientes);
  }

  useEffect(function () {
    obtenerDatosClientes();
  }, []);

  return (
    <div>
<LinkTab></LinkTab>

      <br></br>
      <br></br>

      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Administración de registros de clientes</h1>
          <h6 id="ustedEsta">Usted está en Administrador {">"} Clientes</h6>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de cliente</th>
                <th>Nombre del cliente</th>
                <th>Teléfono referente</th>
                <th>Correo referente</th>
                <th>Fecha de modificación</th>
                <th>Modificado por </th>
                <th id="th_switch">Estado</th>
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
                  <td>{cliente.usuario}</td>
                  <td onChange={() => handleChangeisActiveClientes(cliente.ID)}>
                    <SwitchToggle isActive={cliente.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
