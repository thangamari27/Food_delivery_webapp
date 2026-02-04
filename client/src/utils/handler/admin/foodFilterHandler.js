/**
 * Food Filter Handler Utilities
 */

// Validation rules for food form
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Food name is required';
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (!formData.cuisine) {
    errors.cuisine = 'Cuisine is required';
  }

  if (!formData.restaurant) {
    errors.restaurant = 'Restaurant is required';
  }

  const price = parseFloat(formData.price);
  if (!price || price <= 0 || isNaN(price)) {
    errors.price = 'Valid price is required';
  }

  if (formData.originalPrice) {
    const originalPrice = parseFloat(formData.originalPrice);
    if (originalPrice < price) {
      errors.originalPrice = 'Original price must be greater than or equal to current price';
    }
  }

  return errors;
};

// Status badge color mapping
export const getStatusColor = (status, isActive, isAvailable) => {
  if (status === 'Active' || (isActive && isAvailable)) {
    return 'bg-green-100 text-green-800';
  } else if (status === 'Out of Stock' || !isAvailable) {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};

// Apply client-side filters (only used for UI filtering after data is fetched)
export const applyClientFilters = (foods, filters) => {
  if (!Array.isArray(foods)) return [];

  return foods.filter(food => {
    if (filters.category && filters.category !== 'all' && food.category !== filters.category) {
      return false;
    }

    if (filters.cuisine && filters.cuisine !== 'all' && food.cuisine !== filters.cuisine) {
      return false;
    }

    if (filters.type && filters.type !== 'all' && food.type !== filters.type) {
      return false;
    }

    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'Active' && (!food.isActive || !food.isAvailable)) {
        return false;
      }
      if (filters.status === 'Inactive' && (food.isActive && food.isAvailable)) {
        return false;
      }
    }

    return true;
  });
};