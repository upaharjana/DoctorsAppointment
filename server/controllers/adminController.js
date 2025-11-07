const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private (admin only)
const getSystemStats = async (req, res) => {
  try {
    // Count users by role
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await Doctor.countDocuments({ isApproved: true });
    const pendingDoctors = await Doctor.countDocuments({ isApproved: false });

    // Count appointments by status
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });

    // Recent appointments
    const recentAppointments = await Appointment.find()
      .populate('patientId', 'name email')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name' }
      })
      .sort({ createdAt: -1 })
      .limit(10);

    // Calculate revenue (total consultation fees from completed appointments)
    const completedAppts = await Appointment.find({ status: 'completed' })
      .populate('doctorId', 'consultationFee');
    
    const totalRevenue = completedAppts.reduce((sum, appt) => {
      return sum + (appt.doctorId?.consultationFee || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        users: {
          totalPatients,
          totalDoctors,
          pendingDoctors
        },
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          completed: completedAppointments,
          cancelled: cancelledAppointments
        },
        revenue: {
          total: totalRevenue
        },
        recentAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin only)
const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    let query = {};
    if (role) {
      query.role = role;
    }

    let users = await User.find(query).select('-password').sort({ createdAt: -1 });

    if (search) {
      users = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all doctors (including pending)
// @route   GET /api/admin/doctors
// @access  Private (admin only)
const getAllDoctors = async (req, res) => {
  try {
    const { isApproved } = req.query;

    let query = {};
    if (isApproved !== undefined) {
      query.isApproved = isApproved === 'true';
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

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

// @desc    Approve or reject doctor
// @route   PUT /api/admin/doctors/:id/approval
// @access  Private (admin only)
const updateDoctorApproval = async (req, res) => {
  try {
    const { isApproved } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    doctor.isApproved = isApproved;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: `Doctor ${isApproved ? 'approved' : 'rejected'} successfully`,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // If user is a doctor, delete doctor profile too
    if (user.role === 'doctor') {
      await Doctor.findOneAndDelete({ userId: user._id });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private (admin only)
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private (admin only)
const getAllAppointments = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      })
      .sort({ appointmentDate: -1 });

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

// @desc    Delete appointment
// @route   DELETE /api/admin/appointments/:id
// @access  Private (admin only)
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSystemStats,
  getAllUsers,
  getAllDoctors,
  updateDoctorApproval,
  deleteUser,
  toggleUserStatus,
  getAllAppointments,
  deleteAppointment
};
