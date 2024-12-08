const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error('Invalid token:', error.message);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
