import api from './api';

const customerService = {
  /**
   * Get all customers with filters
   */
  getAllCustomers: async (params = {}) => {
    const response = await api.get('/api/customers', { params });
    return response.data;
  },

  /**
   * Get customer by ID
   */
  getCustomerById: async (id) => {
    const response = await api.get(`/api/customers/${id}`);
    return response.data;
  },

  /**
   * Create new customer
   */
//   createCustomer: async (customerData) => {
//     const response = await api.post('/customers', customerData);
//     return response.data;
//   },

  /**
   * Update customer
   */
  updateCustomer: async (id, customerData) => {
    const response = await api.put(`/api/customers/${id}`, customerData);
    return response.data;
  },

  /**
   * Update customer status
   */
  updateCustomerStatus: async (id, status) => {
    const response = await api.patch(`/api/customers/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete customer
   */
  deleteCustomer: async (id) => {
    const response = await api.delete(`/api/customers/${id}`);
    return response.data;
  },

  /**
   * Get statistics
   */
  getStatistics: async () => {
    const response = await api.get('/api/customers/stats/overview');
    return response.data;
  },

  /**
   * Search customers
   */
  searchCustomers: async (query, limit = 10) => {
    const response = await api.get('/api/customers/search', {
      params: { q: query, limit },
    });
    return response.data;
  },

  /**
   * Bulk update status
   */
  bulkUpdateStatus: async (customerIds, status) => {
    const response = await api.patch('/api/customers/bulk/status', {
      customerIds,
      status,
    });
    return response.data;
  },

  /**
   * Export customers to CSV
   */
  exportCustomers: async (params = {}) => {
    const response = await api.get('/api/customers/export/csv', {
      params,
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Get filename from response headers or use default
    const contentDisposition = response.headers['content-disposition'];
    let filename = `customers_${Date.now()}.csv`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    // Clean up URL object
    window.URL.revokeObjectURL(url);
    
    return { success: true, filename };
  },

  /**
   * Permanent delete customer (admin only)
   */
  permanentlyDeleteCustomer: async (id) => {
    const response = await api.delete(`/api/customers/${id}/permanent`);
    return response.data;
  },
};

export default customerService;