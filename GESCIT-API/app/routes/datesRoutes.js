const express = require('express');
const router = express.Router();
const DatesController = require('../controllers/Operation/DatesController');

router.post('/addOrUpdateDates', DatesController.addOrUpdateDateHandler);

router.post('/GetScheduleTimes', DatesController.GetScheduleTimesHandler);

router.post('/GetOperationTypes', DatesController.GetOperationTypesHandler);

router.post('/GetProducts', DatesController.GetProductsHandler);

router.post('/GetTransportLines', DatesController.GetTransportLinesHandler);

router.post('/GetTransports', DatesController.GetTransportsHandler);

router.post('/GetDrivers', DatesController.GetDriversHandler);

router.post('/GetDates', DatesController.GetDatesHandler);

router.get('/GetTransportType', DatesController.GetTransportTypesHandler);

router.post('/GetTransportsByType', DatesController.GetTransportsByTypeHandler);

router.get('/IsAppointmentTimeAvailable', DatesController.IsAppointmentTimeAvailableHandler);

router.post('/ScheduleAvailable', DatesController.ScheduleAvailableHandler);

router.post('/CancelDate', DatesController.CancelDateHandler);

router.get('/GetSchedules', DatesController.GetSchedulesHandler);

router.post('/GetAllHoursOfSchedule', DatesController.GetAllHoursOfScheduleHandler);

router.post('/AssignDateHour', DatesController.AssignDateHourHandler);

router.post('/GetClientInfoByFolio', DatesController.GetClientInfoByFolioHandler);

router.post('/UpdateDateStatus', DatesController.UpdateDateStatusHandler);

module.exports = router;