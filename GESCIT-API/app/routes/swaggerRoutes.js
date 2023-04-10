const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerController = require('../controllers/Tools/swaggerController');

router.use(`/swagger`, swaggerUi.serve);
router.get(`/swagger`, swaggerController.swagger);

router.use(`/regenSwagger`, swaggerUi.serve);
router.get(`/regenSwagger`, swaggerController.regenSwagger);

module.exports = router;