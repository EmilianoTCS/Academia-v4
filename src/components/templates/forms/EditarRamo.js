import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsX } from "react-icons/bs";
import "../../css/InsertarCursoCalendario.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
export default function EditarRamo(props) {
  // ----------------------CONSTANTES----------------------------
  const [isActive, setisActive] = useState(props.Props.isActiveEditRamo);
  const [listPrerequisitos, setListPrerequisitos] = useState([""]);
  const [codigoRamo, setCodigoRamo] = useState("");
  const [nombreRamo, setNombreRamo] = useState("");
  const [hh_academicas, set_hh_academicas] = useState("");
  const [prerequisito, setPrerequisito] = useState("");
  const [responseID, setResponseID] = useState([""]);

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(!isActive);
  }
  function obtenerPrerequisitos() {
    const url = "TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos";
    getDataService(url).then((cuentas) => setListPrerequisitos(cuentas));
  }
  function getData() {
    const url = "TASKS/coe-selectCursos.php";
    const operationUrl = "ID";
    const data = { ID: props.Props.IDRamo };
    SendDataService(url, operationUrl, data).then(
      (response) => console.log(response)
      // console.log(responseID),
      // setCodigoRamo(responseID[0].codigoRamo),
      // setNombreRamo(responseID[0].nombreRamo),
      // set_hh_academicas(responseID[0].hh_academicas),
      // setPrerequisito(responseID[0].pre_requisitos)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editRamo.php";
    const operationUrl = "editarRamo";
    var data = {
      ID: props.Props.IDRamo,
      codigoRamo: codigoRamo,
      nombreRamo: nombreRamo,
      hh_academicas: hh_academicas,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      setisActive(props.Props.isActiveEditRamo);
      obtenerPrerequisitos();
      getData();
    },
    [props]
  );
  // ----------------------MAPEADOS----------------------------

  const optionsPrerequisitos = listPrerequisitos.map((label) => ({
    label: label.nombreRamo,
    value: label.codigoRamo,
  }));

  // ----------------------RENDER----------------------------
  return (
    <>
      <div id="containerFormRamo" className={isActive ? "active" : ""}>
        <form id="form_insertarRamo" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Editar Ramo</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_codigoRamo">Código del ramo: </label>
            <input
              value={codigoRamo}
              type="text"
              placeholder="Ejemplo: JAV"
              id="input_codigoRamo"
              name="input_codigoRamo"
              className="form-control"
              onChange={({ target }) => setCodigoRamo(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
            <input
              value={nombreRamo}
              type="text"
              placeholder="Ejemplo: JAV"
              id="input_nombreRamo"
              name="input_nombreRamo"
              className="form-control"
              onChange={({ target }) => setNombreRamo(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_hhAcademicas">Horas académicas</label>
            <input
              value={hh_academicas}
              type="text"
              className="form-control"
              name="input_hhAcademicas"
              id="input_hhAcademicas"
              onChange={({ target }) => set_hh_academicas(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Prerequisito: </label>
            <Select
              value={prerequisito}
              placeholder="Elige un pre requisito"
              name="cuenta"
              options={optionsPrerequisitos}
              onChange={({ value }) => setPrerequisito(value)}
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Actualizar" />
          </div>
        </form>
      </div>
    </>
  );
}
