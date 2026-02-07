/**
 * Food Service - Updated for Backend Integration
 * Handles all API communications for food items
 */

import api from './api';

class FoodService {
  /**
   * Transform frontend form data to backend format
   * Handles nested objects, arrays, and type conversions
   */
  transformToBackendFormat(data) {
    const transformed = {};

    // Required fields
    if (data.name) transformed.name = data.name.trim();
    if (data.category) transformed.category = data.category;
    if (data.cuisine) transformed.cuisine = data.cuisine;
    if (data.restaurant) transformed.restaurant = data.restaurant;
    if (data.description) transformed.description = data.description.trim();
    
    // Numeric fields with validation
    if (data.price) {
      transformed.price = parseFloat(data.price);
    }
    if (data.originalPrice) {
      transformed.originalPrice = parseFloat(data.originalPrice);
    }

    // Optional text fields
    if (data.ingredients) transformed.ingredients = data.ingredients.trim();
    if (data.servingSize) transformed.servingSize = data.servingSize.trim();

    // Type field
    transformed.type = data.type || 'Regular Menu Item';

    // Boolean fields
    if (data.isVeg !== undefined) transformed.isVeg = Boolean(data.isVeg);
    if (data.isVegan !== undefined) transformed.isVegan = Boolean(data.isVegan);
    if (data.isGlutenFree !== undefined) transformed.isGlutenFree = Boolean(data.isGlutenFree);
    if (data.isFeatured !== undefined) transformed.isFeatured = Boolean(data.isFeatured);
    if (data.isBestseller !== undefined) transformed.isBestseller = Boolean(data.isBestseller);
    if (data.isNewArrival !== undefined) transformed.isNewArrival = Boolean(data.isNewArrival);

    // Status mapping: Frontend uses 'Active'/'Inactive', backend uses isActive + isAvailable
    if (data.status === 'Active') {
      transformed.isActive = true;
      transformed.isAvailable = true;
      transformed.status = 'Active';
    } else if (data.status === 'Inactive') {
      transformed.isActive = false;
      transformed.isAvailable = false;
      transformed.status = 'Inactive';
    } else {
      // If status field is provided directly
      if (data.isActive !== undefined) transformed.isActive = Boolean(data.isActive);
      if (data.isAvailable !== undefined) transformed.isAvailable = Boolean(data.isAvailable);
      if (data.status) transformed.status = data.status;
    }

    // Enum fields
    if (data.spiceLevel) transformed.spiceLevel = data.spiceLevel;

    // Array fields
    if (data.allergens && Array.isArray(data.allergens)) {
      transformed.allergens = data.allergens;
    }
    if (data.tags && Array.isArray(data.tags)) {
      transformed.tags = data.tags;
    }

    // Numeric fields with defaults
    if (data.preparationTime) {
      transformed.preparationTime = parseInt(data.preparationTime) || 15;
    }
    if (data.availableQuantity !== undefined) {
      transformed.availableQuantity = parseInt(data.availableQuantity) || 100;
    }
    if (data.minOrderQuantity) {
      transformed.minOrderQuantity = parseInt(data.minOrderQuantity) || 1;
    }
    if (data.maxOrderQuantity) {
      transformed.maxOrderQuantity = parseInt(data.maxOrderQuantity) || 10;
    }

    // Nutritional info (nested object)
    if (data.nutritionalInfo && typeof data.nutritionalInfo === 'object') {
      transformed.nutritionalInfo = {
        calories: parseFloat(data.nutritionalInfo.calories) || 0,
        protein: parseFloat(data.nutritionalInfo.protein) || 0,
        carbs: parseFloat(data.nutritionalInfo.carbs) || 0,
        fat: parseFloat(data.nutritionalInfo.fat) || 0,
        fiber: parseFloat(data.nutritionalInfo.fiber) || 0
      };
    }

    // Image handling - backend expects image object or will be handled by FormData
    if (data.image && typeof data.image === 'object') {
      transformed.image = data.image;
    }

    return transformed;
  }

  /**
   * Transform backend data to frontend format
   * Converts backend response to form-friendly structure
   */
  transformToFrontendFormat(data) {
    if (!data) return {};
    
    const transformed = { ...data };

    // Map status from backend (isActive/isAvailable) to frontend (Active/Inactive)
    if (data.isActive && data.isAvailable) {
      transformed.status = 'Active';
    } else {
      transformed.status = 'Inactive';
    }

    // Handle image - extract URL from nested structure
    if (data.image) {
      if (typeof data.image === 'object' && data.image.url) {
        transformed.imageUrl = data.image.url;
        transformed.imagePreview = data.image.url;
      } else if (typeof data.image === 'string') {
        transformed.imageUrl = data.image;
        transformed.imagePreview = data.image;
      }
    }

    // Handle restaurant - ensure it's an ID string
    if (data.restaurant) {
      if (typeof data.restaurant === 'object') {
        transformed.restaurant = data.restaurant._id || data.restaurant.id;
      }
    }

    // Ensure arrays are arrays
    if (data.allergens && !Array.isArray(data.allergens)) {
      transformed.allergens = [data.allergens];
    }
    if (data.tags && !Array.isArray(data.tags)) {
      transformed.tags = [data.tags];
    }

    // Handle rating
    if (data.rating) {
      if (typeof data.rating === 'object') {
        transformed.ratingAverage = data.rating.average || 0;
        transformed.ratingCount = data.rating.count || 0;
      } else {
        transformed.ratingAverage = data.rating || 0;
        transformed.ratingCount = 0;
      }
    }

    // Ensure numeric fields
    transformed.price = parseFloat(data.price) || 0;
    transformed.originalPrice = data.originalPrice ? parseFloat(data.originalPrice) : null;
    transformed.discount = data.discount || 0;

    return transformed;
  }

  /**
   * Get all food items with filters and pagination
   */
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all parameters to query string
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '' && value !== 'all') {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/api/foods?${queryParams.toString()}`);
      
      // Handle nested response structure
      let foodData = [];
      let paginationData = null;

      if (response.data?.data?.data) {
        // Deeply nested: response.data.data.data
        foodData = response.data.data.data;
        paginationData = response.data.data.pagination;
      } else if (response.data?.data) {
        // Single nested: response.data.data
        foodData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        paginationData = response.data.pagination;
      } else if (Array.isArray(response.data)) {
        // Direct array
        foodData = response.data;
      }

      return {
        success: true,
        data: foodData,
        pagination: paginationData || {
          total: foodData.length,
          limit: parseInt(params.limit) || 20,
          skip: parseInt(params.skip) || 0,
          pages: Math.ceil(foodData.length / (parseInt(params.limit) || 20)),
          hasMore: false
        }
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
      
      // Extract data from nested structure
      const foodData = response.data?.data?.data || response.data?.data || response.data;
      
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
        if (params[key] !== undefined && params[key] !== '' && params[key] !== 'all') {
          queryParams.append(key, params[key]);
        }
      });

      const response = await api.get(`/api/foods/search?${queryParams.toString()}`);
      
      const foodData = response.data?.data?.data || response.data?.data || response.data || [];
      const paginationData = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(foodData) ? foodData : [],
        pagination: paginationData || {
          total: foodData.length,
          limit: parseInt(params.limit) || 20,
          skip: parseInt(params.skip) || 0,
          pages: Math.ceil(foodData.length / (parseInt(params.limit) || 20))
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create food item
   */
  async create(data, imageFile = null) {
    try {
      let payload;
      const headers = {};

      // If there's an image file, use FormData
      if (imageFile) {
        payload = new FormData();
        
        // Append all data fields
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            // Handle arrays and objects
            if (Array.isArray(value)) {
              value.forEach(item => payload.append(key, item));
            } else if (typeof value === 'object') {
              payload.append(key, JSON.stringify(value));
            } else {
              payload.append(key, value);
            }
          }
        });
        
        // Append image file
        payload.append('image', imageFile);
      } else {
        // JSON payload
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.post('/api/foods', payload, { headers });
      
      const foodData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: foodData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food item
   */
  async update(fid, data, imageFile = null) {
    try {
      let payload;
      const headers = {};

      // If there's an image file, use FormData
      if (imageFile) {
        payload = new FormData();
        
        // Append all data fields
        Object.keys(data).forEach(key => {
          const value = data[key];
          
          if (value !== null && value !== undefined) {
            // Handle arrays and objects
            if (Array.isArray(value)) {
              value.forEach(item => payload.append(key, item));
            } else if (typeof value === 'object') {
              payload.append(key, JSON.stringify(value));
            } else {
              payload.append(key, value);
            }
          }
        });
        
        // Append image file
        payload.append('image', imageFile);
      } else {
        // JSON payload
        payload = data;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api.put(`/api/foods/${fid}`, payload, { headers });
      
      const foodData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: foodData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete food item (soft delete)
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
   * Get food statistics
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
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update food availability
   */
  async updateAvailability(fid, isAvailable) {
    try {
      const response = await api.patch(`/api/foods/${fid}/availability`, {
        isAvailable
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
   * Update food quantity
   */
  async updateQuantity(fid, quantity, operation = 'set') {
    try {
      const response = await api.patch(`/api/foods/${fid}/quantity`, {
        quantity,
        operation
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
   * Error handler
   */
  handleError(error) {
    console.error('Food Service Error:', error);
    
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
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new FoodService();