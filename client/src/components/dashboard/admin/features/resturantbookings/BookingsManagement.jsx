import React from "react";
import { bookingContent } from "../../../../../utils/constant/admin/AdminDashboard";
import { bookingStyles } from "../../../../../utils/styles/AdminStyle";
import BookingHeader from "./BookingHeader";
import BookingStats from "./BookingStats";
import BookingFilters from "./BookingFilters";
import BookingCard from "./BookingCard";
import BookingTable from "./BookingTable";
import Pagination from "./Pagination";
import BookingDetailsDrawer from "./BookingDetailsDrawer";
import ConfirmationModal from "./ConfirmationModal";
import EmptyState from "./EmptyState";
import AdminLoader, { TableSkeletonLoader, InlineLoader, CardSkeletonLoader } from "../../../../common/admin/AdminLoader";
import ErrorDisplay from "../../../../common/admin/ErrorDisplay";
import { 
  useBookingManagement, 
  useBookingFilters, 
  useBookingStats, 
  useModalContent 
} from "../../../../../hooks/admin/useBookingManagement";
import { createBookingHandlers } from "../../../../../utils/handler/admin/bookingHandlers";

function BookingsManagement() {
  const content = bookingContent;
  const styles = bookingStyles;

  // Initialize hooks
  const bookingManagement = useBookingManagement();
  const { 
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
  } = bookingManagement;

  // Use custom hooks
  const stats = useBookingStats(bookings);
  const { filteredBookings, paginatedBookings, totalPages } = useBookingFilters(
    bookings, 
    filters, 
    currentPage
  );
  const modalContent = useModalContent(confirmModal.action);

  // Create handlers
  const handlers = createBookingHandlers(
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
  );

  // Get selected restaurant data (if needed from backend)
  // For now, we'll use the restaurant data from the booking itself
  const selectedRestaurant = selectedBooking ? {
    name: selectedBooking.restaurantName,
    cuisine: selectedBooking.cuisine,
    phone: selectedBooking.restaurantPhone,
    address: selectedBooking.restaurantAddress
  } : null;

  // Handle loading state
  if (loading && bookings.length === 0) {
    return (
      <div className={styles.layout.page}>
        <AdminLoader loaderName="bookings" />
      </div>
    );
  }

  // Handle error state
  if (error && bookings.length === 0) {
    return (
      <div className={styles.layout.page}>
        <ErrorDisplay 
          message={error} 
          onRetry={loadBookings}
        />
      </div>
    );
  }

  return (
    <div className={styles.layout.page}>
      {/* Show inline loader for refresh */}
      {isRefreshing && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <InlineLoader 
              size="small" 
              text="Refreshing..." 
            />
          </div>
        </div>
      )}

      <BookingHeader 
        content={content}
        onExport={() => handlers.handleExport(filteredBookings)} 
        onRefresh={handlers.handleRefresh}
        isRefreshing={isRefreshing}
        styles={styles}
      />

      <BookingStats 
        content={content}
        stats={stats}
        onStatClick={handlers.handleStatClick}
        activeFilter={filters.status}
        styles={styles}
      />

      <BookingFilters
        content={content}
        filters={filters}
        onFilterChange={handlers.handleFilterChange}
        onClearFilters={handlers.handleClearFilters}
        styles={styles}
      />

      <div className={styles.layout.content_container}>
        {/* Show loading skeleton when refreshing with existing data */}
        {loading && bookings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
            <TableSkeletonLoader rows={5} columns={7} />
            <div className="mt-6">
              <CardSkeletonLoader count={3} />
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <EmptyState content={content} type="no_results" styles={styles} />
        ) : (
          <React.Fragment>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop table view */}
              <div className="hidden md:block">
                {loading ? (
                  <div className="p-6">
                    <TableSkeletonLoader rows={5} columns={7} />
                  </div>
                ) : (
                  <BookingTable
                    content={content}
                    bookings={paginatedBookings}
                    onBookingClick={handlers.handleBookingClick}
                    onAction={handlers.handleAction}
                    styles={styles}
                  />
                )}
              </div>
              
              {/* Mobile cards view */}
              <div className={styles.layout.mobile_cards}>
                {loading ? (
                  <div className="p-4">
                    <CardSkeletonLoader count={3} />
                  </div>
                ) : (
                  paginatedBookings.map(booking => (
                    
                    <BookingCard
                      content={content}
                      key={booking.id || booking._id || booking.bookingId}
                      booking={booking}
                      onBookingClick={handlers.handleBookingClick}
                      onAction={handlers.handleAction}
                      styles={styles}
                    />
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <Pagination
                  content={content}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlers.handlePageChange}
                  itemsPerPage={5}
                  totalItems={filteredBookings.length}
                  styles={styles}
                />
              )}
            </div>
          </React.Fragment>
        )}
      </div>

      <BookingDetailsDrawer
        content={content}
        booking={selectedBooking}
        restaurant={selectedRestaurant}
        isOpen={isDrawerOpen}
        onClose={handlers.handleCloseDrawer}
        onAction={handlers.handleAction}
        onSaveNote={(note) => handlers.handleSaveNote(note, selectedBooking?.id)}
        styles={styles}
      />

      <ConfirmationModal
        content={content}
        isOpen={confirmModal.isOpen}
        title={modalContent.title}
        message={modalContent.message}
        actionType={confirmModal.action}
        onConfirm={() => handlers.handleConfirmAction(confirmModal)}
        onCancel={handlers.handleCancelAction}
        styles={styles}
      />
    </div>
  );
}

export default BookingsManagement;