import React, { useState, useEffect } from "react";
import getDataService from "../../services/GetDataService";
import "../css/cardsHome.css";
import { Redirect } from "wouter";
import Header from "../templates/Header";
import PieChart from "../templates/Pie";
import BarChart from "../templates/Bar";
export default function HomePage() {
  const [cards, setCards] = useState([""]);
  const url = "TASKS/Cards-General.php";
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  function obtenerDatos() {
    getDataService(url).then((cards) => setCards(cards));
  }

  useEffect(function () {
    obtenerDatos();
  }, []);

  return userData ? (
    <div>
      <Header></Header>
      <div id="container_cards">
        {cards.map((singleCard) => (
          <>
            <div id="coe_carta">
              <div className="card-header">Cursos</div>
              <div className="card-body">
                <h2 className="card-title">{singleCard.totalCursos}</h2>
                <p className="singleCard-text">Total</p>
              </div>
            </div>
            <div id="coe_carta">
              <div className="card-header">Colaboradores</div>
              <div className="card-body">
                <h2 className="card-title">{singleCard.totalColaboradores}</h2>
                <p className="card-text">Total</p>
              </div>
            </div>
            <div id="coe_carta">
              <div className="card-header">Cursos</div>
              <div className="card-body">
                <h2 className="card-title">{singleCard.totalFinalizados}</h2>
                <p className="card-text">Finalizados</p>
              </div>
            </div>
            <div id="coe_carta">
              <div className="card-header">Porcentaje</div>
              <div className="card-body">
                <h2 className="card-title">
                  {singleCard.porcentajeFinalizados}
                </h2>
                <p className="card-text">Finalizados</p>
              </div>
            </div>
            <div id="coe_carta">
              <div className="card-header">Cursos</div>
              <div className="card-body">
                <h2 className="card-title">{singleCard.totalActivos}</h2>
                <p className="card-text">Activos</p>
              </div>
            </div>
            <div id="coe_carta">
              <div className="card-header">Cursos</div>
              <div className="card-body">
                <h2 className="card-title">{singleCard.totalPendientes}</h2>
                <p className="card-text">Pendientes</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <div id="chartsContainer">
        <BarChart data={cards}></BarChart>
        <PieChart data={cards}></PieChart>
      </div>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
