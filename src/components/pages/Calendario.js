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

  // --------------------CONSTANTES MAP---------------------

  const Cursos = CursosApi.map((label) => ({
    title: label.codigoRamo,
    start: label.fecha_hora,
    end: label.fecha_hora,
    description:
      "Curso de " + label.nombreRamo + ", Duración: " + label.duracion,
    sourceId: label.ID,
    color: `#${randomColorCourses}`,
    display: "block",
  }));
  const Eventos = EventosApi.map((label) => ({
    title: label.titulo,
    start: label.fecha_hora,
    end: label.fecha_hora,
    sourceId: label.ID,
    description: label.descripcion + ", Duración: " + label.duracion,
    color: `#${randomColorEvents}`,
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
      <Button id="btnCurso" onClick={insertarCurso}>
        Insertar Curso
      </Button>
      <Button id="btnCurso" onClick={insertarEvento}>
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
      <div>
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
          aspectRatio={2}
          droppable={true}
          dragScroll={true}
          locale="es"
          eventSources={[Cursos, Eventos, Feriados]}
          themeSystem="bootstrap5"
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
