import React, { createContext, useContext, useReducer, useCallback } from 'react';
import orderService from '../../services/orderservice';
import { useAuthContext } from '../AuthContext';
import { useCart } from '../Cartcontext';

const OrderContext = createContext();

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    orderStatus: 'all',
    paymentStatus: 'all',
    dateRange: 'all'
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
  SET_ORDER: 'SET_ORDER',
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

/**
 * DATA TRANSFORMATION UTILITIES
 * Converts between backend and frontend data structures
 */
const DataTransformer = {
  /**
   * Transform backend order to frontend format
   * COMPLETE IMPLEMENTATION - ALL FIELDS
   */
  toFrontend(backendOrder) {
    if (!backendOrder) return null;

    return {
      // IDs
      id: backendOrder.orderId || backendOrder._id,
      orderId: backendOrder.orderId,
      _id: backendOrder._id,

      // Customer info (flattened from nested structure)
      userId: backendOrder.customer?.userId || null,
      customerName: backendOrder.customer?.name || '',
      phone: backendOrder.customer?.phone || '',
      email: backendOrder.customer?.email || '',

      // Delivery address (flattened from nested structure)
      street: backendOrder.delivery?.address?.street || '',
      apartment: backendOrder.delivery?.address?.apartment || '',
      city: backendOrder.delivery?.address?.city || '',
      state: backendOrder.delivery?.address?.state || '',
      zipCode: backendOrder.delivery?.address?.zipCode || '',
      country: backendOrder.delivery?.address?.country || 'India',
      address: backendOrder.delivery?.address?.fullAddress || 
               backendOrder.delivery?.address?.street || '',
      deliveryInstructions: backendOrder.delivery?.instructions || '',
      latitude: backendOrder.delivery?.coordinates?.latitude || null,
      longitude: backendOrder.delivery?.coordinates?.longitude || null,

      // Restaurant info (flattened from nested structure)
      restaurantId: backendOrder.restaurant?.restaurantId || 
                    backendOrder.restaurant?._id || 
                    backendOrder.restaurant || '',
      restaurantName: backendOrder.restaurant?.name || '',
      restaurantPhone: backendOrder.restaurant?.phone || '',

      // Order items
      items: (backendOrder.items || []).map(item => ({
        id: item.foodId || item.foodItem || item._id,
        foodId: item.foodId,
        foodItem: item.foodItem,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        subtotal: item.subtotal || (item.price * item.quantity)
      })),

      // Pricing (flattened from nested structure)
      subtotal: backendOrder.pricing?.subtotal || 0,
      tax: backendOrder.pricing?.tax || 0,
      taxRate: backendOrder.pricing?.taxRate || 9,
      deliveryFee: backendOrder.pricing?.deliveryFee || 50,
      tip: backendOrder.pricing?.tip || 0,
      discount: backendOrder.pricing?.discount?.amount || 0,
      discountCode: backendOrder.pricing?.discount?.code || '',
      discountType: backendOrder.pricing?.discount?.type || 'none',
      total: backendOrder.pricing?.total || 0,

      // Payment info (flattened from nested structure)
      paymentStatus: backendOrder.payment?.status || 'pending',
      paymentMethod: backendOrder.payment?.method || 'cash',
      transactionId: backendOrder.payment?.transactionId || '',
      paidAt: backendOrder.payment?.paidAt || null,
      refundedAt: backendOrder.payment?.refundedAt || null,
      refundAmount: backendOrder.payment?.refundAmount || 0,

      // Order status and metadata
      orderStatus: backendOrder.orderStatus || 'pending',
      deliveryStatus: backendOrder.deliveryStatus || 'pending',
      source: backendOrder.source || 'web',
      orderDate: backendOrder.orderDate || backendOrder.createdAt,
      updatedAt: backendOrder.updatedAt,
      orderAge: backendOrder.orderAge,
      totalItems: backendOrder.totalItems || backendOrder.items?.length || 0,
      
      // Tracking info (flattened from nested structure)
      estimatedDeliveryTime: backendOrder.tracking?.estimatedDeliveryTime || null,
      actualDeliveryTime: backendOrder.tracking?.actualDeliveryTime || null,
      preparationTime: backendOrder.tracking?.preparationTime || null,
      deliveryPartnerName: backendOrder.tracking?.deliveryPartner?.name || '',
      deliveryPartnerPhone: backendOrder.tracking?.deliveryPartner?.phone || '',
      deliveryPartnerVehicle: backendOrder.tracking?.deliveryPartner?.vehicleNumber || '',
      statusHistory: backendOrder.tracking?.statusHistory || [],
      
      // Flags
      isActive: backendOrder.isActive !== undefined ? backendOrder.isActive : true,
      isCancelled: backendOrder.isCancelled || false,
      cancelledAt: backendOrder.cancelledAt || null,
      cancelReason: backendOrder.cancelReason || '',
      cancelledBy: backendOrder.cancelledBy || null,

      // Additional fields
      notes: backendOrder.notes || '',
      specialRequests: backendOrder.specialRequests || '',
      
      // Rating fields
      foodRating: backendOrder.rating?.food || null,
      deliveryRating: backendOrder.rating?.delivery || null,
      overallRating: backendOrder.rating?.overall || null,
      review: backendOrder.rating?.review || '',
      reviewedAt: backendOrder.rating?.reviewedAt || null,
      
      // Metadata
      createdBy: backendOrder.createdBy || null,
      updatedBy: backendOrder.updatedBy || null,
      
      // Keep tracking object for reference
      tracking: backendOrder.tracking || { statusHistory: [] },

      // Keep original data for reference
      _original: backendOrder
    };
  },

  /**
   * Transform frontend form data to backend format
   * COMPLETE IMPLEMENTATION - ALL FIELDS
   */
  toBackend(frontendData, selectedFoodItems = []) {
    const backendData = {
      // Customer info (nested structure)
      customer: {
        userId: frontendData.userId || undefined,
        name: frontendData.customerName?.trim() || '',
        phone: frontendData.phone?.trim() || '',
        email: frontendData.email?.trim() || undefined
      },

      // Delivery address (nested structure)
      delivery: {
        address: {
          street: frontendData.street?.trim() || '',
          apartment: frontendData.apartment?.trim() || undefined,
          city: frontendData.city?.trim() || '',
          state: frontendData.state?.trim() || '',
          zipCode: frontendData.zipCode?.trim() || '',
          country: frontendData.country?.trim() || 'India',
          fullAddress: frontendData.address?.trim() || 
                      `${frontendData.street?.trim()}${frontendData.apartment ? ', ' + frontendData.apartment.trim() : ''}, ${frontendData.city?.trim()}, ${frontendData.state?.trim()}, ${frontendData.zipCode?.trim()}, ${frontendData.country?.trim() || 'India'}`
        },
        instructions: frontendData.deliveryInstructions?.trim() || undefined,
        coordinates: (frontendData.latitude && frontendData.longitude) ? {
          latitude: parseFloat(frontendData.latitude),
          longitude: parseFloat(frontendData.longitude)
        } : undefined
      },

      // Order items - transform to backend format
      items: selectedFoodItems.map(item => ({
        foodItem: item.foodItem || item._id || item.id,
        foodId: item.foodId || item.fid || item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        category: item.category || 'Main Course',
        subtotal: parseFloat(item.price) * parseInt(item.quantity)
      })),

      // Pricing (nested structure)
      pricing: frontendData.pricing || {
        subtotal: parseFloat(frontendData.subtotal || 0),
        tax: parseFloat(frontendData.tax || 0),
        taxRate: parseFloat(frontendData.taxRate || 9),
        deliveryFee: parseFloat(frontendData.deliveryFee || 50),
        tip: parseFloat(frontendData.tip || 0),
        discount: {
          amount: parseFloat(frontendData.discount || 0),
          code: frontendData.discountCode?.trim() || undefined,
          type: frontendData.discountType || 'none'
        },
        total: parseFloat(frontendData.total || 0)
      },

      // Payment info (nested structure)
      payment: {
        status: frontendData.paymentStatus || 'pending',
        method: frontendData.paymentMethod || 'cash',
        transactionId: frontendData.transactionId?.trim() || undefined,
        refundAmount: parseFloat(frontendData.refundAmount || 0)
      },

      // Tracking info (nested structure)
      tracking: {
        estimatedDeliveryTime: frontendData.estimatedDeliveryTime 
          ? new Date(frontendData.estimatedDeliveryTime)
          : undefined,
        actualDeliveryTime: frontendData.actualDeliveryTime
          ? new Date(frontendData.actualDeliveryTime)
          : undefined,
        preparationTime: frontendData.preparationTime 
          ? parseInt(frontendData.preparationTime)
          : undefined,
        deliveryPartner: (frontendData.deliveryPartnerName || 
                         frontendData.deliveryPartnerPhone || 
                         frontendData.deliveryPartnerVehicle) ? {
          name: frontendData.deliveryPartnerName?.trim() || undefined,
          phone: frontendData.deliveryPartnerPhone?.trim() || undefined,
          vehicleNumber: frontendData.deliveryPartnerVehicle?.trim() || undefined
        } : undefined
      },

      // Order status
      orderStatus: frontendData.orderStatus || 'pending',
      
      // Source
      source: frontendData.source || 'admin',

      // Notes and requests
      notes: frontendData.notes?.trim() || undefined,
      specialRequests: frontendData.specialRequests?.trim() || undefined,

      // Flags
      isActive: frontendData.isActive !== undefined ? frontendData.isActive : true,
      isCancelled: frontendData.isCancelled || false,
      cancelReason: frontendData.cancelReason?.trim() || undefined,
      
      // Metadata
      createdBy: frontendData.createdBy || undefined,
      updatedBy: frontendData.updatedBy || undefined
    };

    // Add restaurant if provided (can be ObjectId or nested object)
    if (frontendData.restaurantId) {
      backendData.restaurant = frontendData.restaurantId;
    } else if (frontendData.restaurant) {
      backendData.restaurant = frontendData.restaurant;
    }

    return backendData;
  },

  /**
   * Calculate pricing from food items
   * ENHANCED with discount type support
   */
  calculatePricing(foodItems, options = {}) {
    const subtotal = foodItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    const taxRate = options.taxRate || 9; // 9% default
    const deliveryFee = options.deliveryFee || 50; // ₹50 default
    const tip = options.tip || 0;
    
    // Calculate discount
    let discountAmount = options.discountAmount || 0;
    const discountType = options.discountType || 'none';
    
    if (discountType === 'percentage' && discountAmount > 0) {
      // Percentage discount on subtotal
      discountAmount = subtotal * (discountAmount / 100);
    }
    // For 'fixed' or 'none', use the amount as is

    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax + deliveryFee + tip - discountAmount;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      taxRate,
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      tip: parseFloat(tip.toFixed(2)),
      discount: {
        amount: parseFloat(discountAmount.toFixed(2)),
        code: options.discountCode || undefined,
        type: discountType
      },
      total: parseFloat(Math.max(0, total).toFixed(2))
    };
  },

  /**
   * Transform array of backend orders to frontend format
   */
  transformOrders(backendOrders) {
    if (!Array.isArray(backendOrders)) return [];
    return backendOrders.map(order => DataTransformer.toFrontend(order));
  }
};

function orderReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      const transformedOrders = DataTransformer.transformOrders(action.payload.data || []);
      
      return {
        ...state,
        loading: false,
        orders: transformedOrders,
        pagination: {
          ...state.pagination,
          total: action.payload.pagination?.total || transformedOrders.length,
          totalPages: action.payload.pagination?.pages || 
                      Math.ceil(transformedOrders.length / state.pagination.limit),
          skip: action.payload.pagination?.skip || 0
        }
      };

    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.SET_ORDER:
      const transformedOrder = DataTransformer.toFrontend(action.payload);
      return { ...state, selectedOrder: transformedOrder };

    case ACTIONS.ADD_ORDER:
      const newOrder = DataTransformer.toFrontend(action.payload);
      return {
        ...state,
        orders: [newOrder, ...state.orders],
        pagination: { 
          ...state.pagination, 
          total: state.pagination.total + 1,
          totalPages: Math.ceil((state.pagination.total + 1) / state.pagination.limit)
        }
      };

    case ACTIONS.UPDATE_ORDER:
      const updatedOrder = DataTransformer.toFrontend(action.payload);
      return {
        ...state,
        orders: state.orders.map(order => 
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        ),
        selectedOrder: state.selectedOrder?.orderId === updatedOrder.orderId 
          ? updatedOrder 
          : state.selectedOrder
      };

    case ACTIONS.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.orderId !== action.payload),
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
        pagination: { ...state.pagination, currentPage: 1, skip: 0 }
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

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { user } = useAuthContext();
  const { clearCart } = useCart();

  /**
   * ========================================
   * CREATE OPERATIONS
   * ========================================
   */

  /**
   * Create order from cart
   */
  const createOrder = useCallback(async (cartItems, orderFormData, restaurantId = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Call order service
      const response = await orderService.createOrder(
        cartItems, 
        orderFormData, 
        user, 
        restaurantId
      );
      
      if (response.success) {
        // Clear cart after successful order
        clearCart();
        
        dispatch({ type: ACTIONS.ADD_ORDER, payload: response.data });
      }
      
      return response;
    } catch (error) {
      console.error('OrderContext.createOrder error:', error);
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, [user, clearCart]);

  /**
   * ========================================
   * READ OPERATIONS
   * ========================================
   */

  /**
   * Fetch all orders (Admin)
   */
  const fetchOrders = useCallback(async (customParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const params = {
        limit: state.pagination.limit,
        skip: state.pagination.skip,
        sortBy: '-orderDate',
        ...customParams
      };

      // Add active filters
      Object.keys(state.filters).forEach(key => {
        if (state.filters[key] && state.filters[key] !== 'all' && state.filters[key] !== '') {
          params[key] = state.filters[key];
        }
      });

      const response = await orderService.getAll(params);
      
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
   * Fetch my orders (User)
   */
  const fetchMyOrders = useCallback(async (params = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const queryParams = {
        limit: params.limit || state.pagination.limit,
        skip: params.skip || state.pagination.skip,
        ...params
      };

      const response = await orderService.getMyOrders(queryParams);
      
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
   * Fetch order by ID
   */
  const fetchOrder = useCallback(async (orderId, populate = true) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const response = await orderService.getById(orderId, populate);
      
      dispatch({ type: ACTIONS.SET_ORDER, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Search orders (Admin)
   */
  const searchOrders = useCallback(async (searchTerm, additionalParams = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const params = {
        limit: state.pagination.limit,
        skip: state.pagination.skip,
        ...additionalParams
      };
      
      const response = await orderService.search(searchTerm, params);
      
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
   * ========================================
   * UPDATE OPERATIONS
   * ========================================
   */

  /**
   * Update order (Admin)
   */
  const updateOrder = useCallback(async (orderId, updateData) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const response = await orderService.update(orderId, updateData);
      
      dispatch({ type: ACTIONS.UPDATE_ORDER, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Update order status (Admin)
   */
  const updateOrderStatus = useCallback(async (orderId, status, note = '') => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const response = await orderService.updateStatus(orderId, status, note);
      
      dispatch({ type: ACTIONS.UPDATE_ORDER, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Update payment status (Admin)
   */
  const updatePaymentStatus = useCallback(async (orderId, paymentStatus, transactionId = null) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const response = await orderService.updatePayment(orderId, paymentStatus, transactionId);
      
      dispatch({ type: ACTIONS.UPDATE_ORDER, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * ========================================
   * DELETE OPERATIONS
   * ========================================
   */

  /**
   * Cancel order (User & Admin)
   */
  const cancelOrder = useCallback(async (orderId, reason = 'Customer request') => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      const response = await orderService.cancel(orderId, reason);
      
      dispatch({ type: ACTIONS.UPDATE_ORDER, payload: response.data });
      
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * Delete order (Admin)
   */
  const deleteOrder = useCallback(async (orderId, permanent = false) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      
      if (permanent) {
        await orderService.deletePermanent(orderId);
      } else {
        await orderService.delete(orderId);
      }
      
      dispatch({ type: ACTIONS.DELETE_ORDER, payload: orderId });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const getStats = useCallback(async (params = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const response = await orderService.getStats(params);
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);
  
  const getRevenue = useCallback(async (params = {}) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const response = await orderService.getRevenue(params);
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  /**
   * ========================================
   * FILTER & PAGINATION
   * ========================================
   */

  const setFilters = useCallback((newFilters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: newFilters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const setPage = useCallback((page) => {
    const skip = (page - 1) * state.pagination.limit;
    dispatch({ 
      type: ACTIONS.SET_PAGINATION, 
      payload: { currentPage: page, skip } 
    });
  }, [state.pagination.limit]);

  const setItemsPerPage = useCallback((limit) => {
    dispatch({ 
      type: ACTIONS.SET_PAGINATION, 
      payload: { limit, currentPage: 1, skip: 0 } 
    });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    // State
    orders: state.orders,
    selectedOrder: state.selectedOrder,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    
    // Actions
    createOrder,
    fetchOrders,
    fetchMyOrders,
    fetchOrder,
    searchOrders,
    updateOrder,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
    deleteOrder,
    setFilters,
    resetFilters,
    setPage,
    setItemsPerPage,
    clearError,
    getStats,
    getRevenue,

    // Utilities
    transformToBackend: DataTransformer.toBackend,
    transformToFrontend: DataTransformer.toFrontend,
    calculatePricing: DataTransformer.calculatePricing
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
}

export default OrderContext;