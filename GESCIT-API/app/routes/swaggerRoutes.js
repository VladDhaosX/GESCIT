const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerController = require('../controllers/Tools/swaggerController');

router.use(`/`, swaggerUi.serve);
router.get(`/`, swaggerController.swagger);

router.use(`/swagger`, swaggerUi.serve);
router.get(`/swagger`, swaggerController.regenSwagger);

module.exports = router;