const Specialite = require('../models/specialite');

// Crée une nouvelle spécialité
exports.createSpecialite = (req, res) => {
  const data = req.body;

  Specialite.create(data, (err, results) => {
    if (err) {
      console.error('Error inserting specialist:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Specialist created!', id: results.insertId });
    }
  });
};

 // Récupère les spécialistes
 exports.getAllSpecialists = (req, res) => {
  Specialite.getAll((err, results) => {
    if (err) {
      console.error('Error fetching specialists:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Récupère toutes les spécialités
exports.getAllSpecialites = (req, res) => {
  Specialite.getSpecialities((err, results) => {
    if (err) {
      console.error('Error fetching specialists:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Récupère une spécialité par ID
exports.getSpecialiteById = (req, res) => {
  const id = req.params.id;

  Specialite.getById(id, (err, results) => {
    if (err) {
      console.error('Error fetching specialist:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });

  
 
};

// Met à jour une spécialité
exports.updateSpecialite = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Specialite.update(id, data, (err, results) => {
    if (err) {
      console.error('Error updating specialist:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Specialist updated!' });
    }
  });
};

// Supprime une spécialité
exports.deleteSpecialite = (req, res) => {
  const id = req.params.id;

  Specialite.delete(id, (err, results) => {
    if (err) {
      console.error('Error deleting specialist:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Specialist deleted!' });
    }
  });
};

 //Compter Docteur
 exports.doctorCount = (req, res) =>{
  Specialite.doctorCount ((err, response) =>{
    if (err) {
      console.error('Error count specialite:', err);
      res.status(500).json({ error: err.message });
    }else{
      res.status(200).json(response);
    }
  }
)
 }


 //Compter Staff
 exports.staffCount = (req, res) =>{
  Specialite.staffCount ((err, response) =>{
    if (err) {
      console.error('Error count staff:', err);
      res.status(500).json({ error: err.message });
    }else{
      res.status(200).json(response);
    }
  }
)
 }

 // Récupère les spécialistes par spécialité
exports.getSpecialistsBySpecialite = (req, res) => {
  const specialite = req.params.specialite;

  Specialite.getSpecialistsBySpecialite(specialite, (err, results) => {
    if (err) {
      console.error('Error fetching specialists by specialite:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

