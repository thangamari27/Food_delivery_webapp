import { useState, useEffect } from 'react';
import { useRestaurantContext } from '../context/admin/Restaurantcontext';
import { useBooking } from '../context/admin/Bookingcontext';

function useRestaurantContainerState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Get contexts
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

  // Load restaurants on mount
  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      await fetchRestaurants({ 
        status: 'Active',
        isActive: true,
        limit: 100
      });
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  // Modal handlers
  const handleBookNow = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReservationModal(true);
    setBookingSuccess(false);
    setBookingError(null);
  };

  const handleViewMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    setTimeout(() => {
      setSelectedRestaurant(null);
      setBookingSuccess(false);
      setBookingError(null);
      clearBookingError();
    }, 300);
  };

  const closeMenuModal = () => {
    setShowMenuModal(false);
    setTimeout(() => setSelectedRestaurant(null), 300);
  };

  // Handle booking submission
  const handleBookingSubmit = async (formData) => {
    try {
      setBookingError(null);
      
      // Transform form data to backend format
      const bookingData = {
        restaurant: {
          restaurantId: selectedRestaurant.id,
          restaurantName: selectedRestaurant.name,
          cuisine: Array.isArray(selectedRestaurant.cuisineArray) 
            ? selectedRestaurant.cuisineArray[0] 
            : selectedRestaurant.cuisine,
          phone: selectedRestaurant.phone,
          address: selectedRestaurant.fullAddress || selectedRestaurant.address
        },
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        bookingDate: formData.date,
        bookingTime: formData.time,
        numberOfGuests: parseInt(formData.guests),
        specialRequests: formData.specialRequests || '',
        occasion: formData.occasion || 'Regular',
        source: 'Web'
      };

      await createBooking(bookingData);
      
      setBookingSuccess(true);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        closeReservationModal();
      }, 2000);
      
    } catch (error) {
      setBookingError(error.message || 'Failed to create booking. Please try again.');
      throw error;
    }
  };

  return {
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
    handleBookNow,
    handleViewMenu,
    closeReservationModal,
    closeMenuModal,
    handleBookingSubmit,
    bookingSuccess,
    bookingError,
    bookingLoading,
    restaurants,
    restaurantsLoading,
    restaurantsError,
    loadRestaurants
  };
}

export default useRestaurantContainerState;