const db = require('../config/db');

const committee = {
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM committee WHERE email = ?', [email], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0]); // Assuming email is unique
    });
},

  getAll: (callback) => {
    db.query('SELECT * FROM committee', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM committee WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (committeeData, callback) => {
    const { email, password, firstname, lastname } = committeeData;
    db.query(
      'INSERT INTO committee (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
      [email, password, firstname, lastname],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, committeeData, callback) => {
    const { email, password, firstname, lastname } = committeeData;
    db.query(
      'UPDATE committee SET email = ?, password = ?, firstname = ?, lastname = ? WHERE id = ?',
      [email, password, firstname, lastname, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM committee WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = committee;
