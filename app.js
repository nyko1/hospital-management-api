const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes')
const consultationRoutes = require('./routes/consultationRoutes');
const patientRoutes = require('./routes/patientRoutes');


const app = express();

app.use(cors()); 
// Utiliser le middleware body-parser pour parser le JSON
app.use(bodyParser.json());

// Utiliser les routes d'authentification
app.use('/auth', authRoutes);
app.use('/api/specialist', specialiteRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/patient', patientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
