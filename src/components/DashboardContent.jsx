import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuth } from '../context/AuthContext';

const mockStats = [
  { label: 'Total Reviews', value: 1245, color: 'bg-blue-500' },
  { label: 'Average Rating', value: 4.2, color: 'bg-green-500' },
  { label: 'Recommendation Rate', value: '87%', color: 'bg-yellow-500' },
  { label: 'Active Businesses', value: 12, color: 'bg-purple-500' },
];

const feedbackData = [
  {
    id: 1,
    customerName: 'John Doe',
    email: 'john@example.com',
    orderId: 'ORD-12345',
    date: '2023-05-15 14:30',
    ratings: 4,
    comment: 'Delivery was late but product quality was good.',
    status: 'pending',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    orderId: 'ORD-12346',
    date: '2023-05-16 09:15',
    ratings: 5,
    comment: 'Excellent service!',
    status: 'published',
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    email: 'mike@example.com',
    orderId: 'ORD-12347',
    date: '2023-05-16 11:20',
    ratings: 3,
    comment: 'Average experience, could be better.',
    status: 'pending',
  },
  {
    id: 4,
    customerName: 'Sarah Wilson',
    email: 'sarah@example.com',
    orderId: 'ORD-12348',
    date: '2023-05-16 16:45',
    ratings: 5,
    comment: 'Amazing product and fast delivery!',
    status: 'published',
  },
];

const renderStars = (rating) => (
  <div className="flex">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <StarIcon key={i} className="text-yellow-500" fontSize="small" />
      ) : (
        <StarBorderIcon key={i} className="text-gray-400" fontSize="small" />
      )
    )}
  </div>
);

const DashboardContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.first_name || user?.username || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your business feedback today.
        </p>
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="font-bold text-2xl text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Feedback */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-500">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {feedbackData.slice(0, 3).map((feedback) => (
                <div key={feedback.id} className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                    {feedback.customerName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{feedback.customerName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(feedback.ratings)}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        feedback.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {feedback.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">{feedback.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <span className="text-indigo-700 font-medium">Generate QR Code</span>
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-green-700 font-medium">Create Widget</span>
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-700 font-medium">View Reports</span>
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-purple-700 font-medium">Manage Businesses</span>
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Feedback Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Recent Feedback</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbackData.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                          {feedback.customerName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{feedback.customerName}</div>
                          <div className="text-sm text-gray-500">{feedback.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{feedback.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{renderStars(feedback.ratings)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.comment || 'No comment'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        feedback.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {feedback.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Respond</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent; 