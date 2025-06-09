const db = require('../db');

module.exports = {
  getAll: callback => {
    db.query('SELECT * FROM procedimentos', callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO procedimentos (title, description) VALUES (?, ?)', [data.title, data.description], callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE procedimentos SET title = ?, description = ? WHERE id = ?', [data.title, data.description, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM procedimentos WHERE id = ?', [id], callback);
  }
};
