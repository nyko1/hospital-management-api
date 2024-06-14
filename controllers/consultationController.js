const ConsultationModel = require('../models/consultationModel');

exports.getConsultations = (req, res) => {
    ConsultationModel.getAllConsultations((error, results) => {
        if (error) {
            console.error('Error fetching consultations:', error);
            return res.status(500).json({ error: 'Error fetching consultations' });
        }
        res.status(200).json(results);
    });
};

exports.getAppointements = (req, res) => {
    ConsultationModel.getAllAppointements((error, results) => {
        if (error) {
            console.error('Error fetching appointement:', error);
            return res.status(500).json({ error: 'Error fetching appointements' });
        }
        res.status(200).json(results);
    });
};

exports.getConsultation = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ConsultationModel.getConsultationById(id, (error, result) => {
        if (error) {
            console.error('Error fetching consultation:', error);
            return res.status(500).json({ error: 'Error fetching consultation' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        res.status(200).json(result);
    });
};

exports.getOneAppointement = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ConsultationModel.getConsultationById(id, (error, result) => {
        if (error) {
            console.error('Error fetching consultation:', error);
            return res.status(500).json({ error: 'Error fetching consultation' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        res.status(200).json(result);
    });
};

exports.createConsultation = (req, res) => {
    const consultation = req.body;
    if (!consultation.IDCONSULTATION || !consultation.IDDOSSIERPATIENT) {
        return res.status(400).json({ error: 'IDCONSULTATION and IDDOSSIERPATIENT are required' });
    }
    ConsultationModel.createConsultation(consultation, (error) => {
        if (error) {
            console.error('Error creating consultation:', error);
            return res.status(500).json({ error: 'Error creating consultation' });
        }
        res.status(201).json({ message: 'Consultation created successfully.' });
    });
};

exports.updateConsultation = (req, res) => {
    const { id } = req.params;
    const consultation = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ConsultationModel.updateConsultation(id, consultation, (error) => {
        if (error) {
            console.error('Error updating consultation:', error);
            return res.status(500).json({ error: 'Error updating consultation' });
        }
        res.status(200).json({ message: 'Consultation updated successfully.' });
    });
};

exports.deleteConsultation = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ConsultationModel.deleteConsultation(id, (error) => {
        if (error) {
            console.error('Error deleting consultation:', error);
            return res.status(500).json({ error: 'Error deleting consultation' });
        }
        res.status(200).json({ message: 'Consultation deleted successfully.' });
    });
};
