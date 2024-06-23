const express = require('express');
const router = express.Router();
const participerController = require('../controllers/participerController');

router.get('/participer-list', participerController.getParticiper);
router.get('/participer-specialist', participerController.getSpecialistByIDConsultation);
router.get('/participer-patient', participerController.getConsultationByIDSpecialist);
router.post('/participer-create', participerController.createParticiper);
router.delete('/participer-delete', participerController.deleteParticiper);



module.exports = router