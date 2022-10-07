import React from "react";
import { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { Redirect } from "wouter";
import getDataService from "../services/GetDataService";
import Header from "../templates/Header";
import Hexagon from "react-hexagon";
import "../css/HomeColaboradores.css";
export default function HomeColaboradores() {
  const userData = localStorage.getItem("loggedUser");
  const [datos, setDatos] = useState([""]);
  function obtenerDatos() {
    const url = "TASKS/auxiliar/HomeColaboradores.php";
    getDataService(url).then((data) => setDatos(data));
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

  return userData ? (
    <>
      <Header></Header>
      <CardGroup id="cardContainer">
        {datos.map((dato) => (
          <Card>
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
                  <Card.Title>Cursos pendientes</Card.Title>
                  <Card.Text>{dato.totalPendientes}</Card.Text>
                </Card.Body>
              </Card>
              <Card id="subcards" bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Cursos finalizados</Card.Title>
                  <Card.Text>{dato.totalFinalizados}</Card.Text>
                </Card.Body>
              </Card>
              <Card id="subcards" bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Promedio general</Card.Title>
                  <Card.Text>{dato.Promedio}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card>
        ))}
        <Card>
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
                <Card.Title>Cursos pendientes</Card.Title>
                <Card.Text>5</Card.Text>
              </Card.Body>
            </Card>
            <Card id="subcards" bg="dark" text="white">
              <Card.Body>
                <Card.Title>Cursos finalizados</Card.Title>
                <Card.Text>5</Card.Text>
              </Card.Body>
            </Card>
            <Card id="subcards" bg="dark" text="white">
              <Card.Body>
                <Card.Title>Promedio general</Card.Title>
                <Card.Text>5</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Card>
      </CardGroup>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
