import React, { createContext, useContext, useReducer, useCallback } from 'react';
import restaurantService from '../../services/restaurantService';

const RestaurantContext = createContext();

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_RESTAURANTS: 'SET_RESTAURANTS',
  SET_ERROR: 'SET_ERROR'
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
      
    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
}

export function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRestaurants = useCallback(async (params = {}) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await restaurantService.getAll(params);
      const raw = response?.data || {};

      // ✅ SAFE NORMALIZATION (handles all backend response shapes)
      const restaurants =
        raw?.data?.data ||  // Double nested: response.data.data.data
        raw?.data ||        // Single nested: response.data.data
        raw?.restaurants || // Alternative key
        [];

      const pagination =
        raw?.pagination ||         // Top level pagination
        raw?.data?.pagination ||   // Nested pagination
        {
          currentPage: params.page || 1,
          limit: params.limit || 10,
          total: restaurants.length,
          pages: Math.ceil(restaurants.length / (params.limit || 10)),
          hasMore: false
        };

      dispatch({
        type: ACTIONS.SET_RESTAURANTS,
        payload: { data: restaurants, pagination }
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error?.message || 'Failed to fetch restaurants'
      });
    }
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        ...state,
        fetchRestaurants
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within RestaurantProvider');
  }
  return context;
};

export default RestaurantContext;