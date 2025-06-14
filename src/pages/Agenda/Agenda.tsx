import React, { useCallback, useEffect, useState } from 'react';
import './Agenda.css';
import FullCalendar from '@fullcalendar/react';
import { DateClickArg } from '@fullcalendar/interaction';
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
  status: 'pendente' | 'confirmado' | 'cancelado';
  nome_procedimento?: string;
  cliente_nome?: string;
}

interface ModalData {
  id: number | null;
  procedimento_id: number | string;
  data: string;
  hora: string;
  status: string;
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
    status: 'pendente'
  });
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  const carregarAgendamentos = useCallback(() => {
    const rota = user?.tipo === 0
      ? 'http://localhost:3001/routes/agendamentos'
      : `http://localhost:3001/routes/agendamentos/${user?.id}`;

    axios.get<Agendamento[]>(rota).then(res => {
      const eventos = res.data.map(item => ({
        id: item.id,
        title: item.nome_procedimento,
        date: item.data_hora,
        extendedProps: item
      }));
      setAgendamentos(eventos);
    });
  }, [user]);

  useEffect(() => {
    carregarAgendamentos();
    axios.get<Procedimento[]>('http://localhost:3001/routes/procedimentos')
      .then(res => setProcedimentos(res.data));
  }, [carregarAgendamentos]);

  const handleDateClick = (info: DateClickArg) => {
    if (user?.tipo === 1) {
      setModalData({
        id: null,
        procedimento_id: '',
        data: info.dateStr,
        hora: '',
        status: 'pendente'
      });
      setShowModal(true);
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    const evento = info.event.extendedProps as Agendamento;
    if (user?.tipo === 0 || evento.usuario_id === user?.id) {
      const data = evento.data_hora.slice(0, 10);
      const dataHoraLocal = new Date(evento.data_hora);
      const hora = dataHoraLocal.toTimeString().slice(0, 5);
      setModalData({
        id: evento.id,
        procedimento_id: evento.procedimento_id,
        data: data,
        hora: hora,
        status: evento.status || 'pendente'
      });

      setShowModal(true);
    }
  };

  const handleSalvar = () => {
    if (
      modalData.procedimento_id === '' ||
      modalData.data === '' ||
      modalData.hora === ''
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const dataHora = `${modalData.data} ${modalData.hora}:00`;

    if (modalData.id) {
      axios.put(`http://localhost:3001/routes/agendamentos/${modalData.id}`, {
        data_hora: dataHora,
        procedimento_id: modalData.procedimento_id,
        status: modalData.status
      }).then(() => {
        carregarAgendamentos();
        setShowModal(false);
      }).catch(() => alert('Erro ao atualizar o agendamento.'));
    } else {
      axios.post('http://localhost:3001/routes/agendamentos', {
        usuario_id: user?.id,
        procedimento_id: modalData.procedimento_id,
        data_hora: dataHora,
        status: modalData.status
      }).then(() => {
        carregarAgendamentos();
        setShowModal(false);
      }).catch(() => alert('Erro ao criar o agendamento.'));
    }
  };

  const confirmarExcluir = () => {
    setModalConfirmacao(true);
  };

  const excluirAgendamento = () => {
    axios.delete(`http://localhost:3001/routes/agendamentos/${modalData.id}`).then(() => {
      setModalConfirmacao(false);
      setShowModal(false);
      carregarAgendamentos();
    }).catch(() => alert('Erro ao excluir agendamento.'));
  };

  return (
    <div className="agenda-container">
      <h1>Meus Agendamentos</h1>

      <button onClick={() => {
        setModalData({
          id: null,
          procedimento_id: '',
          data: '',
          hora: '',
          status: 'pendente'
        });
        setShowModal(true);
      }} className='btn-novo-agendamento'>Novo Agendamento</button>

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
          displayEventTime={false}
          height="80vh"
        />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalData.id ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>

            <label>Procedimento:</label>
            <select
              value={modalData.procedimento_id}
              onChange={(e) => setModalData({ ...modalData, procedimento_id: parseInt(e.target.value) })}
            >
              <option value="" disabled selected>Selecione</option>
              {procedimentos.map(proc => (
                <option key={proc.id} value={proc.id}>{proc.nome}</option>
              ))}
            </select>

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
              <option value="" disabled selected>Selecione</option>
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            {user?.tipo === 0 && (
              <>
                <label>Status:</label>
                <select
                  value={modalData.status}
                  onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </>
            )}

            <div className="modal-buttons">
              <button onClick={handleSalvar}>Salvar</button>
              {modalData.id && <button onClick={confirmarExcluir}>Excluir</button>}
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modalConfirmacao && (
        <div className="modalConf">
          <div className="modal-content-Conf">
            <h3>Tem certeza de que deseja excluir o agendamento permanentemente?</h3>
            <div className="buttons">
              <button className="btn btn-danger" onClick={excluirAgendamento}>Sim, Excluir agendamento</button>
              <button className="btn btn-cancel" onClick={() => setModalConfirmacao(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
