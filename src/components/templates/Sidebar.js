import React, { useState } from "react";
import { Link } from "wouter";
import "../css/SidebarStyles.css";
import Logout from "../../services/Logout";
import userLogo from "../../sources/User_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Offcanvas } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SideBar(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isToggledAcademia, setToggleAcademia] = useState(false);
  const [isToggledAsistencias, setToggleAsistencias] = useState(false);
  const [isToggledColaboradores, setToggleColaboradores] = useState(false);
  const [show, setShow] = useState(props.isToggled);
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);

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
      <section id="sidebar">
        <button
          className="buttonStyleOpen"
          variant="primary"
          onClick={showSidebar}
        >
          <i className="bi bi-arrow-bar-left"></i>
        </button>

        <Offcanvas
          id="containerElement"
          placement="end"
          show={show}
          onHide={closeSidebar}
        >
          <Container className="p-1">
            <button
              className="buttonStyleClose"
              variant="primary"
              onClick={closeSidebar}
            >
              <i className="bi bi-arrow-bar-right"></i>
            </button>
          </Container>
          <Offcanvas.Header>
            <Offcanvas.Title>ACADEMIA</Offcanvas.Title>
          </Offcanvas.Header>
          <ul>
            <li>
              <img src={userLogo} id="User_logo" alt="userLogo"></img>
            </li>

            <li>
              <h4>{userData.username}</h4>
            </li>
            <li>
              <Link id="li_home" to="/home">
                HOME
              </Link>
            </li>
            <li id="li_Academia" onClick={handleChangeAcademia}>
              COE - ACADEMIA
              <ul
                id="COE_Academia"
                className={isToggledAcademia ? "active" : ""}
              >
                <li>
                  <Link to="/listadoCursos">Cursos</Link>
                </li>
                <li>
                  <Link to="/listadoRamos">Ramos</Link>
                </li>
                <li>
                  <Link to="/listadoRelator">Relator</Link>
                </li>
                <li>
                  <Link to="/listadoClientes">Clientes</Link>
                </li>
                <li>
                  <Link to="/Administrador">Administrador</Link>
                </li>
                <li>
                  <Link to="/Prerequisitos">Prerequisitos</Link>
                </li>
                <li>
                  <Link to="/listadoColaboradores">
                    Listado de Colaboradores
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link id="li_calendario" to="/Calendario">
                CALENDARIO
              </Link>
            </li>
            <li id="li_Asistencias" onClick={handleChangeAsistencias}>
              ASISTENCIAS
              <ul
                id="Asistencias"
                className={isToggledAsistencias ? "active" : ""}
              >
                <li>
                  <Link to="/ListadoAsistencias">Listado de Asistencias</Link>
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
                  <Link to="/homeColaboradores">Inicio</Link>
                </li>
                <li>
                  <Link to="/MisCursos">Mis Cursos</Link>
                </li>
                <li>
                  <Link to="/InscripcionCurso">Inscribirse a un curso</Link>
                </li>
              </ul>
            </li>
            <Logout></Logout>
          </ul>
        </Offcanvas>
      </section>
    </>
  );
}
