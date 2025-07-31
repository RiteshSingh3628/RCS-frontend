import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaPlus, FaEdit, FaTrash, FaEye, FaStar, FaMapMarkerAlt, FaGlobe, FaPhone } from 'react-icons/fa';
import { businesses as businessesApi, categories as categoriesApi } from '../api/api';

const EditBusinessModal = ({ business, onClose,handleEditChange,handleSaveChanges }) => {
  if (!business) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Business</h2>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSaveChanges(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                name="name"
                required
                value={business.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                required
                value={business.category}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                value={business.location}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={business.website}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={business.phone}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={business.email}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                value={business.description}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Businesses = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const data = await businessesApi.list();
      // Ensure data is always an array
      const businessList = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : [data]);
      // Map API fields to frontend fields
      const mappedBusinesses = businessList.map(b => ({
        id: b.id,
        name: b.name,
        category: b.category,
        location: b.address, // address -> location
        website: b.website,
        phone: b.phone_number, // phone_number -> phone
        email: b.email,
        description: b.description,
        averageRating: b.average_rating, // average_rating -> averageRating
        totalReviews: b.total_reviews, // total_reviews -> totalReviews
        status: b.is_active ? 'active' : 'inactive', // is_active -> status
        logo: b.logo,
        owner: b.owner,
        uniqueId: b.unique_id,
        createdAt: b.created_at,
        updatedAt: b.updated_at,
      }));
      setBusinesses(mappedBusinesses);
    } catch (err) {
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Remove search and category filter, just show all businesses
  // const filteredBusinesses = businesses;

  const handleEdit = (business) => {
    setEditingBusiness(business);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBusiness(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare payload for API (convert camelCase to snake_case)
      const payload = {
        name: editingBusiness.name,
        category: editingBusiness.category,
        address: editingBusiness.location,
        website: editingBusiness.website,
        phone_number: editingBusiness.phone,
        email: editingBusiness.email,
        description: editingBusiness.description,
        is_active: editingBusiness.status === 'active',
        logo: editingBusiness.logo,
      };

      // console.log("paylod to change the data ",payload)
      await businessesApi.update(editingBusiness.id, payload);
      setEditingBusiness(null);
      await fetchBusinesses();
    } catch (err) {
      alert('Failed to update business');
    }
  };

  

  const BusinessCard = ({ business }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{business.name}</h3>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEdit(business)}
            className="p-2 text-gray-400 hover:text-blue-600"
          >
            <FaEdit /> Edit
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{business.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <FaMapMarkerAlt className="mr-2" />
          {business.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaGlobe className="mr-2" />
          <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {business.website}
          </a>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaPhone className="mr-2" />
          {business.phone}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{business.averageRating}</span>
          <span className="text-sm text-gray-500 ml-1">({business.totalReviews} reviews)</span>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          business.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {business.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-0 sm:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Business</h1>
            <p className="text-gray-600 mt-2">Manage your business</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{businesses.length}</div>
              <div className="text-sm text-gray-600">Total Businesses</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{businesses.filter(b => b.status === 'active').length}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{
                businesses.length > 0 ? (
                  (businesses.reduce((sum, b) => sum + (b.averageRating || 0), 0) / businesses.length).toFixed(1)
                ) : 0
              }</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">{
                businesses.reduce((sum, b) => sum + (b.totalReviews || 0), 0)
              }</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
          </div>

          {/* Business Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading businesses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {businesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              {businesses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No businesses found</div>
                  <p className="text-gray-400 mt-2">No business data available</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <EditBusinessModal business={editingBusiness} handleEditChange={handleEditChange} handleSaveChanges={handleSaveChanges} onClose={() => setEditingBusiness(null)} />
    </div>
  );
};

export default Businesses;