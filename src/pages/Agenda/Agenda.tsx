import React, { useEffect, useState } from 'react';
import './Agenda.css';
import FullCalendar from '@fullcalendar/react';
import { DateClickArg} from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

interface Procedimento {
  id: number;
  nome: string;
}

interface Agendamento {
  id: number;
  procedimento_id: number;
  usuario_id: number;
  data_hora: string;
  descricao: string;
  nome_procedimento?: string;
  cliente_nome?: string;
}

interface ModalData {
  id: number | null;
  procedimento_id: number | string;
  data: string;
  hora: string;
  descricao: string;
}

export default function Agenda() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: null,
    procedimento_id: '',
    data: '',
    hora: '',
    descricao: '',
  });
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  useEffect(() => {
    if (user?.tipo === 0) {
      axios.get<Agendamento[]>('http://localhost:3001/agendamentos')
        .then(res => {
          const eventos = res.data.map(item => ({
            id: item.id,
            title: `${item.nome_procedimento} - ${item.cliente_nome}`,
            date: item.data_hora,
            extendedProps: item
          }));
          setAgendamentos(eventos);
        });
    } else {
      axios.get<Agendamento[]>(`http://localhost:3001/agendamentos/${user?.id}`)
        .then(res => {
          const eventos = res.data.map(item => ({
            id: item.id,
            title: item.nome_procedimento,
            date: item.data_hora,
            extendedProps: item
          }));
          setAgendamentos(eventos);
        });
    }

    axios.get<Procedimento[]>('http://localhost:3001/procedimentos')
      .then(res => setProcedimentos(res.data));
  }, [user]);

  const handleDateClick = (info: DateClickArg) => {
    if (user?.tipo === 1) {
      setModalData({
        id: null,
        procedimento_id: '',
        data: info.dateStr,
        hora: '',
        descricao: ''
      });
      setShowModal(true);
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    const evento = info.event.extendedProps as Agendamento;
    if (user?.tipo === 0 || evento.usuario_id === user?.id) {
      const data = evento.data_hora.slice(0, 10);
      const hora = evento.data_hora.slice(11, 16);
      setModalData({
        id: evento.id,
        procedimento_id: evento.procedimento_id,
        data,
        hora,
        descricao: evento.descricao
      });
      setShowModal(true);
    }
  };

  const handleSalvar = () => {
    const dataHora = `${modalData.data} ${modalData.hora}:00`;
    if (modalData.id) {
      axios.put(`http://localhost:3001/agendamentos/${modalData.id}`, {
        data_hora: dataHora
      }).then(() => window.location.reload());
    } else {
      axios.post('http://localhost:3001/agendamentos', {
        usuario_id: user?.id,
        procedimento_id: modalData.procedimento_id,
        data_hora: dataHora,
        descricao: modalData.descricao
      }).then(() => window.location.reload());
    }
  };

  const handleExcluir = () => {
    axios.delete(`http://localhost:3001/agendamentos/${modalData.id}`)
      .then(() => window.location.reload());
  };

  return (
    <div className="agenda-container">
      <h1>Meus Agendamentos</h1>

      <div className="calendario">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptBrLocale}
          events={agendamentos}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="80vh"
        />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalData.id ? 'Editar/Excluir Agendamento' : 'Novo Agendamento'}</h2>

            {user?.tipo === 1 && (
              <>
                <label>Procedimento:</label>
                <select
                  value={modalData.procedimento_id}
                  onChange={(e) => setModalData({ ...modalData, procedimento_id: parseInt(e.target.value) })}
                >
                  <option value="">Selecione</option>
                  {procedimentos.map((proc) => (
                    <option key={proc.id} value={proc.id}>{proc.nome}</option>
                  ))}
                </select>

                <label>Descrição:</label>
                <textarea
                  value={modalData.descricao}
                  onChange={(e) => setModalData({ ...modalData, descricao: e.target.value })}
                />
              </>
            )}

            <label>Data:</label>
            <input
              type="date"
              value={modalData.data}
              onChange={(e) => setModalData({ ...modalData, data: e.target.value })}
            />

            <label>Horário:</label>
            <select
              value={modalData.hora}
              onChange={(e) => setModalData({ ...modalData, hora: e.target.value })}
            >
              {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <div className="modal-buttons">
              <button onClick={handleSalvar}>Salvar</button>
              {modalData.id && <button onClick={handleExcluir}>Excluir</button>}
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
