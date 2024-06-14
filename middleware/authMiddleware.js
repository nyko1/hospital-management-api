const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    User.findById(decoded.id, (err, user) => {
      if (err || !user) {
        return res.status(500).json({ message: 'Failed to find user' });
      }

      req.userId = decoded.id;
      req.userRole = user.ROLE;
      next();
    });
  });
};

module.exports = authMiddleware;
