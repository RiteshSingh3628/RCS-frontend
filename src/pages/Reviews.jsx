import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { reviews as reviewsApi } from '../api/api';
import { FaSearch, FaFileExport } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const Reviews = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const statuses = ['published', 'pending', 'archived', 'appealed'];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewsApi.list();
      setReviews(data);
      console.log("user review",data)
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      alert('Failed to load reviews');
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
  };

  const filteredReviews = reviews.filter((review) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      review.reviewer_name?.toLowerCase().includes(lowerSearch) ||
      review.reviewer_email?.toLowerCase().includes(lowerSearch);

    const matchesStatus = !statusFilter || review.status === statusFilter;

    const createdDate = new Date(review.created_at);
    const matchesDateFrom = !dateFrom || createdDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || createdDate <= new Date(dateTo);

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const exportToExcel = () => {
    const data = filteredReviews.map((r) => ({
      Name: r.reviewer_name || '---',
      Email: r.reviewer_email || '---',
      'Review ID': r.id || '---',
      'Order Number': r.orderId || '---',
      'Customer Number': r.customerId || '---',
      Comment: r.comment || '---',
      Rating: r.overall_rating || '---',
      Status: r.status || '---',
      'Date & Time': formatDateTime(r.created_at) || '---'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
    XLSX.writeFile(workbook, 'reviews.xlsx');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
      <Navigation onLogout={handleLogout} />
      
      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:ml-64 w-[calc(100%-16rem)]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Review Management</h1>

        {/* Filters - Improved Responsive Grid */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search - Full width on mobile, 2 cols on sm, 1 col on lg */}
          <div className="relative sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            {/* <FaSearch className="absolute left-3 top-3 text-gray-400" /> */}
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          
          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          
          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FaFileExport className="mr-2" /> Export to Excel
          </button>
        </div>

        {/* Table - Improved Responsiveness */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">Review ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden lg:table-cell">Order No.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden lg:table-cell">Customer No.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Comment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.reviewer_name || '---'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(review.created_at) || '---'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {review.reviewer_email || '---'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {review.id || '---'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {review.orderId || '---'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {review.customerId || '---'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 max-w-xs min-w-60">
                        {review.comment || '---'}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${
                        review.overall_rating <= 2 ? 'text-red-600' : 'text-gray-800'
                      }`}>
                        {review.overall_rating || '---'}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm  text-white font-medium `}>
                        <div className={`m-2 p-2 text-sm font-medium rounded-lg ${
                          review.status === "frozen"?'bg-blue-400':
                          review.status === "pending"?'bg-red-400':'bg-green-400'
                        }`}>
                        {review.status || '---'}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
                      No reviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;