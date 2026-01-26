import api from "./api";

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  // Set auth header globally
  setAuthHeader: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  // Clear auth header
  clearAuthHeader: () => {
    delete api.defaults.headers.common['Authorization'];
  },
  
  // Auth endpoints
  register: (data) => api.post('/api/auth/register', data),
  
  login: (data) => api.post('/api/auth/login', data),
  
  logout: () => api.post('/api/auth/logout', {}, {
    headers: getAuthHeader()
  }),
  
  getProfile: () => api.get('/api/auth/profile', {
    headers: getAuthHeader()
  }),
  
  // Fixed: Changed from POST to GET and removed token from body
  verifyEmail: (token) => api.get(`/api/auth/verify-email?token=${token}`),
  
  resendVerification: () => api.post('/api/auth/resend-verification', {}, {
    headers: getAuthHeader()
  }),
  
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  
  // Fixed: Changed route structure to match backend
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { 
    token, 
    newPassword 
  }),
  
  // Fixed: Added change password
  changePassword: (currentPassword, newPassword) => api.post('/auth/change-password', {
    currentPassword,
    newPassword
  }, {
    headers: getAuthHeader()
  }),
  
  // Add refresh token if your backend supports it
  refreshToken: () => api.post('/api/auth/refresh-token', {}, {
    headers: getAuthHeader()
  }),
  
  // Update profile
  updateProfile: (data) => api.patch('/api/auth/profile', data, {
    headers: getAuthHeader()
  })
};