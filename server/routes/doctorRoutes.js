const express = require('express');
const router = express.Router();
const {
  registerDoctor,
  getDoctors,
  getDoctorById,
  updateDoctorProfile,
  getMyDoctorProfile,
  getAvailableSlots
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/available-slots', getAvailableSlots);

// Private routes
router.post('/register', protect, registerDoctor);
router.get('/me/profile', protect, authorize('doctor'), getMyDoctorProfile);
router.put('/profile', protect, authorize('doctor'), updateDoctorProfile);

module.exports = router;
