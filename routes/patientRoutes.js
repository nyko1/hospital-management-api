const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/create', patientController.createPatient);
router.put('/update/:id', patientController.updatePatient);
router.delete('delete/:id', patientController.deletePatient);
router.get('/patient-list/', patientController.getAllPatients);
router.get('/:id', patientController.getOnePatient);
router.get('/count/daily', patientController.getDailyPatientCount);
router.get('/count/total', patientController.getTotalPatientCount);
router.get('/average', patientController.getAveragePatient);

module.exports = router;
