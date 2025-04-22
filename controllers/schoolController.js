const { validationResult } = require('express-validator');
const db = require('../config/db');
const haversineDistance = require('../utils/haversine');

exports.listSchools = async (req, res) => {
  const { userLat, userLon } = req.query;

  if (!userLat || !userLon) {
    return res.status(400).json({ error: "Please provide user latitude and longitude." });
  }

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
  }

  const sql = 'SELECT * FROM schools';

  try {
    const [schools] = await db.query(sql);

    const schoolsWithDistance = schools.map(school => {
      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });

    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (err) {
    console.error('Select error:', err);
    res.status(500).json({ error: 'Database fetch error' });
  }
};

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, address, latitude, longitude]);

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Database insert error' });
  }
};
