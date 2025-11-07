const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Register as a doctor
// @route   POST /api/doctors/register
// @access  Private (authenticated user)
const registerDoctor = async (req, res) => {
  try {
    const {
      specialization,
      qualifications,
      experience,
      consultationFee,
      about,
      clinicAddress,
      availableSlots
    } = req.body;

    // Check if user already has a doctor profile
    const existingDoctor = await Doctor.findOne({ userId: req.user._id });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor profile already exists'
      });
    }

    // Update user role to doctor
    await User.findByIdAndUpdate(req.user._id, { role: 'doctor' });

    // Create doctor profile
    const doctor = await Doctor.create({
      userId: req.user._id,
      specialization,
      qualifications,
      experience,
      consultationFee,
      about,
      clinicAddress,
      availableSlots,
      isApproved: false // Requires admin approval
    });

    res.status(201).json({
      success: true,
      message: 'Doctor registration submitted. Awaiting admin approval.',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all doctors with filters
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const { specialization, search, isAvailable } = req.query;

    // Build query
    let query = { isApproved: true };

    if (specialization) {
      query.specialization = specialization;
    }

    if (isAvailable === 'true') {
      query.isAvailable = true;
    }

    let doctors = await Doctor.find(query)
      .populate('userId', 'name email phone')
      .sort({ rating: -1, createdAt: -1 });

    // Search by name
    if (search) {
      doctors = doctors.filter(doc => 
        doc.userId.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone gender address');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (doctor only)
const updateDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      qualifications,
      experience,
      consultationFee,
      about,
      clinicAddress,
      availableSlots,
      isAvailable
    } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }

    // Update fields
    if (specialization) doctor.specialization = specialization;
    if (qualifications) doctor.qualifications = qualifications;
    if (experience !== undefined) doctor.experience = experience;
    if (consultationFee !== undefined) doctor.consultationFee = consultationFee;
    if (about) doctor.about = about;
    if (clinicAddress) doctor.clinicAddress = clinicAddress;
    if (availableSlots) doctor.availableSlots = availableSlots;
    if (isAvailable !== undefined) doctor.isAvailable = isAvailable;

    await doctor.save();

    res.status(200).json({
      success: true,
      message: 'Doctor profile updated successfully',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get my doctor profile
// @route   GET /api/doctors/me
// @access  Private (doctor only)
const getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id })
      .populate('userId', 'name email phone gender address');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get available time slots for a doctor on specific date
// @route   GET /api/doctors/:id/available-slots
// @access  Public
const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query; // Expected format: YYYY-MM-DD
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const requestedDate = new Date(date);
    const dayName = requestedDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Find slots for the requested day
    const daySlots = doctor.availableSlots.filter(slot => slot.day === dayName);

    if (daySlots.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No slots available for this day',
        data: []
      });
    }

    // Generate time slots
    const Appointment = require('../models/Appointment');
    const allSlots = [];

    for (const slot of daySlots) {
      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);
      
      let currentTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;
      const duration = slot.slotDuration || 30;

      while (currentTime + duration <= endTime) {
        const slotStartHour = Math.floor(currentTime / 60);
        const slotStartMin = currentTime % 60;
        const slotEndTime = currentTime + duration;
        const slotEndHour = Math.floor(slotEndTime / 60);
        const slotEndMin = slotEndTime % 60;

        const startTimeStr = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMin).padStart(2, '0')}`;
        const endTimeStr = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMin).padStart(2, '0')}`;

        // Check if slot is already booked
        const appointmentDate = new Date(date);
        const isBooked = await Appointment.findOne({
          doctorId: doctor._id,
          appointmentDate: {
            $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
            $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
          },
          'timeSlot.startTime': startTimeStr,
          status: { $in: ['pending', 'confirmed'] }
        });

        allSlots.push({
          startTime: startTimeStr,
          endTime: endTimeStr,
          isAvailable: !isBooked
        });

        currentTime += duration;
      }
    }

    res.status(200).json({
      success: true,
      data: allSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerDoctor,
  getDoctors,
  getDoctorById,
  updateDoctorProfile,
  getMyDoctorProfile,
  getAvailableSlots
};
