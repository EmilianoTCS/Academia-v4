import { Navigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Header from "../templates/Header";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import getDataService from "../../services/GetDataService";
import { Tooltip } from "bootstrap";
import getDataExternService from "../../services/GetDataExternService";
import "../css/Calendario.css";
import InsertarCurso from "../templates/forms/InsertarCurso";
import InsertarEvento from "../templates/forms/InsertarEvento";
import Button from "react-bootstrap/Button";
import "../css/InsertarCursoCalendario.css";
import { Container } from "react-bootstrap";
export default function Calendario() {
  const [CursosApi, setCursosApi] = useState([""]);
  const [EventosApi, setEventosApi] = useState([""]);
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveInsertEvento, setIsActiveInsertEvento] = useState(false);
  const [randomColorCourses, setRandomColorCourses] = useState("");
  const [randomColorEvents, setRandomColorEvents] = useState("");
  const [FeriadosApi, setFeriadosApi] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  // --------------------FUNCIONES---------------------
  function getDataCursos() {
    const url = "TASKS/auxiliar/CalendarioCursos.php?Cursos";
    getDataService(url).then((response) => setCursosApi(response));
  }
  function getDataEventos() {
    const url = "TASKS/auxiliar/CalendarioEventos.php?Eventos";
    getDataService(url).then((response) => setEventosApi(response));
  }
  function getDataFeriados() {
    const urlFeriados = "https://api.victorsanmartin.com/feriados/en.json";
    getDataExternService(urlFeriados).then((response) =>
      setFeriadosApi(response.data)
    );
  }

  function randomNum() {
    setRandomColorCourses(Math.floor(Math.random() * 16777215).toString(16));
    setRandomColorEvents(Math.floor(Math.random() * 16777215).toString(16));
  }

  useEffect(function () {
    getDataCursos();
    getDataEventos();
    getDataFeriados();
    randomNum();
  }, []);

  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
    setIsActiveInsertEvento(false);
  }

  function insertarEvento() {
    setIsActiveInsertEvento(!isActiveInsertEvento);
    setIsActiveInsertCurso(false);
  }

  // --------------------COMPONENTES---------------------
  const BotonesInsert = () => {
    if (userData.username === "administrador") {
      return <></>;
    }
  };

  // --------------------CONSTANTES MAP---------------------

  const Cursos = CursosApi.map((label) => ({
    title: "Curso de: " + label.codigoRamo,
    start: label.fecha_hora,
    end: label.fecha_hora,
    description:
      label.fecha_hora +
      ", " +
      "Curso de " +
      label.nombreRamo +
      ", Duración: " +
      label.duracion,
    sourceId: label.ID,
    color: `#3B9212`,
    display: "block",
  }));
  const Eventos = EventosApi.map((label) => ({
    title: "Entrega de evaluación " + label.titulo,
    start: label.fecha_hora,
    end: label.fecha_hora,
    sourceId: label.ID,
    description:
      label.fecha_hora +
      ", " +
      label.descripcion +
      ", Duración: " +
      label.duracion,
    color: `#0D98BA`,
    display: "block",
  }));
  const Feriados = FeriadosApi.map((label) => ({
    title: label.title,
    start: label.date,
    end: label.date,
    description: label.extra,
    selectable: false,
    classNames: "Feriados",
    display: "background",
  }));
  // --------------------ACTIONS  ---------------------

  let tooltipInstance = null;
  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event._def.extendedProps.description,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body",
      });

      tooltipInstance.show();
    }
  };

  const handleMouseLeave = () => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };
  // --------------------RENDER---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <Container id="containerCalendario">
        <br></br>
        <Button id="btnCurso" onClick={insertarCurso}>
          Insertar Curso
        </Button>
        <Button id="btnCurso2" onClick={insertarEvento}>
          Insertar Evento
        </Button>
        <InsertarCurso
          isActiveCurso={isActiveInsertCurso}
          cambiarEstado={setIsActiveInsertCurso}
        ></InsertarCurso>
        <InsertarEvento
          isActiveEvento={isActiveInsertEvento}
          cambiarEstado={setIsActiveInsertEvento}
        ></InsertarEvento>

        <div id="fondoCalendario">
          <FullCalendar
            locales={esLocale}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              right: "prev,next today",
              center: "title",
              left: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            weekends={true}
            aspectRatio={1.9}
            droppable={true}
            locale="es"
            eventSources={[Cursos, Eventos, Feriados]}
            themeSystem="bootstrap"
            eventMouseEnter={handleMouseEnter}
            eventMouseLeave={handleMouseLeave}
          />

          <div id="leyendas">
            <div id="rowLeyenda">
              <div className="leyendasColor"></div>
              <h6>Cursos</h6>
            </div>

            <div id="rowLeyenda">
              <div className="leyendas2Color"></div>
              <h6>Evaluaciones</h6>
            </div>

            <div id="rowLeyenda">
              <div className="leyendas3Color"></div>
              <h6>Feriados</h6>
            </div>
          </div>
        </div>
        <br></br>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
