const { validationResult } = require('express-validator');
const db = require('../config/db');

// Add a school
exports.addSchool = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;
  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }

    res.status(201).json({ message: 'School added successfully!' });
  });
};

// List all schools
exports.listSchools = (req, res) => {
  const sql = 'SELECT * FROM schools';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Select error:', err);
      return res.status(500).json({ error: 'Database fetch error' });
    }

    res.status(200).json(results);
  });
};
