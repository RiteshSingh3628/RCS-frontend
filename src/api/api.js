/**
 * Comprehensive API Integration for Review Collection System
 * 
 * This file provides a complete interface to all backend API endpoints
 * including authentication, business management, reviews, companies,
 * survey questions, QR codes, widgets, and more.
 */

// Base configuration
const BASE_URL = 'http://127.0.0.1:8000/api';

// Utility functions
function getToken() {
  // console.log("token",localStorage.getItem('token'));
  return localStorage.getItem('token');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Dummy API for local demo mode
export const api = {
  login: async ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      return { token: "demo-token", user: { username: "admin", email: "admin@example.com", isAdmin: true } };
    }
    throw new Error("Invalid credentials");
  },
  register: async () => ({}),
  getProfile: async () => ({ username: "admin", email: "admin@example.com", isAdmin: true }),
  updateProfile: async () => ({}),
  changePassword: async () => ({}),
  forgotPassword: async () => ({}),
  resetPassword: async () => ({}),
  // Add more dummy endpoints as needed for your UI
};

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

export const auth = {
  // User registration and login
  register: (data) => apiRequest('/auth/register/', 'POST', data),
  login: (data) => apiRequest('/auth/login/', 'POST', data),
  logout: () => apiRequest('/auth/logout/', 'POST', null, true),
  profile: () => apiRequest('/auth/profile/', 'GET', null, true),
  
  // Profile management
  getProfile: () => apiRequest('/auth/profile/', 'GET', null, true),
  updateProfile: (data) => apiRequest('/auth/profile/', 'PUT', data, true),
  patchProfile: (data) => apiRequest('/auth/profile/', 'PATCH', data, true),
  getSimpleProfile: () => apiRequest('/auth/profile/simple/', 'GET', null, true),
  
  // Password management
  changePassword: (data) => apiRequest('/auth/password/change/', 'POST', data, true),
  resetPassword: (data) => apiRequest('/auth/password/reset/', 'POST', data),
  confirmPasswordReset: (data) => apiRequest('/auth/password/reset/confirm/', 'POST', data),
  
  // Email and token management
  verifyEmail: (data) => apiRequest('/auth/email/verify/', 'POST', data),
  refreshToken: (data) => apiRequest('/auth/token/refresh/', 'POST', data),
};

// ============================================================================
// BUSINESS ENDPOINTS
// ============================================================================

export const businesses = {
  // Business CRUD operations
  list: (companyId = null) => {
    const endpoint = companyId ? `/business/?company_id=${companyId}` : '/business/';
    return apiRequest(endpoint, 'GET', null, true);
  },
  get: (id) => apiRequest(`/business/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/business/', 'POST', data, true),
  update: (id, data) => apiRequest(`/business/`, 'PUT', data, true),
  patch: (id, data) => apiRequest(`/business/${id}/`, 'PATCH', data, true),
  delete: (id) => apiRequest(`/business/${id}/`, 'DELETE', null, true),
  
  // Business-specific data
  getReviews: (businessId, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/business/${businessId}/reviews/${queryParams ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint, 'GET', null, true);
  },
  getStats: (businessId) => apiRequest(`/business/${businessId}/stats/`, 'GET', null, true),
};

// ============================================================================
// REVIEW ENDPOINTS
// ============================================================================

export const reviews = {
  // Review CRUD operations
  list: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/reviews/${queryParams ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint, 'GET', null, true);
  },
  get: (id) => apiRequest(`/reviews/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/reviews/', 'POST', data, true),
  update: (id, data) => apiRequest(`/reviews/${id}/`, 'PUT', data, true),
  patch: (id, data) => apiRequest(`/reviews/${id}/`, 'PATCH', data, true),
  delete: (id) => apiRequest(`/reviews/${id}/`, 'DELETE', null, true),
  
  // Review interactions
  respond: (id, data) => apiRequest(`/reviews/${id}/response/`, 'PUT', data, true),
  patchResponse: (id, data) => apiRequest(`/reviews/${id}/response/`, 'PATCH', data, true),
  approve: (reviewId) => apiRequest(`/reviews/${reviewId}/approve/`, 'POST', null, true),
  like: (reviewId) => apiRequest(`/reviews/${reviewId}/like/`, 'POST', null, true),
  unlike: (reviewId) => apiRequest(`/reviews/${reviewId}/like/`, 'DELETE', null, true),
};

// ============================================================================
// CATEGORY ENDPOINTS
// ============================================================================

export const categories = {
  list: () => apiRequest('/categories/', 'GET'),
};

// ============================================================================
// REVIEW CRITERIA ENDPOINTS
// ============================================================================

export const reviewCriteria = {
  list: () => apiRequest('/review-criteria/', 'GET', null, true),
  get: (id) => apiRequest(`/review-criteria/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/review-criteria/', 'POST', data, true),
  update: (id, data) => apiRequest(`/review-criteria/${id}/`, 'PUT', data, true),
  delete: (id) => apiRequest(`/review-criteria/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// EMAIL TEMPLATE ENDPOINTS
// ============================================================================

export const emailTemplates = {
  list: () => apiRequest('/email-templates/', 'GET', null, true),
  get: (id) => apiRequest(`/email-templates/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/email-templates/', 'POST', data, true),
  update: (id, data) => apiRequest(`/email-templates/${id}/`, 'PUT', data, true),
  delete: (id) => apiRequest(`/email-templates/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// WIDGET SETTINGS ENDPOINTS
// ============================================================================

export const widgetSettings = {
  list: () => apiRequest('/widget-settings/', 'GET', null, true),
  get: (id) => apiRequest(`/widget-settings/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/widget-settings/', 'POST', data, true),
  update: (id, data) => apiRequest(`/widget-settings/${id}/`, 'PUT', data, true),
  delete: (id) => apiRequest(`/widget-settings/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// QR FEEDBACK ENDPOINTS
// ============================================================================

export const qrFeedback = {
  list: () => apiRequest('/qr-feedback/', 'GET', null, true),
  get: (id) => apiRequest(`/qr-feedback/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/qr-feedback/', 'POST', data, true),
  update: (id, data) => apiRequest(`/qr-feedback/${id}/`, 'PUT', data, true),
  delete: (id) => apiRequest(`/qr-feedback/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// PAYMENTS ENDPOINTS
// ============================================================================

export const payments = {
  list: () => apiRequest('/payments/', 'GET', null, true),
  get: (id) => apiRequest(`/payments/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/payments/', 'POST', data, true),
};

// ============================================================================
// PUBLIC API ENDPOINTS (NO AUTH)
// ============================================================================

export const publicApi = {
  getReviewForm: (token) => apiRequest(`/public/review-form/${token}/`, 'GET'),
  submitReview: (token, data) => apiRequest(`/public/submit-review/${token}/`, 'POST', data),
  getWidget: (companyId) => apiRequest(`/public/widget/${companyId}/`, 'GET'),
  getQrCode: (companyId, branchId) => apiRequest(`/public/qr-code/${companyId}/${branchId}/`, 'GET'),
  submitQrFeedback: (companyId, branchId, data) => apiRequest(`/public/qr-feedback/${companyId}/${branchId}/`, 'POST', data),
};

// ============================================================================
// BULK ACTIONS & EXPORT ENDPOINTS
// ============================================================================

export const bulk = {
  exportReviews: (companyId) => apiRequest(`/export/${companyId}/`, 'GET', null, true),
  bulkApprove: (reviewIds) => apiRequest('/bulk-approve/', 'POST', { review_ids: reviewIds }, true),
  bulkReject: (reviewIds) => apiRequest('/bulk-reject/', 'POST', { review_ids: reviewIds }, true),
};

// ============================================================================
// WEBHOOKS ENDPOINTS
// ============================================================================

export const webhooks = {
  paypal: (data) => apiRequest('/paypal/webhook/', 'POST', data),
};

// ============================================================================
// WIDGET EMBED ENDPOINTS
// ============================================================================

export const widgetEmbed = {
  getEmbed: (companyId) => apiRequest(`/widget/${companyId}/embed/`, 'GET'),
};

// Legacy exports for new endpoints
export const getReviewCriteria = reviewCriteria.list;
export const getReviewCriterion = reviewCriteria.get;
export const createReviewCriterion = reviewCriteria.create;
export const updateReviewCriterion = reviewCriteria.update;
export const deleteReviewCriterion = reviewCriteria.delete;

export const getEmailTemplates = emailTemplates.list;
export const getEmailTemplate = emailTemplates.get;
export const createEmailTemplate = emailTemplates.create;
export const updateEmailTemplate = emailTemplates.update;
export const deleteEmailTemplate = emailTemplates.delete;

export const getWidgetSettings = widgetSettings.list;
export const getWidgetSetting = widgetSettings.get;
export const createWidgetSetting = widgetSettings.create;
export const updateWidgetSetting = widgetSettings.update;
export const deleteWidgetSetting = widgetSettings.delete;

export const getQrFeedback = qrFeedback.list;
export const getQrFeedbackDetail = qrFeedback.get;
export const createQrFeedback = qrFeedback.create;
export const updateQrFeedback = qrFeedback.update;
export const deleteQrFeedback = qrFeedback.delete;

export const getPayments = payments.list;
export const getPayment = payments.get;
export const createPayment = payments.create;

export const getPublicReviewForm = publicApi.getReviewForm;
export const submitPublicReview = publicApi.submitReview;
export const getPublicWidget = publicApi.getWidget;
export const getPublicQrCode = publicApi.getQrCode;
export const submitPublicQrFeedback = publicApi.submitQrFeedback;

export const exportReviews = bulk.exportReviews;
export const bulkApproveReviews = bulk.bulkApprove;
export const bulkRejectReviews = bulk.bulkReject;

export const paypalWebhook = webhooks.paypal;

export const getWidgetEmbed = widgetEmbed.getEmbed;

// ============================================================================
// COMPANY ENDPOINTS
// ============================================================================

export const companies = {
  list: () => apiRequest('/companies/', 'GET', null, true),
  getUserCompanies: () => apiRequest('/companies/', 'GET', null, true),
  create: (data) => apiRequest('/companies/', 'POST', data, true),
};

// ============================================================================
// ORDER ENDPOINTS
// ============================================================================

export const orders = {
  webhook: (data) => apiRequest('/orders/webhook/', 'POST', data),
};

// ============================================================================
// SURVEY QUESTION ENDPOINTS
// ============================================================================

export const surveyQuestions = {
  // Survey question CRUD operations
  list: (companyId = null) => {
    const endpoint = companyId ? `/survey-questions/?company_id=${companyId}` : '/survey-questions/';
    return apiRequest(endpoint, 'GET', null, true);
  },
  get: (id) => apiRequest(`/survey-questions/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/survey-questions/', 'POST', data, true),
  update: (id, data) => apiRequest(`/survey-questions/${id}/`, 'PUT', data, true),
  patch: (id, data) => apiRequest(`/survey-questions/${id}/`, 'PATCH', data, true),
  delete: (id) => apiRequest(`/survey-questions/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// REVIEW ANSWER ENDPOINTS
// ============================================================================

export const reviewAnswers = {
  // Review answer CRUD operations
  list: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/review-answers/${queryParams ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint, 'GET', null, true);
  },
  get: (id) => apiRequest(`/review-answers/${id}/`, 'GET', null, true),
  create: (data) => apiRequest('/review-answers/', 'POST', data, true),
  update: (id, data) => apiRequest(`/review-answers/${id}/`, 'PUT', data, true),
  patch: (id, data) => apiRequest(`/review-answers/${id}/`, 'PATCH', data, true),
  delete: (id) => apiRequest(`/review-answers/${id}/`, 'DELETE', null, true),
};

// ============================================================================
// WIDGET ENDPOINTS
// ============================================================================

export const widget = {
  getData: (companyId) => apiRequest(`/widget/${companyId}/`, 'GET'),
  getPublicData: (companyId) => apiRequest(`/widget/${companyId}/`, 'GET'),
};

// ============================================================================
// QR CODE ENDPOINTS
// ============================================================================

export const qr = {
  generate: (companyId, branchId) => apiRequest(`/qr-code/${companyId}/${branchId}/`, 'GET', null, true),
  submitFeedback: (branchId, data) => apiRequest(`/qr-feedback/${branchId}/`, 'POST', data),
};

// ============================================================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================================================

// Auth legacy exports
export const login = auth.login;
export const register = auth.register;
export const logout = auth.logout;
export const getProfile = auth.getProfile;
export const updateProfile = auth.updateProfile;
export const patchProfile = auth.patchProfile;
export const getSimpleProfile = auth.getSimpleProfile;
export const verifyEmail = auth.verifyEmail;
export const changePassword = auth.changePassword;
export const resetPassword = auth.resetPassword;
export const confirmPasswordReset = auth.confirmPasswordReset;
export const refreshToken = auth.refreshToken;

// Business legacy exports
export const getBusinesses = businesses.list;
export const getBusiness = businesses.get;
export const createBusiness = businesses.create;
export const updateBusiness = businesses.update;
export const patchBusiness = businesses.patch;
export const deleteBusiness = businesses.delete;
export const getBusinessReviews = businesses.getReviews;
export const getBusinessStats = businesses.getStats;

// Review legacy exports
export const getReviews = reviews.list;
export const createReview = reviews.create;
export const getReview = reviews.get;
export const updateReview = reviews.update;
export const patchReview = reviews.patch;
export const deleteReview = reviews.delete;
export const respondToReview = reviews.respond;
export const patchReviewResponse = reviews.patchResponse;
export const approveReview = reviews.approve;
export const likeReview = reviews.like;

// Category legacy exports
export const getCategories = categories.list;

// Company legacy exports
export const getUserCompanies = companies.getUserCompanies;

// Order legacy exports
export const createOrderWebhook = orders.webhook;

// Survey question legacy exports
export const getSurveyQuestions = surveyQuestions.list;
export const createSurveyQuestion = surveyQuestions.create;
export const getSurveyQuestion = surveyQuestions.get;
export const updateSurveyQuestion = surveyQuestions.update;
export const patchSurveyQuestion = surveyQuestions.patch;
export const deleteSurveyQuestion = surveyQuestions.delete;

// Review answer legacy exports
export const getReviewAnswers = reviewAnswers.list;
export const createReviewAnswer = reviewAnswers.create;
export const getReviewAnswer = reviewAnswers.get;
export const updateReviewAnswer = reviewAnswers.update;
export const patchReviewAnswer = reviewAnswers.patch;
export const deleteReviewAnswer = reviewAnswers.delete;

// Widget legacy exports
export const getWidgetData = widget.getData;

// QR legacy exports
export const generateQRCode = qr.generate;
export const submitQRFeedback = qr.submitFeedback;

// --- Add this near the top or bottom of your file ---
export async function apiRequest(endpoint, method = 'GET', data = null, requireAuth = false) {
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(requireAuth ? getAuthHeaders() : {}),
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMsg = 'API request failed';
    let errorStatus = response.status;
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || JSON.stringify(errorData);
    } catch (e) {}
    // Handle expired/invalid token
    if (errorStatus === 401 || errorStatus === 403) {
      localStorage.removeItem('token');
      // Do not redirect here; let AuthProvider or route protection handle it
    }
    throw new Error(errorMsg);
  }

  // No content
  if (response.status === 204) return null;

  return await response.json();
}
