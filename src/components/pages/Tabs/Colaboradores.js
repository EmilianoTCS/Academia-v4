import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getDataService from "../../services/GetDataService";
import SendDataService from "../../services/SendDataService";
import InsertarColaborador from "../../templates/forms/InsertarColaborador";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import EditarColaborador from "../../templates/forms/EditarColaborador";
import ConfirmAlert from "../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../templates/alerts/TopAlerts";
export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([""]);
  const [paginador, setPaginador] = useState([""]);
  const [isActiveInsertColaborador, setIsActiveInsertColaborador] =
    useState(false);
  const [isActiveEditColaborador, setIsActiveEditColaborador] = useState(false);
  const [IDColaborador, setIDColaborador] = useState(2);

  const [num_boton, setNumBoton] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateColaborador.php";
        var operationUrl = "updateStateColaborador";
        var data = { ID: ID };
        SendDataService(url, operationUrl, data).then((response) =>
          TopAlerts(response)
        );
      }
    });
  }
  function insertarColaborador() {
    setIsActiveInsertColaborador(!isActiveInsertColaborador);
  }

  function editarColaborador(ID) {
    setIsActiveEditColaborador(!isActiveEditColaborador);
    setIDColaborador(ID);
  }

  function obtenerDatosPaginador() {
    const url = "paginador/botones_Colaboradores.php";
    getDataService(url).then((paginador) => setPaginador(paginador));
  }

  useEffect(
    function () {
      handleChangePaginador();
      obtenerDatosPaginador();
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
    const url = "TASKS/coe-listColaboradores.php";
    const operationUrl = "pagina";
    var data = {
      num_boton: num_boton,
    };
    SendDataService(url, operationUrl, data).then((data) =>
      setColaboradores(data)
    );
  }

  //PAGINADOR ---------------------

  return (
    <>
      <button id="formButtons" onClick={insertarColaborador}>
        Insertar Colaborador
      </button>
      <InsertarColaborador
        Props={{ isActiveInsertColaborador }}
      ></InsertarColaborador>
      <EditarColaborador
        Props={{ isActiveEditColaborador, IDColaborador }}
      ></EditarColaborador>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Área</th>
            <th>CodigoCuenta</th>
            <th>Correo</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <tr key={colaborador.ID}>
              <td>{colaborador.ID}</td>
              <td>{colaborador.nombre_completo}</td>
              <td>{colaborador.usuario}</td>
              <td>{colaborador.area}</td>
              <td>{colaborador.codigoCuenta}</td>
              <td>{colaborador.correo}</td>
              <td>
                <button
                  title="Editar ramo"
                  id="OperationBtns"
                  onClick={() => editarColaborador(colaborador.ID)}
                >
                  <BsPencilSquare />
                </button>
                <button title="Examinar curso" id="OperationBtns">
                  <BiShowAlt />
                </button>
                <button
                  title="Eliminar curso"
                  id="OperationBtns"
                  onClick={() => eliminar(colaborador.ID)}
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
    </>
  );
}
