// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const dotenv = require('dotenv');
dotenv.config();


// Fonction pour l'enregistrement d'un utilisateur
exports.register = (req, res) => {
  const { iduser, username, password, role } = req.body;
  // Vérifier si l'utilisateur existe déjà
  User.findByUsername(username, (err, user) => {
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hacher le mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });

      const newUser = {
        iduser,
        username,
        motdepasse: hashedPassword,
        role,
        token: null
      };
      
      // Créer un nouvel utilisateur
      User.createUser(newUser, (err, userId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully', userId });
      });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Trouver l'utilisateur par son nom d'utilisateur
  User.findByUsername(username, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'User not found' });
    }
     
    try {
      // Comparer le mot de passe haché
      bcrypt.compare(password, user.MOTDEPASSE, (err, isMatch) => {
        if (err) {
          console.error('Error during password comparison:', err);
          return res.status(500).json({ error: err.message });
        }

        if (!isMatch) {
          console.log('Password does not match');
          return res.status(400).json({ message: 'Incorrect password' });
        }

        // Générer un token JWT
        const token = generateToken(user);

        // Mettre à jour le token de l'utilisateur
        User.updateUserToken(user.IDUSER, token, (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(200).json({ message: 'Logged in successfully', id: user.IDUSER, token, role: user.ROLE });
        });
      });
    } catch (err) {
      console.error('Error in try-catch block:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};


// Fonction pour changer le mot de passe d'un utilisateur
exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'User not found'});
    }

    bcrypt.compare(oldPassword, user.MOTDEPASSE, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }

      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        User.updateUserPassword(userId, hashedPassword, (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(200).json({ message: 'Password changed successfully' });
        });
      });
    });
  });
};

// Fonction pour réinitialiser le mot de passe d'un utilisateur (admin only)
exports.resetPassword = (req, res) => {
  const id = req.params.id;
  const { newPassword } = req.body;
  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'User not found' });
    }

    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });

      User.updateUserPassword(user.IDUSER , hashedPassword, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Password reset successfully' });
      });
    });
  });
};


// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(users);
  });
};

// Fonction pour récupérer un utilisateur par son ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  });
};


// Fonction pour récupérer un utilisateur par son ID
exports.getUserByUsername = (req, res) => {
  const userName = req.params.username;
  User.findByUsername(userName, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  });
};


// Fonction pour supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    User.deleteUser(userId, (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });
  });
};
