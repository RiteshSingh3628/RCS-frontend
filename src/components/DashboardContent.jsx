import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const mockStats = [
  { label: 'Total Reviews', value: 1245 },
  { label: 'Average Rating', value: 4.2 },
  { label: 'Recommendation Rate', value: '87%' },
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

const DashboardContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mockStats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-lg font-semibold">{stat.label}</div>
          <div className="font-bold text-2xl text-gray-900 mt-2">{stat.value}</div>
        </div>
      ))}
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-lg font-semibold mb-4">Recent Feedback</div>
      <div className="overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbackData.map((feedback) => (
              <tr key={feedback.id}>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{renderStars(feedback.ratings)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{feedback.comment || 'No comment'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${feedback.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{feedback.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardContent; 