const express = require('express');
const router = express.Router();

const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication')

// Define route
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// GET tripByCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

// Authentication 
    router
        .route('/login')
        .post(authController.login)

    router
        .route('/register')
        .post(authController.register)

module.exports = router;