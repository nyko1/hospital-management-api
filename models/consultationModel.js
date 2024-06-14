const db = require('../config/db');

class ConsultationModel {
    static getAllConsultations(callback) {
        const query = "SELECT * FROM CONSULTATION";
        db.query(query, (error, results) => {
            callback(error, results);
        });
    }

    static getConsultationById(id, callback) {
        const query = "SELECT * FROM CONSULTATION WHERE IDCONSULTATION = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results[0]);
        });
    }

    static createConsultation(consultation, callback) {
        const { IDCONSULTATION, IDDOSSIERPATIENT, STATUT, TYPECONSULTATION, DATECONSULTATION, DIAGNOSTIC, ACTEMEDICAL, PRESCRIPTION, CONSTANTE } = consultation;
        const query = `INSERT INTO CONSULTATION (IDCONSULTATION, IDDOSSIERPATIENT, STATUT, TYPECONSULTATION, DATECONSULTATION, DIAGNOSTIC, ACTEMEDICAL, PRESCRIPTION, CONSTANTE)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [IDCONSULTATION, IDDOSSIERPATIENT, STATUT, TYPECONSULTATION, DATECONSULTATION, DIAGNOSTIC, ACTEMEDICAL, PRESCRIPTION, CONSTANTE], (error, results) => {
            callback(error, results);
        });
    }

    static updateConsultation(id, consultation, callback) {
        const { STATUT, DIAGNOSTIC, ACTEMEDICAL, PRESCRIPTION, CONSTANTE } = consultation;
        const query = `UPDATE CONSULTATION SET STATUT = ?, DIAGNOSTIC = ?, ACTEMEDICAL = ?, PRESCRIPTION = ?, CONSTANTE = ? WHERE IDCONSULTATION = ?`;
        db.query(query, [STATUT, DIAGNOSTIC, ACTEMEDICAL, PRESCRIPTION, CONSTANTE, id], (error, results) => {
            callback(error, results);
        });
    }

    static deleteConsultation(id, callback) {
        const query = "DELETE FROM CONSULTATION WHERE IDCONSULTATION = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results);
        });
    }
}

module.exports = ConsultationModel;
