const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Define route
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET tripByCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;