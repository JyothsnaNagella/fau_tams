const db = require('../config/db');

const Department = {
  getAll: (callback) => {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM department WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (departmentData, callback) => {
    const { name, code } = departmentData;
    db.query(
      'INSERT INTO department (name, code) VALUES (?, ?)',
      [name, code],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, departmentData, callback) => {
    const { name, code } = departmentData;
    db.query(
      'UPDATE department SET name = ?, code = ? WHERE id = ?',
      [name, code, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM department WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Department;
