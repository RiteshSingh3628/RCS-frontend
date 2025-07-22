import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/api';
import Navigation from '../components/Navigation';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalReviews: 0,
    averageRating: 0,
    pendingReviews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch comprehensive admin data
      const [businessesRes, reviewsRes] = await Promise.all([
        apiRequest('/businesses/'),
        apiRequest('/reviews/')
      ]);

      const businesses = businessesRes.results || businessesRes;
      const reviews = reviewsRes.results || reviewsRes;

      setStats({
        totalBusinesses: businesses.length,
        totalReviews: reviews.length,
        averageRating: reviews.length > 0 
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : 0,
        pendingReviews: reviews.filter(r => r.status === 'pending').length
      });

      // Create recent activity from reviews and businesses
      const activity = [
        ...reviews.slice(0, 5).map(review => ({
          type: 'review',
          title: `New review from ${review.customer_name}`,
          description: `${review.rating} stars - ${review.comment?.substring(0, 50)}...`,
          time: review.created_at
        })),
        ...businesses.slice(0, 3).map(business => ({
          type: 'business',
          title: `Business added: ${business.name}`,
          description: business.description?.substring(0, 50) + '...',
          time: business.created_at
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-lg shadow-lg text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <Navigation>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Comprehensive system administration and analytics</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading admin data...</p>
                    </div>
                  ) : (
                    <div>
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                          title="Total Businesses"
                          value={stats.totalBusinesses}
                          icon="🏢"
                          color="from-blue-500 to-blue-600"
                        />
                        <StatCard
                          title="Total Reviews"
                          value={stats.totalReviews}
                          icon="⭐"
                          color="from-green-500 to-green-600"
                        />
                        <StatCard
                          title="Average Rating"
                          value={stats.averageRating}
                          icon="📊"
                          color="from-yellow-500 to-yellow-600"
                        />
                        <StatCard
                          title="Pending Reviews"
                          value={stats.pendingReviews}
                          icon="⏳"
                          color="from-red-500 to-red-600"
                        />
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        {recentActivity.length === 0 ? (
                          <p className="text-gray-500">No recent activity</p>
                        ) : (
                          <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${
                                  activity.type === 'review' ? 'bg-blue-500' : 'bg-green-500'
                                }`}>
                                  {activity.type === 'review' ? '⭐' : '🏢'}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{activity.title}</p>
                                  <p className="text-sm text-gray-600">{activity.description}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(activity.time).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default Admin;
