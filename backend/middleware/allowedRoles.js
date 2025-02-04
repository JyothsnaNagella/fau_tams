const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.userType)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions.' });
      }
      next();
    };
  };
  
  module.exports = allowRoles;
  