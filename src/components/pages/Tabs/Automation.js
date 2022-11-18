import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Redirect } from "wouter";
import Hexagon from "react-hexagon";
import "../../css/MisCursos.css";
import SendDataService from "../../services/SendDataService";
export default function Automation() {
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  const [data, setData] = useState([""]);

  function obtenerDatos() {
    const url = "TASKS/SubCards.php";
    const operationUrl = "usuario";
    var data = { usuario: userData[0].username };
    SendDataService(url, operationUrl, data).then((response) =>
      setData(response)
    );
  }

  useEffect(function () {
    obtenerDatos();
  }, []);

  const styleHexGreen = {
    fill: "#548235",
    stroke: "white",
    strokeWidth: "5",
    filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
  };
  const styleHexRed = {
    fill: "red",
    stroke: "white",
    strokeWidth: "5",
    filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
  };
  const styleActive = { color: "green" };
  const styleInactive = { color: "red" };

  return userData ? (
    <>
      <Card>
        <Card.Body id="CardContainer">
          {data.map((data) => (
            <Card key={data.ID}>
              <Card.Body>
                <Card.Title>{data.codigoRamo}</Card.Title>
                <Card>
                  <Card.Body id="CardsContent">
                    {/* Hexagono */}
                    <Hexagon
                      className="hexagon"
                      style={data.promedio >= 6 ? styleHexGreen : styleHexRed}
                    >
                      {/* {promedios.map((promedio) => ( */}
                      <text
                        x="50%"
                        y="50%"
                        fill="white"
                        fontSize="150"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="Roboto Slab, serif"
                      >
                        {data.promedio}
                      </text>
                      {/* ))} */}

                      <text
                        x="50%"
                        y="73%"
                        fontSize="70"
                        fill="white"
                        textAnchor="middle"
                        fontFamily="Roboto Slab, serif"
                      >
                        PROMEDIO
                      </text>
                    </Hexagon>
                    {/* Estadísticas */}

                    <div id="statsContent">
                      <Card>
                        <Card.Body>
                          <Card.Title>Estado</Card.Title>
                          <Card.Text
                            style={
                              data.estado === "Activo"
                                ? styleActive
                                : styleInactive
                            }
                          >
                            {data.estado}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Card.Text>Periodo: {data.inicio}</Card.Text>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Card.Text>
                            N° de clases: {data.totalClases}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}