import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsX } from "react-icons/bs";
import "../../css/InsertarRamo.css";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarRamo = ({ isActiveRamo, cambiarEstado }) => {
  // ----------------------CONSTANTES----------------------------

  const [listCuentas, setListCuentas] = useState([""]);
  const [listPrerequisitos, setListPrerequisitos] = useState([""]);
  const [listRelatores, setListRelatores] = useState([""]);
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [nombreRamo, setNombreRamo] = useState("");
  const [hh_academicas, set_hh_academicas] = useState("");
  const [prerequisito, setPrerequisito] = useState("");

  const show = isActiveRamo;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------
  function CloseForm() {
    setisActive(!isActive);
  }
  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function obtenerRelatores() {
    const url = "TASKS/auxiliar/ListadoRelatores.php?listadoRelatores";
    getDataService(url).then((cuentas) => setListRelatores(cuentas));
  }
  function obtenerPrerequisitos() {
    const url = "TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos";
    getDataService(url).then((cuentas) => setListPrerequisitos(cuentas));
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarRamo.php";
    const operationUrl = "insertarRamo";
    var data = {
      codigoCuenta: codigoCuenta,
      codigoRamo: codigoRamo,
      nombreCurso: nombreRamo,
      hh_academicas: hh_academicas,
      prerequisito: prerequisito,
    };

    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      obtenerCuentas();
      obtenerRelatores();
      obtenerPrerequisitos();
    },
    []
  );

  // ----------------------MAPEADOS----------------------------

  const optionsCuentas = listCuentas.map((label) => ({
    label: label.codigoCuenta,
    value: label.ID,
  }));
  const optionsRelatores = listRelatores.map((label) => ({
    label: label.nombre,
    value: label.nombre,
  }));
  const optionsPrerequisitos = listPrerequisitos.map((label) => ({
    label: label.nombreRamo,
    value: label.codigoRamo,
  }));
  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insertar Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <label htmlFor="input_codigoRamo">Código del ramo:</label>
            <input
              type="text"
              className="form-control"
              name="input_codigoRamo"
              id="input_codigoRamo"
              placeholder="Ejemplo: JAV"
              onChange={({ target }) => setCodigoRamo(target.value)}
            />
          </div>

          <div>
            <label htmlFor="input_nombreRamo">Nombre del ramo</label>
            <input
              type="text"
              className="form-control"
              name="input_nombreRamo"
              id="input_nombreRamo"
              onChange={({ target }) => setNombreRamo(target.value)}
            />
          </div>
          <div>
            <label htmlFor="input_hhAcademicas">Horas académicas</label>
            <input
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
              placeholder="Elige un pre requisito"
              name="cuenta"
              options={optionsPrerequisitos}
              onChange={({ value }) => setPrerequisito(value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            id="btn_registrar"
            value="Registrar"
            onClick={SendData}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default InsertarRamo;
