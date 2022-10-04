import React, { useState } from "react";
import { Link } from "wouter";
import "../css/SidebarStyles.css";
import Logout from "../services/Logout";
import userLogo from "../sources/User_logo.png";
export default function SideBar(props) {
  const isToggled = props.isToggled;
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  const [isToggledAcademia, setToggleAcademia] = useState(false);
  const [isToggledAsistencias, setToggleAsistencias] = useState(false);
  const [isToggledColaboradores, setToggleColaboradores] = useState(false);

  function handleChangeAcademia() {
    setToggleAcademia(!isToggledAcademia);
  }
  function handleChangeAsistencias() {
    setToggleAsistencias(!isToggledAsistencias);
  }
  function handleChangeColaboradores() {
    setToggleColaboradores(!isToggledColaboradores);
  }
  return (
    <>
      <section id="sidebar" className={isToggled ? "active" : "sidebar"}>
        <ul>
          <li>
            <img src={userLogo} id="User_logo" alt="userLogo"></img>
          </li>
          <li>
            <h4>{userData[0].username}</h4>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li id="li_Academia" onClick={handleChangeAcademia}>
            COE - ACADEMIA
            <ul id="COE_Academia" className={isToggledAcademia ? "active" : ""}>
              <li>
                <Link to="">Reporte General</Link>
              </li>
              <li>
                <Link to="">Cursos</Link>
              </li>
              <li>
                <Link to="">Ramos</Link>
              </li>
              <li>
                <Link to="">Relator</Link>
              </li>
              <li>
                <Link to="">Clientes</Link>
              </li>
              <li>
                <Link to="">Administrador</Link>
              </li>
              <li>
                <Link to="">Prerequisitos</Link>
              </li>
              <li>
                <Link to="">Listado de Colaboradores</Link>
              </li>
            </ul>
          </li>
          <li id="li_Asistencias" onClick={handleChangeAsistencias}>
            ASISTENCIAS
            <ul
              id="Asistencias"
              className={isToggledAsistencias ? "active" : ""}
            >
              <li>
                <Link to="">Listado de Asistencias</Link>
              </li>
            </ul>
          </li>
          <li id="li_Colaboradores" onClick={handleChangeColaboradores}>
            COLABORADORES
            <ul
              id="Colaboradores"
              className={isToggledColaboradores ? "active" : ""}
            >
              <li>
                <Link to="">Inicio</Link>
              </li>
              <li>
                <Link to="">Mis Cursos</Link>
              </li>
              <li>
                <Link to="">Inscribirse a un curso</Link>
              </li>
            </ul>
          </li>
          <Logout></Logout>
        </ul>
      </section>
    </>
  );
}
