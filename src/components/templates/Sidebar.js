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
import { IoMdListBox } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { GiArchiveRegister } from "react-icons/gi";
import { TiThList } from "react-icons/ti";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import FlechaTsoft from "./img/FlechaTsoft";

export default function SideBar(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isToggledEvaluaciones, setToggleEvaluaciones] = useState(false);
  const [isToggledAcademia, setToggleAcademia] = useState(false);
  const [isToggledAsistencias, setToggleAsistencias] = useState(false);
  const [isToggledColaboradores, setToggleColaboradores] = useState(false);
  const [isToggledTsoft, setToggleTsoft] = useState(false);
  const [show, setShow] = useState(props.isToggled);
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);

  function handleChangeEvaluaciones() {
    setToggleEvaluaciones(!isToggledEvaluaciones);
  }
  function handleChangeTsoft() {
    setToggleTsoft(!isToggledTsoft);
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
          <button
            style={{ zIndex: 100, position: "fixed" }}
            className="buttonStyleClose"
            variant="primary"
            onClick={closeSidebar}
          >
            <BsArrowRightCircle id="iconSidebar" />
          </button>
          <Container id="staticSidebar">
            <div>
              <Offcanvas.Header>
                <Offcanvas.Title>ACADEMIA</Offcanvas.Title>
              </Offcanvas.Header>
              <li>
                <img src={userLogo} id="User_logo" alt="userLogo"></img>
              </li>

              <li>
                <h4>{userData.username}</h4>
              </li>
            </div>
          </Container>
          <ul>
            <div>
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
                    <button id="buttonSidebar">
                      <IoHome id="icons" />
                      HOME
                    </button>
                  </Link>
                </li>
                {/* <li id="li_Academia" onClick={handleChangeEvaluaciones}>
                  <button id="buttonSidebar">
                    <GiStarFormation id="icons" />
                    E. DE DESEMPEÑO
                  </button>
                  <ul
                    id="COE_Academia"
                    className={isToggledEvaluaciones ? "active" : ""}
                  >
                    <li id="textLeftSelect">
                      <Link to="/FormularioAnEDD">
                        <button id="submenuSidebar">
                          <GiStarFormation id="icons" />
                          Form. An./Automat.
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/FormularioRefEDD">
                        <button id="submenuSidebar">
                          <GiStarFormation id="icons" />
                          Form. Ref.
                        </button>
                      </Link>
                    </li>
                    <li
                      id="textLeftSelect"
                      className={
                        userData.tipoUsuario === "administrador" ||
                        userData.tipoUsuario === "capital_humano"
                          ? ""
                          : "private"
                      }
                    >
                      <Link to="/EDD/ListadoAnalistas">
                        <button id="submenuSidebar">
                          <GiStarFormation id="icons" />
                          List. An./Automat.
                        </button>
                      </Link>
                    </li>
                    <li
                      id="textLeftSelect"
                      className={
                        userData.tipoUsuario === "administrador" ||
                        userData.tipoUsuario === "capital_humano"
                          ? ""
                          : "private"
                      }
                    >
                      <Link to="/EDD/ListadoReferentes">
                        <button id="submenuSidebar">
                          <GiStarFormation id="icons" />
                          List. Ref.
                        </button>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                <li
                  id="li_Academia"
                  onClick={handleChangeTsoft}
                  className={
                    userData.tipoUsuario === "administrador" ||
                    userData.tipoUsuario === "capital_humano"
                      ? ""
                      : "private"
                  }
                >
                  <button id="buttonSidebar">
                    <FlechaTsoft id={"icons"}></FlechaTsoft>ENTORNO TSOFT
                  </button>
                  <ul
                    id="COE_Academia"
                    className={isToggledTsoft ? "active" : ""}
                  >
                    <li id="textLeftSelect">
                      <Link to="/Administrador">
                        <button id="submenuSidebar">
                          <MdAdminPanelSettings id="icons" />
                          Administrador
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/listadoClientes">
                        <button id="submenuSidebar">
                          <IoIosPeople id="icons" />
                          Clientes
                        </button>
                      </Link>
                    </li>
                    {/* <li id="textLeftSelect">
                      <button id="submenuSidebar">
                        <ImBook id="icons" />
                        Empleados
                      </button>
                    </li>
                    <li id="textLeftSelect">
                      <button id="submenuSidebar">
                        <ImBook id="icons" />
                        Equipos
                      </button>
                    </li>
                    <li id="textLeftSelect">
                      <button id="submenuSidebar">
                        <IoBookmarks id="icons" />
                        Proyectos
                      </button>
                    </li> */}
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
                  <button id="buttonSidebar">
                    <FaBook id="icons" />
                    FACTORY DEVOPS
                  </button>
                  <ul
                    id="COE_Academia"
                    className={isToggledAcademia ? "active" : ""}
                  >
                    <li id="textLeftSelect">
                      <Link to="/listadoCursos">
                        <button id="submenuSidebar">
                          <ImBook id="icons" />
                          Cursos
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/listadoRamos">
                        <button id="submenuSidebar">
                          <IoBookmarks id="icons" />
                          Ramos
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/listadoRelator">
                        <button id="submenuSidebar">
                          <ImAddressBook id="icons" />
                          Relator
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/ListadoAsistencias">
                        <button id="submenuSidebar">
                          <TiThList id="icons" />
                          Listado de Asistencias
                        </button>
                      </Link>
                    </li>

                    <li id="textLeftSelect">
                      <Link to="/listadoColaboradores">
                        <button id="submenuSidebar">
                          <IoMdListBox id="icons" />
                          Listado de Colaboradores
                        </button>
                      </Link>
                    </li>

                    <li id="textLeftSelect">
                      <Link to="/Prerequisitos">
                        <button id="submenuSidebar">
                          <GoTasklist id="icons" />
                          Prerequisitos
                        </button>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link id="li_calendario" to="/Calendario">
                    <button id="buttonSidebar">
                      <BsCalendarDayFill id="icons" />
                      CALENDARIO
                    </button>
                  </Link>
                </li>

                <li
                  id="li_Colaboradores"
                  onClick={handleChangeColaboradores}
                  className={
                    userData.tipoUsuario !== "colaborador" ? "private" : ""
                  }
                >
                  <button id="buttonSidebar">
                    <MdSwitchAccount id="icons" />
                    MI PERFIL
                  </button>
                  <ul
                    id="Colaboradores"
                    className={isToggledColaboradores ? "active" : ""}
                  >
                    <li id="textLeftSelect">
                      <Link to="/MisCursos">
                        <button id="submenuSidebar">
                          <ImBook id="icons" />
                          Mis Cursos
                        </button>
                      </Link>
                    </li>
                    <li id="textLeftSelect">
                      <Link to="/InscripcionCurso">
                        <button id="submenuSidebar">
                          <GiArchiveRegister id="icons" />
                          Inscribirse a un curso
                        </button>
                      </Link>
                    </li>
                  </ul>
                </li>
              </Container>
            </div>
            <Logout></Logout>
          </ul>
        </Offcanvas>
      </section>
    </>
  );
}
