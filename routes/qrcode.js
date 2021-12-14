const express = require('express');
const router = express.Router();

const qrcodeController = require('../controllers/qrcode_controller');
const userShowQRController = require('../controllers/user_show_qrcode');

router.get('/', qrcodeController.getQRCodePage);

router.get('/show/:id', userShowQRController.showUserQRCode);

router.get('/:email', qrcodeController.getTemperaturePage);

module.exports = router;