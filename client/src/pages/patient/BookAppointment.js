import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../utils/api';
import { FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    reasonForVisit: '',
    symptoms: '',
  });
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchDoctor = async () => {
    try {
      const response = await api.get(`/doctors/${doctorId}`);
      setDoctor(response.data.data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      setError('Failed to load doctor details');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await api.get(`/doctors/${doctorId}/available-slots?date=${dateStr}`);
      setAvailableSlots(response.data.data);
      setSelectedSlot(null);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedSlot) {
      setError('Please select a date and time slot');
      return;
    }

    setBookingLoading(true);

    try {
      const appointmentData = {
        doctorId,
        appointmentDate: selectedDate,
        timeSlot: {
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        },
        reasonForVisit: formData.reasonForVisit,
        symptoms: formData.symptoms,
      };

      const response = await api.post('/appointments', appointmentData);
      setBookedAppointment(response.data.data);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  const downloadConfirmation = async () => {
    try {
      const response = await api.get(`/appointments/${bookedAppointment._id}/confirmation`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `appointment-${bookedAppointment.appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download confirmation slip');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (success && bookedAppointment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
            <p className="text-gray-600 mb-6">Your appointment has been successfully booked.</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Appointment ID:</strong> {bookedAppointment.appointmentId}</p>
                <p><strong>Doctor:</strong> Dr. {doctor.userId.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Date:</strong> {new Date(bookedAppointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {bookedAppointment.timeSlot.startTime} - {bookedAppointment.timeSlot.endTime}</p>
                <p><strong>Status:</strong> <span className="text-yellow-600 font-semibold">Pending Doctor Approval</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={downloadConfirmation}
                className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Download Confirmation Slip
              </button>
              
              <button
                onClick={() => navigate('/patient/appointments')}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                View My Appointments
              </button>

              <button
                onClick={() => navigate('/patient/doctors')}
                className="w-full py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-2">Schedule your visit with the doctor</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FaUserMd className="text-primary-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {doctor.userId.name}
                  </h3>
                  <p className="text-sm text-primary-600">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Qualification:</strong> {doctor.qualifications}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>
              </div>

              {doctor.clinicAddress && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Clinic Address</p>
                  <p className="text-sm text-gray-600">
                    {doctor.clinicAddress.fullAddress || `${doctor.clinicAddress.city}, ${doctor.clinicAddress.state}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>

              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholderText="Choose a date"
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline mr-2" />
                    Available Time Slots
                  </label>
                  
                  {availableSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No slots available for this date</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!slot.isAvailable}
                          className={`py-2 px-4 rounded-md text-sm font-medium transition ${
                            slot.isAvailable
                              ? selectedSlot?.startTime === slot.startTime
                                ? 'bg-primary-600 text-white'
                                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.startTime}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Reason for Visit */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <input
                  type="text"
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Regular checkup, fever, etc."
                />
              </div>

              {/* Symptoms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms (Optional)
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your symptoms..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading || !selectedDate || !selectedSlot}
                className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
