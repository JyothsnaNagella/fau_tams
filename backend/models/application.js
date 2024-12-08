const db = require('../config/db');

const application = {
  approveApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Accepted', applicationId], (err, result) => {
      
      if (err) {
        console.error('Error approving application:', err);
        return callback(err, null);
      } 
      callback(null, result);
    });
  },
  getAllRecommended: (callback) => {
    db.query('SELECT * FROM applications WHERE status = ?', ['Recommended'], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  getAll: (callback) => {
    db.query('SELECT * FROM applications', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  getResumePath: (applicationId, callback) => {
    db.query('SELECT resume FROM applications WHERE id = ?', [applicationId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
  recommendApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Recommended', applicationId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }); 
  },

  rejectApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Rejected', applicationId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });   
  },

  getAllPending(callback) {
    db.query('SELECT * FROM applications WHERE status = ?', ['Pending'], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM applications WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (applicationData, callback) => {
    const { 
      applicant_id, 
      firstname, 
      lastname, 
      email, 
      znumber, 
      gpa, 
      level_of_education, 
      date_of_graduation, 
      resume, 
      previous_experience, 
      duration, 
      instructor_id,
      department_id, 
      course_id, 
      status } = applicationData;

      console.log(applicationData);
    
    // Step 1: Check if applicant exists
    db.query('SELECT * FROM applicant WHERE id = ?', [applicant_id], (err, result) => {
      if (err) return callback(err, null);

      if (result.length === 0) {
        return callback(new Error('Applicant not found'), null); // Applicant does not exist
      }

      // Step 2: Create the application if the applicant exists
      db.query(
        'INSERT INTO applications (applicant_id, firstname, lastname, email, znumber, gpa, level_of_education, date_of_graduation, resume, previous_experience, duration, instructor_id, department_id, course_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [applicant_id, firstname, lastname, email, znumber, gpa, level_of_education, date_of_graduation, resume, previous_experience, duration, instructor_id, department_id, course_id, status],
        (err, result) => {
          if (err) {
            console.error("Database query error:", err);  // Log the error
            return callback(err, null);
          }
          callback(null, result);
        }
      );
      
    });
  },

  update: (id, applicationData, callback) => {
    const { applicant_id, firstname, lastname, email, Znumber, gpa, level_of_education, date_of_graduation, resume, previous_experience, course, duration, department_id, course_id, status } = applicationData;
    db.query(
      'UPDATE applications SET applicant_id = ?, firstname = ?, lastname = ?, email = ?, Znumber = ?, gpa = ?, level_of_education = ?, date_of_graduation = ?, resume = ?, previous_experience = ?, course = ?, duration = ?, department_id = ?, course_id = ?, status = ? WHERE id = ?',
      [applicant_id, firstname, lastname, email, Znumber, gpa, level_of_education, date_of_graduation, resume, previous_experience, course, duration, department_id, course_id, status, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM applications WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = application;
