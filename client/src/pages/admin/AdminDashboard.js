import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../utils/api';
import { FaUsers, FaUserMd, FaCalendarAlt, FaDollarSign, FaCheck, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, doctorsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/doctors?isApproved=false'),
      ]);
      
      setStats(statsRes.data.data);
      setPendingDoctors(doctorsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorApproval = async (doctorId, isApproved) => {
    try {
      await api.put(`/admin/doctors/${doctorId}/approval`, { isApproved });
      fetchData();
      alert(`Doctor ${isApproved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error updating doctor approval:', error);
      alert('Failed to update doctor approval');
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats?.users?.totalPatients || 0}
                </p>
              </div>
              <FaUsers className="text-primary-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {stats?.users?.totalDoctors || 0}
                </p>
              </div>
              <FaUserMd className="text-green-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {stats?.appointments?.total || 0}
                </p>
              </div>
              <FaCalendarAlt className="text-blue-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  ${stats?.revenue?.total || 0}
                </p>
              </div>
              <FaDollarSign className="text-purple-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* Appointment Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {stats?.appointments?.pending || 0}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats?.appointments?.confirmed || 0}
              </p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {stats?.appointments?.completed || 0}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {stats?.appointments?.cancelled || 0}
              </p>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
          </div>
        </div>

        {/* Pending Doctor Approvals */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Doctor Approvals ({pendingDoctors.length})
            </h2>
          </div>
          
          <div className="p-6">
            {pendingDoctors.length === 0 ? (
              <div className="text-center py-8">
                <FaUserMd className="mx-auto text-gray-300 text-5xl mb-4" />
                <p className="text-gray-500">No pending doctor approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Dr. {doctor.userId?.name}
                        </h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Qualifications:</strong> {doctor.qualifications}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Experience:</strong> {doctor.experience} years
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Fee:</strong> ₹{doctor.consultationFee}
                        </p>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleDoctorApproval(doctor._id, true)}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                        >
                          <FaCheck className="mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDoctorApproval(doctor._id, false)}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                        >
                          <FaTimes className="mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
