import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaCopy, FaCode, FaEye, FaPalette, FaCog, FaDownload } from 'react-icons/fa';

const Widget = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [widgetStyle, setWidgetStyle] = useState('modern');
  const [widgetColor, setWidgetColor] = useState('#4F46E5');
  const [widgetSize, setWidgetSize] = useState('medium');
  const [showRatings, setShowRatings] = useState(true);
  const [showReviewCount, setShowReviewCount] = useState(true);
  const [widgetPosition, setWidgetPosition] = useState('bottom-right');
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewMode, setPreviewMode] = useState('widget');

  // Mock businesses
  const businesses = [
    { id: 1, name: 'Pizza Palace' },
    { id: 2, name: 'TechRepair Pro' },
    { id: 3, name: 'Green Fitness Center' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Generate widget code
  useEffect(() => {
    if (selectedBusiness) {
      const business = businesses.find(b => b.id === parseInt(selectedBusiness));
      const widgetCode = `
<!-- FeedbackPro Review Widget -->
<div id="feedbackpro-widget-${business?.id}" data-business-id="${business?.id}"></div>
<script>
(function() {
  var widget = document.createElement('script');
  widget.src = 'https://cdn.feedbackpro.com/widget.js';
  widget.setAttribute('data-business-id', '${business?.id}');
  widget.setAttribute('data-style', '${widgetStyle}');
  widget.setAttribute('data-color', '${widgetColor}');
  widget.setAttribute('data-size', '${widgetSize}');
  widget.setAttribute('data-show-ratings', '${showRatings}');
  widget.setAttribute('data-show-count', '${showReviewCount}');
  widget.setAttribute('data-position', '${widgetPosition}');
  document.head.appendChild(widget);
})();
</script>`;
      setGeneratedCode(widgetCode);
    }
  }, [selectedBusiness, widgetStyle, widgetColor, widgetSize, showRatings, showReviewCount, widgetPosition]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    // You could add a toast notification here
  };

  const WidgetPreview = () => (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
      <div className={`inline-block p-6 rounded-lg shadow-lg border ${widgetSize === 'small' ? 'text-sm' : widgetSize === 'large' ? 'text-lg' : 'text-base'}`} 
           style={{ borderColor: widgetColor }}>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {showRatings && <span className="font-semibold" style={{ color: widgetColor }}>4.8</span>}
        </div>
        {showReviewCount && <p className="text-gray-600 mb-4">Based on 245 reviews</p>}
        <button 
          className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: widgetColor }}
        >
          Write a Review
        </button>
        <p className="text-xs text-gray-500 mt-3">Powered by FeedbackPro</p>
      </div>
    </div>
  );

  const FloatingWidgetPreview = () => (
    <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Website Preview</h3>
        <div className="bg-white rounded shadow p-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      
      {/* Floating Widget */}
      <div className={`absolute ${
        widgetPosition === 'bottom-right' ? 'bottom-4 right-4' :
        widgetPosition === 'bottom-left' ? 'bottom-4 left-4' :
        widgetPosition === 'top-right' ? 'top-4 right-4' :
        'top-4 left-4'
      }`}>
        <div 
          className={`p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${
            widgetSize === 'small' ? 'w-12 h-12' : widgetSize === 'large' ? 'w-16 h-16' : 'w-14 h-14'
          }`}
          style={{ backgroundColor: widgetColor }}
        >
          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Review Widget</h1>
            <p className="text-gray-600 mt-2">Generate and customize review widgets for your websites</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Business Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaCog className="mr-2 text-indigo-600" />
                  Basic Configuration
                </h2>
                
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
                          {business.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Widget Style
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['modern', 'classic', 'minimal'].map(style => (
                        <button
                          key={style}
                          onClick={() => setWidgetStyle(style)}
                          className={`p-3 border rounded-md text-center transition-colors ${
                            widgetStyle === style 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-medium capitalize">{style}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Widget Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'medium', 'large'].map(size => (
                        <button
                          key={size}
                          onClick={() => setWidgetSize(size)}
                          className={`p-3 border rounded-md text-center transition-colors ${
                            widgetSize === size 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-medium capitalize">{size}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaPalette className="mr-2 text-indigo-600" />
                  Appearance
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position (for floating widgets)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'bottom-right', label: 'Bottom Right' },
                        { value: 'bottom-left', label: 'Bottom Left' },
                        { value: 'top-right', label: 'Top Right' },
                        { value: 'top-left', label: 'Top Left' }
                      ].map(position => (
                        <button
                          key={position.value}
                          onClick={() => setWidgetPosition(position.value)}
                          className={`p-3 border rounded-md text-center transition-colors ${
                            widgetPosition === position.value 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-medium">{position.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showRatings}
                        onChange={(e) => setShowRatings(e.target.checked)}
                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Show star ratings</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showReviewCount}
                        onChange={(e) => setShowReviewCount(e.target.checked)}
                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Show review count</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Generated Code */}
              {selectedBusiness && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <FaCode className="mr-2 text-indigo-600" />
                    Generated Code
                  </h2>
                  
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
                      <code>{generatedCode}</code>
                    </pre>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                      title="Copy to clipboard"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      <FaCopy className="mr-2" />
                      Copy Code
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      <FaDownload className="mr-2" />
                      Download HTML
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <FaEye className="mr-2 text-indigo-600" />
                    Preview
                  </h2>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPreviewMode('widget')}
                      className={`px-3 py-1 text-sm rounded ${
                        previewMode === 'widget'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Inline Widget
                    </button>
                    <button
                      onClick={() => setPreviewMode('floating')}
                      className={`px-3 py-1 text-sm rounded ${
                        previewMode === 'floating'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Floating Widget
                    </button>
                  </div>
                </div>
                
                {selectedBusiness ? (
                  previewMode === 'widget' ? <WidgetPreview /> : <FloatingWidgetPreview />
                ) : (
                  <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <FaCog className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Select a business to preview the widget</p>
                  </div>
                )}
              </div>

              {/* Widget Instructions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Installation Instructions</h2>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Copy the generated code</p>
                      <p className="text-gray-600">Select all the code from the box above and copy it.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Paste into your website</p>
                      <p className="text-gray-600">Add the code to your HTML where you want the widget to appear.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Test the widget</p>
                      <p className="text-gray-600">Refresh your page to see the widget in action.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;