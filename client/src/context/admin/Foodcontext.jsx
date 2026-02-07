/**
 * Food Context - Updated for Backend Integration
 * Manages food state and provides actions for components
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import foodService from '../../services/foodservice';

const initialState = {
  foods: [],
  selectedFood: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    cuisine: 'all',
    type: 'all',
    status: 'all',
    restaurant: 'all'
  },
  pagination: {
    currentPage: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    skip: 0
  }
};

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_FOOD: 'SET_FOOD',
  ADD_FOOD: 'ADD_FOOD',
  UPDATE_FOOD: 'UPDATE_FOOD',
  DELETE_FOOD: 'DELETE_FOOD',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

function foodReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: action.payload.data || [],
        pagination: {
          ...state.pagination,
          total: action.payload.pagination?.total || action.payload.data?.length || 0,
          totalPages: action.payload.pagination?.pages || Math.ceil((action.payload.data?.length || 0) / state.pagination.limit),
          skip: action.payload.pagination?.skip || 0
        }
      };

    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.SET_FOOD:
      return { ...state, selectedFood: action.payload };

    case ACTIONS.ADD_FOOD:
      return {
        ...state,
        foods: [action.payload, ...state.foods],
        pagination: { 
          ...state.pagination, 
          total: state.pagination.total + 1,
          totalPages: Math.ceil((state.pagination.total + 1) / state.pagination.limit)
        }
      };

    case ACTIONS.UPDATE_FOOD:
      return {
        ...state,
        foods: state.foods.map(f => 
          f.fid === action.payload.fid ? action.payload : f
        ),
        selectedFood: state.selectedFood?.fid === action.payload.fid 
          ? action.payload 
          : state.selectedFood
      };

    case ACTIONS.DELETE_FOOD:
      const remainingFoods = state.foods.filter(f => f.fid !== action.payload);
      return {
        ...state,
        foods: remainingFoods,
        pagination: { 
          ...state.pagination, 
          total: Math.max(0, state.pagination.total - 1),
          totalPages: Math.ceil(Math.max(0, state.pagination.total - 1) / state.pagination.limit)
        }
      };

    case ACTIONS.SET_FILTERS:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1, skip: 0 } // Reset to page 1 on filter change
      };

    case ACTIONS.RESET_FILTERS:
      return { 
        ...state, 
        filters: initialState.filters,
        pagination: { ...state.pagination, currentPage: 1, skip: 0 }
      };

    case ACTIONS.SET_PAGINATION:
      return { 
        ...state, 
        pagination: { ...state.pagination, ...action.payload }
      };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [state, dispatch] = useReducer(foodReducer, initialState);

  /**
   * Fetch all foods with filters and pagination
   */
  const fetchFoods = useCallback(async (customParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      // Combine state filters with custom params
      const params = {
        limit: state.pagination.limit,
        skip: state.pagination.skip,
        sortBy: '-create_at',
        ...customParams
      };

      // Add active filters
      Object.keys(state.filters).forEach(key => {
        if (state.filters[key] && state.filters[key] !== 'all' && state.filters[key] !== '') {
          params[key] = state.filters[key];
        }
      });

      const response = await foodService.getAll(params);
      
      dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        payload: response
      });

      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, [state.filters, state.pagination.limit, state.pagination.skip]);

  /**
   * Fetch single food by ID
   */
  const fetchFood = useCallback(async (fid, incrementView = false) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const response = await foodService.getById(fid, incrementView);
      dispatch({ type: ACTIONS.SET_FOOD, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Create new food item
   */
  const createFood = useCallback(async (data, imageFile = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      // Transform data to backend format
      const backendData = foodService.transformToBackendFormat(data);
      
      const response = await foodService.create(backendData, imageFile);
      dispatch({ type: ACTIONS.ADD_FOOD, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Update existing food item
   */
  const updateFood = useCallback(async (fid, data, imageFile = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      // Transform data to backend format
      const backendData = foodService.transformToBackendFormat(data);
      
      const response = await foodService.update(fid, backendData, imageFile);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Delete food item
   */
  const deleteFood = useCallback(async (fid, permanent = false) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      await foodService.delete(fid, permanent);
      dispatch({ type: ACTIONS.DELETE_FOOD, payload: fid });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Search foods
   */
  const searchFoods = useCallback(async (searchTerm, additionalParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const params = {
        limit: state.pagination.limit,
        skip: state.pagination.skip,
        ...additionalParams
      };
      
      const response = await foodService.search(searchTerm, params);
      
      dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        payload: response
      });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, [state.pagination.limit, state.pagination.skip]);

  /**
   * Update food availability
   */
  const updateAvailability = useCallback(async (fid, isAvailable) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const response = await foodService.updateAvailability(fid, isAvailable);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Update food quantity
   */
  const updateQuantity = useCallback(async (fid, quantity, operation = 'set') => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const response = await foodService.updateQuantity(fid, quantity, operation);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Set filters
   */
  const setFilters = useCallback((newFilters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: newFilters });
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  /**
   * Set pagination
   */
  const setPage = useCallback((page) => {
    const skip = (page - 1) * state.pagination.limit;
    dispatch({ 
      type: ACTIONS.SET_PAGINATION, 
      payload: { currentPage: page, skip } 
    });
  }, [state.pagination.limit]);

  /**
   * Set items per page
   */
  const setItemsPerPage = useCallback((limit) => {
    dispatch({ 
      type: ACTIONS.SET_PAGINATION, 
      payload: { limit, currentPage: 1, skip: 0 } 
    });
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  /**
   * Transform functions (exposed for components that need them)
   */
  const transformToBackendFormat = useCallback((data) => {
    return foodService.transformToBackendFormat(data);
  }, []);

  const transformToFrontendFormat = useCallback((data) => {
    return foodService.transformToFrontendFormat(data);
  }, []);

  const value = {
    // State
    foods: state.foods,
    selectedFood: state.selectedFood,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    
    // Actions
    fetchFoods,
    fetchFood,
    createFood,
    updateFood,
    deleteFood,
    searchFoods,
    updateAvailability,
    updateQuantity,
    setFilters,
    resetFilters,
    setPage,
    setItemsPerPage,
    clearError,
    
    // Transform functions
    transformToBackendFormat,
    transformToFrontendFormat
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within FoodProvider');
  }
  return context;
}