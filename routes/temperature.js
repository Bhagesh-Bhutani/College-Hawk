const express = require('express');
const router = express.Router();

const temperatureController = require('../controllers/temperature_controller');

router.get('/:id', temperatureController.renderTemperaturePage);

router.post('/:id', temperatureController.verifyUserTemperature);

module.exports = router;