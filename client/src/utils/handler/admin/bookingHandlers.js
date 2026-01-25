export const createBookingHandlers = (
  setBookings,
  setFilters,
  setCurrentPage,
  setSelectedBooking,
  setIsDrawerOpen,
  setConfirmModal,
  setIsRefreshing,
  bookings,
  selectedBooking
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

  const handleConfirmAction = (confirmModal) => {
    const { bookingId, action } = confirmModal;
    
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        if (action === 'confirm') {
          return { ...booking, status: 'confirmed' };
        } else if (action === 'complete') {
          return { ...booking, status: 'completed', canCancel: false };
        } else if (action === 'cancel') {
          return { ...booking, status: 'cancelled', canCancel: false };
        }
      }
      return booking;
    }));

    setConfirmModal({ isOpen: false, bookingId: null, action: null });
    
    if (selectedBooking?.id === bookingId) {
      const updatedBooking = bookings.find(b => b.id === bookingId);
      if (updatedBooking) {
        setSelectedBooking({ ...updatedBooking });
      }
    }
  };

  const handleCancelAction = () => {
    setConfirmModal({ isOpen: false, bookingId: null, action: null });
  };

  const handleExport = (filteredBookings) => {
    console.log('Exporting bookings...', filteredBookings);
    alert('Export functionality would download CSV/Excel file');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log('Refreshing bookings...');
      setIsRefreshing(false);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveNote = (adminNote) => {
    console.log('Saving admin note:', adminNote);
    // Implement actual API call here
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