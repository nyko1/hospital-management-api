const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Route to get all consultations
router.get('/consultation-list', consultationController.getConsultations);

// Route to get all appointements
router.get('/appointement-list', consultationController.getAppointements);

// Route to get a specific consultation by ID
router.get('/:id', consultationController.getConsultation);

// Route to get a specific appointement by ID
router.get('/:id', consultationController.getOneAppointement);

// Route to create a new consultation
router.post('/create', consultationController.createConsultation);

// Route to update an existing consultation by ID
router.put('/update/:id', consultationController.updateConsultation);

// Route to delete a consultation by ID
router.delete('/delete/:id', consultationController.deleteConsultation);

module.exports = router;
