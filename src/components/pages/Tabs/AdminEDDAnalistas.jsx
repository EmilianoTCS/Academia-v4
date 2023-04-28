import React from "react";
import { useEffect, useState } from "react";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import { Table, Container } from "react-bootstrap";
import SwitchToggle from "../../templates/SwitchToggle";
import TopAlerts from "../../templates/alerts/TopAlerts";
import Header from "../../templates/Header";
import LinkTab from "../../templates/LinkTab"


export default function AdminEDDAnalistas() {
    const [listAnalistas, setListAnalistas] = useState([""]);
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;


  function obtenerDatosEDDAnalistas() {
    const url = "EDD/seleccion/listadoEvaluacionesAnalistas.php?listadoEvaluaciones";
    getDataService(url).then((cursos) => {
        setListAnalistas(cursos);
    });
  }

  function handleChangeisActiveEvaluacion(ID) {
    const url = "EDD/administracion/actualizarEstadoEvaluacionAnalistas.php";
    const operationUrl = "actualizarEvaluacion";
    var data = { ID: ID, usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEnabled, ...evaluacion } = response[0];
      actualizarEvaluacion(evaluacion);
      TopAlerts(successEnabled);
    });
  }
  function actualizarEvaluacion(evaluacion) {
    const nuevasEvaluaciones = listAnalistas.map((e) => (e.ID === evaluacion.ID ? evaluacion : e));
    setListAnalistas(nuevasEvaluaciones);
  }

  useEffect(function () {
    obtenerDatosEDDAnalistas();
  }, []);

  return (<div>
    <LinkTab></LinkTab>

<br></br>
<br></br>

<Container id="fondoTabla">
  <div id="containerTablas">
    <h1 id="TitlesPages">Administración de registros de analistas</h1>
    <h6 id="ustedEsta">Usted está en Administrador {'>'} EDD Analistas</h6>
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
          {listAnalistas.map((analistas) => (
            <tr key={analistas.ID}>
              <td>{analistas.codigoEvaluacion}</td>
                  <td>{analistas.fechaInicio}</td>
                  <td>{analistas.fechaFin}</td>
                  <td>{analistas.proyecto}</td>
                  <td>{analistas.nombreCliente}</td>
                  <td>{analistas.estado}</td>
                  <td>{analistas.fechaActualizacion}</td>
                  <td>{analistas.usuario}</td>
              <td onChange={() => handleChangeisActiveEvaluacion(analistas.ID)}>
                <SwitchToggle isActive={analistas.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table></div>      </Container>
    </div>

  );
}
