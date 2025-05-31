import React from 'react';
import './Agenda.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import InteractionPlugin from "@fullcalendar/interaction"
import { start } from 'repl';
import { px } from 'framer-motion';
import { ptBR } from 'date-fns/locale/pt-BR';
import { bR, br } from '@fullcalendar/core/internal-common';


export default function Agenda() {
  return (
    <div className="agenda-container">
      <h1>Meus Agendamentos</h1>
      <div className="calendario">
      <FullCalendar
      
      plugins={[dayGridPlugin,timeGridPlugin,InteractionPlugin]}
      initialView={"dayGridMonth"}
      locale={ptBR}
      headerToolbar={{
        start:"today prev next",
        center:"title",
        end:"dayGridMonth,timeGridWeek,timeGridDay",
        
      }}
      height={"60vh"}

     
      
      />
      </div>
    </div>
  );
}
