const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Établir la connexion
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  // Tester quelle base de données est actuellement sélectionnée
  connection.query('SELECT DATABASE()', (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la base de données sélectionnée:', err);
      return;
    }
    console.log('Base de données actuellement sélectionnée:', result[0]['DATABASE()']);
  });

  createAdminUser();
});

// Fonction pour créer automatiquement l'utilisateur administrateur
const createAdminUser = () => {
  const adminUsername = 'admin';
  const adminPassword = 'admin'; // Changez ce mot de passe en un mot de passe fort
  const adminRole = 'admin';
  const query = 'SELECT * FROM UTILISATEUR WHERE ROLE = ?';

  connection.query(query, [adminRole], (err, results) => {
    if (err) {
      console.error('Error checking for admin user:', err);
      return;
    }

    if (results.length === 0) {
      bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing admin password:', err);
          return;
        }

        const insertQuery = 'INSERT INTO UTILISATEUR (iduser, username, motdepasse, role, token) VALUES (?, ?, ?, ?, ?)';
        const adminId = generateUniqueId();
        connection.query(insertQuery, [adminId, adminUsername, hashedPassword, adminRole, null], (err) => {
          if (err) {
            console.error('Error creating admin user:', err);
            return;
          }
          console.log('Admin user created');
        });
      });
    }
  });
};

// Fonction pour générer un ID utilisateur unique de 15 caractères
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 15);
};

module.exports = connection;
