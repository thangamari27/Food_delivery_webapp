/**
 * Data Transformers
 * Transform backend API responses to frontend format
 */

/**
 * Transform backend booking to frontend format
 * @param {Object} backendBooking - Booking from backend
 * @returns {Object} Transformed booking
 */
export const transformBookingFromBackend = (backendBooking) => {
  if (!backendBooking) return null;

  // Handle nested structure
  const restaurant = backendBooking.restaurant || {};
  const customer = backendBooking.customer || {};
  const deposit = backendBooking.deposit || {};

  return {
    // Booking identifiers
    id: backendBooking.bookingId || backendBooking.id || backendBooking._id,
    _id: backendBooking._id,
    bookingId: backendBooking.bookingId,
    
    // Restaurant information (flattened from nested)
    restaurantId: restaurant.restaurantId || '',
    restaurantName: restaurant.restaurantName || '',
    cuisine: restaurant.cuisine || '',
    restaurantPhone: restaurant.phone || '',
    restaurantAddress: restaurant.address || '',
    
    // Customer information (flattened from nested)
    customerName: customer.name || '',
    customerEmail: customer.email || '',
    customerPhone: customer.phone || '',
    customerId: customer.userId || customer.customerId,
    
    // Booking details
    date: backendBooking.bookingDate,
    time: backendBooking.bookingTime,
    guests: backendBooking.numberOfGuests,
    tableNumber: backendBooking.tableNumber,
    tableType: backendBooking.tableType || 'Standard',
    specialRequests: backendBooking.specialRequests || '',
    dietaryRestrictions: backendBooking.dietaryRestrictions || [],
    occasion: backendBooking.occasion || 'Regular',
    
    // Status
    status: backendBooking.status || 'pending',
    canCancel: backendBooking.canCancel !== undefined ? backendBooking.canCancel : true,
    isCancelled: backendBooking.isCancelled || false,
    cancelledAt: backendBooking.cancelledAt,
    cancellationReason: backendBooking.cancellationReason,
    cancellationNotes: backendBooking.cancellationNotes,
    
    // Admin fields
    adminNotes: backendBooking.adminNotes || '',
    internalNotes: backendBooking.internalNotes || '',
    confirmedAt: backendBooking.confirmedAt,
    confirmedBy: backendBooking.confirmedBy,
    
    // Deposit
    deposit: {
      required: deposit.required || false,
      amount: deposit.amount || 0,
      paid: deposit.paid || false,
      refunded: deposit.refunded || false
    },
    
    // Notifications
    reminderSent: backendBooking.reminderSent || false,
    confirmationEmailSent: backendBooking.confirmationEmailSent || false,
    
    // Metadata
    source: backendBooking.source || 'Web',
    createdAt: backendBooking.createdAt,
    updatedAt: backendBooking.updatedAt,
    
    // Virtual fields from backend
    cancellationDeadline: backendBooking.cancellationDeadline,
    hoursUntilBooking: backendBooking.hoursUntilBooking,
    isUpcoming: backendBooking.isUpcoming,
    isPast: backendBooking.isPast,
    
    // Rating and visit info
    rating: backendBooking.rating,
    arrivedAt: backendBooking.arrivedAt,
    departedAt: backendBooking.departedAt,
    actualGuests: backendBooking.actualGuests,
  };
};

/**
 * Transform frontend booking data to backend format for creation
 * @param {Object} frontendBooking - Booking from frontend form
 * @param {Object} restaurant - Restaurant data
 * @returns {Object} Transformed booking for backend
 */
export const transformBookingToBackend = (frontendBooking, restaurant) => {
  return {
    restaurant: {
      restaurantId: restaurant._id || restaurant.id,
      restaurantName: restaurant.name,
      cuisine: Array.isArray(restaurant.cuisine) ? restaurant.cuisine[0] : restaurant.cuisine,
      phone: restaurant.phone,
      address: restaurant.fullAddress || restaurant.address
    },
    customer: {
      name: frontendBooking.name,
      email: frontendBooking.email,
      phone: frontendBooking.phone
    },
    bookingDate: frontendBooking.date,
    bookingTime: frontendBooking.time,
    numberOfGuests: parseInt(frontendBooking.guests),
    tableNumber: frontendBooking.tableNumber,
    tableType: frontendBooking.tableType || 'Standard',
    specialRequests: frontendBooking.specialRequests || '',
    dietaryRestrictions: frontendBooking.dietaryRestrictions || [],
    occasion: frontendBooking.occasion || 'Regular',
    source: 'Web',
    deposit: frontendBooking.deposit
  };
};

/**
 * Transform backend restaurant to frontend format
 * @param {Object} backendRestaurant - Restaurant from backend
 * @returns {Object} Transformed restaurant
 */
export const transformRestaurantFromBackend = (backendRestaurant) => {
  if (!backendRestaurant) return null;

  return {
    id: backendRestaurant._id,
    rid: backendRestaurant.rid,
    name: backendRestaurant.name,
    cuisine: Array.isArray(backendRestaurant.cuisine) 
      ? backendRestaurant.cuisine.join(', ') 
      : backendRestaurant.cuisine,
    cuisineArray: backendRestaurant.cuisine,
    description: backendRestaurant.description || '',
    address: backendRestaurant.fullAddress || '',
    fullAddress: backendRestaurant.fullAddress,
    addressDetails: backendRestaurant.address,
    phone: backendRestaurant.phone || '',
    email: backendRestaurant.email || '',
    rating: backendRestaurant.rating?.average || 0,
    ratingCount: backendRestaurant.rating?.count || 0,
    deliveryTime: backendRestaurant.deliveryTime || '',
    priceRange: backendRestaurant.priceRange || '',
    priceForTwo: backendRestaurant.priceForTwo || 0,
    offers: backendRestaurant.offers || '',
    badges: backendRestaurant.badges || [],
    features: backendRestaurant.features || [],
    operatingHours: backendRestaurant.operatingHours || {},
    isOpen: backendRestaurant.isOpen || false,
    status: backendRestaurant.status,
    isActive: backendRestaurant.isActive,
    isFeatured: backendRestaurant.isFeatured,
    isPremium: backendRestaurant.isPremium,
    src: backendRestaurant.image?.publicId 
      ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${backendRestaurant.image.publicId}.${backendRestaurant.image.format}`
      : '/placeholder-restaurant.jpg',
    srcFallback: backendRestaurant.imageFallback?.publicId
      ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${backendRestaurant.imageFallback.publicId}.${backendRestaurant.imageFallback.format}`
      : '/placeholder-restaurant.jpg',
    gallery: backendRestaurant.gallery || [],
    menuItems: backendRestaurant.menuItems || [],
    deliveryAvailable: backendRestaurant.deliveryAvailable,
    takeawayAvailable: backendRestaurant.takeawayAvailable,
    dineInAvailable: backendRestaurant.dineInAvailable,
    paymentMethods: backendRestaurant.paymentMethods || [],
    totalOrders: backendRestaurant.totalOrders || 0,
    totalRevenue: backendRestaurant.totalRevenue || 0,
    createdAt: backendRestaurant.create_at,
    updatedAt: backendRestaurant.update_at,
  };
};

/**
 * Transform array of bookings
 * @param {Array} bookings - Array of bookings from backend
 * @returns {Array} Transformed bookings
 */
export const transformBookingsArray = (bookings) => {
  if (!Array.isArray(bookings)) return [];
  return bookings.map(transformBookingFromBackend);
};

/**
 * Transform array of restaurants
 * @param {Array} restaurants - Array of restaurants from backend
 * @returns {Array} Transformed restaurants
 */
export const transformRestaurantsArray = (restaurants) => {
  if (!Array.isArray(restaurants)) return [];
  return restaurants.map(transformRestaurantFromBackend);
};

/**
 * Format date for backend (YYYY-MM-DD)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDateForBackend = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Format time for backend (HH:MM)
 * @param {string} time - Time to format
 * @returns {string} Formatted time
 */
export const formatTimeForBackend = (time) => {
  if (!time) return '';
  // Ensure HH:MM format
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/**
 * Parse backend datetime to display format
 * @param {string} dateString - ISO date string from backend
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Formatted date string
 */
export const formatDateForDisplay = (dateString, includeTime = false) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Get booking status color
 * @param {string} status - Booking status
 * @returns {string} Color class
 */
export const getBookingStatusColor = (status) => {
  const statusColors = {
    pending: 'yellow',
    confirmed: 'blue',
    completed: 'green',
    cancelled: 'red',
    no_show: 'gray'
  };
  
  return statusColors[status] || 'gray';
};

/**
 * Get booking status label
 * @param {string} status - Booking status
 * @returns {string} Status label
 */
export const getBookingStatusLabel = (status) => {
  const statusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_show: 'No Show'
  };
  
  return statusLabels[status] || status;
};