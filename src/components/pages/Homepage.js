import React, { useState, useEffect } from "react";
import getDataService from "../../services/GetDataService";
import "../css/cardsHome.css";
import { Navigate } from "react-router-dom";
import Header from "../templates/Header";
import PieChart from "../templates/Pie";
import BarChart from "../templates/Bar";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

export default function HomePage() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [cards, setCards] = useState([""]);
  const url = "TASKS/Cards-General.php";
  function obtenerDatos() {
    getDataService(url).then((cards) => setCards(cards));
  }

  useEffect(function () {
    obtenerDatos();
  }, []);

  return userData.statusConected || userData !== null ? (
    <div>
      <Header></Header>
      <div id="container_cards">
        {cards.map((singleCard) => (
          <>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Cursos</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.totalCursos}
                </Card.Title>
                <Card.Text>Total</Card.Text>
              </Card.Body>
            </Card>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Colaboradores</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.totalColaboradores}
                </Card.Title>
                <Card.Text>Total</Card.Text>
              </Card.Body>
            </Card>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Cursos</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.totalFinalizados}
                </Card.Title>
                <Card.Text>Finalizados</Card.Text>
              </Card.Body>
            </Card>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Porcentaje</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.porcentajeFinalizados}
                </Card.Title>
                <Card.Text>Finalizados</Card.Text>
              </Card.Body>
            </Card>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Cursos</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.totalActivos}
                </Card.Title>
                <Card.Text>Activos</Card.Text>
              </Card.Body>
            </Card>
            <Card id="coe_carta">
              <Card.Body>
                <Card.Text>Cursos</Card.Text>
                <Card.Title style={{ fontSize: "50pt" }}>
                  {singleCard.totalPendientes}
                </Card.Title>
                <Card.Text>Pendientes</Card.Text>
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
      <div id="chartsContainer">
        <BarChart data={cards}></BarChart>
        <PieChart data={cards}></PieChart>
      </div>
    </div>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
