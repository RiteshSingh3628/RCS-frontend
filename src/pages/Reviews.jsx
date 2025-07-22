import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaStar, FaReply, FaArchive, FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import { reviews as reviewsApi } from '../api/api';
    rating: 2,
    title: 'Disappointed with the order',
    comment: 'The pizza arrived cold and took much longer than expected. The toppings were sparse and didn\'t match what was advertised. Very disappointing experience.',
    date: '2024-01-12T19:20:00Z',
    status: 'pending',
    hasResponse: false,
    category: 'Delivery',
    helpful: 5
  },
  {
    id: 5,
    customerName: 'David Brown',
    customerEmail: 'david@example.com',
      ))}
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const handlePublishReview = async (reviewId) => {
    try {
      await reviewsApi.approve(reviewId);
      await fetchReviews();
    } catch (err) {
      alert('Failed to publish review');
    }
  };

  const handleArchiveReview = async (reviewId) => {
    try {
      await reviewsApi.delete(reviewId);
      await fetchReviews();
    } catch (err) {
      alert('Failed to archive review');
    }
  };

  const handleRespondToReview = (review) => {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setShowResponseModal(true);
  };

  const submitResponse = async () => {
    if (selectedReview && responseText.trim()) {
      try {
        await reviewsApi.respond(selectedReview.id, { business_response: responseText.trim() });
        await fetchReviews();
        setShowResponseModal(false);
        setSelectedReview(null);
        setResponseText('');
      } catch (err) {
        alert('Failed to submit response');
      }
    }
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-700 font-semibold">
                {review.customerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
              <p className="text-sm text-gray-500">{review.customerEmail}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            {renderStars(review.rating)}
            <span className="text-sm font-medium">{review.rating}.0</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
          </div>
          
          <div className="mb-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
              {review.businessName}
            </span>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2">
              {review.category}
            </span>
            <span className={`inline-block text-xs px-2 py-1 rounded-full ${
              review.status === 'published' ? 'bg-green-100 text-green-700' :
              review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {review.status}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => handleRespondToReview(review)}
            className="p-2 text-gray-400 hover:text-blue-600 text-sm"
            title="Respond"
          >
            <FaReply />
          </button>
          {review.status === 'pending' && (
            <button 
              onClick={() => handlePublishReview(review.id)}
              className="p-2 text-gray-400 hover:text-green-600 text-sm"
              title="Publish"
            >
              <FaEye />
            </button>
          )}
          <button 
            onClick={() => handleArchiveReview(review.id)}
            className="p-2 text-gray-400 hover:text-red-600 text-sm"
            title="Archive"
          >
            <FaArchive />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
      </div>

      {review.hasResponse && review.response && (
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <div className="flex items-center mb-2">
            <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
              <span className="text-white text-xs font-semibold">R</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Your Response</span>
          </div>
          <p className="text-sm text-gray-700">{review.response}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
        <div className="text-sm text-gray-500">
          Order: <span className="font-mono">{review.orderId}</span>
        </div>
        <div className="text-sm text-gray-500">
          {review.helpful} people found this helpful
        </div>
      </div>
    </div>
  );

  const ResponseModal = () => {
    if (!showResponseModal || !selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Respond to {selectedReview.customerName}'s Review
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium">{selectedReview.rating}.0</span>
              </div>
              <p className="text-sm text-gray-700">{selectedReview.comment}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Write a professional response to this review..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                  setResponseText('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitResponse}
                disabled={!responseText.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Response
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
            <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
            <p className="text-gray-600 mt-2">Manage customer feedback and responses across all your businesses</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{reviews.length}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {reviews.filter(r => r.status === 'published').length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">
                {reviews.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews, customers, or businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Ratings</option>
                {ratings.map(rating => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              
              <select
                value={businessFilter}
                onChange={(e) => setBusinessFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Businesses</option>
                {businesses.map(business => (
                  <option key={business} value={business}>{business}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-4">
            {filteredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No reviews found</div>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <ResponseModal />
    </div>
  );
};

export default Reviews;