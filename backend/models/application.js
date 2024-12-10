const db = require('../config/db');
const { accept } = require('./instructor');

const application = {
  getApplicationsByApplicantId: (applicantId, callback) => {
    db.query('SELECT * FROM applications WHERE applicant_id = ?', [applicantId], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }); 
  },

  setApplicationNotify: (applicationId, callback) => {
    db.query('UPDATE applications SET has_been_notified = 1, status = ? WHERE id = ?', ['Offer Pending', applicationId], (err, result) => {
      if (err) { 
        console.error('Error handling notifications:', err);
        return callback(err, null);
      }
      callback(null, result);
    });
  },


  getAllApproved: (callback) => {
    // add join for course
    const query = `
        SELECT 
            a.id, 
            a.applicant_id, 
            a.firstname, 
            a.lastname, 
            a.email, 
            a.znumber, 
            a.gpa, 
            a.level_of_education, 
            a.date_of_graduation, 
            a.resume, 
            a.previous_experience, 
            a.duration, 
            d.name AS department_name, 
            c.coursename AS course_name, 
            a.instructor_feedback_id, 
            i.firstname AS instructor_firstname, 
            i.lastname AS instructor_lastname,
            a.instructor_id, 
            a.status
        FROM applications a
        JOIN department d ON a.department_id = d.id
        JOIN course c ON a.course_id = c.id
        JOIN instructor i ON a.instructor_id = i.id
        WHERE a.status = ?`;

    db.query(query, ['Accepted'], (err, results) => {
      if(err) {
        console.error('Error fetching recommended applications:', err);
        return callback(err, null);
      }
        callback(null, results);
    });
},
  acceptApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Accepted', applicationId], (err, result) => {
      if (err) {
        console.error('Error accepting application:', err);
        return callback(err, null);
      }
      callback(null, result);
    });
  },
  approveApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Accepted', applicationId], (err, result) => {
      
      if (err) {
        console.error('Error approving application:', err);
        return callback(err, null);
      } 
      callback(null, result);
    });
  },

   denyApplication: (applicationId, callback) => {
    db.query('UPDATE applications SET status = ? WHERE id = ?', ['Denied', applicationId], (err, result) => {
      if (err) {
        console.error('Error denying application:', err);
        return callback(err, null);
      }
      callback(null, result);
    });   
   },

  getAllRecommended: (callback) => {
    const query = `
        SELECT 
            a.id, 
            a.applicant_id, 
            a.firstname, 
            a.lastname, 
            a.email, 
            a.znumber, 
            a.gpa, 
            a.level_of_education, 
            a.date_of_graduation, 
            a.resume, 
            a.previous_experience, 
            a.duration, 
            d.name AS department_name, 
            c.coursename AS course_name, 
            a.instructor_feedback_id, 
            i.firstname AS instructor_firstname, 
            i.lastname AS instructor_lastname,
            a.instructor_id, 
            a.status
        FROM applications a
        JOIN department d ON a.department_id = d.id
        JOIN course c ON a.course_id = c.id
        JOIN instructor i ON a.instructor_id = i.id
        WHERE a.status = ?`;

    db.query(query, ['Recommended'], (err, results) => {
      if(err) {
        console.error('Error fetching recommended applications:', err);
        return callback(err, null);
      }
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
    const query = `
    SELECT 
        a.id, 
        a.applicant_id, 
        a.firstname, 
        a.lastname, 
        a.email, 
        a.znumber, 
        a.gpa, 
        a.level_of_education, 
        a.date_of_graduation, 
        a.resume, 
        a.previous_experience, 
        a.duration, 
        d.name AS department_name, 
        c.coursename AS course_name, 
        a.instructor_feedback_id, 
        i.firstname AS instructor_firstname, 
        i.lastname AS instructor_lastname,
        a.instructor_id, 
        a.status
    FROM applications a
    JOIN department d ON a.department_id = d.id
    JOIN course c ON a.course_id = c.id
    JOIN instructor i ON a.instructor_id = i.id
    WHERE a.status = ?`;

db.query(query, ['Pending'], (err, results) => {
  if(err) {
    console.error('Error fetching recommended applications:', err);
    return callback(err, null);
  }
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
