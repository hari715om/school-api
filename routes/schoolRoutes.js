const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const schoolController = require('../controllers/schoolController');

router.get('/', (req, res) => {
  res.send('Welcome to the School Management API!');
});

// Add School
router.post('/addSchool', [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
], schoolController.addSchool);

// List Schools
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
