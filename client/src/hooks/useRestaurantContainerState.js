import { useState, useEffect } from 'react';
import { useRestaurantContext } from '../context/admin/Restaurantcontext';
import { useBooking } from '../context/admin/Bookingcontext';
import { useFood } from '../context/admin/Foodcontext';

/**
 * Custom hook to manage restaurant container state
 * Integrates with Restaurant, Booking, and Food contexts
 */
function useRestaurantContainerState() {
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Context Integration
  const { 
    restaurants, 
    loading: restaurantsLoading, 
    error: restaurantsError,
    fetchRestaurants 
  } = useRestaurantContext();
  
  const { 
    createBooking, 
    loading: bookingLoading,
    error: bookingApiError,
    clearError: clearBookingError
  } = useBooking();

  const {
    fetchFoods,
    loading: foodsLoading
  } = useFood();

  // Load restaurants on mount
  useEffect(() => {
    loadRestaurants();
  }, []);

  /**
   * Load restaurants from backend
   */
  const loadRestaurants = async () => {
    try {
      await fetchRestaurants({ 
        status: 'Active',
        isActive: true,
        limit: 100,
        sortBy: '-rating' // Sort by rating descending
      });
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  /**
   * Handle Book Now button click
   */
  const handleBookNow = (restaurant) => {
    // Normalize restaurant data
    const normalizedRestaurant = {
      ...restaurant,
      id: restaurant.id || restaurant._id || restaurant.restaurantId,
      fullAddress: typeof restaurant.address === 'string' 
        ? restaurant.address 
        : getFullAddress(restaurant.address)
    };

    setSelectedRestaurant(normalizedRestaurant);
    setShowReservationModal(true);
    setBookingSuccess(false);
    setBookingError(null);
    clearBookingError();
  };

  /**
   * Handle View Menu button click
   */
  const handleViewMenu = async (restaurant) => {
    // Normalize restaurant data
    const normalizedRestaurant = {
      ...restaurant,
      id: restaurant.id || restaurant._id || restaurant.restaurantId
    };

    setSelectedRestaurant(normalizedRestaurant);
    setShowMenuModal(true);
    
    // Pre-fetch foods for this restaurant
    try {
      await fetchFoods({
        restaurant: normalizedRestaurant.id,
        status: 'Active',
        isActive: true,
        limit: 100
      });
    } catch (error) {
      console.error('Error pre-fetching menu:', error);
    }
  };

  /**
   * Close reservation modal
   */
  const closeReservationModal = () => {
    setShowReservationModal(false);
    setTimeout(() => {
      setSelectedRestaurant(null);
      setBookingSuccess(false);
      setBookingError(null);
      clearBookingError();
    }, 300);
  };

  /**
   * Close menu modal
   */
  const closeMenuModal = () => {
    setShowMenuModal(false);
    setTimeout(() => {
      setSelectedRestaurant(null);
    }, 300);
  };

  /**
   * Handle booking form submission
   */
  const handleBookingSubmit = async (bookingData) => {
    try {
      setBookingError(null);
      
      // Validate required restaurant data
      if (!bookingData.restaurant?.restaurantId) {
        throw new Error('Restaurant information is missing');
      }

      // Create booking through context
      await createBooking(bookingData);
      
      // Show success state
      setBookingSuccess(true);
      
      // Auto-close after 2.5 seconds
      setTimeout(() => {
        closeReservationModal();
      }, 2500);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to create booking. Please try again.';
      setBookingError(errorMessage);
      throw error;
    }
  };

  /**
   * Helper: Get full address string
   */
  const getFullAddress = (address) => {
    if (!address) return '';
    if (typeof address === 'string') return address;
    
    const parts = [
      address.street,
      address.area,
      address.city,
      address.state,
      address.zipCode
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  return {
    // UI State
    searchQuery,
    setSearchQuery,
    showMobileFilter,
    setShowMobileFilter,
    showReservationModal,
    setShowReservationModal,
    showMenuModal,
    setShowMenuModal,
    selectedRestaurant,
    setSelectedRestaurant,
    
    // Modal Handlers
    handleBookNow,
    handleViewMenu,
    closeReservationModal,
    closeMenuModal,
    
    // Booking State
    handleBookingSubmit,
    bookingSuccess,
    bookingError,
    bookingLoading,
    
    // Restaurant Data
    restaurants,
    restaurantsLoading: restaurantsLoading || foodsLoading,
    restaurantsError,
    loadRestaurants
  };
}

export default useRestaurantContainerState;