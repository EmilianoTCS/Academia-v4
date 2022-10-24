import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Select from "react-select";

export default function EditarColaborador(props) {
  const [isActive, setisActive] = useState(props.Props.isActiveEditColaborador);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [subgerencia, setSubgerencia] = useState("");
  const [correo, setCorreo] = useState("");
  const [listCuentas, setListCuentas] = useState([""]);
  const [responseID, setResponseID] = useState([""]);

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "TASKS/coe-selectColaborador.php";
    const operationUrl = "ID";
    const data = { ID: props.Props.IDColaborador };
    SendDataService(url, operationUrl, data).then(
      (response) => setResponseID(response),
      console.log(responseID),
      setCodigoCuenta(responseID[0].codigoCuenta),
      setNombreCompleto(responseID[0].nombre_completo),
      setUsuario(responseID[0].usuario),
      setArea(responseID[0].area),
      setSubgerencia(responseID[0].subgerencia),
      setCorreo(responseID[0].correo)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editColaborador.php";
    const operationUrl = "editarColaborador";
    var data = {
      ID: props.Props.IDColaborador,
      codigoCuenta: codigoCuenta,
      nombre_completo: nombreCompleto,
      usuario: usuario,
      area: area,
      subgerencia: subgerencia,
      correo: correo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function CloseForm() {
    setisActive(!isActive);
  }

  useEffect(
    function () {
      setisActive(props.Props.isActiveEditColaborador);
      obtenerCuentas();
      getData();
    },
    [props]
  );

  // ----------------------MAPEADOS----------------------------

  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
    value: label.ID,
  }));
  return (
    <>
      <div id="containerForm" className={isActive ? "active" : ""}>
        <form id="form_insertarData" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Insertar Colaborador</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_fechaInicio">Cuenta: </label>
            <Select
              placeholder="Elige una cuenta"
              value={codigoCuenta}
              name="cuenta"
              options={optionsCuentas}
              onChange={({ value }) => setCodigoCuenta(value)}
            />
          </div>
          <div>
            <label htmlFor="input_nombreCompleto">Nombre completo:</label>
            <input
              type="text"
              value={nombreCompleto}
              className="form-control"
              name="input_nombreCompleto"
              id="input_nombreCompleto"
              onChange={({ target }) => setNombreCompleto(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_usuario">Usuario:</label>
            <input
              type="text"
              value={usuario}
              className="form-control"
              name="input_usuario"
              id="input_usuario"
              onChange={({ target }) => setUsuario(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_area">Área:</label>
            <input
              type="text"
              value={area}
              className="form-control"
              name="input_area"
              id="input_area"
              onChange={({ target }) => setArea(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_subgerencia">Subgerencia:</label>
            <input
              type="text"
              className="form-control"
              name="input_subgerencia"
              value={subgerencia}
              id="input_subgerencia"
              onChange={({ target }) => setSubgerencia(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_correo">Correo:</label>
            <input
              type="text"
              className="form-control"
              name="input_correo"
              value={correo}
              id="input_correo"
              onChange={({ target }) => setCorreo(target.value)}
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
