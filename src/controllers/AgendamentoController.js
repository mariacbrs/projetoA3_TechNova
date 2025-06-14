const Agendamento = require('../models/Agendamento');

exports.listarPorUsuario = (req, res) => {
  const usuario_id = req.params.id;
  Agendamento.getAllByUser(usuario_id, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

exports.criar = (req, res) => {
  Agendamento.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ id: results.insertId });
  });
};

exports.listarTodos = (req, res) => {
  Agendamento.getAll((err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

exports.remarcar = (req, res) => {
  const { id } = req.params;
  const { data_hora, procedimento_id, status } = req.body;
  Agendamento.update(id, { data_hora, procedimento_id, status }, (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: 'Agendamento atualizado com sucesso' });
  });
};


exports.excluir = (req, res) => {
  const { id } = req.params;
  Agendamento.delete(id, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: 'Agendamento excluído com sucesso' });
  });
};

