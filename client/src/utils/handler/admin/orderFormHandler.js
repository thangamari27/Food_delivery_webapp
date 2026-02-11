import { Clock } from 'lucide-react';

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Get status badge configuration
 */
export const getStatusBadge = (status, type, content) => {
  const statuses = type === 'order' ? content.orderStatuses : content.paymentStatuses;
  const statusObj = statuses.find(s => s.value === status);
  
  return { 
    label: statusObj?.label || status, 
    color: statusObj?.color || 'bg-gray-100 text-gray-700',
    icon: statusObj?.icon || Clock  
  };
};

/**
 * Generate order ID
 */
export const generateOrderId = (orderCount) => {
  const year = new Date().getFullYear();
  const uuid = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `ORD-${year}-${uuid}`;
};

/**
 * Calculate order summary with all pricing components
 */
export const calculateOrderSummary = (items, options = {}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const taxRate = options.taxRate || 9; // 9% default
  const tax = subtotal * (taxRate / 100);
  const deliveryFee = options.deliveryFee || 50; // ₹50 default
  const tip = options.tip || 0;
  
  // Calculate discount
  let discountAmount = options.discountAmount || 0;
  const discountType = options.discountType || 'none';
  
  if (discountType === 'percentage' && discountAmount > 0) {
    discountAmount = subtotal * (discountAmount / 100);
  }
  
  const total = subtotal + tax + deliveryFee + tip - discountAmount;
  
  return { 
    subtotal: parseFloat(subtotal.toFixed(2)), 
    tax: parseFloat(tax.toFixed(2)),
    taxRate,
    deliveryFee: parseFloat(deliveryFee.toFixed(2)),
    tip: parseFloat(tip.toFixed(2)),
    discount: parseFloat(discountAmount.toFixed(2)),
    discountType,
    total: parseFloat(Math.max(0, total).toFixed(2))
  };
};

/**
 * COMPLETE VALIDATION - ALL BACKEND SCHEMA FIELDS
 */
export const validateOrderForm = (formData, selectedFoodItems) => {
  const errors = {};
  
  // ==================== CUSTOMER VALIDATION ====================
  
  // Customer Name (required, 2-100 chars)
  if (!formData.customerName?.trim()) {
    errors.customerName = 'Customer name is required';
  } else if (formData.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters';
  } else if (formData.customerName.trim().length > 100) {
    errors.customerName = 'Name cannot exceed 100 characters';
  }
  
  // Phone Number (required, valid format)
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }
  
  // Email (optional, but validate format if provided)
  if (formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // ==================== DELIVERY ADDRESS VALIDATION ====================
  
  // Street Address (required)
  if (!formData.street?.trim()) {
    errors.street = 'Street address is required';
  }
  
  // City (required)
  if (!formData.city?.trim()) {
    errors.city = 'City is required';
  }
  
  // State (required)
  if (!formData.state?.trim()) {
    errors.state = 'State is required';
  }
  
  // Zip Code (required, 6 digits for India)
  if (!formData.zipCode?.trim()) {
    errors.zipCode = 'Zip code is required';
  } else if (formData.country === 'India' && !/^\d{6}$/.test(formData.zipCode)) {
    errors.zipCode = 'Invalid Indian zip code (should be 6 digits)';
  } else if (formData.country === 'USA' && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
    errors.zipCode = 'Invalid US zip code';
  }
  
  // Delivery Instructions (optional, max 500 chars)
  if (formData.deliveryInstructions && formData.deliveryInstructions.length > 500) {
    errors.deliveryInstructions = 'Delivery instructions cannot exceed 500 characters';
  }
  
  // Coordinates validation (if provided, must be valid numbers)
  if (formData.latitude && (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)) {
    errors.latitude = 'Invalid latitude (-90 to 90)';
  }
  
  if (formData.longitude && (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)) {
    errors.longitude = 'Invalid longitude (-180 to 180)';
  }
  
  // ==================== RESTAURANT VALIDATION ====================
  
  // Restaurant (required)
  if (!formData.restaurantId) {
    errors.restaurantId = 'Please select a restaurant';
  }
  
  // ==================== ORDER ITEMS VALIDATION ====================
  
  // Food Items (at least one required)
  if (!selectedFoodItems || selectedFoodItems.length === 0) {
    errors.foodItems = 'Select at least one food item';
  }
  
  // Validate each food item
  if (selectedFoodItems && selectedFoodItems.length > 0) {
    selectedFoodItems.forEach((item, index) => {
      if (!item.name) {
        errors[`item_${index}_name`] = `Item ${index + 1}: Name is required`;
      }
      if (!item.price || item.price < 0) {
        errors[`item_${index}_price`] = `Item ${index + 1}: Valid price required`;
      }
      if (!item.quantity || item.quantity < 1) {
        errors[`item_${index}_quantity`] = `Item ${index + 1}: Quantity must be at least 1`;
      }
    });
  }
  
  // ==================== PRICING VALIDATION ====================
  
  // Tax Rate (0-100%)
  if (formData.taxRate !== undefined && formData.taxRate !== null) {
    const taxRate = parseFloat(formData.taxRate);
    if (isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
      errors.taxRate = 'Tax rate must be between 0 and 100%';
    }
  }
  
  // Delivery Fee (non-negative)
  if (formData.deliveryFee !== undefined && formData.deliveryFee !== null) {
    const deliveryFee = parseFloat(formData.deliveryFee);
    if (isNaN(deliveryFee) || deliveryFee < 0) {
      errors.deliveryFee = 'Delivery fee cannot be negative';
    }
  }
  
  // Tip (non-negative)
  if (formData.tip !== undefined && formData.tip !== null) {
    const tip = parseFloat(formData.tip);
    if (isNaN(tip) || tip < 0) {
      errors.tip = 'Tip cannot be negative';
    }
  }
  
  // Discount (non-negative)
  if (formData.discount !== undefined && formData.discount !== null) {
    const discount = parseFloat(formData.discount);
    if (isNaN(discount) || discount < 0) {
      errors.discount = 'Discount cannot be negative';
    }
  }
  
  // ==================== PAYMENT VALIDATION ====================
  
  // Payment Method (required)
  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  } else if (!['cash', 'card', 'online', 'wallet', 'upi'].includes(formData.paymentMethod)) {
    errors.paymentMethod = 'Invalid payment method';
  }
  
  // Transaction ID validation for online payments
  if ((formData.paymentMethod === 'online' || 
       formData.paymentMethod === 'card' || 
       formData.paymentMethod === 'upi') && 
      formData.paymentStatus === 'paid' && 
      !formData.transactionId?.trim()) {
    errors.transactionId = 'Transaction ID required for online/card/UPI payments';
  }
  
  // Refund Amount validation
  if (formData.refundAmount !== undefined && formData.refundAmount !== null) {
    const refundAmount = parseFloat(formData.refundAmount);
    const total = parseFloat(formData.total || 0);
    
    if (isNaN(refundAmount) || refundAmount < 0) {
      errors.refundAmount = 'Refund amount cannot be negative';
    } else if (refundAmount > total) {
      errors.refundAmount = 'Refund amount cannot exceed order total';
    }
  }
  
  // ==================== ORDER STATUS VALIDATION ====================
  
  // Order Status (validate enum)
  const validOrderStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way', 'delivered', 'cancelled', 'failed'];
  if (formData.orderStatus && !validOrderStatuses.includes(formData.orderStatus)) {
    errors.orderStatus = 'Invalid order status';
  }
  
  // Payment Status (validate enum)
  const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'];
  if (formData.paymentStatus && !validPaymentStatuses.includes(formData.paymentStatus)) {
    errors.paymentStatus = 'Invalid payment status';
  }
  
  // Cancel Reason (required if cancelled)
  if (formData.orderStatus === 'cancelled' && !formData.cancelReason?.trim()) {
    errors.cancelReason = 'Cancellation reason is required';
  }
  
  // ==================== TRACKING VALIDATION ====================
  
  // Preparation Time (non-negative integer)
  if (formData.preparationTime !== undefined && formData.preparationTime !== null && formData.preparationTime !== '') {
    const prepTime = parseInt(formData.preparationTime);
    if (isNaN(prepTime) || prepTime < 0) {
      errors.preparationTime = 'Preparation time must be a non-negative number';
    }
  }
  
  // Estimated Delivery Time validation
  if (formData.estimatedDeliveryTime) {
    const estimatedTime = new Date(formData.estimatedDeliveryTime);
    const now = new Date();
    if (estimatedTime < now) {
      errors.estimatedDeliveryTime = 'Estimated delivery time cannot be in the past';
    }
  }
  
  // Delivery Partner Phone validation
  if (formData.deliveryPartnerPhone && 
      !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(formData.deliveryPartnerPhone)) {
    errors.deliveryPartnerPhone = 'Invalid delivery partner phone number';
  }
  
  // ==================== ADDITIONAL FIELDS VALIDATION ====================
  
  // Notes (max 1000 chars)
  if (formData.notes && formData.notes.length > 1000) {
    errors.notes = 'Notes cannot exceed 1000 characters';
  }
  
  // Special Requests (max 500 chars)
  if (formData.specialRequests && formData.specialRequests.length > 500) {
    errors.specialRequests = 'Special requests cannot exceed 500 characters';
  }
  
  // Source validation
  const validSources = ['web', 'mobile', 'app', 'phone', 'admin'];
  if (formData.source && !validSources.includes(formData.source)) {
    errors.source = 'Invalid order source';
  }
  
  return errors;
};

/**
 * Validate individual field (for real-time validation)
 */
export const validateField = (fieldName, value, formData = {}, selectedFoodItems = []) => {
  const tempFormData = { ...formData, [fieldName]: value };
  const allErrors = validateOrderForm(tempFormData, selectedFoodItems);
  return allErrors[fieldName] || null;
};

/**
 * Check if order can be edited based on status
 */
export const canEditOrder = (orderStatus) => {
  const nonEditableStatuses = ['delivered', 'cancelled', 'failed'];
  return !nonEditableStatuses.includes(orderStatus);
};

/**
 * Check if order can be cancelled based on status
 */
export const canCancelOrder = (orderStatus) => {
  const nonCancellableStatuses = ['delivered', 'cancelled', 'failed'];
  return !nonCancellableStatuses.includes(orderStatus);
};

/**
 * Get valid status transitions
 */
export const getValidStatusTransitions = (currentStatus) => {
  const transitions = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['preparing', 'cancelled'],
    'preparing': ['ready', 'cancelled'],
    'ready': ['picked_up', 'cancelled'],
    'picked_up': ['on_the_way', 'cancelled'],
    'on_the_way': ['delivered', 'failed'],
    'delivered': [],
    'cancelled': [],
    'failed': []
  };
  
  return transitions[currentStatus] || [];
};

/**
 * Build full address from components
 */
export const buildFullAddress = (addressComponents) => {
  const { street, apartment, city, state, zipCode, country } = addressComponents;
  
  const parts = [
    street,
    apartment,
    city,
    state,
    zipCode,
    country
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format currency (Indian Rupee)
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0.00';
  return `₹${parseFloat(amount).toFixed(2)}`;
};

/**
 * Parse address string into components
 */
export const parseAddress = (addressString) => {
  if (!addressString) return {};
  
  const parts = addressString.split(',').map(p => p.trim());
  
  return {
    street: parts[0] || '',
    city: parts.length > 2 ? parts[parts.length - 3] : parts[parts.length - 2] || '',
    state: parts.length > 1 ? parts[parts.length - 2] : '',
    zipCode: '',
    country: parts[parts.length - 1] || 'India'
  };
};

/**
 * Sanitize form data before submission
 */
export const sanitizeFormData = (formData) => {
  const sanitized = { ...formData };
  
  // Trim all string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  });
  
  // Convert numeric fields
  const numericFields = ['taxRate', 'deliveryFee', 'tip', 'discount', 'refundAmount', 'preparationTime', 'latitude', 'longitude'];
  numericFields.forEach(field => {
    if (sanitized[field] !== undefined && sanitized[field] !== null && sanitized[field] !== '') {
      sanitized[field] = parseFloat(sanitized[field]);
      if (isNaN(sanitized[field])) {
        sanitized[field] = 0;
      }
    }
  });
  
  // Remove empty optional fields
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === '' || sanitized[key] === null || sanitized[key] === undefined) {
      delete sanitized[key];
    }
  });
  
  return sanitized;
};

/**
 * Calculate estimated delivery time based on preparation time and distance
 */
export const calculateEstimatedDelivery = (preparationTime = 30, distance = 5) => {
  // preparationTime in minutes, distance in km
  // Assume 30 km/h average delivery speed
  const deliveryTime = (distance / 30) * 60; // minutes
  const totalTime = preparationTime + deliveryTime + 10; // +10 min buffer
  
  const now = new Date();
  const estimated = new Date(now.getTime() + totalTime * 60000);
  
  return estimated.toISOString().slice(0, 16); // Format for datetime-local input
};

/**
 * Export all utilities
 */
export default {
  formatDate,
  getStatusBadge,
  generateOrderId,
  calculateOrderSummary,
  validateOrderForm,
  validateField,
  canEditOrder,
  canCancelOrder,
  getValidStatusTransitions,
  buildFullAddress,
  formatCurrency,
  parseAddress,
  sanitizeFormData,
  calculateEstimatedDelivery
};