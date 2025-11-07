import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaSignOutAlt, FaHome, FaCalendarAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  const getDashboardLink = () => {
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'doctor':
        return '/doctor';
      case 'patient':
        return '/patient';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={getDashboardLink()} className="flex items-center space-x-2">
              <FaUserMd className="text-primary-600 text-3xl" />
              <span className="text-xl font-bold text-gray-800">HealthCare</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to={getDashboardLink()}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>

            {user.role === 'patient' && (
              <>
                <Link
                  to="/patient/doctors"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FaUserMd />
                  <span>Find Doctors</span>
                </Link>
                <Link
                  to="/patient/appointments"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FaCalendarAlt />
                  <span>My Appointments</span>
                </Link>
              </>
            )}

            {user.role === 'doctor' && (
              <Link
                to="/doctor/appointments"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaCalendarAlt />
                <span>Appointments</span>
              </Link>
            )}

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUser className="text-gray-500" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
