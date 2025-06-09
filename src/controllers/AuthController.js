const Usuario = require('../models/Usuario');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  Usuario.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0 || results[0].senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const usuario = results[0];
    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      tipo: usuario.tipo // 0 = admin, 1 = cliente
    });
  });
};

exports.register = (req, res) => {
  const novoUsuario = {
    ...req.body,
    tipo: 1, // força o tipo para cliente
  };

  Usuario.create(novoUsuario, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ id: results.insertId });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { nome, telefone, senha } = req.body;

  const sql = 'UPDATE usuarios SET nome = ?, telefone = ?, senha = ? WHERE id = ?';
  const values = [nome, telefone, senha, id];

  require('../db').query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: 'Usuário atualizado com sucesso' });
  });
};
