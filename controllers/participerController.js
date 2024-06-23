const ParticiperModel = require('../models/ParticiperModel');

exports.getParticiper = (req, res) => {
    ParticiperModel.getAllParticiper((error, results) => {
        if (error) {
            console.error('Error fetching participer:', error);
            return res.status(500).json({ error: 'Error fetching participer' });
        }
        res.status(200).json(results);
    });
};


exports.getSpecialistByIDConsultation = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ParticiperModel.getSpecialistByIDConsultation(id, (error, result) => {
        if (error) {
            console.error('Error fetching specialist:', error);
            return res.status(500).json({ error: 'Error fetching specialist' });
        }
        if (!result) {
            return res.status(404).json({ error: 'specialist not found' });
        }
        res.status(200).json(result);
    });
};

exports.getConsultationByIDSpecialist = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'specialist ID is required' });
    }
    ParticiperModel.getConsultationByIDSpecialist(id, (error, result) => {
        if (error) {
            console.error('Error fetching consultation:', error);
            return res.status(500).json({ error: 'Error fetching consultation' });
        }
        if (!result) {
            return res.status(404).json({ error: 'specialist not found' });
        }
        res.status(200).json(result);
    });
};


exports.createParticiper = (req, res) => {
    const participer = req.body;
    ParticiperModel.createConsultation(participer, (error) => {
        if (error) {
            console.error('Error creating participer:', error);
            return res.status(500).json({ error: 'Error creating participer' });
        }
        res.status(201).json({ message: 'Participer created successfully.' });
    });
};


exports.deleteParticiper = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Consultation ID is required' });
    }
    ParticiperModel.deleteParticiper(id, (error) => {
        if (error) {
            console.error('Error deleting consultation:', error);
            return res.status(500).json({ error: 'Error deleting consultation' });
        }
        res.status(200).json({ message: 'Participer deleted successfully.' });
    });
};
