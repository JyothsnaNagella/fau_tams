const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied, no token provided.' });
  }

  token = req.headers['authorization'].split(' ')[1]

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
