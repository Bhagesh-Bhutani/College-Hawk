const express = require('express');
const router = express.Router();

const faceDetectionController = require('../controllers/face_detection');

router.get('/', faceDetectionController.getFaceDetectionPage);

module.exports = router;