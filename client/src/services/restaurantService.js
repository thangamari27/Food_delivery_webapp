/**
 * Restaurant Service
 * Handles all API communications for restaurant operations
 */

import api from './api';

class RestaurantService {
  /**
   * ========================================
   * CREATE OPERATIONS
   * ========================================
   */

  /**
   * Create new restaurant
   * @param {Object} data - Restaurant data
   * @param {File|null} imageFile - Optional image file
   */
  async create(data, imageFile = null) {
    try {
      let payload;
      const headers = {};

      // Use FormData for image upload or complex nested data
      if (imageFile || data.address || data.operatingHours || data.cuisine) {
        payload = new FormData();
        
        // Append all fields to FormData
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            if (typeof value === 'object' && !(value instanceof File)) {
              // Convert objects/arrays to JSON strings
              payload.append(key, JSON.stringify(value));
            } else {
              // Primitive values
              payload.append(key, value);
            }
          }
        });
        
        // Add image if provided
        if (imageFile) {
          payload.append('image', imageFile);
        }
      } else {
        // Simple data - send as JSON
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.post('/api/restaurants', payload, { headers });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * READ OPERATIONS
   * ========================================
   */

  /**
   * Get all restaurants with filtering and pagination
   * @param {Object} params - Query parameters
   */
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Build query string from params
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      const url = queryParams.toString() 
        ? `/api/restaurants?${queryParams.toString()}` 
        : '/api/restaurants';
      
      const response = await api.get(url);
      
      // Handle all possible response structures
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant by ID
   * @param {string} rid - Restaurant ID
   * @param {boolean} incrementView - Whether to increment view count
   */
  async getById(rid, incrementView = false) {
    try {
      const url = incrementView 
        ? `/api/restaurants/${rid}?view=true`
        : `/api/restaurants/${rid}`;
      
      const response = await api.get(url);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant by email
   * @param {string} email - Restaurant email
   */
  async getByEmail(email) {
    try {
      const response = await api.get(`/api/restaurants/email/${encodeURIComponent(email)}`);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurants by city
   * @param {string} city - City name
   * @param {Object} params - Pagination params
   */
  async getByCity(city, params = {}) {
    try {
      const { limit = 20, skip = 0, isActive = true } = params;
      const queryParams = new URLSearchParams({ limit, skip, isActive });
      
      const response = await api.get(
        `/api/restaurants/city/${encodeURIComponent(city)}?${queryParams.toString()}`
      );
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurants by cuisine
   * @param {string} cuisine - Cuisine type
   * @param {Object} params - Pagination params
   */
  async getByCuisine(cuisine, params = {}) {
    try {
      const { limit = 20, skip = 0, isActive = true } = params;
      const queryParams = new URLSearchParams({ limit, skip, isActive });
      
      const response = await api.get(
        `/api/restaurants/cuisine/${encodeURIComponent(cuisine)}?${queryParams.toString()}`
      );
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search restaurants
   * @param {string} searchTerm - Search query
   * @param {Object} params - Additional params
   */
  async search(searchTerm, params = {}) {
    try {
      const queryParams = new URLSearchParams({ q: searchTerm });
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await api.get(`/api/restaurants/search?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get popular restaurants
   * @param {number} limit - Number of restaurants
   * @param {string|null} city - Optional city filter
   */
  async getPopular(limit = 10, city = null) {
    try {
      const queryParams = new URLSearchParams({ limit: String(limit) });
      if (city) queryParams.append('city', city);
      
      const response = await api.get(`/api/restaurants/popular?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant statistics
   * @param {Object} params - Filter params
   */
  async getStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const url = queryParams.toString() 
        ? `/api/restaurants/stats?${queryParams.toString()}` 
        : '/api/restaurants/stats';
      
      const response = await api.get(url);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get nearby restaurants
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @param {Object} params - Additional params
   */
  async getNearby(latitude, longitude, params = {}) {
    try {
      const { maxDistance = 10, limit = 20, skip = 0 } = params;
      const queryParams = new URLSearchParams({ maxDistance, limit, skip });
      
      const response = await api.post(
        `/api/restaurants/nearby?${queryParams.toString()}`,
        { latitude, longitude }
      );
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * UPDATE OPERATIONS
   * ========================================
   */

  /**
   * Update restaurant
   * @param {string} rid - Restaurant ID
   * @param {Object} data - Update data
   * @param {File|null} imageFile - Optional new image
   */
  async update(rid, data, imageFile = null) {
    try {
      let payload;
      const headers = {};

      // Log the data being sent (for debugging)
      console.log('Update data:', { rid, data, hasImage: !!imageFile });

      // Use FormData for image upload or complex nested data
      if (imageFile || data.address || data.operatingHours) {
        payload = new FormData();
        
        // Append all fields to FormData
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              // For arrays, send as JSON string
              if (value.length > 0) {
                payload.append(key, JSON.stringify(value));
              } else {
                // Send empty array as JSON string
                payload.append(key, JSON.stringify([]));
              }
            } else if (typeof value === 'object' && !(value instanceof File)) {
              // For objects, send as JSON string
              payload.append(key, JSON.stringify(value));
            } else {
              // For primitives, send directly
              payload.append(key, value);
            }
          }
        });
        
        // Add image if provided
        if (imageFile) {
          payload.append('image', imageFile);
        }
      } else {
        // Simple data - send as JSON
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.put(`/api/restaurants/${rid}`, payload, { headers });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      console.error('Update service error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Update restaurant status
   * @param {string} rid - Restaurant ID
   * @param {string} status - New status
   */
  async updateStatus(rid, status) {
    try {
      const response = await api.patch(`/api/restaurants/${rid}/status`, { status });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update operating hours
   * @param {string} rid - Restaurant ID
   * @param {Object} operatingHours - Operating hours object
   */
  async updateOperatingHours(rid, operatingHours) {
    try {
      const response = await api.patch(`/api/restaurants/${rid}/hours`, { operatingHours });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Bulk update restaurants
   * @param {Array} restaurantIds - Array of restaurant IDs
   * @param {Object} updateData - Data to update
   */
  async bulkUpdate(restaurantIds, updateData) {
    try {
      const response = await api.patch('/api/restaurants/bulk', {
        restaurantIds,
        updateData
      });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * DELETE OPERATIONS
   * ========================================
   */

  /**
   * Deactivate restaurant (soft delete)
   * @param {string} rid - Restaurant ID
   */
  async deactivate(rid) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}`);
      
      return {
        success: true,
        data: response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete restaurant permanently
   * @param {string} rid - Restaurant ID
   */
  async deletePermanent(rid) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}/permanent`);
      
      return {
        success: true,
        data: response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * MENU MANAGEMENT
   * ========================================
   */

  /**
   * Add menu item to restaurant
   * @param {string} rid - Restaurant ID
   * @param {string} foodId - Food item ID
   */
  async addMenuItem(rid, foodId) {
    try {
      const response = await api.post(`/api/restaurants/${rid}/menu`, { foodId });
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Remove menu item from restaurant
   * @param {string} rid - Restaurant ID
   * @param {string} foodId - Food item ID
   */
  async removeMenuItem(rid, foodId) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}/menu/${foodId}`);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * OFFERS MANAGEMENT
   * ========================================
   */

  /**
   * Add offer to restaurant
   * @param {string} rid - Restaurant ID
   * @param {Object} offerData - Offer details
   */
  async addOffer(rid, offerData) {
    try {
      const response = await api.post(`/api/restaurants/${rid}/offers`, offerData);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * HELPER METHODS
   * ========================================
   */

  /**
   * Transform frontend data to backend format
   * @param {Object} data - Frontend form data
   */
  transformToBackendFormat(data) {
    const transformed = { ...data };
    
    // Ensure cuisine is array
    if (transformed.cuisine && !Array.isArray(transformed.cuisine)) {
      transformed.cuisine = [transformed.cuisine];
    }
    
    // Ensure address is properly formatted
    if (transformed.address && typeof transformed.address === 'string') {
      transformed.address = {
        street: transformed.address,
        city: transformed.city || '',
        state: '',
        pincode: '',
        country: 'India'
      };
    }
    
    // Convert numeric strings to numbers
    if (transformed.deliveryRadius) {
      transformed.deliveryRadius = parseInt(transformed.deliveryRadius);
    }
    
    if (transformed.minOrderAmount) {
      transformed.minOrderAmount = parseFloat(transformed.minOrderAmount);
    }
    
    if (transformed.deliveryFee) {
      transformed.deliveryFee = parseFloat(transformed.deliveryFee);
    }
    
    if (transformed.priceForTwo) {
      transformed.priceForTwo = parseFloat(transformed.priceForTwo);
    }
    
    return transformed;
  }

  /**
   * Transform backend data to frontend format
   * @param {Object} data - Backend response data
   */
  transformToFrontendFormat(data) {
    if (!data) return {};
    
    const transformed = { ...data };
    
    // Flatten address
    if (transformed.address) {
      transformed.city = transformed.address.city;
      transformed.street = transformed.address.street;
      transformed.area = transformed.address.area;
      transformed.state = transformed.address.state;
      transformed.pincode = transformed.address.pincode;
    }
    
    // Flatten operating hours
    if (transformed.operatingHours) {
      transformed.openingTime = transformed.operatingHours.openingTime;
      transformed.closingTime = transformed.operatingHours.closingTime;
    }
    
    // Handle image
    if (transformed.image) {
      if (typeof transformed.image === 'object' && transformed.image.url) {
        transformed.imageUrl = transformed.image.url;
        transformed.imagePreview = transformed.image.url;
      } else if (typeof transformed.image === 'string') {
        transformed.imageUrl = transformed.image;
        transformed.imagePreview = transformed.image;
      }
    }
    
    return transformed;
  }

  /**
   * Handle API errors uniformly
   * @param {Error} error - Error object
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     error.response.statusText ||
                     'Server error occurred';
      
      const err = new Error(message);
      err.status = error.response.status;
      err.data = error.response.data;
      return err;
    } else if (error.request) {
      // Request made but no response
      return new Error('Network error. Please check your connection.');
    } else {
      // Error in request setup
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new RestaurantService();