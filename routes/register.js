const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register_controller');

router.get('/', registerController.getRegisterPage);

router.post('/', registerController.createUser);

module.exports = router;