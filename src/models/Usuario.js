const db = require('../db');

module.exports = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], callback);
  },
  create: (usuario, callback) => {
    const { nome, email, senha, telefone, tipo } = usuario;
    db.query('INSERT INTO usuarios (nome, email, senha, telefone, tipo) VALUES (?, ?, ?, ?, ?)', 
      [nome, email, senha, telefone, tipo || 1], callback);
  }
};
