const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { generateAppointmentPDF } = require('../utils/pdfGenerator');
const { protect } = require('../middleware/auth');

// @desc    Generate and download appointment confirmation PDF
// @route   GET /api/appointments/:id/confirmation
// @access  Private
router.get('/:id/confirmation', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone gender dateOfBirth')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (req.user.role === 'patient' && appointment.patientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this appointment'
      });
    }

    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (appointment.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this appointment'
        });
      }
    }

    // Generate PDF
    const pdfBuffer = await generateAppointmentPDF(
      appointment,
      appointment.doctorId,
      appointment.patientId
    );

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=appointment-${appointment.appointmentId}.pdf`
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating PDF: ' + error.message
    });
  }
});

module.exports = router;
