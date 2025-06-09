const Procedimento = require('../models/Procedimento');

exports.listar = (req, res) => {
  Procedimento.getAll((err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

exports.criar = (req, res) => {
  Procedimento.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json(result);
  });
};

exports.atualizar = (req, res) => {
  Procedimento.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(204).end();
  });
};

exports.excluir = (req, res) => {
  Procedimento.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(204).end();
  });
};
