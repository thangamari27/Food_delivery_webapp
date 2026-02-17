import React, { createContext, useContext, useState, useCallback } from 'react';
import bookingService from '../../services/bookingService';
import { transformBookingFromBackend } from '../../utils/handler/admin/dataTransformers';
import { toast } from 'react-hot-toast';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Core State
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Statistics State
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0
  });

  // Pagination State
  const [pagination, setPagination] = useState({
    limit: 20,
    skip: 0,
    total: 0,
    pages: 0,
    hasMore: false
  });

  /**
   * Extract correct booking ID for API calls
   * Backend expects bookingId field (UUID format like BK123...)
   */
  const getBookingId = useCallback((booking) => {
    if (!booking) return null;
    // Backend expects bookingId (UUID format), not MongoDB _id
    return booking.bookingId || booking.id || booking._id;
  }, []);

  /**
   * Data Extraction Utilities
   */
  const extractData = useCallback((response) => {
    // Handle array response
    if (Array.isArray(response)) {
      return { data: response, pagination: null };
    }

    // Navigate through nested response structures
    const dataPath = response?.data?.data?.data || 
                     response?.data?.data || 
                     response?.data || 
                     response;

    const paginationPath = response?.data?.data?.pagination || 
                          response?.data?.pagination || 
                          response?.pagination;

    return {
      data: Array.isArray(dataPath) ? dataPath : (dataPath ? [dataPath] : []),
      pagination: paginationPath
    };
  }, []);

  /**
   * Transform booking with comprehensive field mapping
   */
  const transformBooking = useCallback((booking) => {
    if (!booking) return null;
    
    try {
      // Apply backend transformer first
      const transformed = transformBookingFromBackend(booking);
      
      // Ensure all required fields with fallbacks
      return {
        ...transformed,
        // IDs - Preserve all ID fields
        _id: booking._id || booking.id,
        id: booking._id || booking.id,
        bookingId: booking.bookingId, // This is the UUID we use for API calls
        
        // Restaurant Info
        restaurantId: booking.restaurantId || booking.restaurant?.restaurantId || booking.restaurant?.id,
        restaurantName: booking.restaurantName || booking.restaurant?.restaurantName || booking.restaurant?.name || 'Unknown Restaurant',
        restaurant: booking.restaurant,
        
        // Booking Details
        date: booking.date || booking.bookingDate,
        time: booking.time || booking.bookingTime,
        guests: booking.guests || booking.numberOfGuests || 1,
        status: booking.status || 'pending',
        
        // Customer Info
        customerId: booking.customerId || booking.customer?.customerId || booking.customer?.id,
        customerName: booking.customerName || booking.customer?.name || 'Unknown',
        customerEmail: booking.customerEmail || booking.customer?.email || '',
        customerPhone: booking.customerPhone || booking.customer?.phone || '',
        customer: booking.customer,
        
        // Additional Details
        specialRequests: booking.specialRequests || '',
        dietaryRestrictions: booking.dietaryRestrictions || [],
        occasion: booking.occasion || '',
        tableType: booking.tableType || '',
        tableNumber: booking.tableNumber || '',
        
        // Metadata
        canCancel: booking.canCancel ?? true,
        isUpcoming: booking.isUpcoming ?? false,
        isPast: booking.isPast ?? false,
        hoursUntilBooking: booking.hoursUntilBooking ?? null,
        source: booking.source || 'Web',
        
        // Admin Fields
        adminNotes: booking.adminNotes || '',
        
        // Deposit Info
        deposit: booking.deposit || { required: false, amount: 0, paid: false },
        
        // Timestamps
        createdAt: booking.createdAt || new Date().toISOString(),
        updatedAt: booking.updatedAt || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error transforming booking:', error);
      return booking;
    }
  }, []);

  /**
   * Calculate statistics from bookings array
   */
  const calculateStats = useCallback((bookingsList) => {
    const stats = {
      total: bookingsList.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0
    };

    bookingsList.forEach(booking => {
      const status = booking.status?.toLowerCase();
      if (stats.hasOwnProperty(status)) {
        stats[status]++;
      }
    });

    return stats;
  }, []);

  /**
   * FETCH OPERATIONS
   */

  // Fetch all bookings with filters (Admin)
  const fetchBookings = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getAllBookings(filters);
      const { data, pagination: paginationData } = extractData(response);
      
      const transformedBookings = data
        .map(booking => transformBooking(booking))
        .filter(Boolean);
      
      setBookings(transformedBookings);
      setStats(calculateStats(transformedBookings));
      
      if (paginationData) {
        setPagination(paginationData);
      } else {
        setPagination({
          limit: filters.limit || 20,
          skip: filters.skip || 0,
          total: transformedBookings.length,
          pages: Math.ceil(transformedBookings.length / (filters.limit || 20)),
          hasMore: false
        });
      }
      
      return transformedBookings;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch bookings';
      setError(errorMessage);
      console.error('Fetch bookings error:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, calculateStats]);

  // Fetch my bookings (authenticated user)
  const fetchMyBookings = useCallback(async (filters = {}) => {
  setLoading(true);
  setError(null);
  
  try {
    
    // Ensure filters don't contain undefined
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        cleanFilters[key] = filters[key];
      }
    });
    
    const response = await bookingService.getMyBookings(cleanFilters);
    
    // Extract data from response
    let bookingsData = [];
    
    if (response?.data) {
      bookingsData = Array.isArray(response.data) ? response.data : 
                    (response.data.data ? response.data.data : []);
    }
    
    // Transform each booking
    const transformedBookings = bookingsData
      .map(booking => {
        try {
          return transformBooking(booking);
        } catch (err) {
          console.error('Error transforming booking:', booking, err);
          return null;
        }
      })
      .filter(Boolean);
    setBookings(transformedBookings);
    
    // Update pagination if available
    if (response?.pagination) {
      setPagination(response.pagination);
    }
    
    return transformedBookings;
  } catch (err) {
    console.error('Fetch my bookings error:', err);
    const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch your bookings';
    setError(errorMessage);
    toast.error(errorMessage);
    return [];
  } finally {
    setLoading(false);
  }
  }, [transformBooking]);

  // Fetch single booking by ID
  const fetchBookingById = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingById(bookingId);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      setSelectedBooking(transformedBooking);
      return transformedBooking;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch booking';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking]);

  // Fetch booking statistics
  const fetchBookingStats = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingStats(filters);
      const { data } = extractData(response);
      
      // If API returns stats object directly, use it
      if (data[0] && typeof data[0] === 'object' && data[0].total !== undefined) {
        setStats(data[0]);
        return data[0];
      }
      
      // Otherwise calculate from current bookings
      const currentStats = calculateStats(bookings);
      setStats(currentStats);
      return currentStats;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch statistics';
      setError(errorMessage);
      console.error('Fetch stats error:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [extractData, calculateStats, bookings]);

  // Search bookings
  const searchBookings = useCallback(async (searchQuery, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.searchBookings(searchQuery, filters);
      const { data, pagination: paginationData } = extractData(response);
      
      const transformedBookings = data
        .map(booking => transformBooking(booking))
        .filter(Boolean);
      
      setBookings(transformedBookings);
      setStats(calculateStats(transformedBookings));
      
      if (paginationData) {
        setPagination(paginationData);
      }
      
      return transformedBookings;
    } catch (err) {
      const errorMessage = err.message || 'Failed to search bookings';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, calculateStats]);

  /**
   * CREATE OPERATIONS
   */

  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.createBooking(bookingData);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      // Add to bookings list
      setBookings(prev => [transformedBooking, ...prev]);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        [transformedBooking.status]: prev[transformedBooking.status] + 1
      }));
      
      toast.success('Booking created successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create booking';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking]);

  /**
   * UPDATE OPERATIONS
   */

  const updateBookingInState = useCallback((bookingId, updatedBooking) => {
    setBookings(prev => {
      const updated = prev.map(booking => {
        const id = getBookingId(booking);
        return id === bookingId ? updatedBooking : booking;
      });
      
      // Recalculate stats
      setStats(calculateStats(updated));
      return updated;
    });
    
    // Update selected booking if it matches
    setSelectedBooking(prev => {
      if (!prev) return prev;
      const id = getBookingId(prev);
      return id === bookingId ? updatedBooking : prev;
    });
  }, [calculateStats, getBookingId]);

  const updateBooking = useCallback(async (bookingIdOrObject, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      
      const response = await bookingService.updateBooking(bookingId, updateData);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Booking updated successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update booking';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Update booking error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  const confirmBooking = useCallback(async (bookingIdOrObject) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      const response = await bookingService.confirmBooking(bookingId);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Booking confirmed successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to confirm booking';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Confirm booking error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  const completeBooking = useCallback(async (bookingIdOrObject) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      const response = await bookingService.completeBooking(bookingId);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Booking completed successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to complete booking';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Complete booking error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  const cancelBooking = useCallback(async (bookingIdOrObject, reason = '', notes = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      const response = await bookingService.cancelBooking(bookingId, reason, notes);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Booking cancelled successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to cancel booking';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Cancel booking error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  const markAsNoShow = useCallback(async (bookingIdOrObject) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      const response = await bookingService.markAsNoShow(bookingId);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Booking marked as no-show');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to mark as no show';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Mark no show error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  const updateAdminNotes = useCallback(async (bookingIdOrObject, adminNotes) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      const response = await bookingService.updateAdminNotes(bookingId, adminNotes);
      const { data } = extractData(response);
      const transformedBooking = transformBooking(data[0] || data);
      
      updateBookingInState(bookingId, transformedBooking);
      
      toast.success('Admin notes updated successfully');
      return { success: true, data: transformedBooking };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update admin notes';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Update admin notes error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [extractData, transformBooking, updateBookingInState, getBookingId]);

  /**
   * DELETE OPERATIONS
   */

  const deleteBooking = useCallback(async (bookingIdOrObject) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract correct booking ID
      const bookingId = typeof bookingIdOrObject === 'string' 
        ? bookingIdOrObject 
        : getBookingId(bookingIdOrObject);
      
      await bookingService.deleteBooking(bookingId);
      
      setBookings(prev => {
        const updated = prev.filter(booking => {
          const id = getBookingId(booking);
          return id !== bookingId;
        });
        setStats(calculateStats(updated));
        return updated;
      });
      
      if (selectedBooking) {
        const selectedId = getBookingId(selectedBooking);
        if (selectedId === bookingId) {
          setSelectedBooking(null);
        }
      }
      
      toast.success('Booking deleted successfully');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete booking';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Delete booking error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [selectedBooking, calculateStats, getBookingId]);

  /**
   * UTILITY OPERATIONS
   */

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSelectedBooking = useCallback(() => {
    setSelectedBooking(null);
  }, []);

  const refreshBookings = useCallback(async (filters = {}) => {
    return fetchBookings(filters);
  }, [fetchBookings]);

  const value = {
    // State
    bookings,
    selectedBooking,
    loading,
    error,
    stats,
    pagination,
    
    // State setters
    setSelectedBooking,
    
    // Fetch operations
    fetchBookings,
    fetchMyBookings,
    fetchBookingById,
    fetchBookingStats,
    searchBookings,
    
    // Create operations
    createBooking,
    
    // Update operations
    updateBooking,
    confirmBooking,
    completeBooking,
    cancelBooking,
    markAsNoShow,
    updateAdminNotes,
    
    // Delete operations
    deleteBooking,
    
    // Utility operations
    clearError,
    clearSelectedBooking,
    refreshBookings,
    getBookingId,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;