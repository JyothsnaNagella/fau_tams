const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Example protected endpoint
router.get('/', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Access granted to protected data.',
    user: req.user, // Contains the decoded user information from the JWT
  });
});

module.exports = router;
