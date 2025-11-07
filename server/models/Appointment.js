const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'rejected', 'completed'],
    default: 'pending'
  },
  reasonForVisit: {
    type: String,
    maxlength: 500
  },
  symptoms: {
    type: String,
    maxlength: 1000
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  doctorNotes: {
    type: String,
    maxlength: 1000
  },
  cancellationReason: {
    type: String,
    maxlength: 500
  },
  prescriptions: [{
    medicine: String,
    dosage: String,
    duration: String
  }],
  diagnosis: {
    type: String,
    maxlength: 1000
  },
  followUpDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate unique appointment ID
appointmentSchema.pre('save', async function(next) {
  if (!this.appointmentId) {
    const date = new Date();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.appointmentId = `APT${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
