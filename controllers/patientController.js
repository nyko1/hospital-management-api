const PatientModel = require('../models/patientModel');

exports.createPatient = (req, res) => {
    const data = req.body;
    PatientModel.createPatient(data, (error) => {
        if (error) {
            console.error('Error creating patient:', error);
            return res.status(500).json({ error: 'Failed to create patient' });
        }
        res.status(201).json({ message: 'Patient created successfully' });
    });
};

exports.updatePatient = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    PatientModel.updatePatient(id, data, (error) => {
        if (error) {
            console.error('Error updating patient:', error);
            return res.status(500).json({ error: 'Failed to update patient' });
        }
        res.status(200).json({ message: 'Patient updated successfully' });
    });
};

exports.deletePatient = (req, res) => {
    const { id } = req.params;
    PatientModel.deletePatient(id, (error) => {
        if (error) {
            console.error('Error deleting patient:', error);
            return res.status(500).json({ error: 'Failed to delete patient' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    });
};

exports.getAllPatients = (req, res) => {
    PatientModel.getAllPatients((error, results) => {
        if (error) {
            console.error('Error fetching patients:', error);
            return res.status(500).json({ error: 'Failed to fetch patients' });
        }
        res.status(200).json(results);
    });
};

exports.getOnePatient = (req, res) => {
    const { id } = req.params;
    PatientModel.getOnePatient(id, (error, result) => {
        if (error) {
            console.error('Error fetching patient:', error);
            return res.status(500).json({ error: 'Failed to fetch patient' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(result);
    });
};

exports.getDailyPatientCount = (req, res) => {
    PatientModel.getDailyPatientCount((error, results) => {
        if (error) {
            console.error('Error fetching daily patient count:', error);
            return res.status(500).json({ error: 'Failed to fetch daily patient count' });
        }
        res.status(200).json(results);
    });
};

exports.getTotalPatientCount = (req, res) => {
    PatientModel.getTotalPatientCount((error, result) => {
        if (error) {
            console.error('Error fetching total patient count:', error);
            return res.status(500).json({ error: 'Failed to fetch total patient count' });
        }
        res.status(200).json(result);
    });
};

exports.getAveragePatient = (req, res) => {
    PatientModel.getAveragePatient((error, result) => {
        if (error) {
            console.error('Error fetching average patient count:', error);
            return res.status(500).json({ error: 'Failed to fetch average patient count' });
        }
        res.status(200).json(result);
    });
};
