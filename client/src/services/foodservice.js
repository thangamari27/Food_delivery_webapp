/**
 * Food Service
 * Handles all food-related API calls
 */

import api from './api';

class FoodService {
  /**
   * Get all food items with filters and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise} Food list with pagination
   */
  async getAll(params = {}) {
    try {
      const {
        isActive,
        isAvailable,
        category,
        cuisine,
        restaurant,
        restaurantName,
        type,
        isVeg,
        isVegan,
        isGlutenFree,
        spiceLevel,
        minPrice,
        maxPrice,
        isFeatured,
        isBestseller,
        search,
        limit = 20,
        skip = 0,
        sortBy = '-create_at',
        populate = false
      } = params;

      const queryParams = new URLSearchParams();
      
      if (isActive !== undefined) queryParams.append('isActive', isActive);
      if (isAvailable !== undefined) queryParams.append('isAvailable', isAvailable);
      if (category) queryParams.append('category', category);
      if (cuisine) queryParams.append('cuisine', cuisine);
      if (restaurant) queryParams.append('restaurant', restaurant);
      if (restaurantName) queryParams.append('restaurantName', restaurantName);
      if (type) queryParams.append('type', type);
      if (isVeg !== undefined) queryParams.append('isVeg', isVeg);
      if (isVegan !== undefined) queryParams.append('isVegan', isVegan);
      if (isGlutenFree !== undefined) queryParams.append('isGlutenFree', isGlutenFree);
      if (spiceLevel) queryParams.append('spiceLevel', spiceLevel);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured);
      if (isBestseller !== undefined) queryParams.append('isBestseller', isBestseller);
      if (search) queryParams.append('search', search);
      if (limit) queryParams.append('limit', limit);
      if (skip) queryParams.append('skip', skip);
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (populate) queryParams.append('populate', populate);

      const response = await api.get(`/api/foods?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get food item by ID
   * @param {string} fid - Food ID
   * @param {boolean} incrementView - Whether to increment view count
   * @returns {Promise} Food details
   */
  async getById(fid, incrementView = false) {
    try {
      const queryParams = incrementView ? '?view=true' : '';
      const response = await api.get(`/api/foods/${fid}${queryParams}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get food items by restaurant
   * @param {string} restaurantId - Restaurant ObjectId
   * @param {Object} params - Additional parameters
   * @returns {Promise} Restaurant's food items
   */
  async getByRestaurant(restaurantId, params = {}) {
    try {
      const { 
        isActive = true, 
        isAvailable, 
        category, 
        limit = 50, 
        skip = 0 
      } = params;
      
      const queryParams = new URLSearchParams({ limit, skip, isActive });
      if (isAvailable !== undefined) queryParams.append('isAvailable', isAvailable);
      if (category) queryParams.append('category', category);
      
      const response = await api.get(`/api/foods/restaurant/${restaurantId}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search food items
   * @param {string} searchTerm - Search query
   * @param {Object} params - Additional parameters
   * @returns {Promise} Search results
   */
  async search(searchTerm, params = {}) {
    try {
      const { limit = 20, skip = 0 } = params;
      const queryParams = new URLSearchParams({ q: searchTerm, limit, skip });
      
      const response = await api.get(`/api/foods/search?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get popular food items
   * @param {number} limit - Number of items
   * @returns {Promise} Popular foods
   */
  async getPopular(limit = 10) {
    try {
      const queryParams = new URLSearchParams({ limit });
      const response = await api.get(`/api/foods/popular?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get food statistics
   * @param {Object} params - Filter parameters
   * @returns {Promise} Food stats
   */
  async getStats(params = {}) {
    try {
      const { restaurant, category, cuisine } = params;
      const queryParams = new URLSearchParams();
      if (restaurant) queryParams.append('restaurant', restaurant);
      if (category) queryParams.append('category', category);
      if (cuisine) queryParams.append('cuisine', cuisine);
      
      const response = await api.get(`/api/foods/stats?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create new food item
   * @param {Object|FormData} data - Food data
   * @param {File} image - Optional image file
   * @returns {Promise} Created food item
   */
  async create(data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        // Use FormData for image upload
        payload = new FormData();
        
        // Add all fields to FormData
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
              payload.append(key, JSON.stringify(data[key]));
            } else if (Array.isArray(data[key])) {
              payload.append(key, JSON.stringify(data[key]));
            } else {
              payload.append(key, data[key]);
            }
          }
        });
        
        payload.append('image', image);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        // Use JSON for no image
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.post('/api/foods', payload, { headers });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food item
   * @param {string} fid - Food ID
   * @param {Object|FormData} data - Updated data
   * @param {File} image - Optional new image
   * @returns {Promise} Updated food item
   */
  async update(fid, data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        payload = new FormData();
        
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
              payload.append(key, JSON.stringify(data[key]));
            } else if (Array.isArray(data[key])) {
              payload.append(key, JSON.stringify(data[key]));
            } else {
              payload.append(key, data[key]);
            }
          }
        });
        
        payload.append('image', image);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.put(`/api/foods/${fid}`, payload, { headers });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food availability
   * @param {string} fid - Food ID
   * @param {boolean} isAvailable - Availability status
   * @returns {Promise} Updated food item
   */
  async updateAvailability(fid, isAvailable) {
    try {
      const response = await api.patch(`/api/foods/${fid}/availability`, { isAvailable });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food quantity
   * @param {string} fid - Food ID
   * @param {number} quantity - Quantity value
   * @param {string} operation - Operation type: 'set', 'increase', 'decrease'
   * @returns {Promise} Updated food item
   */
  async updateQuantity(fid, quantity, operation = 'set') {
    try {
      const response = await api.patch(`/api/foods/${fid}/quantity`, { 
        quantity, 
        operation 
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Deactivate food item (soft delete)
   * @param {string} fid - Food ID
   * @returns {Promise} Deactivated food item
   */
  async deactivate(fid) {
    try {
      const response = await api.delete(`/api/foods/${fid}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete food item permanently (admin only)
   * @param {string} fid - Food ID
   * @returns {Promise} Deletion confirmation
   */
  async deletePermanent(fid) {
    try {
      const response = await api.delete(`/api/foods/${fid}/permanent`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Bulk update food items (admin only)
   * @param {Array} foodIds - Array of food IDs
   * @param {Object} updateData - Data to update
   * @returns {Promise} Bulk update result
   */
  async bulkUpdate(foodIds, updateData) {
    try {
      const response = await api.patch('/api/foods/bulk', {
        foodIds,
        updateData
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @private
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      const statusCode = error.response.status;
      
      return {
        message,
        statusCode,
        errors: error.response.data?.errors || null
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'No response from server. Please check your connection.',
        statusCode: 0
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'An unexpected error occurred',
        statusCode: 0
      };
    }
  }
}

export default new FoodService();