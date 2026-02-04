// Status color mapping
const statusColor = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-yellow-100 text-yellow-800',
  Closed: 'bg-red-100 text-red-800'
};

export const getStatusColor = (status) => {
  return statusColor[status] || 'bg-gray-100 text-gray-800';
};

// Validation rules
const validationRules = {
  name: {
    required: true,
    message: 'Restaurant name is required'
  },
  contactPerson: {
    required: true,
    message: 'Contact person is required'
  },
  phone: {
    required: true,
    pattern: /^\+?[\d\s-]{10,}$/,
    messages: {
      required: 'Phone number is required',
      invalid: 'Invalid phone format'
    }
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  cuisine: {
    required: true,
    minLength: 1,
    message: 'Select at least one cuisine'
  },
  priceRange: {
    required: true,
    message: 'Price range is required'
  }
};

export const validateForm = (formData) => {
  const errors = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const value = formData[field];

    // Check required fields
    if (rules.required) {
      if (Array.isArray(value)) {
        if (!value.length || (rules.minLength && value.length < rules.minLength)) {
          errors[field] = rules.message;
        }
      } else if (typeof value === 'string' && !value.trim()) {
        errors[field] = rules.messages?.required || rules.message;
      } else if (!value) {
        errors[field] = rules.messages?.required || rules.message;
      }
    }

    // Check pattern validation
    if (value && rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      errors[field] = rules.messages?.invalid || rules.message;
    }
  });

  // Add manual validation for nested address fields
  if (!formData.address?.city?.trim()) {
    errors['address.city'] = 'City is required';
  }
  
  if (!formData.address?.street?.trim()) {
    errors['address.street'] = 'Street address is required';
  }

  return errors;
};

// Filter helpers with safe property access
const matchesSearchTerm = (restaurant, term) => {
  if (!term || !restaurant) return false;
  
  const searchLower = term.toLowerCase();
  
  // Safe search in name
  const nameMatch = restaurant.name && 
    typeof restaurant.name === 'string' &&
    restaurant.name.toLowerCase().includes(searchLower);
  
  // Safe search in city (nested in address)
  const cityMatch = restaurant.address?.city && 
    typeof restaurant.address.city === 'string' &&
    restaurant.address.city.toLowerCase().includes(searchLower);
  
  // Safe search in cuisine array
  const cuisineMatch = restaurant.cuisine && 
    Array.isArray(restaurant.cuisine) &&
    restaurant.cuisine.some(c => 
      c && typeof c === 'string' && 
      c.toLowerCase().includes(searchLower)
    );
  
  return nameMatch || cityMatch || cuisineMatch;
};

const matchesStatus = (restaurant, status) => {
  if (!restaurant) return false;
  return status === 'all' || restaurant.status === status;
};

const matchesCuisine = (restaurant, cuisine) => {
  if (!restaurant || !restaurant.cuisine) return false;
  return cuisine === 'all' || restaurant.cuisine.includes(cuisine);
};

const matchesDelivery = (restaurant, delivery) => {
  if (!restaurant) return false;
  if (delivery === 'all') return true;
  return restaurant.deliveryAvailable === (delivery === 'yes');
};

const extractPriceFromRange = (priceRange) => {
  if (!priceRange || typeof priceRange !== 'string') return 0;
  const match = priceRange.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const matchesPriceRange = (restaurant, priceRange) => {
  if (!restaurant) return false;
  if (priceRange === 'all') return true;
  
  const price = extractPriceFromRange(restaurant.priceRange);
  
  switch (priceRange) {
    case 'budget':
      return price < 300;
    case 'moderate':
      return price >= 300 && price <= 500;
    case 'premium':
      return price > 500;
    default:
      return true;
  }
};

export const applyFilters = (restaurants, searchTerm, filters) => {
  if (!Array.isArray(restaurants)) return [];
  
  return restaurants.filter(restaurant => {
    if (!restaurant) return false;
    
    if (searchTerm && !matchesSearchTerm(restaurant, searchTerm)) {
      return false;
    }
    
    if (!matchesStatus(restaurant, filters.status)) {
      return false;
    }
    
    if (!matchesCuisine(restaurant, filters.cuisine)) {
      return false;
    }
    
    if (!matchesDelivery(restaurant, filters.delivery)) {
      return false;
    }
    
    if (!matchesPriceRange(restaurant, filters.priceRange)) {
      return false;
    }
    
    return true;
  });
};

// Sort comparators with safe access
const compareByRating = (a, b, direction) => {
  const ratingA = a.rating || 0;
  const ratingB = b.rating || 0;
  return direction === 'asc' ? ratingA - ratingB : ratingB - ratingA;
};

const compareByName = (a, b, direction) => {
  const nameA = a.name || '';
  const nameB = b.name || '';
  return direction === 'asc' 
    ? nameA.localeCompare(nameB)
    : nameB.localeCompare(nameA);
};

const sortComparators = {
  rating: compareByRating,
  name: compareByName
};

export const sortRestaurants = (restaurants, sortConfig) => {
  if (!Array.isArray(restaurants) || !sortConfig.key || !sortComparators[sortConfig.key]) {
    return restaurants || [];
  }
  
  return [...restaurants].sort((a, b) => 
    sortComparators[sortConfig.key](a, b, sortConfig.direction)
  );
};