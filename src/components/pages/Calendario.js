import { Redirect } from "wouter";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Header from "../templates/Header";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import getDataService from "../services/GetDataService";
import InsertarCurso from "../templates/forms/InsertarCurso";
import EditarCurso from "../templates/forms/EditarCurso";
import { Tooltip } from "bootstrap";
export default function Calendario() {
  const userData = localStorage.getItem("loggedUser");
  const [CursosApi, setCursosApi] = useState([""]);
  const [EventosApi, setEventosApi] = useState([""]);
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveInsertEvento, setIsActiveInsertEvento] = useState(false);
  const [IDCurso, setIDCurso] = useState(2);
  const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);
  const [randomColorCourses, setRandomColorCourses] = useState("");
  const [randomColorEvents, setRandomColorEvents] = useState("");

  // --------------------FUNCIONES---------------------
  function getDataCursos() {
    const url = "TASKS/auxiliar/CalendarioCursos.php?Cursos";
    getDataService(url).then(
      (response) => setCursosApi(response),
      console.log(CursosApi)
    );
  }
  function getDataEventos() {
    const url = "TASKS/auxiliar/CalendarioEventos.php?Eventos";
    getDataService(url).then(
      (response) => setEventosApi(response),
      console.log(EventosApi)
    );
  }

  function randomNum() {
    setRandomColorCourses(Math.floor(Math.random() * 16777215).toString(16));
    setRandomColorEvents(Math.floor(Math.random() * 16777215).toString(16));
  }

  useEffect(function () {
    getDataCursos();
    getDataEventos();
    randomNum();
  }, []);

  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
  }
  function insertarEvento() {
    setIsActiveInsertEvento(!isActiveInsertEvento);
  }
  function editarCurso(info) {
    setIsActiveEditCurso(true);
    setIDCurso(info.event._def.extendedProps.sourceId);
  }
  // --------------------COSNTANTES MAP---------------------
  const test = (info) => {
    console.log(info.event._def.extendedProps.sourceId);
    console.log(info);
  };

  const Cursos = CursosApi.map((label) => ({
    title: label.codigoRamo,
    start: label.inicio + "T" + label.hora_inicio,
    end: label.fin + "T" + label.hora_fin,
    description: label.codigoCurso,
    sourceId: label.ID,
    color: `#${randomColorCourses}`,
  }));
  const Eventos = EventosApi.map((label) => ({
    title: label.titulo,
    start: label.fechaInicio + "T" + label.hora_inicio,
    end: label.fechaFin + "T" + label.hora_fin,
    sourceId: label.ID,
    description: label.descripcion,
    color: `#${randomColorEvents}`,
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

  return userData ? (
    <>
      <Header></Header>

      <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
      <EditarCurso Props={{ IDCurso, isActiveEditCurso }}></EditarCurso>

      <div>
        <FullCalendar
          locales={esLocale}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: "prev,next today",
            center: "title",
            left: "dayGridMonth,dayGridWeek,dayGridDay añadirCurso añadirEvento",
          }}
          weekends={false}
          aspectRatio={2}
          droppable={true}
          dragScroll={true}
          locale="es"
          eventSources={[Cursos, Eventos]}
          themeSystem="bootstrap5"
          dateClick={insertarCurso}
          customButtons={{
            añadirCurso: {
              text: "Añadir Curso",
              click: insertarCurso,
            },
            añadirEvento: {
              text: "Añadir Evento",
              click: randomNum,
            },
          }}
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
