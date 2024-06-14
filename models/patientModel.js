const db = require('../config/db');

class PatientModel {
    static createPatient(data, callback) {
        const query = `INSERT INTO DOSSIERPATIENT (IDDOSSIERPATIENT, NOMPATIENT, PRENOMSPATIENT, DATENAISSPATIENT, ADRESSEPATIENT, TELPATIENT, EMAILPATIENT, PROFESSIONPATIENT, ANTECEDENTPATIENT, GROUPESANGUIN)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [data.IDDOSSIERPATIENT, data.NOMPATIENT, data.PRENOMSPATIENT, data.DATENAISSPATIENT, data.ADRESSEPATIENT, data.TELPATIENT, data.EMAILPATIENT, data.PROFESSIONPATIENT, data.ANTECEDENTPATIENT, data.GROUPESANGUIN], (error, results) => {
            callback(error, results);
        });
    }

    static updatePatient(id, data, callback) {
        const query = `UPDATE DOSSIERPATIENT SET NOMPATIENT = ?, PRENOMSPATIENT = ?, DATENAISSPATIENT = ?, ADRESSEPATIENT = ?, TELPATIENT = ?, EMAILPATIENT = ?, PROFESSIONPATIENT = ?, ANTECEDENTPATIENT = ?, GROUPESANGUIN = ? WHERE IDDOSSIERPATIENT = ?`;
        db.query(query, [data.NOMPATIENT, data.PRENOMSPATIENT, data.DATENAISSPATIENT, data.ADRESSEPATIENT, data.TELPATIENT, data.EMAILPATIENT, data.PROFESSIONPATIENT, data.ANTECEDENTPATIENT, data.GROUPESANGUIN, id], (error, results) => {
            callback(error, results);
        });
    }

    static deletePatient(id, callback) {
        const query = "DELETE FROM DOSSIERPATIENT WHERE IDDOSSIERPATIENT = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results);
        });
    }

    static getAllPatients(callback) {
        const query = "SELECT * FROM DOSSIERPATIENT";
        db.query(query, (error, results) => {
            callback(error, results);
        });
    }

    static getOnePatient(id, callback) {
        const query = "SELECT * FROM DOSSIERPATIENT WHERE IDDOSSIERPATIENT = ?";
        db.query(query, [id], (error, results) => {
            callback(error, results[0]);
        });
    }

    static getDailyPatientCount(callback) {
        const query = "SELECT DATE(CREATED_AT) AS date, COUNT(*) AS count FROM DOSSIERPATIENT GROUP BY DATE(CREATED_AT)";
        db.query(query, (error, results) => {
            callback(error, results);
        });
    }

    static getTotalPatientCount(callback) {
        const query = "SELECT COUNT(*) AS total FROM DOSSIERPATIENT";
        db.query(query, (error, results) => {
            callback(error, results[0]);
        });
    }

    static getAveragePatient(callback) {
        const query = "SELECT AVG(daily_count) AS average FROM (SELECT COUNT(*) AS daily_count FROM DOSSIERPATIENT GROUP BY DATE(CREATED_AT)) AS daily_counts";
        db.query(query, (error, results) => {
            callback(error, results[0]);
        });
    }
}

module.exports = PatientModel;
