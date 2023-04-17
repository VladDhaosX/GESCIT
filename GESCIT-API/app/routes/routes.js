const express = require('express');
const router = express.Router()

const configurationRoutes = require('./configurationRoutes');
const datesRoutes = require('./datesRoutes');
const catalogsRoutes = require('./catalogsRoutes');
const documentsRoutes = require('./documentsRoutes');
const toolsRoutes = require('./toolsRoutes');
const swaggerRoutes = require('./swaggerRoutes');
const scheduleRoutes = require('./ScheduleRoutes');
const mailRoutes = require('./MailRoutes');

router.use(`/swagger`, swaggerRoutes);

router.use(`/configuration`, configurationRoutes);

router.use(`/catalogs`, catalogsRoutes);

router.use(`/dates`, datesRoutes);

router.use(`/documents`, documentsRoutes);

router.use(`/tools`, toolsRoutes);

router.use(`/schedule`, scheduleRoutes);

router.use(`/mail`, mailRoutes);

module.exports = router;