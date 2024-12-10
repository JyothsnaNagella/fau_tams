const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Middleware to authenticate staff
const Course = require('../models/course'); // Course model
const Application = require('../models/application'); // Application model
const { route } = require('./applicant');
const router = express.Router();
const Instructor = require('../models/instructor');
const Committee = require('../models/committee');
const Department = require('../models/department');

// Add a new course that requires TAs
router.post('/courses', (req, res) => {
  const { coursename, department_id, instructor_id,status } = req.body;

  // Validate input
  if (!coursename || !department_id || !instructor_id ) {
    return res.status(400).send('Missing required fields');
  }

  const courseData = {
    coursename,
    department_id,
    instructor_id,
    status
  };

  Course.create(courseData, (err, result) => {
    if (err) return res.status(500).send('Error adding course');
    res.status(201).json({ message: 'Course added successfully', courseId: result.insertId });
  });
});

// Get all courses that require TAs
router.get('/courses', (req, res) => {
  Course.getAll((err, courses) => {
    if (err) return res.status(500).send('Error fetching courses');
    res.status(200).json(courses);
  });
});

// Match TA applicants to courses based on expertise and preferences
router.post('/applications/match', verifyToken, (req, res) => {
  const { courseId, applicantId } = req.body;

  // Validate input
  if (!courseId || !applicantId) {
    return res.status(400).send('Missing required fields');
  }

  // Update the application with the matched course
  Application.update(applicantId, { course_id: courseId }, (err, result) => {
    if (err) return res.status(500).send('Error matching application to course');
    res.status(200).json({ message: 'Application matched to course successfully' });
  });
});

router.get('/applications', (req, res) => {
  Application.getAll((err, applications) => {
    if (err) return res.status(500).send('Error fetching applications');
    res.status(200).json(applications);
  });
});

router.get('/instructors', (req, res) => {
  Instructor.getAll((err, instructors) => {
    if (err) return res.status(500).send('Error fetching instructors');
    res.status(200).json(instructors);
  });   

})

router.get('/committee', (req, res) => {
  Committee.getAll((err, committees) => {
    if (err) return res.status(500).send('Error fetching committees');
    res.status(200).json(committees);
  });

})

router.get('/applications/approved', (req, res) => {
  Application.getAllApproved((err, applications) => {
    if (err) return res.status(500).send('Error fetching applications');
    res.status(200).json(applications);
  });

})

router.get('/department', (req, res) => {
  Department.getAll((err, department) => {
    if (err) return res.status(500).send('Error fetching departments');
    res.status(200).json(department);
  });

})

router.delete('/instructors/:id',(req, res) => {
  Instructor.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send('Error deleting instructor');
    res.status(200).json({ message: 'Instructor deleted successfully' });
  })
  
}) 

router.put('/applications/:id/notify', (req, res) => {
  Application.setApplicationNotify(req.params.id, (err, result) => {
    if (err) return res.status(500).send('Error handling notifications');
    res.status(200).json({ message: 'Notifications handled successfully' });
  });
}); 
// Recommend TA applications to the committee
router.post('/applications/recommend', (req, res) => {
  const { applicationId } = req.body;

  if (!applicationId) return res.status(400).send('Application ID is required');

  // Update the application status to 'Recommended'
  Application.recommendApplication(applicationId, (err, result) => {
    if (err) return res.status(500).send('Error recommending application');
    res.status(200).json({ message: 'Application recommended successfully' });
  });
});

// Get all recommended applications
router.get('/applications/recommended', (req, res) => {
  Application.getAllRecommended((err, results) => {
    if (err) return res.status(500).send('Error fetching recommended applications');
    res.status(200).json(results);
  });
});

// Get all applications by course ID
router.get('/courses/:courseId/applications', verifyToken, (req, res) => {
  const { courseId } = req.params;

  Application.getAll((err, applications) => {
    if (err) return res.status(500).send('Error fetching applications');
    const filteredApplications = applications.filter(app => app.course_id === parseInt(courseId));
    res.status(200).json(filteredApplications);
  });
});

module.exports = router;
