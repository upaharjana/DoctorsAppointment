const express = require('express');
const router = express.Router();
const {
  getSystemStats,
  getAllUsers,
  getAllDoctors,
  updateDoctorApproval,
  deleteUser,
  toggleUserStatus,
  getAllAppointments,
  deleteAppointment
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

// Statistics
router.get('/stats', getSystemStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Doctor management
router.get('/doctors', getAllDoctors);
router.put('/doctors/:id/approval', updateDoctorApproval);

// Appointment management
router.get('/appointments', getAllAppointments);
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;
