const db = require('../config/db');
const bcrypt = require('bcrypt');

const Applicant = {
    getByEmail: (email, callback) => {
        db.query('SELECT * FROM applicant WHERE email = ?', [email], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result[0]); // Assuming email is unique
        });
    },
      
  getAll: (callback) => {
    db.query('SELECT * FROM applicant', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM applicant WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (applicantData, callback) => {
    const { firstname, lastname, znumber, email, password } = applicantData;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      db.query(
        'INSERT INTO applicant (firstname, lastname, znumber, email, password) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, znumber, email, hashedPassword],
        (err, result) => {
          if (err) return callback(err, null);
          callback(null, result);
        }
      );
        
    })
  },

  update: (id, applicantData, callback) => {
    const { firstname, lastname, email, znumber } = applicantData;
    db.query(
      'UPDATE applicant SET firstname = ?, lastname = ?, email = ?, znumber = ? WHERE id = ?',
      [firstname, lastname, email, znumber, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM applicant WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Applicant;
