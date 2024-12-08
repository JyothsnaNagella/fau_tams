const express = require('express');
const multer = require('multer'); // To handle file uploads
const verifyToken = require('../middleware/verifyToken'); 
const Application = require('../models/application');
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


// Create application for an applicant
router.post('/:id/apply', upload.single('cv'), (req, res) => {
  const { id } = req.params;
  console.log(id);

  // @TODO We need to first name, last name, znumber, email, and password from the user id

  // Extract form fields from the request body
  const { prevTA, coursesDates, qualifiedCourses } = req.body;
  console.log(req.body);
  console.log(prevTA, coursesDates, qualifiedCourses);
  const isPrevTA = prevTA === 'yes'; // Radio button value is either 'yes' or 'no'

  // Form data to insert
  const applicationData = {
    applicant_id: id,
    prevTA: isPrevTA,
    coursesDates: isPrevTA ? coursesDates : null, // Only set if the applicant was a TA before
    qualifiedCourses: qualifiedCourses, // Array of course IDs
    cv: req.file ? req.file.path : null, // CV file path (uploaded file)
  };

  // Create the application
  Application.create(applicationData, (err, result) => {
    if (err) return res.status(500).send('Error creating application');
    res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  });
});

module.exports = router;
