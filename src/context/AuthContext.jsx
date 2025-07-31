import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../api/api';

const AuthContext = createContext();



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
        const response  = await auth.getProfile();
        console.log(response);
        setUser(response);
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
      // const mockUser = {
      //   id: 1,
      //   username: credentials.username,
      //   email: credentials.email || 'user@example.com',
      //   first_name: 'Demo',
      //   last_name: 'User'
      // };
      const response = await auth.login(credentials);
      // setUser(mockUser);
      // console.log(response)
      if(response){
        setUser(response.user);
        localStorage.setItem('token', response.tokens?.access);
      }
      return { success: true,message: response.message };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await auth.register(userData);
      if (response.success) {
        const user = response.data;
        console.log("response after registering",response.data);
        setUser(user);
        localStorage.setItem('token', response.token);
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
