const db = require('../config/db');

const Course = {
  getAll: (callback) => {
    db.query('SELECT * FROM course', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM course WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (courseData, callback) => {
    const { coursename, status, department_id, instructor_id } = courseData;
    db.query(
      'INSERT INTO course (coursename, status, department_id, instructor_id) VALUES (?, ?, ?, ?)',
      [coursename, status, department_id, instructor_id],
      (err, result) => {
        if (err) {
          console.log(err);
          return callback(err, null);
        }
        callback(null, result);
      }
    );
  },

  update: (id, courseData, callback) => {
    const { coursename, status, department_id, instructor_id } = courseData;
    db.query(
      'UPDATE course SET coursename = ?, status = ?, department_id = ?, instructor_id = ? WHERE id = ?',
      [coursename, status, department_id, instructor_id, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM course WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Course;
