import { useState, useMemo, useCallback } from 'react';

export const useBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
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

  return {
    bookings,
    setBookings,
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
    setCurrentPage
  };
};

export const useBookingFilters = (bookings, filters, currentPage, itemsPerPage = 5) => {
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          booking.id.toLowerCase().includes(searchLower) ||
          booking.restaurantName.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.status && booking.status !== filters.status) {
        return false;
      }

      if (filters.dateFrom && booking.date < filters.dateFrom) {
        return false;
      }
      
      if (filters.dateTo && booking.date > filters.dateTo) {
        return false;
      }

      if (filters.minGuests !== null && booking.guests < filters.minGuests) {
        return false;
      }

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
      }
    };
    return actionText[actionType] || { title: '', message: '' };
  }, [actionType]);

  return modalContent;
};