const db = require('../config/db');

const selectedta = {
  getAll: (callback) => {
    db.query('SELECT * FROM selected_ta', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM selected_ta WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (selectedtaData, callback) => {
    const { ta_id, course_id, status } = selectedtaData;
    db.query(
      'INSERT INTO selected_ta (ta_id, course_id, status) VALUES (?, ?, ?)',
      [ta_id, course_id, status],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, selectedtaData, callback) => {
    const { ta_id, course_id, status } = selectedtaData;
    db.query(
      'UPDATE selected_ta SET ta_id = ?, course_id = ?, status = ? WHERE id = ?',
      [ta_id, course_id, status, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM selected_ta WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = selectedta;
