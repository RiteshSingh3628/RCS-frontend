import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { reviews } from "../api/api";



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


  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const { user } = useAuth();
  // const {avgRating,recentReviews,totalReviews} = useCompany();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all reviews (assuming reviews.list returns all reviews)
        const reviewData = await reviews.list();
        const all = reviewData;
        setAllReviews(all);

        // Calculate total reviews
        setTotalReviews(all.length);

        // Calculate average rating (only if there are reviews)
        if (all.length > 0) {
          const avg =
            all.reduce((sum, r) => sum + (Number(r.overall_rating) || 0), 0) /
            all.length;
          setAvgRating(Number(avg.toFixed(2)));
        } else {
          setAvgRating(0);
        }
        // Get 10 most recent reviews (sorted by created_at desc)
        const sorted = [...all].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRecentReviews(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching company or review data:", err);
      }
    }
    fetchData();
  }, []);
  
  console.log(recentReviews)

  const mockStats = [
    { label: 'Total Reviews', value: totalReviews, color: 'bg-blue-500' },
    { label: 'Average Rating', value: avgRating, color: 'bg-green-500' },
    { label: 'Recommendation Rate', value: '0%', color: 'bg-yellow-500' },
  ];

  
  return (
    <div className="p-2 sm:p-4 w-full max-w-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl capitalize font-bold text-gray-900">
          Welcome back, {user?.first_name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">
          Here's what's happening with your business feedback today.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 w-full max-w-full">
        {/* Stats Flex Container */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 w-full">
          {mockStats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex-1 min-w-0 w-full"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</p>
                  <p className="font-bold text-lg sm:text-xl text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full ${stat.color} opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Flex Container */}
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 w-full max-w-full">
          {/* Recent Feedback */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 w-full min-w-0 shrink">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">Recent Reviews</h2>
              <button onClick={()=>{navigate('/reviews')}} className="text-indigo-600 text-xs sm:text-sm font-medium hover:text-indigo-500">
  
                View All
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {Array.isArray(recentReviews) && recentReviews.length >0 ? recentReviews.map((feedback) => (
                <div key={feedback.id} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 uppercase rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs sm:text-sm">
                    {feedback.reviewer_name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{feedback.reviewer_name}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5 sm:mt-1">
                      {renderStars(feedback.overall_rating)}
                      <span className={`px-1.5 py-0.5 text-[10px] sm:text-xs rounded-full ${
                        feedback.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {feedback.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">{feedback.comment}</p>
                  </div>
                </div>
              )) : (
                <div className='text-justify text-gray-800 text-base capitalize'>No reviews yet</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 w-full min-w-0 shrink">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Quick Actions</h2>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full flex items-center justify-between p-2 sm:p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <span className="text-indigo-700 font-medium text-xs sm:text-base">Generate QR Code</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-green-700 font-medium text-xs sm:text-base">Create Widget</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-700 font-medium text-xs sm:text-base">View Reports</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-purple-700 font-medium text-xs sm:text-base">Manage Businesses</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Feedback Table */}
        {/* <div className="bg-white rounded-lg overflow-x-auto shadow-sm border border-gray-200 w-full max-w-full">
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">All Recent Feedback</h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Order ID</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Date</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Comment</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbackData.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs sm:text-sm">
                          {feedback.customerName.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{feedback.customerName}</div>
                          <div className="text-[10px] sm:text-sm text-gray-500">{feedback.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-mono hidden xs:table-cell">{feedback.orderId}</td>
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xs:table-cell">{feedback.date}</td>
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap">{renderStars(feedback.ratings)}</td>
                    <td className="px-2 sm:px-6 py-3 text-xs sm:text-sm text-gray-500 max-w-xs truncate hidden xs:table-cell">{feedback.comment || 'No comment'}</td>
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap">
                      <span className={`px-1.5 sm:px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full ${
                        feedback.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {feedback.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2 sm:mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Respond</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sm:hidden text-gray-400 text-xs px-3 py-2">Scroll right for more &rarr;</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardContent;