import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from '../api/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // For demo purposes, set a mock user
        setUser({
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User'
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // For demo purposes, always succeed
      const mockUser = {
        id: 1,
        username: credentials.username,
        email: credentials.email || 'user@example.com',
        first_name: 'Demo',
        last_name: 'User'
      };
      
      setUser(mockUser);
      localStorage.setItem('token', 'demo-token');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // For demo purposes, always succeed
      const mockUser = {
        id: 1,
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name || 'Demo',
        last_name: userData.last_name || 'User'
      };
      
      setUser(mockUser);
      localStorage.setItem('token', 'demo-token');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
