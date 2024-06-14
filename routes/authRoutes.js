const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour l'enregistrement d'un utilisateur (accessible uniquement par un administrateur)
router.post('/register', authMiddleware, authController.register);

// Route pour la connexion d'un utilisateur
router.post('/login', authController.login);

// Route pour changer le mot de passe (authentification requise)
router.put('/change-password/:id', authMiddleware, authController.changePassword);

// Route pour réinitialiser le mot de passe (accessible uniquement par un administrateur)
router.put('/reset-password/:id', authMiddleware, authController.resetPassword);

// Route protégée nécessitant une authentification
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

// Route pour récupérer tous les utilisateurs (accessible uniquement par un administrateur)
router.get('/users', authMiddleware, (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  next();
}, authController.getAllUsers);

// Nouvelle route pour obtenir un utilisateur par ID
router.get('/user/:id', authController.getUserById);

//Suppression de l'utilisateur
router.delete('/delete-user/:id', authController.deleteUser)




module.exports = router;
