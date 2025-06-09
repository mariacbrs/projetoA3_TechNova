const db = require('../db');

module.exports = {
  getAllByUser: (usuario_id, callback) => {
    db.query(
      'SELECT a.*, p.nome AS nome_procedimento FROM agendamentos a JOIN procedimentos p ON a.procedimento_id = p.id WHERE usuario_id = ?',
      [usuario_id],
      callback
    );
  },

  create: (agendamento, callback) => {
    const { usuario_id, procedimento_id, data_hora } = agendamento;
    db.query(
      'INSERT INTO agendamentos (usuario_id, procedimento_id, data_hora) VALUES (?, ?, ?)',
      [usuario_id, procedimento_id, data_hora],
      callback
    );
  },

  getAll: (callback) => {
    db.query(
      'SELECT a.*, u.nome AS cliente_nome, p.nome AS nome_procedimento FROM agendamentos a JOIN usuarios u ON a.usuario_id = u.id JOIN procedimentos p ON a.procedimento_id = p.id',
      callback
    );
  },

  update: (id, data_hora, callback) => {
    db.query(
      'UPDATE agendamentos SET data_hora = ? WHERE id = ?',
      [data_hora, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      'DELETE FROM agendamentos WHERE id = ?',
      [id],
      callback
    );
  },
};
