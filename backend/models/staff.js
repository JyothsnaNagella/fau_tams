const db = require('../config/db');

const staff = {
  getAll: (callback) => {
    db.query('SELECT * FROM staff', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM staff WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (staffData, callback) => {
    const { email, password, firstname, lastname } = staffData;
    db.query(
      'INSERT INTO staff (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
      [email, password, firstname, lastname],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, staffData, callback) => {
    const { email, password, firstname, lastname } = staffData;
    db.query(
      'UPDATE staff SET email = ?, password = ?, firstname = ?, lastname = ? WHERE id = ?',
      [email, password, firstname, lastname, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM staff WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = staff;
