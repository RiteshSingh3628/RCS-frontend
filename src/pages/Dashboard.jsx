import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;