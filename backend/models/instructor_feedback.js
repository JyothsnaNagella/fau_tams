const db = require('../config/db');

const InstructorFeedback = {
  getAll: (callback) => {
    db.query('SELECT * FROM instructor_feedback', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM instructor_feedback WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (feedbackData, callback) => {
    const { instructor_id, feedback } = feedbackData;
    db.query(
      'INSERT INTO instructor_feedback (instructor_id, feedback) VALUES (?, ?)',
      [instructor_id, feedback],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  update: (id, feedbackData, callback) => {
    const { instructor_id, feedback } = feedbackData;
    db.query(
      'UPDATE instructor_feedback SET instructor_id = ?, feedback = ? WHERE id = ?',
      [instructor_id, feedback, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM instructor_feedback WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = InstructorFeedback;
