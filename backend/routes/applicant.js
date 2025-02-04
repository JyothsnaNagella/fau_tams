const express = require('express');
const multer = require('multer'); // To handle file uploads
const verifyToken = require('../middleware/verifyToken'); 
const allowedRoles = require('../middleware/allowedRoles');
const Applicant = require('../models/applicant');
const Application = require('../models/application');
const Instructor = require('../models/instructor');
const Course = require('../models/course');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory where files will be stored
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

router.put('/accept/:id', verifyToken, allowedRoles('applicant'), (req, res) => {
  const applicationId = req.params.id;
  Application.acceptApplication(applicationId, (err, result) => {
    if (err) {
      console.error('Error accepting application:', err);
      return res.status(500).send('Error accepting application');
    }
    res.status(200).send('Application accepted successfully');
  });
}); 

router.put('/deny/:id', verifyToken, allowedRoles('applicant'), (req, res) => {
  const applicationId = req.params.id;
  Application.denyApplication(applicationId, (err, result) => {
    if (err) {
      console.error('Error denying application:', err);
      return res.status(500).send('Error denying application');
    }
    res.status(200).send('Application denied successfully');
  });
});

router.get('/courses', verifyToken, allowedRoles('applicant'), (req, res) => {
  Course.getAll((err, courses) => {
    if (err) return res.status(500).send('Error fetching courses');
    res.status(200).json(courses);
  });
});

// Create application for an applicant
router.post('/:id/apply', upload.single('cv'), verifyToken, allowedRoles('applicant'), (req, res) => {
  const { id } = req.params;

  // @TODO We need to first name, last name, znumber, email, and password from the user id

  // Extract form fields from the request body
  const { prevTA, coursesDates, qualifiedCourses, gpa, levelOfEducation, graduationDate, previousExperience, department } = req.body;
  console.log(req.body);
  console.log(prevTA, coursesDates, qualifiedCourses);
  const isPrevTA = prevTA === 'yes'; // Radio button value is either 'yes' or 'no'

  Applicant.getById(id, (err, applicant) => {
    if (err) return res.status(500).send('Error getting applicant');
    if (!applicant) return res.status(404).send('Applicant not found');
    const { firstname, lastname, znumber, email } = applicant[0];
    console.log("applicant: ", applicant)
    console.log(firstname, lastname, znumber, email);
    Instructor.getByCourseID(qualifiedCourses, (err, result) => {
      if (err) return res.status(500).send('Error getting instructor');
      if (!result) return res.status(404).send('Instructor not found');
      
      const instructor_id = result.id;

      // Form data to insert
      const applicationData = {
        applicant_id: id,
        firstname,
        lastname,
        email,
        znumber,
        prevTA,
        gpa,
        previous_experience: previousExperience,
        department_id: department,
        course_id: qualifiedCourses,
        level_of_education: levelOfEducation,
        date_of_graduation: graduationDate,
        duration: coursesDates,
        instructor_id, 
        status: 'Pending',
        course_id: qualifiedCourses, // Array of course IDs
        resume: req.file ? req.file.path : null, // CV file path (uploaded file)
      };

      // Create the application
      Application.create(applicationData, (err, result) => {
        if (err) return res.status(500).send('Error creating application');
        res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
      });
    });

  })


});


router.get('/:id/applications', verifyToken, allowedRoles('applicant'), (req, res) => {
  const { id } = req.params;
  Application.getApplicationsByApplicantId(id, (err, result) => {
    if (err) return res.status(500).send('Error getting applications');
    if (!result) return res.status(404).send('Applications not found');
    res.status(200).json(result);
  });
});

module.exports = router;
