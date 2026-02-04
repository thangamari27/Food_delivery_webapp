/**
 * Food Service - Production Ready
 * Fixed: Clean response handling, proper error management
 */

import api from './api';

class FoodService {
  /**
   * Transform frontend data to backend format
   */
  transformToBackendFormat(data) {
    const transformed = { ...data };

    // Convert numeric fields
    if (transformed.price) transformed.price = parseFloat(transformed.price);
    if (transformed.originalPrice) transformed.originalPrice = parseFloat(transformed.originalPrice);

    // Handle status mapping
    if (transformed.status === 'Active') {
      transformed.isActive = true;
      transformed.isAvailable = true;
    } else if (transformed.status === 'Inactive') {
      transformed.isActive = false;
      transformed.isAvailable = false;
    }

    // Clean empty values
    Object.keys(transformed).forEach(key => {
      if (transformed[key] === '' || transformed[key] === null || transformed[key] === undefined) {
        delete transformed[key];
      }
    });

    return transformed;
  }

  /**
   * Transform backend data to frontend format
   */
  transformToFrontendFormat(data) {
    if (!data) return {};
    
    const transformed = { ...data };

    // Set status
    if (transformed.isActive && transformed.isAvailable) {
      transformed.status = 'Active';
    } else {
      transformed.status = 'Inactive';
    }

    // Handle image
    if (transformed.image && transformed.image.url) {
      transformed.imageUrl = transformed.image.url;
    }

    // Handle arrays (ensure single values for form)
    if (Array.isArray(transformed.category)) {
      transformed.category = transformed.category[0] || '';
    }

    if (Array.isArray(transformed.cuisine)) {
      transformed.cuisine = transformed.cuisine[0] || '';
    }

    return transformed;
  }

  /**
   * Get all food items
   */
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all parameters
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      // Default parameters
      if (!params.limit) queryParams.append('limit', '20');
      if (!params.sortBy) queryParams.append('sortBy', '-create_at');
      
      const url = `/api/foods?${queryParams.toString()}`;
      const response = await api.get(url);
      
      // Handle response format
      const responseData = response.data?.data || response.data;
      let foodData = [];
      let paginationData = {};

      if (Array.isArray(responseData?.data)) {
        // Nested: response.data.data.data
        foodData = responseData.data;
        paginationData = responseData.pagination || {};
      } else if (Array.isArray(responseData)) {
        // Flat: response.data
        foodData = responseData;
        paginationData = {
          limit: parseInt(params.limit) || 20,
          skip: parseInt(params.skip) || 0,
          total: responseData.length,
          pages: Math.ceil(responseData.length / (params.limit || 20)),
          hasMore: false
        };
      }

      return {
        success: true,
        data: foodData,
        pagination: paginationData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get food by ID
   */
  async getById(fid, incrementView = false) {
    try {
      const url = incrementView 
        ? `/api/foods/${fid}?view=true`
        : `/api/foods/${fid}`;
      
      const response = await api.get(url);
      const foodData = response.data?.data || response.data;
      
      return {
        success: true,
        data: foodData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search foods
   */
  async search(searchTerm, params = {}) {
    try {
      const queryParams = new URLSearchParams({ q: searchTerm });
      
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          queryParams.append(key, params[key]);
        }
      });

      const response = await api.get(`/api/foods/search?${queryParams.toString()}`);
      const foodData = response.data?.data || response.data || [];
      
      return {
        success: true,
        data: Array.isArray(foodData) ? foodData : [],
        pagination: response.data?.pagination || {
          limit: parseInt(params.limit) || 20,
          skip: parseInt(params.skip) || 0,
          total: foodData.length,
          pages: Math.ceil(foodData.length / (params.limit || 20)),
          hasMore: false
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create food
   */
  async create(data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        payload = new FormData();
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            payload.append(key, data[key]);
          }
        });
        payload.append('image', image);
      } else {
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.post('/api/foods', payload, { headers });
      const foodData = response.data?.data || response.data;
      
      return {
        success: true,
        data: foodData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food
   */
  async update(fid, data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        payload = new FormData();
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            payload.append(key, data[key]);
          }
        });
        payload.append('image', image);
      } else {
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.put(`/api/foods/${fid}`, payload, { headers });
      const foodData = response.data?.data || response.data;
      
      return {
        success: true,
        data: foodData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete food
   */
  async delete(fid, permanent = false) {
    try {
      const url = permanent 
        ? `/api/foods/${fid}/permanent`
        : `/api/foods/${fid}`;
      
      await api.delete(url);
      return { success: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get food stats
   */
  async getStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key]) queryParams.append(key, params[key]);
      });

      const response = await api.get(`/api/foods/stats?${queryParams.toString()}`);
      return {
        success: true,
        data: response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handler
   */
  handleError(error) {
    console.error('Food Service Error:', error);
    
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.error || 'Server error';
      const err = new Error(message);
      err.status = error.response.status;
      err.data = error.response.data;
      return err;
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new FoodService();