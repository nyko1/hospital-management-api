const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction pour générer un token JWT
const generateToken = (user) => {
  const payload = { id: user.IDUSER, username: user.USERNAME, role: user.ROLE };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


module.exports = { generateToken };
