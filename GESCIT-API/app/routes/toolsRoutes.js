const express = require('express');
const router = express.Router();
const ToolsController = require('../controllers/Tools/ToolsController');

router.post('/GetAllSchedulesAvailables', ToolsController.GetAllSchedulesAvailables);

module.exports = router;