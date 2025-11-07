const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment,
  completeAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Patient and Doctor routes
router.get('/my-appointments', getMyAppointments);
router.get('/:id', getAppointmentById);

// Patient only routes
router.post('/', authorize('patient'), createAppointment);
router.put('/:id/cancel', authorize('patient'), cancelAppointment);
router.put('/:id/reschedule', authorize('patient'), rescheduleAppointment);

// Doctor only routes
router.put('/:id/status', authorize('doctor'), updateAppointmentStatus);
router.put('/:id/complete', authorize('doctor'), completeAppointment);

module.exports = router;
