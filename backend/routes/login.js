const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Import the models
const applicant = require('../models/applicant');
const staff = require('../models/staff');
const committee = require('../models/committee');
const instructor = require('../models/instructor');

// Login route
router.post('/', async (req, res) => {
    console.log(req.body);
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Email, password, and userType are required' });
  }

  // Determine which model to use based on userType
  let model;
  switch (userType.toLowerCase()) {
    case 'applicant':
      model = applicant;
      break;
    case 'staff':
      model = staff;
      break;
    case 'committee':
      model = committee;
      break;
    case 'instructor':
      model = instructor;
      break;
    default:
      return res.status(400).json({ message: 'Invalid user type' });
  }

  try {
    // Fetch the user by email
    model.getByEmail(email, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error querying the database' });
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error comparing passwords' });
        }

        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            userType,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Send the token in the response
        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            userType,
          },
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
