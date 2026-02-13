import React, { createContext, useContext, useReducer, useCallback } from 'react';
import restaurantService from '../../services/restaurantService';

const RestaurantContext = createContext();

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_RESTAURANTS: 'SET_RESTAURANTS',
  ADD_RESTAURANT: 'ADD_RESTAURANT',
  UPDATE_RESTAURANT: 'UPDATE_RESTAURANT',
  REMOVE_RESTAURANT: 'REMOVE_RESTAURANT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const initialState = {
  restaurants: [],
  pagination: {
    currentPage: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasMore: false
  },
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case ACTIONS.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.data,
        pagination: action.payload.pagination,
        loading: false,
        error: null
      };
      
    case ACTIONS.ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [action.payload, ...state.restaurants],
        loading: false,
        error: null
      };
      
    case ACTIONS.UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map(r => 
          r._id === action.payload._id ? action.payload : r
        ),
        loading: false,
        error: null
      };
      
    case ACTIONS.REMOVE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(r => r._id !== action.payload),
        loading: false,
        error: null
      };
      
    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
      
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
      
    default:
      return state;
  }
}

/**
 * Normalize restaurant data from various API response structures
 * @param {Object} response - API response
 * @param {Object} params - Request parameters
 */
const normalizeRestaurantData = (response, params = {}) => {
  const raw = response?.data || {};
  
  // Handle different response structures
  let restaurants = [];
  let pagination = {};
  
  // Extract restaurants array
  if (raw?.data?.data && Array.isArray(raw.data.data)) {
    // Structure: { data: { data: [], pagination: {} } }
    restaurants = raw.data.data;
    pagination = raw.data.pagination || {};
  } else if (raw?.data && Array.isArray(raw.data)) {
    // Structure: { data: [], pagination: {} }
    restaurants = raw.data;
    pagination = raw.pagination || {};
  } else if (Array.isArray(raw)) {
    // Structure: []
    restaurants = raw;
  } else if (raw?.restaurants && Array.isArray(raw.restaurants)) {
    // Structure: { restaurants: [], pagination: {} }
    restaurants = raw.restaurants;
    pagination = raw.pagination || {};
  }
  
  // Build pagination object
  const currentPage = params.page || 1;
  const limit = params.limit || 10;
  const total = pagination.total || restaurants.length;
  const pages = pagination.pages || Math.ceil(total / limit);
  
  return {
    data: restaurants,
    pagination: {
      currentPage: pagination.currentPage || currentPage,
      limit: pagination.limit || limit,
      total: total,
      pages: pages,
      hasMore: pagination.hasMore !== undefined ? pagination.hasMore : currentPage < pages
    }
  };
};

export function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Fetch restaurants with filters and pagination
   * @param {Object} params - Query parameters
   */
  const fetchRestaurants = useCallback(async (params = {}) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.getAll(params);
      
      // Normalize the response data
      const normalized = normalizeRestaurantData(response, params);
      
      dispatch({
        type: ACTIONS.SET_RESTAURANTS,
        payload: normalized
      });
      
      return normalized;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to fetch restaurants'
      });
      throw error;
    }
  }, []);

  /**
   * Get restaurant by ID
   * @param {string} rid - Restaurant ID
   * @param {boolean} incrementView - Whether to increment view count
   */
  const getRestaurantById = useCallback(async (rid, incrementView = false) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.getById(rid, incrementView);
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to fetch restaurant'
      });
      throw error;
    }
  }, []);

  /**
   * Create new restaurant
   * @param {Object} data - Restaurant data
   * @param {File} imageFile - Image file
   */
  const createRestaurant = useCallback(async (data, imageFile) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const transformedData = restaurantService.transformToBackendFormat(data);
      const response = await restaurantService.create(transformedData, imageFile);
      
      if (response.success && response.data) {
        dispatch({
          type: ACTIONS.ADD_RESTAURANT,
          payload: response.data
        });
      }
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      
      return response;
    } catch (error) {
      console.error('Error creating restaurant:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to create restaurant'
      });
      throw error;
    }
  }, []);

  /**
   * Update restaurant
   * @param {string} rid - Restaurant ID
   * @param {Object} data - Update data
   * @param {File} imageFile - Optional new image
   */
  const updateRestaurant = useCallback(async (rid, data, imageFile = null) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const transformedData = restaurantService.transformToBackendFormat(data);
      const response = await restaurantService.update(rid, transformedData, imageFile);
      
      if (response.success && response.data) {
        dispatch({
          type: ACTIONS.UPDATE_RESTAURANT,
          payload: response.data
        });
      }
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      
      return response;
    } catch (error) {
      console.error('Error updating restaurant:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to update restaurant'
      });
      throw error;
    }
  }, []);

  /**
   * Delete restaurant (soft delete)
   * @param {string} rid - Restaurant ID
   */
  const deleteRestaurant = useCallback(async (rid) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.deactivate(rid);
      
      if (response.success) {
        dispatch({
          type: ACTIONS.REMOVE_RESTAURANT,
          payload: rid
        });
      }
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      
      return response;
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to delete restaurant'
      });
      throw error;
    }
  }, []);

  /**
   * Update restaurant status
   * @param {string} rid - Restaurant ID
   * @param {string} status - New status
   */
  const updateRestaurantStatus = useCallback(async (rid, status) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.updateStatus(rid, status);
      
      if (response.success && response.data) {
        dispatch({
          type: ACTIONS.UPDATE_RESTAURANT,
          payload: response.data
        });
      }
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      
      return response;
    } catch (error) {
      console.error('Error updating restaurant status:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to update status'
      });
      throw error;
    }
  }, []);

  /**
   * Search restaurants
   * @param {string} searchTerm - Search query
   * @param {Object} params - Additional params
   */
  const searchRestaurants = useCallback(async (searchTerm, params = {}) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.search(searchTerm, params);
      
      // Normalize the search results
      const normalized = normalizeRestaurantData(response, params);
      
      dispatch({
        type: ACTIONS.SET_RESTAURANTS,
        payload: normalized
      });
      
      return normalized;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to search restaurants'
      });
      throw error;
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  /**
   * Refresh current restaurant list
   */
  const refreshRestaurants = useCallback(async () => {
    const currentParams = {
      page: state.pagination.currentPage,
      limit: state.pagination.limit
    };
    return fetchRestaurants(currentParams);
  }, [state.pagination.currentPage, state.pagination.limit, fetchRestaurants]);

  const value = {
    ...state,
    fetchRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    updateRestaurantStatus,
    searchRestaurants,
    refreshRestaurants,
    clearError
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

/**
 * Custom hook to use restaurant context
 */
export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within RestaurantProvider');
  }
  return context;
};

export default RestaurantContext;