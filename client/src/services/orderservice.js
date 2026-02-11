import api from './api';

class OrderService {
  /**
   * ========================================
   * DATA TRANSFORMATION
   * ========================================
   */

  /**
   * Transform frontend cart/form data to backend order format
   */
  transformToBackendFormat(cartItems, orderFormData, user, restaurantId) {
    // Validate inputs
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart items are required');
    }

    if (!restaurantId && (!cartItems[0]?.restaurant && !cartItems[0]?.restaurantId)) {
      throw new Error('Restaurant information is missing');
    }

    // Get restaurant ID from first item if not provided
    const finalRestaurantId = restaurantId || 
                              cartItems[0]?.restaurant || 
                              cartItems[0]?.restaurantId;

    if (!finalRestaurantId) {
      throw new Error('Unable to determine restaurant ID');
    }

    // Transform items with subtotal calculation
    const transformedItems = cartItems.map(item => {
      const foodItemId = item._id;
      
      if (!foodItemId) {
        throw new Error(`Missing MongoDB _id for item: ${item.name}`);
      }

      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const subtotal = price * quantity;

      return {
        foodItem: foodItemId, // MongoDB ObjectId
        foodId: item.fid || item.id, // Frontend UUID for display
        name: item.name,
        price: price,
        quantity: quantity,
        category: item.category || 'Food',
        subtotal: subtotal //  REQUIRED by backend
      };
    });

    // Calculate pricing
    const itemsSubtotal = transformedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = itemsSubtotal * 0.1; // 10% discount
    const taxRate = 9; // 9%
    const taxAmount = (itemsSubtotal - discountAmount) * (taxRate / 100);
    const deliveryFee = 50; // ₹50
    const total = itemsSubtotal - discountAmount + taxAmount + deliveryFee;

    return {
      // Customer Information
      customer: {
        userId: user?._id || null,
        name: orderFormData.name || user?.fullname || user?.username || '',
        phone: orderFormData.phone || user?.phone || '',
        email: orderFormData.email || user?.email || ''
      },

      // Delivery Information
      delivery: {
        address: {
          street: orderFormData.address || '',
          apartment: orderFormData.apartment || '',
          city: orderFormData.city || '',
          state: orderFormData.state || 'Tamil Nadu',
          zipCode: orderFormData.pincode || orderFormData.zipCode || '',
          country: 'India'
        },
        instructions: orderFormData.instructions || orderFormData.deliveryInstructions || ''
      },

      // Restaurant Information
      restaurant: {
        restaurantId: finalRestaurantId,
        name: cartItems[0]?.restaurantName || ''
      },

      // Order Items with subtotals
      items: transformedItems,

      // Pricing -  REQUIRED by backend
      pricing: {
        subtotal: parseFloat(itemsSubtotal.toFixed(2)),
        tax: parseFloat(taxAmount.toFixed(2)),
        taxRate: taxRate,
        deliveryFee: parseFloat(deliveryFee.toFixed(2)),
        discount: {
          amount: parseFloat(discountAmount.toFixed(2)),
          type: 'percentage',
          code: ''
        },
        tip: 0,
        total: parseFloat(total.toFixed(2))
      },

      // Payment Information
      payment: {
        method: orderFormData.paymentMethod || 'cash',
        status: 'pending'
      },

      // Optional fields
      notes: orderFormData.notes || orderFormData.instructions || '',
      specialRequests: orderFormData.specialRequests || '',
      source: 'web'
    };
  }

  /**
   * Transform backend order to frontend format
   */
  transformToFrontendFormat(orderData) {
    if (!orderData) return {};

    return {
      id: orderData.orderId,
      orderId: orderData.orderId,
      orderNumber: orderData.orderId,
      
      // Customer
      customerName: orderData.customer?.name || '',
      phone: orderData.customer?.phone || '',
      email: orderData.customer?.email || '',
      
      // Delivery
      address: orderData.delivery?.address?.fullAddress || 
               `${orderData.delivery?.address?.street}, ${orderData.delivery?.address?.city}`,
      deliveryInstructions: orderData.delivery?.instructions || '',
      
      // Restaurant
      restaurantId: orderData.restaurant?.restaurantId,
      restaurantName: orderData.restaurant?.name || '',
      
      // Items
      items: orderData.items || [],
      itemsList: orderData.items?.map(item => item.name) || [],
      
      // Pricing
      subtotal: orderData.pricing?.subtotal || 0,
      tax: orderData.pricing?.tax || 0,
      deliveryFee: orderData.pricing?.deliveryFee || 0,
      discount: orderData.pricing?.discount?.amount || 0,
      total: orderData.pricing?.total || 0,
      
      // Status
      orderStatus: orderData.orderStatus || 'pending',
      paymentStatus: orderData.payment?.status || 'pending',
      status: orderData.orderStatus || 'pending',
      
      // Dates
      orderDate: orderData.orderDate || orderData.createdAt,
      date: new Date(orderData.orderDate || orderData.createdAt).toLocaleDateString(),
      
      // Additional
      notes: orderData.notes || '',
      canCancel: ['pending', 'confirmed', 'preparing'].includes(orderData.orderStatus),
      
      // Full data for admin
      ...orderData
    };
  }

  /**
   * ========================================
   * CREATE OPERATIONS
   * ========================================
   */

  /**
   * Create new order (User & Admin)
   * POST /api/orders
   */
  async createOrder(cartItems, orderFormData, user, restaurantId = null) {
    try {
      // Validate cart items have MongoDB _id
      const missingIds = cartItems.filter(item => !item._id);
      if (missingIds.length > 0) {
        console.error('Cart items missing MongoDB _id:', missingIds);
        throw new Error('Some cart items are missing required database IDs. Please refresh and try again.');
      }

      // Transform data
      const backendData = this.transformToBackendFormat(
        cartItems, 
        orderFormData, 
        user, 
        restaurantId
      );

      const response = await api.post('/api/orders', backendData);
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      console.error('Order creation error:', error.response?.data || error);
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * READ OPERATIONS
   * ========================================
   */

  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '' && value !== 'all') {
          queryParams.append(key, value);
        }
      });

      const response = await api.get(`/api/orders?${queryParams.toString()}`);
      
      const orders = response.data?.data?.data || response.data?.data || response.data || [];
      const pagination = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(orders) ? orders.map(this.transformToFrontendFormat) : [],
        pagination: pagination || {
          total: orders.length,
          limit: parseInt(params.limit) || 20,
          skip: parseInt(params.skip) || 0,
          pages: Math.ceil(orders.length / (parseInt(params.limit) || 20))
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(orderId, populate = true) {
    try {
      const queryParams = populate ? '?populate=true' : '';
      const response = await api.get(`/api/orders/${orderId}${queryParams}`);
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getByCustomer(customerId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.skip) queryParams.append('skip', params.skip);
      if (params.orderStatus) queryParams.append('orderStatus', params.orderStatus);

      const response = await api.get(
        `/api/orders/customer/${customerId}?${queryParams.toString()}`
      );
      
      const orders = response.data?.data?.data || response.data?.data || response.data || [];
      const pagination = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(orders) ? orders.map(this.transformToFrontendFormat) : [],
        pagination
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMyOrders(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.skip) queryParams.append('skip', params.skip);
      if (params.orderStatus) queryParams.append('orderStatus', params.orderStatus);

      const response = await api.get(`/api/orders/my-orders?${queryParams.toString()}`);
      
      const orders = response.data?.data?.data || response.data?.data || response.data || [];
      const pagination = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(orders) ? orders.map(this.transformToFrontendFormat) : [],
        pagination
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getByRestaurant(restaurantId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.skip) queryParams.append('skip', params.skip);
      if (params.orderStatus) queryParams.append('orderStatus', params.orderStatus);
      if (params.dateRange) queryParams.append('dateRange', params.dateRange);

      const response = await api.get(
        `/api/orders/restaurant/${restaurantId}?${queryParams.toString()}`
      );
      
      const orders = response.data?.data?.data || response.data?.data || response.data || [];
      const pagination = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(orders) ? orders.map(this.transformToFrontendFormat) : [],
        pagination
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async search(searchTerm, params = {}) {
    try {
      const queryParams = new URLSearchParams({ q: searchTerm });
      
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.skip) queryParams.append('skip', params.skip);

      const response = await api.get(`/api/orders/search?${queryParams.toString()}`);
      
      const orders = response.data?.data?.data || response.data?.data || response.data || [];
      const pagination = response.data?.data?.pagination || response.data?.pagination;
      
      return {
        success: true,
        data: Array.isArray(orders) ? orders.map(this.transformToFrontendFormat) : [],
        pagination
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * UPDATE OPERATIONS
   * ========================================
   */

  async update(orderId, updateData) {
    try {
      const response = await api.put(`/api/orders/${orderId}`, updateData);
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStatus(orderId, status, note = '') {
    try {
      const response = await api.patch(`/api/orders/${orderId}/status`, { status, note });
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updatePayment(orderId, paymentStatus, transactionId = null) {
    try {
      const response = await api.patch(`/api/orders/${orderId}/payment`, {
        paymentStatus,
        transactionId
      });
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * DELETE OPERATIONS
   * ========================================
   */

  async cancel(orderId, reason) {
    try {
      const response = await api.post(`/api/orders/${orderId}/cancel`, { reason });
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(orderId) {
    try {
      const response = await api.delete(`/api/orders/${orderId}`);
      
      return {
        success: true,
        message: response.data?.message || 'Order deleted successfully'
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletePermanent(orderId) {
    try {
      const response = await api.delete(`/api/orders/${orderId}/permanent`);
      
      return {
        success: true,
        message: response.data?.message || 'Order permanently deleted'
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refund(orderId, amount = null) {
    try {
      const response = await api.post(`/api/orders/${orderId}/refund`, { amount });
      
      const orderData = response.data?.data?.data || response.data?.data || response.data;
      
      return {
        success: true,
        data: this.transformToFrontendFormat(orderData)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkUpdate(orderIds, updateData) {
    try {
      const response = await api.patch('/api/orders/bulk', {
        orderIds,
        updateData
      });
      
      return {
        success: true,
        message: response.data?.message || 'Orders updated successfully',
        data: response.data?.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * STATISTICS & ANALYTICS
   * ========================================
   */

  async getStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.restaurantId) queryParams.append('restaurantId', params.restaurantId);
      if (params.customerId) queryParams.append('customerId', params.customerId);
      if (params.dateRange) queryParams.append('dateRange', params.dateRange);

      const response = await api.get(`/api/orders/stats?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRevenue(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.restaurantId) queryParams.append('restaurantId', params.restaurantId);
      if (params.dateRange) queryParams.append('dateRange', params.dateRange);

      const response = await api.get(`/api/orders/revenue?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data || []
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPopularItems(limit = 10, restaurantId = null) {
    try {
      const queryParams = new URLSearchParams({ limit });
      
      if (restaurantId) queryParams.append('restaurantId', restaurantId);

      const response = await api.get(`/api/orders/popular-items?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data?.data?.data || response.data?.data || response.data || []
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * ========================================
   * ERROR HANDLER
   * ========================================
   */

  handleError(error) {
    console.error('Order Service Error:', error);
    
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     error.response.statusText ||
                     'Server error occurred';
      
      const err = new Error(message);
      err.status = error.response.status;
      err.data = error.response.data;
      return err;
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new OrderService();