import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminCliente() {
    const [clientes, setClientes] = useState([""]);
    function obtenerDatosClientes() {
        const url = "TASKS/coe-adminClientes.php?clientes";
        getDataService(url).then((clientes) => setClientes(clientes));
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



  useEffect(function () {
    obtenerDatosClientes();
  }, []);

  return (
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
  );
}