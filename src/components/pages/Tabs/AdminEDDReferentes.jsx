import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";

export default function AdminEDDReferentes() {
    const [listReferentes, setListReferentes] = useState([""]);
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;


  function obtenerDatosEDDAnalistas() {
    const url = "EDD/seleccion/listadoEvaluacionesReferentes.php?listadoEvaluaciones";
    getDataService(url).then((cursos) => {
        setListReferentes(cursos);
    });
  }

  function handleChangeisActiveEvaluacion(ID) {
    const url = "EDD/administracion/actualizarEstadoEvaluacionReferentes.php";
    const operationUrl = "actualizarEvaluacion";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...evaluacion } = response[0];
      actualizarEvaluacion(evaluacion);
      TopAlerts(successEnabled);
    });
  }
  function actualizarEvaluacion(evaluacion) {
    const nuevasEvaluaciones = listReferentes.map((e) => (e.ID === evaluacion.ID ? evaluacion : e));
    setListReferentes(nuevasEvaluaciones);
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
            <th>Modificado por </th>
            <th id="th_switch">Estado</th>
          </tr>
        </thead>
        <tbody>
          {listReferentes.map((referente) => (
            <tr key={referente.ID}>
              <td>{referente.codigoEvaluacion}</td>
                  <td>{referente.fechaInicio}</td>
                  <td>{referente.fechaFin}</td>
                  <td>{referente.proyecto}</td>
                  <td>{referente.nombreCliente}</td>
                  <td>{referente.estado}</td>
                  <td>{referente.fechaActualizacion}</td>
                  <td>{referente.usuario}</td>
              <td onChange={() => handleChangeisActiveEvaluacion(referente.ID)}>
                <SwitchToggle isActive={referente.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

  );
}
