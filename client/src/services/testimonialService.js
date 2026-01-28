import api from './api';

export const testimonialService = {
  getAll: (params = {}) => api.get('/api/testimonials', { params }),
  
  getById: (tid) => api.get(`/api/testimonials/${tid}`),
  
  create: (data) => api.post('/api/testimonials', data),
  
  update: (tid, data) => api.put(`/api/testimonials/${tid}`, data),
  
  deactivate: (tid) => api.delete(`/api/testimonials/${tid}`),
  
  permanentDelete: (tid) => api.delete(`/api/testimonials/${tid}/permanent`),
};