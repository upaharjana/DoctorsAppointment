import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorList from './pages/patient/DoctorList';
import BookAppointment from './pages/patient/BookAppointment';
import PatientAppointments from './pages/patient/PatientAppointments';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Routes */}
          <Route
            path="/patient"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/doctors"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <DoctorList />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/book-appointment/:doctorId"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/appointments"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientAppointments />
              </PrivateRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorAppointments />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
