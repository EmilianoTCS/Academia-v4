import React, { useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Header from "../templates/Header";
import Hexagon from "react-hexagon";
import "../css/HomeColaboradores.css";
import SendDataService from "../../services/SendDataService";

export default function HomeColaboradores() {
  const [datos, setDatos] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  function obtenerDatos() {
    const url = "TASKS/auxiliar/HomeColaboradores.php";
    const operationUrl = "usuario";
    var data = { usuario: userData.username };
    SendDataService(url, operationUrl, data).then((response) =>
      setDatos(response)
    );
  }

  useEffect(function () {
    obtenerDatos();
  });

  const styleHexGreen = {
    fill: "#548235",
    stroke: "black",
    strokeWidth: "2",
    width: "10%",
    height: "10%",
    filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
  };
  const styleHexOrange = {
    fill: "#c55a11",
    stroke: "black",
    strokeWidth: "2",
    width: "10%",
    height: "10%",
    filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
  };

  return userData.statusConected === true || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <CardGroup>
            {datos.map((dato) => (
              <Card id="maginCard">
                <Card id="containerAutomation">
                  <Card.Body>
                    <Card.Title>Automation</Card.Title>
                    <Card id="progressHex">
                      <Card.Body>
                        <Hexagon className="hexagono" style={styleHexGreen}>
                          <text
                            x="50%"
                            y="55%"
                            fill="white"
                            fontSize="150"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="Roboto Slab, serif"
                          >
                            {dato.porcentajeTotal + "%"}
                          </text>
                          <text
                            x="50%"
                            y="75%"
                            fontSize="50"
                            fill="white"
                            textAnchor="middle"
                            fontFamily="Roboto Slab, serif"
                          >
                            FINALIZADO
                          </text>
                        </Hexagon>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
                <div id="subCardsContainer">
                  <Card id="subcards" bg="dark" text="white">
                    <Card.Body>
                      <Card.Title id="titles">Cursos pendientes</Card.Title>
                      <Card.Text>{dato.totalPendientes}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card id="subcards" bg="dark" text="white">
                    <Card.Body>
                      <Card.Title id="titles">Cursos finalizados</Card.Title>
                      <Card.Text>{dato.totalFinalizados}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card id="subcards" bg="dark" text="white">
                    <Card.Body>
                      <Card.Title id="titles">Promedio general</Card.Title>
                      <Card.Text>{dato.Promedio}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Card>
            ))}
            <Card id="maginCard">
              <Card id="containerAutomation">
                <Card.Body>
                  <Card.Title>DevOps</Card.Title>
                  <Card id="progressHex">
                    <Card.Body>
                      <Hexagon className="hexagono" style={styleHexOrange}>
                        <text
                          x="50%"
                          y="55%"
                          fill="white"
                          fontSize="150"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="Roboto Slab, serif"
                        >
                          12%
                        </text>
                        <text
                          x="50%"
                          y="75%"
                          fontSize="50"
                          fill="white"
                          textAnchor="middle"
                          fontFamily="Roboto Slab, serif"
                        >
                          FINALIZADO
                        </text>
                      </Hexagon>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
              <div id="subCardsContainer">
                <Card id="subcards" bg="dark" text="white">
                  <Card.Body>
                    <Card.Title id="titles">Cursos pendientes</Card.Title>
                    <Card.Text>5</Card.Text>
                  </Card.Body>
                </Card>
                <Card id="subcards" bg="dark" text="white">
                  <Card.Body>
                    <Card.Title id="titles">Cursos finalizados</Card.Title>
                    <Card.Text>5</Card.Text>
                  </Card.Body>
                </Card>
                <Card id="subcards" bg="dark" text="white">
                  <Card.Body>
                    <Card.Title id="titles">Promedio general</Card.Title>
                    <Card.Text>5</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Card>
          </CardGroup>
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
