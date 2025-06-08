import React from 'react';
import './Agenda.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import InteractionPlugin from "@fullcalendar/interaction"
import ptBrLocale from '@fullcalendar/core/locales/pt-br';


export default function Agenda() {
  return (
    <div className="agenda-container">
      <h1>Meus Agendamentos</h1>
      <div className="adicionar-btn">
        <button className="add-button"> Agendar Procedimento</button>
      </div>
      <div className="calendario">
        <FullCalendar

          plugins={[dayGridPlugin, timeGridPlugin, InteractionPlugin]}
          initialView={"dayGridMonth"}
          locale={ptBrLocale}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",

          }}
          height={"80vh"}
        />
      </div>
    </div>
  );
}
