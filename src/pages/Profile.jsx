import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaUser,FaBell, FaCreditCard, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { auth } from '../api/api';

const ProfileTab = ({ isEditing, setIsEditing, formData, handleFormChange, handleSaveProfile, isSaving }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={isSaving}
              >
                <FaSave className="mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 mb-8">
          <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-700">
              {formData.first_name?.charAt(0)}{formData.last_name?.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {formData.first_name} {formData.last_name}
            </h3>
            <p className="text-gray-600">@{formData.username}</p>
            {!isEditing && (
              <p className="text-sm text-gray-500 mt-1">{formData.bio}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 border text-indigo-400 border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 text-indigo-400 border border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 border text-indigo-400 border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 border text-indigo-400 border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 border text-indigo-400 border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 border text-indigo-400 border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleFormChange}
              disabled={!isEditing || isSaving}
              className={`w-full px-3 py-2 text-indigo-400 border border-gray-300 rounded-md ${
                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500' : 'bg-gray-50'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {isEditing && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                rows={3}
                name="bio"
                value={formData.bio}
                onChange={handleFormChange}
                disabled={!isEditing || isSaving}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-indigo-400">3</div>
          <div className="text-sm text-gray-600">Active Businesses</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">73</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">4.6</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>
    </div>
  );
};

const SecurityTab = ({ passwordData, handlePasswordChange, handlePasswordSubmit, isSaving }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handlePasswordSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={isSaving}
          >
            {isSaving ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Two-Factor Authentication</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">Add an extra layer of security to your account</p>
            <p className="text-sm text-gray-500 mt-1">Currently disabled</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Sessions</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">MacBook Pro - Chrome</p>
              <p className="text-sm text-gray-500">Current session • San Francisco, CA</p>
              <p className="text-xs text-gray-400">Last active: 2 minutes ago</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = ({ notifications, handleNotificationChange, handleSaveNotifications, isSaving }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Email Notifications for New Reviews</p>
            <p className="text-sm text-gray-500">Get notified when new reviews are submitted</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="emailReviews"
              checked={notifications.emailReviews}
              onChange={handleNotificationChange}
              disabled={isSaving}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Weekly Reports</p>
            <p className="text-sm text-gray-500">Receive weekly summary of your business performance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="emailReports"
              checked={notifications.emailReports}
              onChange={handleNotificationChange}
              disabled={isSaving}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Push Notifications</p>
            <p className="text-sm text-gray-500">Get browser notifications for important updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notifications.pushNotifications}
              onChange={handleNotificationChange}
              disabled={isSaving}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">SMS Alerts</p>
            <p className="text-sm text-gray-500">Receive SMS for critical issues</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="smsAlerts"
              checked={notifications.smsAlerts}
              onChange={handleNotificationChange}
              disabled={isSaving}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <button
          onClick={handleSaveNotifications}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

const BillingTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Plan</h2>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">Standard Plan</h3>
              <p className="text-indigo-700">$49/month • 150 reviews/month</p>
              <p className="text-sm text-indigo-400 mt-1">Next billing: January 22, 2024</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage This Month</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-gray-900">73</div>
            <div className="text-sm text-gray-600">Reviews Collected</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '48.7%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">73 of 150 used</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">QR Codes Generated</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">12 of 50 used</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">434</div>
            <div className="text-sm text-gray-600">Widget Views</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '86.8%' }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">434 of 500 used</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Description</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 text-sm text-gray-900">Dec 22, 2023</td>
                <td className="py-3 text-sm text-gray-600">Standard Plan - Monthly</td>
                <td className="py-3 text-sm text-gray-900">$49.00</td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                <td className="py-3"><button className="text-indigo-400 hover:text-indigo-500 text-sm">Download</button></td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Nov 22, 2023</td>
                <td className="py-3 text-sm text-gray-600">Standard Plan - Monthly</td>
                <td className="py-3 text-sm text-gray-900">$49.00</td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                <td className="py-3"><button className="text-indigo-400 hover:text-indigo-500 text-sm">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const tabs = [
  { id: 'profile', label: 'Profile', icon: FaUser },
  { id: 'security', label: 'Security', icon: MdSecurity },
  { id: 'notifications', label: 'Notifications', icon: FaBell },
  { id: 'billing', label: 'Billing', icon: FaCreditCard },
];

const Profile = () => {
  const { user, logout } = useAuth();
  console.log(user)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize form data with user data or defaults
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.business_phone || '',
    company: user?.business_name || '',
    website: user?.business_website || '',
    bio: user?.bio || '',
  });

  const [notifications, setNotifications] = useState({
    emailReviews: true,
    emailReports: true,
    pushNotifications: false,
    smsAlerts: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Unified form change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Unified password change handler
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Unified notification change handler
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Save profile changes to API
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await auth.updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Change password via API
  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    setIsSaving(true);
    try {
      await auth.changePassword({
        old_password:passwordData.currentPassword,
        new_password:passwordData.newPassword,
        new_password_confirm:passwordData.confirmPassword,
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      alert('Password changed successfully');
    } catch (error) {
      console.log(error)
      alert('Password change failed: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Save notification preferences (placeholder, implement API if available)
  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      // await api.saveNotificationPreferences(notifications); // Implement this endpoint if available
      alert('Notification preferences updated!');
    } catch (error) {
      alert('Failed to update notification preferences: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-0 sm:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {activeTab === 'profile' && (
            <ProfileTab
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              handleFormChange={handleFormChange}
              handleSaveProfile={handleSaveProfile}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'security' && (
            <SecurityTab
              passwordData={passwordData}
              handlePasswordChange={handlePasswordChange}
              handlePasswordSubmit={handlePasswordSubmit}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsTab
              notifications={notifications}
              handleNotificationChange={handleNotificationChange}
              handleSaveNotifications={handleSaveNotifications}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'billing' && <BillingTab />}
        </div>
      </div>
    </div>
  );
};

export default Profile;