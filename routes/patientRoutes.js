const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/patient-create', patientController.createPatient);
router.put('/patient-update/:id', patientController.updatePatient);
router.delete('/patient-delete/:id', patientController.deletePatient);
router.get('/patient-list/', patientController.getAllPatients);
router.get('/patient/:id', patientController.getOnePatient);
router.get('/patient-count/daily', patientController.getDailyPatientCount);
router.get('/patient-count/total', patientController.getTotalPatientCount);
router.get('/patient-average', patientController.getAveragePatient);

module.exports = router;
