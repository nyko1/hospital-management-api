const db = require('../config/db');

class Specialite {
  // Crée une nouvelle spécialité
  static create(data, callback) {
    const query = 'INSERT INTO SPECIALITE (IDSPECIALISTE, NOMSPECIALISTE, PRENOMSPECIALISTE, SPECIALITE, GRADESPECIALISTE) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.idspecialiste, data.nomspecialiste, data.prenomspecialiste, data.specialite, data.gradespecialiste], callback);
  }

  // Récupère toutes les spécialités
  static getAll(callback) {
    const query = 'SELECT * FROM SPECIALITE';
    db.query(query, callback);
  }

  // Récupère une spécialité par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM SPECIALITE WHERE IDSPECIALISTE = ?';
    db.query(query, [id], callback);
  }

  // Met à jour une spécialité
  static update(id, data, callback) {
    const query = 'UPDATE SPECIALITE SET NOMSPECIALISTE = ?, PRENOMSPECIALISTE = ?, SPECIALITE = ?, GRADESPECIALISTE = ? WHERE IDSPECIALISTE = ?';
    db.query(query, [data.nomspecialiste, data.prenomspecialiste, data.specialite, data.gradespecialiste, id], callback);
  }

  // Supprime une spécialité
  static delete(id, callback) {
    const query = 'DELETE FROM SPECIALITE WHERE IDSPECIALISTE = ?';
    db.query(query, [id], callback);
  }


  //le nombre de spécialistes
  static doctorCount(callback){
    const query = `SELECT COUNT(IDSPECIALISTE) AS nombre FROM SPECIALITE
                   WHERE SPECIALITE.GRADESPECIALISTE ='A4';`
    db.query(query, callback)
  }

  //le nombre de spécialistes par spécialité
  static specialistGroup(callback){
    const query = `SELECT SPECIALITE, COUNT(IDSPECIALISTE) AS NombreSpecialistes
                    FROM SPECIALITE GROUP BY SPECIALITE; `
    db.query(query, callback)
  }

   //le nombre de spécialistes par spécialité
   static staffCount(callback){
    const query = `SELECT COUNT(IDSPECIALISTE) AS staff FROM SPECIALITE ; `
    db.query(query, callback)
  }
  

  static getSpecialistsBySpecialite(specialite, callback){
    const query = `SELECT PRENOMSPECIALISTE FROM SPECIALITE WHERE SPECIALITE.SPECIALITE = ? ; `
    db.query(query, [specialite], callback);
  }

  static getSpecialities(callback){
    const query = `SELECT DISTINCT SPECIALITE.SPECIALITE FROM SPECIALITE ; `
    db.query(query, callback);
  }


}

module.exports = Specialite;
