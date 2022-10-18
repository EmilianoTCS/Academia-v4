import { Redirect } from "wouter";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Header from "../templates/Header";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import getDataService from "../services/GetDataService";
import InsertarCurso from "../templates/forms/InsertarCurso";
import EditarCurso from "../templates/forms/EditarCurso";

export default function Calendario() {
  const userData = localStorage.getItem("loggedUser");
  const [CursosApi, setCursosApi] = useState([""]);
  const [EventosApi, setEventosApi] = useState([""]);
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveInsertEvento, setIsActiveInsertEvento] = useState(false);
  const [IDCurso, setIDCurso] = useState(2);
  const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);

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
  useEffect(function () {
    getDataCursos();
    getDataEventos();
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
    sourceId: label.ID,
  }));
  const Eventos = EventosApi.map((label) => ({
    title: label.titulo,
    start: label.fechaInicio + "T" + label.hora_inicio,
    end: label.fechaFin + "T" + label.hora_fin,
    sourceId: label.ID,
  }));

  // --------------------RENDER---------------------

  return userData ? (
    <>
      <Header></Header>

      <InsertarCurso isActive={isActiveInsertCurso}></InsertarCurso>
      <EditarCurso Props={{ IDCurso, isActiveEditCurso }}></EditarCurso>

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: "prev,next today",
            center: "title",
            left: "dayGridMonth,dayGridWeek,dayGridDay añadirCurso añadirEvento",
          }}
          weekends={false}
          aspectRatio={2}
          locales="es"
          events={Cursos}
          eventClick={editarCurso}
          dateClick={insertarCurso}
          customButtons={{
            añadirCurso: {
              text: "Añadir Curso",
              click: insertarCurso,
            },
            añadirEvento: {
              text: "Añadir Evento",
              click: insertarEvento,
            },
          }}
        />
      </div>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
