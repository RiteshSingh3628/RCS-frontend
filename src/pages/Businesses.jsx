import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaPlus, FaEdit, FaTrash, FaEye, FaStar, FaMapMarkerAlt, FaGlobe, FaPhone } from 'react-icons/fa';
import { businesses as businessesApi, categories as categoriesApi } from '../api/api';

const Businesses = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const data = await businessesApi.list();
      setBusinesses(data.results || data);
    } catch (err) {
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.list();
      setCategories(data.results || data);
    } catch (err) {
      setCategories([]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            onClick={() => setEditingBusiness(business)}
            className="p-2 text-gray-400 hover:text-blue-600"
          >
            <FaEdit />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-600">
            <FaEye />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600">
            <FaTrash />
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


  const AddBusinessModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      location: '',
      website: '',
      phone: '',
      email: '',
      description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await businessesApi.create(formData);
        await fetchBusinesses();
        setFormData({
          name: '',
          category: '',
          location: '',
          website: '',
          phone: '',
          email: '',
          description: ''
        });
        onClose();
      } catch (err) {
        alert('Failed to create business');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Business</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id || cat} value={cat.name || cat}>{cat.name || cat}</option>
          ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                  Add Business
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Businesses</h1>
            <p className="text-gray-600 mt-2">Manage your business listings and track their performance</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FaPlus className="mr-2" />
                Add Business
              </button>
            </div>
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
                {filteredBusinesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No businesses found</div>
                  <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AddBusinessModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default Businesses;