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
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout', {}, {
    headers: getAuthHeader()
  }),
  
  getProfile: () => api.get('/auth/profile', {
    headers: getAuthHeader()
  }),
  
  verifyEmail: (token) => api.post(`/auth/verify-email/${token}`),
  
  resendVerification: () => api.post('/auth/resend-verification', {}, {
    headers: getAuthHeader()
  }),
  
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  
  // Add refresh token if your backend supports it
  refreshToken: () => api.post('/auth/refresh-token', {}, {
    headers: getAuthHeader()
  }),
  
  // Update profile
  updateProfile: (data) => api.patch('/auth/profile', data, {
    headers: getAuthHeader()
  })
};