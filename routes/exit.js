const express = require('express');
const router = express.Router();

const exitController = require('../controllers/exit_controller');

router.get('/', exitController.renderExitPage);

router.get('/:email', exitController.verifyUserExit);

module.exports = router;