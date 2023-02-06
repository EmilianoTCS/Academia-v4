import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminEDDAnalistas() {
    const [listAnalistas, setListAnalistas] = useState([""]);

  function obtenerDatosEDDAnalistas() {
    const url = "EDD/seleccion/listadoEvaluacionesAnalistas.php?listadoEvaluaciones";
    getDataService(url).then((cursos) => {
        setListAnalistas(cursos);
    });
  }

  function handleChangeisActiveEvaluacion(ID) {
    const url = "EDD/administracion/actualizarEstadoEvaluacionAnalistas.php";
    const operationUrl = "actualizarEvaluacion";
    var data = { ID: ID };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      const { successEdited, ...evaluacion } = response[0];
      actualizarEvaluacion(evaluacion);
      TopAlerts(successEdited);
    });
  }
  function actualizarEvaluacion(evaluacion) {
    const nuevasEvaluaciones = listAnalistas.map((e) => (e.ID === evaluacion.ID ? evaluacion : e));
    setListAnalistas(nuevasEvaluaciones);
  }

  useEffect(function () {
    obtenerDatosEDDAnalistas();
  }, []);

  return (
      <Table responsive>
        <thead>
          <tr>
            <th>Código de evaluación</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Proyecto</th>
            <th>Nombre del Cliente</th>
            <th>Estado</th>
            <th>Fecha de actualización</th>
            <th id="th_switch">Habilitar o Deshabilitar</th>
          </tr>
        </thead>
        <tbody>
          {listAnalistas.map((analistas) => (
            <tr key={analistas.ID}>
              <td>{analistas.codigoEvaluacion}</td>
                  <td>{analistas.fechaInicio}</td>
                  <td>{analistas.fechaFin}</td>
                  <td>{analistas.proyecto}</td>
                  <td>{analistas.nombreCliente}</td>
                  <td>{analistas.estado}</td>
                  <td>{analistas.fechaActualizacion}</td>
              <td onChange={() => handleChangeisActiveEvaluacion(analistas.ID)}>
                <SwitchToggle isActive={analistas.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

  );
}
