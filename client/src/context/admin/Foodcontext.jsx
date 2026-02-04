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
    status: 'all'
  },
  pagination: {
    currentPage: 1,
    limit: 20,
    total: 0,
    totalPages: 1
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
          totalPages: action.payload.pagination?.pages || 1
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
        pagination: { ...state.pagination, total: state.pagination.total + 1 }
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
        pagination: { ...state.pagination, total: Math.max(0, state.pagination.total - 1) }
      };

    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialState.filters };

    case ACTIONS.SET_PAGINATION:
      return { ...state, pagination: { ...state.pagination, ...action.payload } };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [state, dispatch] = useReducer(foodReducer, initialState);

  const fetchFoods = useCallback(async (customParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const params = {
        ...state.filters,
        ...customParams,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit
      };

      // Remove 'all' filters
      Object.keys(params).forEach(key => {
        if (params[key] === 'all') delete params[key];
      });

      const response = await foodService.getAll(params);
      
      dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        payload: {
          data: response.data || [],
          pagination: response.pagination || {
            limit: state.pagination.limit,
            skip: (state.pagination.currentPage - 1) * state.pagination.limit,
            total: response.data?.length || 0,
            pages: Math.ceil((response.data?.length || 0) / state.pagination.limit)
          }
        }
      });

      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, [state.filters, state.pagination.limit, state.pagination.currentPage]);

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

  const createFood = useCallback(async (data, image = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const backendData = foodService.transformToBackendFormat(data);
      const response = await foodService.create(backendData, image);
      dispatch({ type: ACTIONS.ADD_FOOD, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateFood = useCallback(async (fid, data, image = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const backendData = foodService.transformToBackendFormat(data);
      const response = await foodService.update(fid, backendData, image);
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

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

  const searchFoods = useCallback(async (searchTerm, additionalParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const params = {
        ...additionalParams,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit
      };
      const response = await foodService.search(searchTerm, params);
      dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        payload: {
          data: response.data || [],
          pagination: response.pagination || state.pagination
        }
      });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, [state.pagination]);

  const setFilters = useCallback((newFilters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: newFilters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: { currentPage: page } });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  // Expose transform functions
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
    setFilters,
    resetFilters,
    setPage,
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