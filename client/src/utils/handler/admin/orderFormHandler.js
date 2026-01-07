import { Clock } from 'lucide-react';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getStatusBadge = (status, type, content) => {
  const statuses = type === 'order' ? content.orderStatuses : content.paymentStatuses;
  const statusObj = statuses.find(s => s.value === status);
  const Icon = statusObj?.icon || Clock;
  return { 
    label: statusObj?.label || status, 
    color: statusObj?.color || 'bg-gray-100 text-gray-700',
    icon: Icon
  };
};

export const generateOrderId = (orderCount) => {
  return `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(3, '0')}`;
};

export const calculateOrderSummary = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.09;
  const deliveryFee = 5.00;
  return { 
    subtotal: parseFloat(subtotal.toFixed(2)), 
    tax: parseFloat(tax.toFixed(2)), 
    deliveryFee, 
    total: parseFloat((subtotal + tax + deliveryFee).toFixed(2)) 
  };
};

export const validateOrderForm = (formData, selectedFoodItems) => {
  const errors = {};
  if (!formData.customerName?.trim()) errors.customerName = 'Customer name is required';
  if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
  if (!formData.address?.trim()) errors.address = 'Delivery address is required';
  if (selectedFoodItems.length === 0) errors.foodItems = 'Select at least one food item';
  return errors;
};