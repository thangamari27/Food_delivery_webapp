/**
 * Restaurant Service - COMPLETE BACKEND INTEGRATION
 * Maps to all backend routes with proper data transformation
 * Updated: Fixed query parameter handling for search
 */

import api from './api';

class RestaurantService {
  /**
   * ========================================
   * CREATE OPERATIONS
   * ========================================
   */

  /**
   * Create new restaurant with image upload
   * Backend: POST /api/restaurants
   * Requires: admin authentication
   */
  async create(data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        // Use FormData for image upload
        payload = new FormData();
        
        // Add all restaurant fields
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            if (key === 'address' || key === 'operatingHours') {
              // Nested objects - send as JSON string
              payload.append(key, JSON.stringify(value));
            } else if (Array.isArray(value)) {
              // Arrays - send as JSON string
              payload.append(key, JSON.stringify(value));
            } else {
              // Primitives - send directly
              payload.append(key, value);
            }
          }
        });
        
        // Add image file
        payload.append('image', image);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        // No image - send as JSON
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.post('/api/restaurants', payload, { headers });
      return response.data;
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
   * Get all restaurants with advanced filtering
   * Backend: GET /api/restaurants
   * Query params: isActive, status, city, cuisine, deliveryAvailable, minRating, maxRating,
   *               minPrice, maxPrice, features, badges, isFeatured, isPremium,
   *               verificationStatus, search, limit, skip, sortBy, populate
   */
  async getAll(params = {}) {
    try {
      const {
        isActive = true,
        status,
        city,
        cuisine,
        deliveryAvailable,
        minRating,
        maxRating,
        minPrice,
        maxPrice,
        features,
        badges,
        isFeatured,
        isPremium,
        verificationStatus,
        search,
        limit = 20,
        skip = 0,
        sortBy = '-createdAt',
        populate = false
      } = params;

      // Build query parameters
      const queryParams = new URLSearchParams();
      
      // Boolean params - send as string
      if (isActive !== undefined) queryParams.append('isActive', String(isActive));
      if (deliveryAvailable !== undefined) queryParams.append('deliveryAvailable', String(deliveryAvailable));
      if (isFeatured !== undefined) queryParams.append('isFeatured', String(isFeatured));
      if (isPremium !== undefined) queryParams.append('isPremium', String(isPremium));
      if (populate) queryParams.append('populate', 'true');
      
      // String params
      if (status) queryParams.append('status', status);
      if (city) queryParams.append('city', city);
      if (cuisine) queryParams.append('cuisine', cuisine);
      if (verificationStatus) queryParams.append('verificationStatus', verificationStatus);
      if (search) queryParams.append('search', search);
      
      // Number params
      if (minRating) queryParams.append('minRating', String(minRating));
      if (maxRating) queryParams.append('maxRating', String(maxRating));
      if (minPrice) queryParams.append('minPrice', String(minPrice));
      if (maxPrice) queryParams.append('maxPrice', String(maxPrice));
      
      // Array params - send as comma-separated or multiple params
      if (features) {
        if (Array.isArray(features)) {
          // Send as multiple query params
          features.forEach(f => queryParams.append('features', f));
        } else {
          queryParams.append('features', features);
        }
      }
      
      if (badges) {
        if (Array.isArray(badges)) {
          badges.forEach(b => queryParams.append('badges', b));
        } else {
          queryParams.append('badges', badges);
        }
      }
      
      // Pagination & sorting
      queryParams.append('limit', String(limit));
      queryParams.append('skip', String(skip));
      queryParams.append('sortBy', sortBy);

      // Append query parameters to the URL
      const queryString = queryParams.toString();
      const url = queryString ? `/api/restaurants?${queryString}` : '/api/restaurants';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant by ID
   * Backend: GET /api/restaurants/:rid
   * Query params: view (boolean to increment view count)
   */
  async getById(rid, incrementView = false) {
    try {
      const queryParams = incrementView ? '?view=true' : '';
      const response = await api.get(`/api/restaurants/${rid}${queryParams}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant by email
   * Backend: GET /api/restaurants/email/:email
   */
  async getByEmail(email) {
    try {
      const response = await api.get(`/api/restaurants/email/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurants by city
   * Backend: GET /api/restaurants/city/:city
   */
  async getByCity(city, params = {}) {
    try {
      const { limit = 20, skip = 0, isActive = true } = params;
      const queryParams = new URLSearchParams({ 
        limit: String(limit), 
        skip: String(skip), 
        isActive: String(isActive) 
      });
      
      const response = await api.get(
        `/api/restaurants/city/${encodeURIComponent(city)}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurants by cuisine
   * Backend: GET /api/restaurants/cuisine/:cuisine
   */
  async getByCuisine(cuisine, params = {}) {
    try {
      const { limit = 20, skip = 0, isActive = true } = params;
      const queryParams = new URLSearchParams({ 
        limit: String(limit), 
        skip: String(skip), 
        isActive: String(isActive) 
      });
      
      const response = await api.get(
        `/api/restaurants/cuisine/${encodeURIComponent(cuisine)}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search restaurants
   * Backend: GET /api/restaurants/search
   * Query params: q (search term), limit, skip, city
   */
  async search(searchTerm, params = {}) {
    try {
      const { limit = 20, skip = 0, city } = params;
      const queryParams = new URLSearchParams({ 
        q: searchTerm, 
        limit: String(limit), 
        skip: String(skip) 
      });
      
      if (city) queryParams.append('city', city);
      
      const response = await api.get(`/api/restaurants/search?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get popular restaurants
   * Backend: GET /api/restaurants/popular
   */
  async getPopular(limit = 10, city = null) {
    try {
      const queryParams = new URLSearchParams({ limit: String(limit) });
      if (city) queryParams.append('city', city);
      
      const response = await api.get(`/api/restaurants/popular?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get restaurant statistics
   * Backend: GET /api/restaurants/stats
   */
  async getStats(params = {}) {
    try {
      const { city, cuisine } = params;
      const queryParams = new URLSearchParams();
      if (city) queryParams.append('city', city);
      if (cuisine) queryParams.append('cuisine', cuisine);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/api/restaurants/stats?${queryString}` : '/api/restaurants/stats';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get nearby restaurants
   * Backend: POST /api/restaurants/nearby
   * Body: { latitude, longitude }
   * Query params: maxDistance, limit, skip
   */
  async getNearby(latitude, longitude, params = {}) {
    try {
      const { maxDistance = 10, limit = 20, skip = 0 } = params;
      const queryParams = new URLSearchParams({ 
        maxDistance: String(maxDistance),
        limit: String(limit), 
        skip: String(skip) 
      });
      
      const response = await api.post(
        `/api/restaurants/nearby?${queryParams.toString()}`,
        { latitude, longitude }
      );
      return response.data;
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
   * Backend: PUT /api/restaurants/:rid
   * Requires: admin authentication
   */
  async update(rid, data, image = null) {
    try {
      let payload;
      let headers = {};

      if (image) {
        // Use FormData for image upload
        payload = new FormData();
        
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            if (key === 'address' || key === 'operatingHours') {
              payload.append(key, JSON.stringify(value));
            } else if (Array.isArray(value)) {
              payload.append(key, JSON.stringify(value));
            } else {
              payload.append(key, value);
            }
          }
        });
        
        payload.append('image', image);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        // No image - send as JSON
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.put(`/api/restaurants/${rid}`, payload, { headers });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update restaurant status
   * Backend: PATCH /api/restaurants/:rid/status
   * Body: { status: 'Active' | 'Inactive' | 'Suspended' | 'Closed' }
   */
  async updateStatus(rid, status) {
    try {
      const response = await api.patch(`/api/restaurants/${rid}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update operating hours
   * Backend: PATCH /api/restaurants/:rid/hours
   * Body: { operatingHours: {...} }
   */
  async updateOperatingHours(rid, operatingHours) {
    try {
      const response = await api.patch(`/api/restaurants/${rid}/hours`, { operatingHours });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Bulk update restaurants
   * Backend: PATCH /api/restaurants/bulk
   * Body: { restaurantIds: [...], updateData: {...} }
   */
  async bulkUpdate(restaurantIds, updateData) {
    try {
      const response = await api.patch('/api/restaurants/bulk', {
        restaurantIds,
        updateData
      });
      return response.data;
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
   * Backend: DELETE /api/restaurants/:rid
   */
  async deactivate(rid) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete restaurant permanently
   * Backend: DELETE /api/restaurants/:rid/permanent
   * Requires: admin authentication
   */
  async deletePermanent(rid) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}/permanent`);
      return response.data;
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
   * Backend: POST /api/restaurants/:rid/menu
   * Body: { foodId: string }
   */
  async addMenuItem(rid, foodId) {
    try {
      const response = await api.post(`/api/restaurants/${rid}/menu`, { foodId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Remove menu item from restaurant
   * Backend: DELETE /api/restaurants/:rid/menu/:foodId
   */
  async removeMenuItem(rid, foodId) {
    try {
      const response = await api.delete(`/api/restaurants/${rid}/menu/${foodId}`);
      return response.data;
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
   * Backend: POST /api/restaurants/:rid/offers
   * Body: { title, description, discountPercentage, maxDiscount, minOrder, validFrom, validUntil }
   */
  async addOffer(rid, offerData) {
    try {
      const response = await api.post(`/api/restaurants/${rid}/offers`, offerData);
      return response.data;
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
   * Handles nested objects and data normalization
   */
  transformToBackendFormat(data) {
    const transformed = { ...data };
    
    // Ensure cuisine is array
    if (transformed.cuisine && !Array.isArray(transformed.cuisine)) {
      transformed.cuisine = [transformed.cuisine];
    }
    
    // Ensure address is properly formatted
    if (transformed.address) {
      if (typeof transformed.address === 'string') {
        // If address is string, parse it
        transformed.address = {
          street: transformed.address,
          city: transformed.city || '',
          state: '',
          pincode: '',
          country: 'India'
        };
      }
    }
    
    // Ensure operatingHours exists
    if (!transformed.operatingHours && (transformed.openingTime || transformed.closingTime)) {
      transformed.operatingHours = {
        openingTime: transformed.openingTime || '09:00',
        closingTime: transformed.closingTime || '22:00'
      };
      delete transformed.openingTime;
      delete transformed.closingTime;
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
    
    return transformed;
  }

  /**
   * Transform backend data to frontend format
   * Flattens nested objects for easier form handling
   */
  transformToFrontendFormat(data) {
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
    
    // Flatten rating
    if (transformed.rating) {
      transformed.rating = transformed.rating.average || 0;
      transformed.ratingCount = transformed.rating.count || 0;
    }
    
    // Flatten image
    if (transformed.image && transformed.image.url) {
      transformed.imageUrl = transformed.image.url;
    }
    
    return transformed;
  }

  /**
   * Handle API errors uniformly
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      const statusCode = error.response.status;
      const errors = error.response.data?.errors || null;
      
      // Create an Error object with the message
      const errorObj = new Error(message);
      errorObj.statusCode = statusCode;
      errorObj.errors = errors;
      
      // Add original response data for debugging
      errorObj.responseData = error.response.data;
      
      return errorObj;
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Error in request setup
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new RestaurantService();