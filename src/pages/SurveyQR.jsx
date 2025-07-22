import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaQrcode, FaDownload, FaPrint, FaPlus, FaEdit, FaTrash, FaEye, FaCopy } from 'react-icons/fa';

const SurveyQR = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('qr-codes');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [qrSize, setQrSize] = useState('medium');
  const [includeInstructions, setIncludeInstructions] = useState(true);

  // Mock data
  const businesses = [
    { id: 1, name: 'Pizza Palace', location: 'Downtown Location' },
    { id: 2, name: 'TechRepair Pro', location: 'Main Branch' },
    { id: 3, name: 'Green Fitness Center', location: 'North Campus' },
  ];

  const qrCodes = [
    {
      id: 1,
      businessName: 'Pizza Palace',
      location: 'Downtown Location',
      created: '2024-01-15',
      scans: 245,
      reviews: 42,
      url: 'https://feedback.pizzapalace.com/qr/1',
      status: 'active'
    },
    {
      id: 2,
      businessName: 'TechRepair Pro',
      location: 'Main Branch',
      created: '2024-01-10',
      scans: 189,
      reviews: 31,
      url: 'https://feedback.techrepairpro.com/qr/2',
      status: 'active'
    },
  ];

  const surveyQuestions = [
    {
      id: 1,
      question: 'How would you rate your overall experience?',
      type: 'rating',
      required: true,
      business: 'All Businesses',
      order: 1,
      active: true
    },
    {
      id: 2,
      question: 'What did you like most about our service?',
      type: 'text',
      required: false,
      business: 'All Businesses',
      order: 2,
      active: true
    },
    {
      id: 3,
      question: 'Would you recommend us to a friend?',
      type: 'yes_no',
      required: true,
      business: 'All Businesses',
      order: 3,
      active: true
    },
    {
      id: 4,
      question: 'How was the food quality?',
      type: 'rating',
      required: true,
      business: 'Pizza Palace',
      order: 4,
      active: true
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const generateQRCode = (url, size = 200) => {
    // This would typically use a QR code library like qrcode.js
    // For demo purposes, using a placeholder QR code service
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
  };

  const QRCodeCard = ({ qr }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{qr.businessName}</h3>
          <p className="text-sm text-gray-600">{qr.location}</p>
          <p className="text-xs text-gray-500 mt-1">Created: {qr.created}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-600" title="View Details">
            <FaEye />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-600" title="Download">
            <FaDownload />
          </button>
          <button className="p-2 text-gray-400 hover:text-purple-600" title="Print">
            <FaPrint />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 mb-4">
        <img 
          src={generateQRCode(qr.url, 150)} 
          alt="QR Code" 
          className="w-32 h-32"
        />
      </div>

      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
            <FaCopy className="mr-1" />
            Copy URL
          </button>
        </div>
        <p className="text-xs text-gray-500 break-all">{qr.url}</p>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{qr.scans}</div>
          <div className="text-xs text-gray-600">Scans</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">{qr.reviews}</div>
          <div className="text-xs text-gray-600">Reviews</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${qr.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
            {qr.status === 'active' ? '●' : '○'}
          </div>
          <div className="text-xs text-gray-600">Status</div>
        </div>
      </div>
    </div>
  );

  const QuestionCard = ({ question }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              {question.order}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${
              question.type === 'rating' ? 'bg-yellow-100 text-yellow-800' :
              question.type === 'text' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {question.type === 'rating' ? 'Star Rating' :
               question.type === 'text' ? 'Text Response' :
               'Yes/No'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              question.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {question.required ? 'Required' : 'Optional'}
            </span>
            <span className="text-gray-600">{question.business}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-600" title="Edit">
            <FaEdit />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600" title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className={`text-sm ${question.active ? 'text-green-600' : 'text-gray-500'}`}>
        Status: {question.active ? 'Active' : 'Inactive'}
      </div>
    </div>
  );

  const CreateQRModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generate New QR Code</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Business
                </label>
                <select
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Choose a business...</option>
                  {businesses.map(business => (
                    <option key={business.id} value={business.id}>
                      {business.name} - {business.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setQrSize(size)}
                      className={`p-3 border rounded-md text-center transition-colors ${
                        qrSize === size 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium capitalize">{size}</div>
                      <div className="text-xs text-gray-500">
                        {size === 'small' ? '150x150' : 
                         size === 'medium' ? '200x200' : '300x300'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeInstructions}
                    onChange={(e) => setIncludeInstructions(e.target.checked)}
                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Include scan instructions</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle QR code generation
                  setShowCreateModal(false);
                }}
                disabled={!selectedBusiness}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate QR Code
              </button>
            </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Survey & QR Codes</h1>
            <p className="text-gray-600 mt-2">Create QR codes for easy feedback collection and manage survey questions</p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('qr-codes')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'qr-codes'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  QR Codes
                </button>
                <button
                  onClick={() => setActiveTab('survey-questions')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'survey-questions'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Survey Questions
                </button>
              </nav>
            </div>
          </div>

          {/* QR Codes Tab */}
          {activeTab === 'qr-codes' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{qrCodes.length}</div>
                  <div className="text-sm text-gray-600">Active QR Codes</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">434</div>
                  <div className="text-sm text-gray-600">Total Scans</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">73</div>
                  <div className="text-sm text-gray-600">Reviews Generated</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">16.8%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Filter by Business
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Export Report
                  </button>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <FaPlus className="mr-2" />
                  Generate QR Code
                </button>
              </div>

              {/* QR Codes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qrCodes.map(qr => (
                  <QRCodeCard key={qr.id} qr={qr} />
                ))}
              </div>
            </div>
          )}

          {/* Survey Questions Tab */}
          {activeTab === 'survey-questions' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{surveyQuestions.length}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">
                    {surveyQuestions.filter(q => q.active).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Questions</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-yellow-600">
                    {surveyQuestions.filter(q => q.type === 'rating').length}
                  </div>
                  <div className="text-sm text-gray-600">Rating Questions</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-red-600">
                    {surveyQuestions.filter(q => q.required).length}
                  </div>
                  <div className="text-sm text-gray-600">Required Questions</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">All Businesses</option>
                    {businesses.map(business => (
                      <option key={business.id} value={business.name}>
                        {business.name}
                      </option>
                    ))}
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">All Types</option>
                    <option value="rating">Rating</option>
                    <option value="text">Text</option>
                    <option value="yes_no">Yes/No</option>
                  </select>
                </div>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <FaPlus className="mr-2" />
                  Add Question
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {surveyQuestions
                  .sort((a, b) => a.order - b.order)
                  .map(question => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateQRModal />
    </div>
  );
};

export default SurveyQR;