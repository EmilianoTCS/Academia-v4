import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import SendDataService from "../services/SendDataService";
import Header from "../templates/Header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import "../css/TablasStyles.css";
import InsertarRelator from "../templates/forms/InsertarRelator";
import EditarRelator from "../templates/forms/EditarRelator";
import ConfirmAlert from "../templates/alerts/ConfirmAlert";
import TopAlerts from "../templates/alerts/TopAlerts";

export default function ListadoRelator() {
  const [relator, setRelator] = useState([""]);
  const [paginador, setPaginadorRelator] = useState([""]);
  const url = "TASKS/coe-listOrador.php";
  const urlPaginador = "paginador/botones_Relator.php";
  const operationUrl = "pagina";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [isActiveInsertRelator, setIsActiveInsertRelator] = useState(false);
  const [IDRelator, setIDRelator] = useState(2);
  const [isActiveEditRelator, setIsActiveEditRelator] = useState(false);

  const [num_boton, setNumBoton] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  function obtenerDatosPaginador() {
    getDataService(urlPaginador).then((paginador) =>
      setPaginadorRelator(paginador)
    );
  }

  function insertarRelator() {
    setIsActiveInsertRelator(!isActiveInsertRelator);
  }
  function editarRelator(ID) {
    setIsActiveEditRelator(!isActiveEditRelator);
    setIDRelator(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateRelator.php";
        var operationUrl = "updateStateRelator";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
  }
  useEffect(
    function () {
      obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton]
  );

  //PAGINADOR ---------------------

  const handleClick = (event) => {
    setNumBoton(Number(event.target.value));
  };
  const renderNumeros = paginador.map((pagina) => {
    if (
      pagina.paginas < maxPageNumberLimit + 1 &&
      pagina.paginas > minPageNumberLimit
    ) {
      return (
        <li key={pagina.paginas}>
          <button
            name="paginas"
            value={pagina.paginas}
            onClick={handleClick}
            className={num_boton === pagina.paginas ? "active" : null}
          >
            {pagina.paginas}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });
  const handlePrevbtn = () => {
    setNumBoton(num_boton - 1);
    if ((num_boton - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextbtn = () => {
    setNumBoton(num_boton + 1);

    if (num_boton + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const pageDecrementBtn = () => {
    if (minPageNumberLimit > 1) {
      return (
        <li>
          <button onClick={handlePrevbtn}> hola</button>
        </li>
      );
    }
  };

  function handleChangePaginador() {
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) => setRelator(data));
  }

  //PAGINADOR ---------------------

  return userData ? (
    <>
      <Header></Header>
      <div>
        <h1 id="TitlesPages">Listado de relatores</h1>
        <button id="formButtons" onClick={insertarRelator}>
          Insertar Relator
        </button>
        <InsertarRelator Props={{ isActiveInsertRelator }}></InsertarRelator>
        <EditarRelator
          Props={{ isActiveEditRelator, IDRelator }}
        ></EditarRelator>
        <Table id="mainTable" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Relator</th>
              <th>Área</th>
              <th>Cuenta</th>
              <th>Código Ramo</th>
              <th>Nombre del ramo</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {relator.map((relator) => (
              <tr>
                <td>{relator.ID}</td>
                <td>{relator.nombre}</td>
                <td>{relator.nombreArea}</td>
                <td>{relator.codigoCuenta}</td>
                <td>{relator.codigoRamo}</td>
                <td>{relator.nombreRamo}</td>
                <td>
                  <button
                    title="Editar relator"
                    id="OperationBtns"
                    onClick={() => editarRelator(relator.ID)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button title="Examinar curso" id="OperationBtns">
                    <BiShowAlt />
                  </button>
                  <button
                    title="Eliminar curso"
                    onClick={() => eliminar(relator.ID)}
                    id="OperationBtns"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div id="paginador">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={
                num_boton === paginador[0].paginas ||
                num_boton < paginador[0].paginas
                  ? true
                  : false
              }
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderNumeros}
          <li>
            <button
              onClick={handleNextbtn}
              disabled={num_boton === paginador.length ? true : false}
            >
              Next
            </button>
          </li>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
