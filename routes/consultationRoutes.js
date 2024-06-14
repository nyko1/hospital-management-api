const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Route to get all consultations
router.get('/consultation-list', consultationController.getConsultations);

// Route to get a specific consultation by ID
router.get('/consultation/:id', consultationController.getConsultation);

// Route to create a new consultation
router.post('/consultation-create', consultationController.createConsultation);

// Route to update an existing consultation by ID
router.put('/consultation-update/:id', consultationController.updateConsultation);

// Route to delete a consultation by ID
router.delete('/consultation-delete/:id', consultationController.deleteConsultation);

module.exports = router;
