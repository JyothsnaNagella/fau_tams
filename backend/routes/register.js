// routes/register.js
const express = require('express');
const router = express.Router();
const applicant = require('../models/applicant');

// Create Applicant (POST)
router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  const { firstname, lastname, znumber, email, password } = req.body;

  if (!firstname || !lastname || !znumber || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  console.log(firstname, lastname, znumber, email, password);

  // Check if email exists in the database
  applicant.getByEmail(email, (err, existingApplicant) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).send('Error checking email');
    }

    if (existingApplicant) {
      return res.status(400).send('Email already exists');
    }

    // Create the new applicant
    applicant.create({ firstname, lastname, znumber, email, password }, (err, results) => {
      if (err) {
        console.error('Error registering applicant:', err);
        return res.status(500).send('Error registering applicant');
      }

      return res.status(201).send({ message: 'Applicant registered successfully', applicantId: results.insertId });
    });
  });
});


// Read Applicant (GET by ID)
router.get('/:id', (req, res) => {
  const applicantId = req.params.id;

  const query = 'SELECT * FROM applicant WHERE id = ?';
  connection.query(query, [applicantId], (err, results) => {
    if (err) {
      console.error('Error fetching applicant:', err);
      return res.status(500).send('Error fetching applicant');
    }
    if (results.length === 0) {
      return res.status(404).send('Applicant not found');
    }
    res.status(200).json(results[0]);
  });
});

// Update Applicant (PUT)
router.put('/:id', (req, res) => {
  const applicantId = req.params.id;
  const { firstname, lastname, znumber, email, password } = req.body;

  const query = 'UPDATE applicant SET firstname = ?, lastname = ?, znumber = ?, email = ?, password = ? WHERE id = ?';
  connection.query(query, [firstname, lastname, znumber, email, password, applicantId], (err, results) => {
    if (err) {
      console.error('Error updating applicant:', err);
      return res.status(500).send('Error updating applicant');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Applicant not found');
    }
    res.status(200).send('Applicant updated successfully');
  });
});

// Delete Applicant (DELETE)
router.delete('/:id', (req, res) => {
  const applicantId = req.params.id;

  const query = 'DELETE FROM applicant WHERE id = ?';
  connection.query(query, [applicantId], (err, results) => {
    if (err) {
      console.error('Error deleting applicant:', err);
      return res.status(500).send('Error deleting applicant');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Applicant not found');
    }
    res.status(200).send('Applicant deleted successfully');
  });
});

module.exports = router;
