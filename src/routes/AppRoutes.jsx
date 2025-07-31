import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CompanyProvider } from '../context/CompanyContext';
// Import pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Reviews from '../pages/Reviews';
import Businesses from '../pages/Businesses';
import Widget from '../pages/Widget';
import SurveyQR from '../pages/SurveyQR';
import Profile from '../pages/Profile';
import Archive from '../pages/Archive';
import Categories from '../pages/Categories';
import Statistics from '../pages/Statistics';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // console.log(user)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><CompanyProvider><Dashboard /></CompanyProvider></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><CompanyProvider><Reviews /></CompanyProvider></ProtectedRoute>} />
      <Route path="/businesses" element={<ProtectedRoute><CompanyProvider><Businesses /></CompanyProvider></ProtectedRoute>} />
      <Route path="/widget" element={<ProtectedRoute><CompanyProvider><Widget /></CompanyProvider></ProtectedRoute>} />
      <Route path="/survey-qr" element={<ProtectedRoute><CompanyProvider><SurveyQR /></CompanyProvider></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><CompanyProvider><Profile /></CompanyProvider></ProtectedRoute>} />
      <Route path="/archive" element={<ProtectedRoute><CompanyProvider><Archive /></CompanyProvider></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><CompanyProvider><Categories /></CompanyProvider></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><CompanyProvider><Statistics /></CompanyProvider></ProtectedRoute>} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
