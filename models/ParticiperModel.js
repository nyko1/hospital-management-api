const db = require('../config/db');

class ParticiperModel{

    static getAllParticiper(callback) {
        const query = "SELECT * FROM PARTICIPER";
        db.query(query, (error, results) => {
            callback(error, results);
        });
    }


    static getSpecialistByIDConsultation(id, callback) {
        const query = "SELECT * FROM PARTICIPER WHERE IDCONSULTATION = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results[0]);
        });
    }

    static getConsultationByIDSpecialist(id, callback) {
        const query = "SELECT * FROM PARTICIPER WHERE IDSPECIALISTE = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results[0]);
        });
    }

    static createParticiper(participer, callback) {
        const { IDCONSULTATION, IDSPECIALISTE, TACHE } = participer;
        const query = `INSERT INTO PARTICIPER (IDCONSULTATION, IDSPECIALISTE, TACHE)
                       VALUES (?, ?, ?)`;
        db.query(query, [IDCONSULTATION, IDSPECIALISTE, TACHE], (error, results) => {
            callback(error, results);
        });
    }

    static deleteParticiper(id, callback) {
        const query = "DELETE FROM PARTICIPER WHERE IDCONSULTATION = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results);
        });
    }
}


module.exports = ParticiperModel;
