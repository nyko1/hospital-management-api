const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');

// Route pour créer une nouvelle spécialité
router.post('/add-specialist', specialiteController.createSpecialite);

//Route pour récupérer les spécialistes 
router.get('/list-specialists', specialiteController.getAllSpecialists)

// Route pour récupérer toutes les spécialités
router.get('/list-specialities', specialiteController.getAllSpecialites);

// Route pour récupérer le nombre spécialistes
router.get('/count-doctor', specialiteController.doctorCount);


// Route pour récupérer le nombre spécialistes
router.get('/count-staff', specialiteController.staffCount);

// Route pour récupérer une spécialité par ID
router.get('/:id', specialiteController.getSpecialiteById);

// Route pour mettre à jour une spécialité
router.put('/update-specialist/:id', specialiteController.updateSpecialite);

// Route pour supprimer une spécialité
router.delete('/:id', specialiteController.deleteSpecialite);

//Supprimer specialiste
router.delete('/delete-specialist/:id', specialiteController.deleteSpecialite)

//Route pour récupérer les spécialistes par la specialite
router.get('/list-specialist/:specialite', specialiteController.getSpecialistsBySpecialite)



module.exports = router;
