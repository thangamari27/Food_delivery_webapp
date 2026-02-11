import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBooking } from '../../context/admin/Bookingcontext';

/**
 * Admin Booking Management Hook
 * Manages booking state and operations for admin panel
 */
export const useBookingManagement = () => {
  const {
    bookings,
    loading,
    error,
    fetchBookings,
    confirmBooking,
    completeBooking,
    cancelBooking,
    markAsNoShow,
    updateAdminNotes,
    clearError
  } = useBooking();
  console.log(bookings)
  const [filters, setFilters] = useState({
    search: '',
    status: null,
    dateFrom: '',
    dateTo: '',
    minGuests: null,
    canCancel: null
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    bookingId: null, 
    action: null 
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load bookings on mount and when filters change
  useEffect(() => {
    loadBookings();
  }, [filters]);

  const loadBookings = async () => {
    try {
      await fetchBookings({
        ...filters,
        isActive: true,
        limit: 100,
        populate: false
      });
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  return {
    bookings,
    loading,
    error,
    filters,
    setFilters,
    selectedBooking,
    setSelectedBooking,
    isDrawerOpen,
    setIsDrawerOpen,
    confirmModal,
    setConfirmModal,
    isRefreshing,
    setIsRefreshing,
    currentPage,
    setCurrentPage,
    loadBookings,
    confirmBooking,
    completeBooking,
    cancelBooking,
    markAsNoShow,
    updateAdminNotes,
    clearError
  };
};

/**
 * Booking Filters Hook
 * Filters and paginates bookings
 */
export const useBookingFilters = (bookings, filters, currentPage, itemsPerPage = 5) => {
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          booking.id.toLowerCase().includes(searchLower) ||
          booking.restaurantName.toLowerCase().includes(searchLower) ||
          booking.customerName.toLowerCase().includes(searchLower) ||
          booking.customerEmail.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && booking.status !== filters.status) {
        return false;
      }

      // Date filters
      if (filters.dateFrom && booking.date < filters.dateFrom) {
        return false;
      }
      
      if (filters.dateTo && booking.date > filters.dateTo) {
        return false;
      }

      // Guests filter
      if (filters.minGuests !== null && booking.guests < filters.minGuests) {
        return false;
      }

      // Can cancel filter
      if (filters.canCancel !== null && booking.canCancel !== filters.canCancel) {
        return false;
      }

      return true;
    });
  }, [bookings, filters]);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return {
    filteredBookings,
    paginatedBookings,
    totalPages
  };
};

/**
 * Booking Stats Hook
 * Calculate booking statistics
 */
export const useBookingStats = (bookings) => {
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
  }, [bookings]);

  return stats;
};

/**
 * Modal Content Hook
 * Get modal title and message based on action
 */
export const useModalContent = (actionType) => {
  const modalContent = useMemo(() => {
    const actionText = {
      confirm: { 
        title: 'Confirm Booking', 
        message: 'Are you sure you want to confirm this booking?' 
      },
      complete: { 
        title: 'Mark as Completed', 
        message: 'Mark this booking as completed? This action cannot be undone.' 
      },
      cancel: { 
        title: 'Cancel Booking', 
        message: 'Are you sure you want to cancel this booking? The customer will be notified.' 
      },
      no_show: {
        title: 'Mark as No Show',
        message: 'Mark this booking as no-show? This action cannot be undone.'
      }
    };
    return actionText[actionType] || { title: '', message: '' };
  }, [actionType]);

  return modalContent;
};