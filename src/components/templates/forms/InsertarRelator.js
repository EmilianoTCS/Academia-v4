import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";

import SendDataService from "../../services/SendDataService";
import TopAlerts from "../alerts/TopAlerts";

export default function InsertarRelator(props) {
  const [isActive, setisActive] = useState(props.Props.isActiveInsertRelator);
  const [relator, setRelator] = useState("");
  const [area, setArea] = useState("");

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarRelator.php";
    const operationUrl = "insertarRelator";
    var data = {
      area: area,
      nombre: relator,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  function CloseForm() {
    setisActive(!isActive);
  }

  useEffect(
    function () {
      setisActive(props.Props.isActiveInsertRelator);
    },
    [props]
  );

  return (
    <>
      <div id="containerForm" className={isActive ? "active" : ""}>
        <form id="form_insertarData" onSubmit={SendData}>
          <div id="headerForms">
            <h3 id="titleForm">Insertar Relator</h3>
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
            <input type="submit" id="btn_registrar" value="Registrar" />
          </div>
        </form>
      </div>
    </>
  );
}
