import React from 'react';

const SettingsContent = () => (
  <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-indigo-700 mb-6">System Settings</h2>
    <div className="space-y-8">
      {/* Rating Criteria */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>Rating Criteria</span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">Feedback</span>
        </h3>
        <div className="space-y-2">
          {['Reliability', 'Delivery Speed', 'Product Availability', 'Quality of Communication', 'Website Usability'].map((criteria) => (
            <div key={criteria} className="flex items-center">
              <input 
                type="checkbox" 
                id={criteria} 
                defaultChecked 
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={criteria} className="ml-2 block text-sm text-gray-700">
                {criteria}
              </label>
            </div>
          ))}
        </div>
        <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium underline">+ Add New Criteria</button>
      </section>
      <hr className="my-4 border-gray-200" />
      {/* Email Notifications */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>Email Notifications</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Alerts</span>
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="new-feedback" 
              defaultChecked 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="new-feedback" className="ml-2 block text-sm text-gray-700">
              New feedback received
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="negative-feedback" 
              defaultChecked 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="negative-feedback" className="ml-2 block text-sm text-gray-700">
              Negative feedback alerts
            </label>
          </div>
        </div>
      </section>
      <hr className="my-4 border-gray-200" />
      {/* Widget Settings */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>Widget Settings</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Widget</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <input type="color" defaultValue="#3b82f6" className="h-10 w-full rounded border border-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Bottom Right</option>
              <option>Bottom Left</option>
              <option>Top Right</option>
              <option>Top Left</option>
            </select>
          </div>
        </div>
      </section>
      <div className="flex justify-end mt-8">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition">
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

export default SettingsContent; 