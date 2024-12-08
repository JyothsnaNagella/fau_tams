const db = require('../config/db');

const Instructor = {
  getAll: (callback) => {
    db.query('SELECT * FROM instructor', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM instructor WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (instructorData, callback) => {
    const { firstname, lastname, email, department_id } = instructorData;
    db.query(
      'INSERT INTO instructor (firstname, lastname, email, department_id) VALUES (?, ?, ?, ?)',
      [firstname, lastname, email, department_id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, instructorData, callback) => {
    const { firstname, lastname, email, department_id } = instructorData;
    db.query(
      'UPDATE instructor SET firstname = ?, lastname = ?, email = ?, department_id = ? WHERE id = ?',
      [firstname, lastname, email, department_id, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM instructor WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Instructor;
