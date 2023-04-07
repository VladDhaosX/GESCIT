const express = require('express');
const router = express.Router();
const ToolsController = require('../controllers/Tools/ToolsController');

router.post('/GetAllSchedulesAvailable', ToolsController.GetAllSchedulesAvailable);

module.exports = router;