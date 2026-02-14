import React, { createContext, useContext, useState, useCallback } from 'react';
import bookingService from '../../services/bookingService';
import { transformBookingFromBackend, transformBookingsArray } from '../../utils/handler/admin/dataTransformers';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    limit: 20,
    skip: 0,
    total: 0,
    pages: 1,
    hasMore: false
  });

  /**
   * Fetch all bookings with filters
   */
  const fetchBookings = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getAllBookings(filters);
    
      // Ensure we're accessing the correct data structure
      const bookingsData = response.data?.data || response.data || [];
      
      // Transform each booking with virtuals
      const transformedBookings = bookingsData.map(booking => {
        const base = transformBookingFromBackend(booking);
        
        // Add virtuals if they exist
        if (booking.hoursUntilBooking !== undefined) {
          base.hoursUntilBooking = booking.hoursUntilBooking;
        }
        if (booking.isUpcoming !== undefined) {
          base.isUpcoming = booking.isUpcoming;
        }
        if (booking.isPast !== undefined) {
          base.isPast = booking.isPast;
        }
        if (booking.canCancel !== undefined) {
          base.canCancel = booking.canCancel;
        }
        
        return base;
      });
      
      setBookings(transformedBookings);
      setPagination(response.data?.pagination || {
        limit: 20,
        skip: 0,
        total: 0,
        pages: 1,
        hasMore: false
      });
      
      return transformedBookings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch single booking by ID
   */
  const fetchBookingById = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingById(bookingId);
      const bookingData = response.data?.data || response.data;
      const transformedBooking = transformBookingFromBackend(bookingData);
      
      setSelectedBooking(transformedBooking);
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch bookings by customer
   */
  const fetchCustomerBookings = useCallback(async (customerId, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingsByCustomer(customerId, filters);
      const transformedBookings = transformBookingsArray(response.data);
      
      setBookings(transformedBookings);
      setPagination(response.pagination);
      
      return transformedBookings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch bookings by restaurant
   */
  const fetchRestaurantBookings = useCallback(async (restaurantId, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingsByRestaurant(restaurantId, filters);
      const transformedBookings = transformBookingsArray(response.data);
      
      setBookings(transformedBookings);
      setPagination(response.pagination);
      
      return transformedBookings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch my bookings (authenticated user)
   */
  const fetchMyBookings = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getMyBookings(filters);
      const transformedBookings = transformBookingsArray(response.data);
      
      setBookings(transformedBookings);
      setPagination(response.pagination);
      
      return transformedBookings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new booking
   */
  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.createBooking(bookingData);
      const bookingResponse = response.data?.data || response.data;
      const transformedBooking = transformBookingFromBackend(bookingResponse);
      
      // Add to bookings list
      setBookings(prev => [transformedBooking, ...prev]);
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update booking
   */
  const updateBooking = useCallback(async (bookingId, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.updateBooking(bookingId, updateData);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Confirm booking
   */
  const confirmBooking = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.confirmBooking(bookingId);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Complete booking
   */
  const completeBooking = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.completeBooking(bookingId);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Cancel booking
   */
  const cancelBooking = useCallback(async (bookingId, reason, notes = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.cancelBooking(bookingId, reason, notes);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Mark as no show
   */
  const markAsNoShow = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.markAsNoShow(bookingId);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Update admin notes
   */
  const updateAdminNotes = useCallback(async (bookingId, adminNotes) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.updateAdminNotes(bookingId, adminNotes);
      const transformedBooking = transformBookingFromBackend(response.data);
      
      // Update in bookings list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? transformedBooking : booking
        )
      );
      
      // Update selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(transformedBooking);
      }
      
      return transformedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Delete booking
   */
  const deleteBooking = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      await bookingService.deleteBooking(bookingId);
      
      // Remove from bookings list
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      
      // Clear selected booking if it's the same
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBooking]);

  /**
   * Check availability
   */
  const checkAvailability = useCallback(async (availabilityData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.checkAvailability(availabilityData);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get booking statistics
   */
  const fetchBookingStats = useCallback(async (filters = {}) => {
    try {
      const response = await bookingService.getBookingStats(filters);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Clear selected booking
   */
  const clearSelectedBooking = useCallback(() => {
    setSelectedBooking(null);
  }, []);

  const value = {
    bookings,
    selectedBooking,
    loading,
    error,
    pagination,
    setBookings,
    setSelectedBooking,
    fetchBookings,
    fetchBookingById,
    fetchCustomerBookings,
    fetchRestaurantBookings,
    fetchMyBookings,
    createBooking,
    updateBooking,
    confirmBooking,
    completeBooking,
    cancelBooking,
    markAsNoShow,
    updateAdminNotes,
    deleteBooking,
    checkAvailability,
    fetchBookingStats,
    clearError,
    clearSelectedBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;