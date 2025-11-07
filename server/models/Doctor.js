const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    enum: [
      'Cardiologist',
      'Dermatologist',
      'Dentist',
      'Neurologist',
      'Orthopedic',
      'Pediatrician',
      'Psychiatrist',
      'General Physician',
      'ENT Specialist',
      'Gynecologist',
      'Ophthalmologist',
      'Urologist',
      'Gastroenterologist',
      'Endocrinologist',
      'Nephrologist',
      'Pulmonologist',
      'Rheumatologist',
      'Oncologist',
      'Radiologist',
      'Anesthesiologist',
      'Pathologist',
      'Ayurvedic Doctor',
      'Homeopathic Doctor',
      'Physiotherapist',
      'Diabetologist',
      'Sexologist'
    ]
  },
  qualifications: {
    type: String,
    required: [true, 'Qualifications are required']
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: 0
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: 0
  },
  about: {
    type: String,
    maxlength: 1000
  },
  clinicAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    fullAddress: String
  },
  availableSlots: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String, // Format: "09:00"
    endTime: String,   // Format: "17:00"
    slotDuration: {
      type: Number,
      default: 30 // in minutes
    }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for getting doctor's full details
doctorSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

doctorSchema.set('toJSON', { virtuals: true });
doctorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Doctor', doctorSchema);
