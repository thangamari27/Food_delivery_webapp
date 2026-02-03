/**
 * Restaurant Context
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef
} from 'react';
import restaurantService from '../../services/restaurantService';

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    cuisine: 'all',
    delivery: 'all',
    priceRange: 'all',
    city: '',
    minRating: null,
    maxRating: null
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
  SET_RESTAURANTS: 'SET_RESTAURANTS',
  SET_SELECTED_RESTAURANT: 'SET_SELECTED_RESTAURANT',
  ADD_RESTAURANT: 'ADD_RESTAURANT',
  UPDATE_RESTAURANT: 'UPDATE_RESTAURANT',
  DELETE_RESTAURANT: 'DELETE_RESTAURANT',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_STATS: 'SET_STATS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

function restaurantReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case ACTIONS.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.data || [],
        pagination: { ...state.pagination, ...action.payload.pagination },
        loading: false,
        error: null
      };

    case ACTIONS.SET_SELECTED_RESTAURANT:
      return { ...state, selectedRestaurant: action.payload };

    case ACTIONS.ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [action.payload, ...state.restaurants],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1
        }
      };

    case ACTIONS.UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map(r =>
          r.rid === action.payload.rid ? action.payload : r
        ),
        selectedRestaurant:
          state.selectedRestaurant?.rid === action.payload.rid
            ? action.payload
            : state.selectedRestaurant
      };

    case ACTIONS.DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(r => r.rid !== action.payload),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1)
        }
      };

    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialState.filters };

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

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const buildQueryParams = useCallback((filters) => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.status !== 'all') params.status = filters.status;
    if (filters.cuisine !== 'all') params.cuisine = filters.cuisine;
    if (filters.city) params.city = filters.city;

    if (filters.delivery !== 'all') {
      params.deliveryAvailable = filters.delivery === 'available';
    }

    if (filters.minRating !== null) params.minRating = filters.minRating;
    if (filters.maxRating !== null) params.maxRating = filters.maxRating;

    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under300') params.maxPrice = 300;
      if (filters.priceRange === 'moderate') {
        params.minPrice = 300;
        params.maxPrice = 500;
      }
      if (filters.priceRange === 'premium') params.minPrice = 500;
    }

    return params;
  }, []);

  const fetchRestaurants = useCallback(async (customFilters = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const params = {
        ...buildQueryParams(state.filters),
        ...customFilters,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit,
        sortBy: '-create_at'  // Fixed
      };

      const response = await restaurantService.getAll(params);
      
      dispatch({
        type: ACTIONS.SET_RESTAURANTS,
        payload: {
          data: response.data?.data || [],
          pagination: response.data?.pagination || {
            currentPage: state.pagination.currentPage,
            limit: state.pagination.limit,
            total: (response.data?.data || []).length,
            pages: Math.ceil((response.data?.data || []).length / state.pagination.limit),
            hasMore: false
          }
        }
      });

      return response;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, [buildQueryParams, state.filters, state.pagination.limit, state.pagination.currentPage]);

  const fetchRestaurant = useCallback(async (rid, incrementView = false) => {
    if (!isMounted.current) return;

    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await restaurantService.getById(rid, incrementView);

      if (isMounted.current) {
        dispatch({
          type: ACTIONS.SET_SELECTED_RESTAURANT,
          payload: response.data?.data
        });
      }

      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const createRestaurant = useCallback(async (data, image = null) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await restaurantService.create(data, image);
      dispatch({ type: ACTIONS.ADD_RESTAURANT, payload: response.data?.data });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateRestaurant = useCallback(async (rid, data, image = null) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await restaurantService.update(rid, data, image);
      dispatch({
        type: ACTIONS.UPDATE_RESTAURANT,
        payload: response.data?.data
      });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteRestaurant = useCallback(async (rid, permanent = false) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      permanent
        ? await restaurantService.deletePermanent(rid)
        : await restaurantService.deactivate(rid);

      dispatch({ type: ACTIONS.DELETE_RESTAURANT, payload: rid });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return true;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateStatus = useCallback(async (rid, status) => {
    try {
      const response = await restaurantService.updateStatus(rid, status);
      dispatch({
        type: ACTIONS.UPDATE_RESTAURANT,
        payload: response.data?.data
      });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const fetchStats = useCallback(async (filters = {}) => {
    try {
      const response = await restaurantService.getStats(filters);
      dispatch({ type: ACTIONS.SET_STATS, payload: response.data?.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const searchRestaurants = useCallback(async (searchTerm, extra = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const params = {
        ...extra,
        limit: state.pagination.limit,
        skip: (state.pagination.currentPage - 1) * state.pagination.limit
      };

      const response = await restaurantService.search(searchTerm, params);

      dispatch({
        type: ACTIONS.SET_RESTAURANTS,
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

  const setFilters = useCallback(
    (filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }),
    []
  );

  const resetFilters = useCallback(
    () => dispatch({ type: ACTIONS.RESET_FILTERS }),
    []
  );

  const setPage = useCallback(
    (page) =>
      dispatch({ type: ACTIONS.SET_PAGINATION, payload: { currentPage: page } }),
    []
  );

  const setPageSize = useCallback(
    (limit) =>
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: { limit, currentPage: 1 }
      }),
    []
  );

  const clearError = useCallback(
    () => dispatch({ type: ACTIONS.CLEAR_ERROR }),
    []
  );

  return (
    <RestaurantContext.Provider
      value={{
        state,
        ...state,
        fetchRestaurants,
        fetchRestaurant,
        createRestaurant,
        updateRestaurant,
        deleteRestaurant,
        updateStatus,
        fetchStats,
        searchRestaurants,
        setFilters,
        resetFilters,
        setPage,
        setPageSize,
        clearError
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
}

export default RestaurantContext;