const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/Operation/ScheduleController');

router.post('/GetScheduleTimes', ScheduleController.GetScheduleTimesHandler);

router.get('/IsAppointmentTimeAvailable', ScheduleController.IsAppointmentTimeAvailableHandler);

router.post('/ScheduleAvailable', ScheduleController.ScheduleAvailableHandler);

router.get('/GetSchedules', ScheduleController.GetSchedulesHandler);

router.post('/GetAllHoursOfSchedule', ScheduleController.GetAllHoursOfScheduleHandler);

router.post('/GetAvailableScheduleTimesWActualSchedule', ScheduleController.GetAvailableScheduleTimesWActualScheduleHandler);

module.exports = router;