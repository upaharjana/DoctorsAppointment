import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../utils/api';
import { FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (appointmentId) => {
    try {
      await api.put(`/appointments/${appointmentId}/status`, {
        status: 'confirmed',
      });
      fetchAppointments();
      alert('Appointment confirmed successfully');
    } catch (error) {
      console.error('Error approving appointment:', error);
      alert('Failed to confirm appointment');
    }
  };

  const handleReject = async (appointmentId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      await api.put(`/appointments/${appointmentId}/status`, {
        status: 'rejected',
        doctorNotes: reason,
      });
      fetchAppointments();
      alert('Appointment rejected');
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      alert('Failed to reject appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">Manage patient appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex overflow-x-auto">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  filter === status
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FaCalendarAlt className="mx-auto text-gray-300 text-6xl mb-4" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.patientId?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.patientId?.email} | {appointment.patientId?.phone}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Appointment ID</p>
                        <p>{appointment.appointmentId}</p>
                      </div>
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p>
                          {new Date(appointment.appointmentDate).toLocaleDateString()} at{' '}
                          {appointment.timeSlot.startTime}
                        </p>
                      </div>
                      {appointment.reasonForVisit && (
                        <div className="col-span-2">
                          <p className="font-medium">Reason for Visit</p>
                          <p>{appointment.reasonForVisit}</p>
                        </div>
                      )}
                      {appointment.symptoms && (
                        <div className="col-span-2">
                          <p className="font-medium">Symptoms</p>
                          <p>{appointment.symptoms}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {appointment.status === 'pending' && (
                    <div className="flex flex-col space-y-2 md:ml-6">
                      <button
                        onClick={() => handleApprove(appointment._id)}
                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                      >
                        <FaCheck className="mr-2" />
                        Approve
                      </button>
                      
                      <button
                        onClick={() => handleReject(appointment._id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                      >
                        <FaTimes className="mr-2" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
