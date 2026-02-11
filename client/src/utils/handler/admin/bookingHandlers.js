/**
 * Admin Booking Handlers
 * Updated to work with API integration
 */
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

  const handleAction = (bookingId, action) => {
    setConfirmModal({ isOpen: true, bookingId, action });
  };

  const handleConfirmAction = async (confirmModalState) => {
    const { bookingId, action } = confirmModalState;
    
    try {
      switch (action) {
        case 'confirm':
          await confirmBooking(bookingId);
          break;
        case 'complete':
          await completeBooking(bookingId);
          break;
        case 'cancel':
          await cancelBooking(bookingId, 'Admin Cancellation', 'Cancelled by admin');
          break;
        case 'no_show':
          await markAsNoShow(bookingId);
          break;
        default:
          break;
      }

      // Close modal
      setConfirmModal({ isOpen: false, bookingId: null, action: null });
      
      // Refresh the booking if drawer is open
      if (setSelectedBooking) {
        // The context will automatically update the booking in the list
        // We just need to keep the drawer open with updated data
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
        booking.id,
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

  const handleSaveNote = async (adminNote, bookingId) => {
    try {
      await updateAdminNotes(bookingId, adminNote);
      alert('Admin note saved successfully');
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save admin note');
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