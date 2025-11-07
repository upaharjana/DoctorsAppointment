import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../utils/api';
import { FaCalendarAlt, FaUserMd, FaClock, FaCheckCircle } from 'react-icons/fa';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      const appts = response.data.data;
      setAppointments(appts.slice(0, 5)); // Recent 5

      // Calculate stats
      setStats({
        total: appts.length,
        pending: appts.filter(a => a.status === 'pending').length,
        confirmed: appts.filter(a => a.status === 'confirmed').length,
        completed: appts.filter(a => a.status === 'completed').length,
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
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
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your health overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <FaCalendarAlt className="text-primary-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <FaClock className="text-yellow-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.confirmed}</p>
              </div>
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.completed}</p>
              </div>
              <FaCheckCircle className="text-blue-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/patient/doctors"
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Find Doctors</h3>
              <p className="text-primary-100">Browse and book appointments with specialists</p>
            </div>
            <FaUserMd className="text-5xl opacity-50" />
          </Link>

          <Link
            to="/patient/appointments"
            className="bg-white hover:bg-gray-50 border-2 border-primary-600 text-primary-600 rounded-lg shadow-lg p-6 flex items-center justify-between transition"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">My Appointments</h3>
              <p className="text-gray-600">View and manage your appointments</p>
            </div>
            <FaCalendarAlt className="text-5xl opacity-50" />
          </Link>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
          </div>
          
          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <FaCalendarAlt className="mx-auto text-gray-300 text-5xl mb-4" />
                <p className="text-gray-500">No appointments yet</p>
                <Link
                  to="/patient/doctors"
                  className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Book your first appointment →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Dr. {appointment.doctorId?.userId?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.doctorId?.specialization}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(appointment.appointmentDate).toLocaleDateString()} at{' '}
                          {appointment.timeSlot.startTime}
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
                  </div>
                ))}
                
                <Link
                  to="/patient/appointments"
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                >
                  View all appointments →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
