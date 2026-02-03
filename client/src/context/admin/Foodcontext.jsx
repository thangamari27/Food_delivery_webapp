/**
 * Food Context
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
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
    restaurant: 'all',
    isVeg: undefined,
    minPrice: null,
    maxPrice: null
  },
  pagination: {
    currentPage: 1,
    limit: 20,
    total: 0,
    pages: 0,
    hasMore: false
  },
  stats: null
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_FOODS: 'SET_FOODS',
  SET_SELECTED_FOOD: 'SET_SELECTED_FOOD',
  ADD_FOOD: 'ADD_FOOD',
  UPDATE_FOOD: 'UPDATE_FOOD',
  DELETE_FOOD: 'DELETE_FOOD',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_STATS: 'SET_STATS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

function foodReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    case ACTIONS.SET_FOODS:
      return {
        ...state,
        foods: action.payload.data || [],
        pagination: action.payload.pagination || state.pagination,
        loading: false,
        error: null
      };
    case ACTIONS.SET_SELECTED_FOOD:
      return { ...state, selectedFood: action.payload };
    case ACTIONS.ADD_FOOD:
      return {
        ...state,
        foods: [action.payload, ...state.foods],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1
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
      return {
        ...state,
        foods: state.foods.filter(f => f.fid !== action.payload),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1)
        }
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      };
    case ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [state, dispatch] = useReducer(foodReducer, initialState);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const buildQueryParams = useCallback((filters) => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category && filters.category !== 'all') params.category = filters.category;
    if (filters.cuisine && filters.cuisine !== 'all') params.cuisine = filters.cuisine;
    if (filters.type && filters.type !== 'all') params.type = filters.type;
    if (filters.status && filters.status !== 'all') params.status = filters.status;
    if (filters.restaurant && filters.restaurant !== 'all') params.restaurant = filters.restaurant;
    if (filters.isVeg !== undefined) params.isVeg = filters.isVeg;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    return params;
  }, []);

  // Stable reference, no dependencies that change
  const fetchFoods = useCallback(async (customFilters = {}) => {
    try {
      if (!isMounted.current) return;
      
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      
      const params = {
        ...buildQueryParams(state.filters),
        ...customFilters,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit,
        sortBy: '-create_at'
      };

      const response = await foodService.getAll(params);
      
      if (isMounted.current) {
        dispatch({
          type: ACTIONS.SET_FOODS,
          payload: {
            data: response.data?.data || [],
            pagination: response.data?.pagination || {}
          }
        });
      }
      
      return response;
    } catch (error) {
      if (isMounted.current) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
      throw error;
    }
  }, []); // Empty dependencies - stable reference

  const fetchFood = useCallback(async (fid, incrementView = false) => {
    try {
      if (!isMounted.current) return;
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await foodService.getById(fid, incrementView);
      if (isMounted.current) {
        dispatch({ type: ACTIONS.SET_SELECTED_FOOD, payload: response.data?.data });
      }
      return response;
    } catch (error) {
      if (isMounted.current) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
      throw error;
    }
  }, []);

  const fetchFoodsByRestaurant = useCallback(async (restaurantId, params = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await foodService.getByRestaurant(restaurantId, params);
      dispatch({
        type: ACTIONS.SET_FOODS,
        payload: {
          data: response.data?.data || [],
          pagination: response.data?.pagination || {}
        }
      });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const createFood = useCallback(async (data, image = null) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await foodService.create(data, image);
      dispatch({ type: ACTIONS.ADD_FOOD, payload: response.data?.data });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateFood = useCallback(async (fid, data, image = null) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await foodService.update(fid, data, image);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data?.data });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateAvailability = useCallback(async (fid, isAvailable) => {
    try {
      const response = await foodService.updateAvailability(fid, isAvailable);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data?.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateQuantity = useCallback(async (fid, quantity, operation = 'set') => {
    try {
      const response = await foodService.updateQuantity(fid, quantity, operation);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data?.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteFood = useCallback(async (fid, permanent = false) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      if (permanent) {
        await foodService.deletePermanent(fid);
      } else {
        await foodService.deactivate(fid);
      }
      dispatch({ type: ACTIONS.DELETE_FOOD, payload: fid });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return true;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const fetchStats = useCallback(async (filters = {}) => {
    try {
      const response = await foodService.getStats(filters);
      dispatch({ type: ACTIONS.SET_STATS, payload: response.data?.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const searchFoods = useCallback(async (searchTerm, additionalFilters = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const params = {
        ...additionalFilters,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit
      };
      const response = await foodService.search(searchTerm, params);
      dispatch({
        type: ACTIONS.SET_FOODS,
        payload: {
          data: response.data?.data || [],
          pagination: response.data?.pagination || {}
        }
      });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, [state.pagination]);

  // No auto-fetch, just update state
  const setFilters = useCallback((newFilters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: newFilters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: { currentPage: page } });
  }, []);

  const setPageSize = useCallback((limit) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: { limit, currentPage: 1 } });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    state,
    foods: state.foods,
    selectedFood: state.selectedFood,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    stats: state.stats,
    fetchFoods,
    fetchFood,
    fetchFoodsByRestaurant,
    createFood,
    updateFood,
    updateAvailability,
    updateQuantity,
    deleteFood,
    fetchStats,
    searchFoods,
    setFilters,
    resetFilters,
    setPage,
    setPageSize,
    clearError
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

export default FoodContext;