const db = require('../db');

module.exports = {
  getAll: callback => {
    db.query('SELECT * FROM procedimentos', callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO procedimentos (nome, descricao) VALUES (?, ?)', [data.nome, data.descricao], callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE procedimentos SET nome = ?, descricao = ? WHERE id = ?', [data.nome, data.descricao, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM procedimentos WHERE id = ?', [id], callback);
  }
};
