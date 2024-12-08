const db = require('../config/db');

const instructor = {
  // Get instructor by email
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM instructor WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.error('Error fetching instructor by email:', err);
          return callback(err, null);
        }
        if (result.length === 0) {
          return callback(new Error('Instructor not found'), null);
        }
        callback(null, result[0]); // Assuming email is unique
    });
  },

  // Get all instructors
  getAll: (callback) => {
    db.query('SELECT * FROM instructor', (err, results) => {
      if (err) {
        console.error('Error fetching all instructors:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  // Get instructor by ID
  getById: (id, callback) => {
    db.query('SELECT * FROM instructor WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching instructor by ID:', err);
        return callback(err, null);
      }
      if (result.length === 0) {
        return callback(new Error('Instructor not found'), null);
      }
      callback(null, result[0]);
    });
  },

  // Create a new instructor
  create: (instructorData, callback) => {
    const { email, password, firstname, lastname, status } = instructorData;
    db.query(
      'INSERT INTO instructor (email, password, firstname, lastname, status) VALUES (?, ?, ?, ?, ?)',
      [email, password, firstname, lastname, status],
      (err, result) => {
        if (err) {
          console.error('Error creating instructor:', err);
          return callback(err, null);
        }
        callback(null, result);
      }
    );
  },

  // Update an instructor's details
  update: (id, instructorData, callback) => {
    const { email, password, firstname, lastname, status } = instructorData;
    db.query(
      'UPDATE instructor SET email = ?, password = ?, firstname = ?, lastname = ?, status = ? WHERE id = ?',
      [email, password, firstname, lastname, status, id],
      (err, result) => {
        if (err) {
          console.error('Error updating instructor:', err);
          return callback(err, null);
        }
        if (result.affectedRows === 0) {
          return callback(new Error('No instructor found to update'), null);
        }
        callback(null, result);
      }
    );
  },

  // Delete an instructor by ID
  delete: (id, callback) => {
    db.query('DELETE FROM instructor WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting instructor:', err);
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(new Error('No instructor found to delete'), null);
      }
      callback(null, result);
    });
  },

  // Accept an instructor application
  accept: (id, callback) => {
    db.query('UPDATE instructor SET status = "accepted" WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error accepting instructor:', err);
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(new Error('Instructor not found to accept'), null);
      }
      callback(null, result);
    });
  },

  // Reject an instructor application
  reject: (id, callback) => {
    db.query('UPDATE instructor SET status = "rejected" WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error rejecting instructor:', err);
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(new Error('Instructor not found to reject'), null);
      }
      callback(null, result);
    });
  },
};

module.exports = instructor;
