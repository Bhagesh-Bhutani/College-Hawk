const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.getHomePage);

router.use('/register', require('./register'));

router.use('/qrcode', require('./qrcode'));

router.use('/temperature', require('./temperature'));

router.use('/exit', require('./exit'));

module.exports = router;