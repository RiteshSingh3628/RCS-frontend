import React from 'react';
import { Typography } from '@mui/material';

const StatsContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <Typography variant="h6" className="mb-4">Feedback Statistics</Typography>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <Typography variant="subtitle1" className="mb-2">Rating Distribution</Typography>
        <div className="h-64 bg-white border rounded-lg flex items-center justify-center">
          <Typography variant="body2" className="text-gray-500">Pie Chart Placeholder</Typography>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <Typography variant="subtitle1" className="mb-2">Monthly Trends</Typography>
        <div className="h-64 bg-white border rounded-lg flex items-center justify-center">
          <Typography variant="body2" className="text-gray-500">Line Chart Placeholder</Typography>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
        <Typography variant="subtitle1" className="mb-2">Detailed Metrics</Typography>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Metric</th>
                <th className="py-2 px-4 border-b">Last 7 Days</th>
                <th className="py-2 px-4 border-b">Last 30 Days</th>
                <th className="py-2 px-4 border-b">All Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Total Feedback</td>
                <td className="py-2 px-4 border-b">24</td>
                <td className="py-2 px-4 border-b">112</td>
                <td className="py-2 px-4 border-b">1,245</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Average Rating</td>
                <td className="py-2 px-4 border-b">4.3</td>
                <td className="py-2 px-4 border-b">4.2</td>
                <td className="py-2 px-4 border-b">4.1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Recommendation Rate</td>
                <td className="py-2 px-4 border-b">89%</td>
                <td className="py-2 px-4 border-b">87%</td>
                <td className="py-2 px-4 border-b">85%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default StatsContent; 