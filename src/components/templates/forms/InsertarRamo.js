import React, { useState, useEffect } from "react";
import "../../css/InsertarRamo.css";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarRamo = ({ isActiveRamo, cambiarEstado, ramos }) => {
  // ----------------------CONSTANTES----------------------------

  const [listCuentas, setListCuentas] = useState([""]);
  const [listPrerequisitos, setListPrerequisitos] = useState([""]);
  const [listRelatores, setListRelatores] = useState([""]);
  const [idCuenta, setIDCuenta] = useState("");
  const [codigoRamo, setCodigoRamo] = useState("");
  const [nombreRelator, setRelator] = useState("");
  const [nombreRamo, setNombreRamo] = useState("");
  const [hh_academicas, set_hh_academicas] = useState("");
  const [prerequisito, setPrerequisito] = useState("");
  const listRamos = ramos;
  const show = isActiveRamo;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerCuentas() {
    const url = "TASKS/auxiliar/ListadoCuentas.php?listadoCuentas";
    getDataService(url).then((cuentas) => setListCuentas(cuentas));
  }
  function obtenerRelatores() {
    const url = "TASKS/auxiliar/ListadoRelatores.php?listadoRelatores";
    getDataService(url).then((relatores) => setListRelatores(relatores));
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
      idCuenta: idCuenta,
      codigoRamo: codigoRamo,
      nombreRamo: nombreRamo,
      hh_academicas: hh_academicas,
      prerequisito: prerequisito,
      nombreRelator: nombreRelator,
    };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...ramo } = response[0];
      TopAlerts(successCreated);
      actualizarRamo(ramo);
    });
  }
  function actualizarRamo(ramo) {
    listRamos.push(ramo);
  }
  useEffect(function () {
    obtenerCuentas();
    obtenerPrerequisitos();
    obtenerRelatores();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Cuenta:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setIDCuenta(target.value)}
                placeholder="Elige una cuenta"
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listCuentas.map((valor) => (
                  <option value={valor.ID}>{valor.codigoCuenta}</option>
                ))}
              </select>
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
                required={true}
              />
            </div>

            <div>
              <label htmlFor="input_nombreRamo">Nombre del ramo</label>
              <input
                placeholder="Escriba el nombre del ramo"
                type="text"
                className="form-control"
                name="input_nombreRamo"
                id="input_nombreRamo"
                onChange={({ target }) => setNombreRamo(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_hhAcademicas">Horas académicas</label>
              <input
                type="number"
                className="form-control"
                name="input_hhAcademicas"
                placeholder="0"
                id="input_hhAcademicas"
                onChange={({ target }) => set_hh_academicas(target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_tipoCliente">Relator:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setRelator(target.value)}
                placeholder="Elige un relator"
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listRelatores.map((valor) => (
                  <option value={valor.ID}>{valor.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input_tipoCliente">Prerequisito:</label>
              <select
                required
                className="form-control"
                onChange={({ target }) => setPrerequisito(target.value)}
                placeholder="Elige un prerequisito"
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listPrerequisitos.map((valor) => (
                  <option value={valor.ID}>{valor.nombreRamo}</option>
                ))}
              </select>
            </div>

            <Button
              variant="secondary"
              type="submit"
              id="btn_registrar"
              value="Registrar"
            >
              Registrar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InsertarRamo;
