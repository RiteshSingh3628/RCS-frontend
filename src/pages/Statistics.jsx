import React, { useEffect, useState } from "react";
import { reviews as reviewsApi } from "../api/api";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaStar, FaChartBar, FaChartPie, FaChartLine } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Statistics = ({ businesses = [] }) => {
  const [reviews, setReviews] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewsApi.list();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      alert("Failed to load reviews");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    name: `${rating} Star`,
    value: reviews.filter((r) => r.overall_rating === rating).length,
  }));

  const businessByCategory = businesses.reduce((acc, business) => {
    const category = business.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(businessByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const reviewTrend = reviews.reduce((acc, review) => {
    const date = new Date(review.created_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trendData = Object.entries(reviewTrend)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const recommendationRate = {
    wouldRecommend: reviews.filter((r) => r.would_recommend).length,
    wouldNotRecommend: reviews.filter((r) => !r.would_recommend).length,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <Navigation onLogout={handleLogout} />
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Business Insights Dashboard
      </h1>

      <div className="flex-1 ml-0 sm:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaStar className="text-yellow-500" />
              <h2 className="text-lg font-medium">Rating Distribution</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {ratingDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaChartPie className="text-blue-500" />
              <h2 className="text-lg font-medium">Businesses by Category</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Businesses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-green-500" />
              <h2 className="text-lg font-medium">Review Trend Over Time</h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={{ r: 6 }}
                    name="Reviews"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaChartBar className="text-purple-500" />
              <h2 className="text-lg font-medium">Recommendation Rate</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Would Recommend",
                      value: recommendationRate.wouldRecommend,
                    },
                    {
                      name: "Would Not Recommend",
                      value: recommendationRate.wouldNotRecommend,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Reviews" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaChartPie className="text-red-500" />
              <h2 className="text-lg font-medium">Business Status</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Active",
                        value: businesses.filter((b) => b.is_active).length,
                      },
                      {
                        name: "Inactive",
                        value: businesses.filter((b) => !b.is_active).length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FF8042" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-xl font-bold text-blue-600">
              {businesses.length}
            </div>
            <div className="text-sm text-gray-500">Total Businesses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-xl font-bold text-green-600">
              {reviews.length}
            </div>
            <div className="text-sm text-gray-500">Total Reviews</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-xl font-bold text-yellow-600">
              {reviews.length > 0
                ? (
                    reviews.reduce((sum, r) => sum + r.overall_rating, 0) /
                    reviews.length
                  ).toFixed(1)
                : 0}
            </div>
            <div className="text-sm text-gray-500">Average Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-xl font-bold text-purple-600">
              {reviews.length > 0
                ? `${Math.round(
                    (recommendationRate.wouldRecommend / reviews.length) * 100
                  )}%`
                : "0%"}
            </div>
            <div className="text-sm text-gray-500">Recommendation Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
