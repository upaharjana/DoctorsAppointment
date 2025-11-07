const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (patient)
const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      timeSlot,
      reasonForVisit,
      symptoms
    } = req.body;

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    if (!doctor.isApproved || !doctor.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available for appointments'
      });
    }

    // Check if slot is already booked
    const date = new Date(appointmentDate);
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      },
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      timeSlot,
      reasonForVisit,
      symptoms,
      status: 'pending'
    });

    // Populate details
    await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email phone' } }
    ]);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all appointments for logged-in user
// @route   GET /api/appointments/my-appointments
// @access  Private
const getMyAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patientId: req.user._id })
        .populate('doctorId')
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', select: 'name email phone' }
        })
        .sort({ appointmentDate: -1 });
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }

      appointments = await Appointment.find({ doctorId: doctor._id })
        .populate('patientId', 'name email phone gender dateOfBirth')
        .sort({ appointmentDate: -1 });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone gender dateOfBirth address')
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

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment status (approve/reject by doctor)
// @route   PUT /api/appointments/:id/status
// @access  Private (doctor)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, doctorNotes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if doctor owns this appointment
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    appointment.status = status;
    if (doctorNotes) {
      appointment.doctorNotes = doctorNotes;
    }

    await appointment.save();

    await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email phone' } }
    ]);

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel appointment (by patient)
// @route   PUT /api/appointments/:id/cancel
// @access  Private (patient)
const cancelAppointment = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if patient owns this appointment
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already cancelled'
      });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = cancellationReason;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private (patient)
const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentDate, timeSlot } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if patient owns this appointment
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reschedule this appointment'
      });
    }

    // Check if new slot is available
    const date = new Date(appointmentDate);
    const existingAppointment = await Appointment.findOne({
      _id: { $ne: appointment._id },
      doctorId: appointment.doctorId,
      appointmentDate: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      },
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    appointment.appointmentDate = appointmentDate;
    appointment.timeSlot = timeSlot;
    appointment.status = 'pending'; // Reset to pending for doctor approval

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment rescheduled successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add prescription and diagnosis
// @route   PUT /api/appointments/:id/complete
// @access  Private (doctor)
const completeAppointment = async (req, res) => {
  try {
    const { prescriptions, diagnosis, doctorNotes, followUpDate } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if doctor owns this appointment
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    appointment.prescriptions = prescriptions;
    appointment.diagnosis = diagnosis;
    appointment.doctorNotes = doctorNotes;
    appointment.followUpDate = followUpDate;
    appointment.status = 'completed';

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment completed successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment,
  completeAppointment
};
