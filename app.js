const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🎉 Welcome to the School Management API!',
    availableEndpoints: {
      addSchool: '/api/addSchool',
      listSchools: '/api/listSchools',
    },
    instructions: 'Use POST /api/addSchool to add a new school and GET /api/listSchools to get a list of all schools.',
  });
});

// Routes
app.use('/api', schoolRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
