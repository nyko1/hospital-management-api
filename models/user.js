const db = require('../config/db');

class User {


  // Récupérer tous les utilisateurs
  static getAllUsers(callback) {
    const query = 'SELECT * FROM UTILISATEUR';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Trouver un utilisateur par son nom d'utilisateur
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM `UTILISATEUR` WHERE USERNAME = ?';
    db.query(query, [username], (err, results) => {
      if (err) return callback(err);
      //console.log('findByUsername results:', results); // Ajoutez cette ligne pour déboguer
      callback(null, results[0]);
    });
  }

  // Créer un nouvel utilisateur
  static createUser(user, callback) {
    const query = 'INSERT INTO UTILISATEUR (iduser, username, motdepasse, role, token) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.iduser, user.username, user.motdepasse, user.role, user.token], (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    });
  }

  // Mettre à jour le token de l'utilisateur
  static updateUserToken(iduser, token, callback) {
    const query = `UPDATE UTILISATEUR SET token = ? WHERE iduser = ?`;
    db.query(query, [token, iduser], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Trouver un utilisateur par son ID
  static findById(iduser, callback) {
    const query = 'SELECT * FROM UTILISATEUR WHERE iduser = ?';
    db.query(query, [iduser], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  // Mettre à jour le mot de passe de l'utilisateur
  static updateUserPassword(iduser, motdepasse, callback) {
    const query = 'UPDATE UTILISATEUR SET motdepasse = ? WHERE IDUSER = ?';
    db.query(query, [motdepasse, iduser], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Supprimer l'utilisateur
  static deleteUser(iduser, callback) {
    const query = 'DELETE FROM UTILISATEUR WHERE IDUSER = ?';
    db.query(query, [iduser], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }



}

module.exports = User;
