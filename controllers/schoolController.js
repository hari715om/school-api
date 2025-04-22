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
  
      console.log('Schools data:', schools);
  
      const schoolsWithDistance = schools.map(school => {
        const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
        return { ...school, distance };
      });
  
      console.log('Schools with calculated distance:', schoolsWithDistance);
  
      const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
      res.status(200).json(sortedSchools);
    } catch (err) {
      console.error('Select error:', err);
      res.status(500).json({ error: 'Database fetch error' });
    }
  };
  