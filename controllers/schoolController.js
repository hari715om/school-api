const { validationResult } = require('express-validator');
const db = require('../config/db');

// Add a school
exports.addSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;
  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await db.query(sql, [name, address, latitude, longitude]);
    res.status(201).json({
      message: 'School added successfully!',
      schoolId: result.insertId
    });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Database insert error' });
  }
};

// List all schools
exports.listSchools = async (req, res) => {
  const sql = 'SELECT * FROM schools';

  try {
    const [results] = await db.query(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error('Select error:', err);
    res.status(500).json({ error: 'Database fetch error' });
  }
};
