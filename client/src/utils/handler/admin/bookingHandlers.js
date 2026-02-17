/**
 * Admin Booking Handlers
 * Fixed to use correct bookingId field for backend API calls
 */

/**
 * Extract booking ID from booking object
 * Backend expects the bookingId field (UUID format like BK123...)
 */
const getBookingId = (booking) => {
  if (!booking) return null;
  // Backend routes expect bookingId (UUID format), not MongoDB _id
  return booking.bookingId || booking.id || booking._id;
};

export const createBookingHandlers = (
  loadBookings,
  setFilters,
  setCurrentPage,
  setSelectedBooking,
  setIsDrawerOpen,
  setConfirmModal,
  setIsRefreshing,
  confirmBooking,
  completeBooking,
  cancelBooking,
  markAsNoShow,
  updateAdminNotes
) => {
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: null,
      dateFrom: '',
      dateTo: '',
      minGuests: null,
      canCancel: null
    });
    setCurrentPage(1);
  };

  const handleStatClick = (status) => {
    setFilters(prev => ({ ...prev, status }));
    setCurrentPage(1);
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedBooking(null), 300);
  };

  const handleAction = (bookingOrId, action) => {
    // Extract the correct booking ID
    const bookingId = typeof bookingOrId === 'string' 
      ? bookingOrId 
      : getBookingId(bookingOrId);
    
    if (!bookingId) {
      console.error('Invalid booking ID:', bookingOrId);
      alert('Invalid booking ID');
      return;
    }
    
    setConfirmModal({ isOpen: true, bookingId, action });
  };

  const handleConfirmAction = async (confirmModalState) => {
    const { bookingId, action } = confirmModalState;
    
    try {
      let result;
      
      switch (action) {
        case 'confirm':
          result = await confirmBooking(bookingId);
          break;
        case 'complete':
          result = await completeBooking(bookingId);
          break;
        case 'cancel':
          result = await cancelBooking(bookingId, 'Admin Cancellation', 'Cancelled by admin');
          break;
        case 'no_show':
          result = await markAsNoShow(bookingId);
          break;
        default:
          console.error('Unknown action:', action);
          break;
      }

      // Close modal
      setConfirmModal({ isOpen: false, bookingId: null, action: null });
      
      // Check if operation was successful
      if (result && !result.success) {
        console.error(`Failed to ${action} booking:`, result.error);
      }
      
    } catch (error) {
      console.error('Failed to perform action:', error);
      alert(`Failed to ${action} booking: ${error.message}`);
      setConfirmModal({ isOpen: false, bookingId: null, action: null });
    }
  };

  const handleCancelAction = () => {
    setConfirmModal({ isOpen: false, bookingId: null, action: null });
  };

  const handleExport = (filteredBookings) => {
    try {
      // Create CSV content
      const headers = ['Booking ID', 'Restaurant', 'Customer', 'Date', 'Time', 'Guests', 'Status'];
      const rows = filteredBookings.map(booking => [
        getBookingId(booking),
        booking.restaurantName,
        booking.customerName,
        new Date(booking.date).toLocaleDateString(),
        booking.time,
        booking.guests,
        booking.status
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookings-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export bookings');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadBookings();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveNote = async (adminNote, bookingOrId) => {
    try {
      // Extract the correct booking ID
      const bookingId = typeof bookingOrId === 'string' 
        ? bookingOrId 
        : getBookingId(bookingOrId);
      
      if (!bookingId) {
        throw new Error('Invalid booking ID');
      }
      
      const result = await updateAdminNotes(bookingId, adminNote);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to save note');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      alert(`Failed to save admin note: ${error.message}`);
    }
  };

  return {
    handleFilterChange,
    handleClearFilters,
    handleStatClick,
    handleBookingClick,
    handleCloseDrawer,
    handleAction,
    handleConfirmAction,
    handleCancelAction,
    handleExport,
    handleRefresh,
    handlePageChange,
    handleSaveNote
  };
};