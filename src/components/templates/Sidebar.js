import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/SidebarStyles.css";
import Logout from "../../services/Logout";
import userLogo from "../../sources/User_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Offcanvas } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BsCalendarDayFill } from "react-icons/bs";
import { MdSwitchAccount } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { IoBookmarks } from "react-icons/io5";
import { ImAddressBook } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsBookFill } from "react-icons/bs";
import { IoMdListBox } from "react-icons/io";
import { GoListUnordered } from "react-icons/go";
import { GiArchiveRegister, GiStarFormation } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function SideBar(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isToggledEvaluaciones, setToggleEvaluaciones] = useState(false);
  const [isToggledAcademia, setToggleAcademia] = useState(false);
  const [isToggledAsistencias, setToggleAsistencias] = useState(false);
  const [isToggledColaboradores, setToggleColaboradores] = useState(false);
  const [show, setShow] = useState(props.isToggled);
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);

  function handleChangeEvaluaciones() {
    setToggleEvaluaciones(!isToggledEvaluaciones);
  }

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
      <section>
        <button
          className="buttonStyleOpen"
          variant="primary"
          onClick={showSidebar}
        >
          <BsArrowLeftCircle id="iconSidebar" />
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
              <BsArrowRightCircle id="iconSidebar" />
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

            <Container id="textLeft">
              <li>
                <Link
                  id="li_home"
                  to={
                    userData.tipoUsuario === "administrador" ||
                    userData.tipoUsuario === "capital_humano"
                      ? "/home"
                      : "/homeColaboradores"
                  }
                >
                  <IoHome id="icons" />
                  HOME
                </Link>
              </li>
              <li id="li_Academia" onClick={handleChangeEvaluaciones}>
                <GiStarFormation id="icons" />
                EVALUACIONES DE DESEMPEÑO
                <ul
                  id="COE_Academia"
                  className={isToggledEvaluaciones ? "active" : ""}
                >
                  <li id="textLeftSelect">
                    <Link to="/FormularioAnEDD">
                      <GiStarFormation id="icons" />
                      Formulario Analistas/Automatizadores
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/FormularioRefEDD">
                      <GiStarFormation id="icons" />
                      Formulario Referentes
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/EDD/ListadoAnalistas">
                      <GiStarFormation id="icons" />
                      Listado Analistas/Automatizadores
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/EDD/ListadoReferentes">
                      <GiStarFormation id="icons" />
                      Listado Referentes
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                id="li_Academia"
                onClick={handleChangeAcademia}
                className={
                  userData.tipoUsuario === "administrador" ||
                  userData.tipoUsuario === "capital_humano"
                    ? ""
                    : "private"
                }
              >
                <FaBook id="icons" />
                COE - ACADEMIA
                <ul
                  id="COE_Academia"
                  className={isToggledAcademia ? "active" : ""}
                >
                  <li id="textLeftSelect">
                    <Link to="/listadoCursos">
                      <ImBook id="icons" />
                      Cursos
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/listadoRamos">
                      {" "}
                      <IoBookmarks id="icons" />
                      Ramos
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/listadoRelator">
                      <ImAddressBook id="icons" />
                      Relator
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/listadoClientes">
                      <IoIosPeople id="icons" />
                      Clientes
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/Administrador">
                      <MdAdminPanelSettings id="icons" />
                      Administrador
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/Prerequisitos">
                      <BsBookFill id="icons" />
                      Prerrequisitos
                    </Link>
                  </li>
                  <li id="textLeftSelect">
                    <Link to="/listadoColaboradores">
                      <IoMdListBox id="icons" />
                      Listado de Colaboradores
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link id="li_calendario" to="/Calendario">
                  <BsCalendarDayFill id="icons" />
                  CALENDARIO
                </Link>
              </li>
              <li
                id="li_Asistencias"
                onClick={handleChangeAsistencias}
                className={
                  userData.tipoUsuario === "administrador" ||
                  userData.tipoUsuario === "capital_humano"
                    ? ""
                    : "private"
                }
              >
                <FaClipboardList id="icons" />
                ASISTENCIAS
                <ul
                  id="Asistencias"
                  className={isToggledAsistencias ? "active" : ""}
                >
                  <li id="textLeftSelect">
                    <GoListUnordered id="icons" />
                    <Link to="/ListadoAsistencias">Listado de Asistencias</Link>
                  </li>
                </ul>
              </li>
              <li id="li_Colaboradores" onClick={handleChangeColaboradores}>
                <MdSwitchAccount id="icons" />
                MI PERFIL
                <ul
                  id="Colaboradores"
                  className={isToggledColaboradores ? "active" : ""}
                >
                  <li id="textLeftSelect">
                    <ImBook id="icons" />
                    <Link to="/MisCursos">Mis Cursos</Link>
                  </li>
                  <li id="textLeftSelect">
                    <GiArchiveRegister id="icons" />
                    <Link to="/InscripcionCurso">Inscribirse a un curso</Link>
                  </li>
                </ul>
              </li>
            </Container>
            <Logout></Logout>
          </ul>
        </Offcanvas>
      </section>
    </>
  );
}
