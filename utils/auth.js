// Authentication utilities for token management and user session handling

export const AUTH_TOKEN_KEY = 'authToken';
export const USER_DATA_KEY = 'userData';

/**
 * Save authentication token to localStorage
 */
export const saveAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Save user data to localStorage
 */
export const saveUserData = (userData) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

/**
 * Get user data from localStorage
 */
export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = () => {
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

/**
 * Check if user is admin
 */
export const isAdmin = () => {
  const userData = getUserData();
  return userData?.isAdmin || false;
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  removeAuthToken();
  removeUserData();
};

/**
 * Format user display name
 */
export const getUserDisplayName = () => {
  const userData = getUserData();
  return userData?.username || userData?.email || 'User';
};

export const isUserLoggedIn = ()=>{
    return localStorage.getItem('user'); //can be token or user data
}