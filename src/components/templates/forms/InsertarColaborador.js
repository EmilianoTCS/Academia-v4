import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Select from "react-select";

export default function InsertarColaborador(props) {
  const [isActive, setisActive] = useState(
    props.Props.isActiveInsertColaborador
  );
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [subgerencia, setSubgerencia] = useState("");
  const [correo, setCorreo] = useState("");
  const [listCuentas, setListCuentas] = useState([""]);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarColaborador.php";
    const operationUrl = "insertarColaborador";
    var data = {
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
      setisActive(props.Props.isActiveInsertColaborador);
      obtenerCuentas();
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
              name="cuenta"
              options={optionsCuentas}
              onChange={({ value }) => setCodigoCuenta(value)}
            />
          </div>
          <div>
            <label htmlFor="input_nombreCompleto">Nombre completo:</label>
            <input
              type="text"
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
              id="input_correo"
              onChange={({ target }) => setCorreo(target.value)}
            />
          </div>
          <div>
            <input type="submit" id="btn_registrar" value="Registrar" />
          </div>
        </form>
      </div>
    </>
  );
}
