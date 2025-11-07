import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../utils/api';
import { FaUserMd, FaStar, FaSearch, FaFilter } from 'react-icons/fa';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filters, setFilters] = useState({
    specialization: '',
    search: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [filters, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors');
      const docs = response.data.data;
      setDoctors(docs);
      setFilteredDoctors(docs);

      // Extract unique specializations
      const specs = [...new Set(docs.map(d => d.specialization))];
      setSpecializations(specs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = [...doctors];

    if (filters.specialization) {
      filtered = filtered.filter(d => d.specialization === filters.specialization);
    }

    if (filters.search) {
      filtered = filtered.filter(d =>
        d.userId.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ specialization: '', search: '' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
          <p className="text-gray-600 mt-2">Browse and book appointments with top specialists</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSearch className="inline mr-2" />
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name or specialization"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" />
                Specialization
              </label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredDoctors.length}</span> doctor(s)
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FaUserMd className="mx-auto text-gray-300 text-6xl mb-4" />
              <p className="text-gray-500">No doctors found</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
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
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({doctor.totalReviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{doctor.qualifications}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Experience:</span> {doctor.experience} years
                    </p>
                  </div>

                  {doctor.about && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{doctor.about}</p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-lg font-bold text-primary-600">
                        ₹{doctor.consultationFee}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/patient/book-appointment/${doctor._id}`)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
