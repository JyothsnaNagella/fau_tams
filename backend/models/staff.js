const db = require('../config/db');

const application = {
  // Existing methods...

  
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM staff WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.error('Error fetching staff by email:', err);
          return callback(err, null);
        }
        if (result.length === 0) {
          return callback(new Error('staff not found'), null);
        }
        callback(null, result[0]); // Assuming email is unique
    });
  },

  // Method to add a new course requiring TAs
  addCourse: (courseData, callback) => {
    const { course_name, course_code, department_id, instructor_id, required_tas } = courseData;
    db.query(
      'INSERT INTO courses (course_name, course_code, department_id, instructor_id, required_tas) VALUES (?, ?, ?, ?, ?)',
      [course_name, course_code, department_id, instructor_id, required_tas],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  // Method to match TA applicants with a course based on their expertise
  matchApplicantsToCourse: (courseId, callback) => {
    db.query(
      `
      SELECT 
        a.id AS applicant_id, 
        a.firstname, 
        a.lastname, 
        a.gpa, 
        a.previous_experience, 
        c.course_name 
      FROM 
        applications a 
      INNER JOIN 
        courses c 
      ON 
        a.course_id = c.id 
      WHERE 
        c.id = ? AND a.status = 'Pending'
      `,
      [courseId],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },

  // Method to recommend TA applicants for a course
  recommendApplicants: (courseId, applicantIds, callback) => {
    const placeholders = applicantIds.map(() => '?').join(',');
    db.query(
      `
      UPDATE applications 
      SET status = 'Recommended' 
      WHERE course_id = ? AND id IN (${placeholders})
      `,
      [courseId, ...applicantIds],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  // Method to fetch all courses requiring TAs
  getCoursesRequiringTAs: (callback) => {
    db.query(
      'SELECT * FROM courses WHERE required_tas > 0',
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },
};

module.exports = application;
