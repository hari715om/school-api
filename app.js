// app.js
const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/', schoolRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
