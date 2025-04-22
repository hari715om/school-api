const { validationResult } = require('express-validator');
const db = require('../config/db');
const haversineDistance = require('../utils/haversine'); // Import the haversine function

// List all schools sorted by distance from the user's location
exports.listSchools = async (req, res) => {
  const { userLat, userLon } = req.query;

  // Check if userLat and userLon are provided
  if (!userLat || !userLon) {
    return res.status(400).json({ error: "Please provide user latitude and longitude." });
  }

  const sql = 'SELECT * FROM schools';

  try {
    const [schools] = await db.query(sql);

    // Calculate distance for each school and add it to the school object
    const schoolsWithDistance = schools.map(school => {
      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });

    // Sort schools by distance (ascending order)
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (err) {
    console.error('Select error:', err);
    res.status(500).json({ error: 'Database fetch error' });
  }
};
