import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";

export default function EditarRelator(props) {
  const [isActive, setisActive] = useState(props.Props.isActiveEditRelator);
  const [relator, setRelator] = useState("");
  const [area, setArea] = useState("");
  const [responseID, setResponseID] = useState([""]);

  function CloseForm() {
    setisActive(!isActive);
  }

  function getData() {
    const url = "TASKS/coe-selectRelatores.php";
    const operationUrl = "ID";
    const data = { ID: props.Props.IDRelator };
    SendDataService(url, operationUrl, data).then(
      (response) => setResponseID(response),
      console.log(responseID),
      setRelator(responseID[0].nombreEdit)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-editRamo.php";
    const operationUrl = "editarRamo";
    var data = {
      ID: props.Props.IDRelator,
      nombre: relator,
      area: area,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      setisActive(props.Props.isActiveEditRelator);
      getData();
    },
    [props]
  );

  return (
    <>
      <div id="containerFormCurso" className={isActive ? "active" : ""}>
        <form id="form_insertarCurso" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Actualizar relator</h3>
            <BsX id="btn_close" onClick={CloseForm} />
          </div>
          <div>
            <label htmlFor="input_Relator">Relator:</label>
            <input
              type="text"
              className="form-control"
              name="input_Relator"
              id="input_Relator"
              onChange={({ target }) => setRelator(target.value)}
              value={relator}
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
              value={area}
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
