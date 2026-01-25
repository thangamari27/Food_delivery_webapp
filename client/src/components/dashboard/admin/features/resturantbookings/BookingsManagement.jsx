import React from "react"
import { bookingContent } from "../../../../../utils/constant/admin/AdminDashboard"
import { bookingStyles } from "../../../../../utils/styles/AdminStyle"
import BookingHeader from "./BookingHeader"
import BookingStats from "./BookingStats"
import BookingFilters from "./BookingFilters"
import BookingCard from "./BookingCard"
import BookingTable from "./BookingTable"
import Pagination from "./Pagination"
import BookingDetailsDrawer from "./BookingDetailsDrawer"
import ConfirmationModal from "./ConfirmationModal"
import EmptyState from "./EmptyState"
import { useBookingManagement, useBookingFilters, useBookingStats, useModalContent } from "../../../../../hooks/admin/useBookingManagement"
import { createBookingHandlers } from "../../../../../utils/handler/admin/bookingHandlers"

function BookingsManagement() {
  const content = bookingContent;
  const styles = bookingStyles;

  // Initialize hooks
  const bookingManagement = useBookingManagement();
  const { bookings, setBookings } = bookingManagement;
  
  // Initialize with mock data
  React.useEffect(() => {
    setBookings(content.mock_bookings);
  }, [setBookings]);

  // Use custom hooks
  const stats = useBookingStats(bookings);
  const { filteredBookings, paginatedBookings, totalPages } = useBookingFilters(
    bookings, 
    bookingManagement.filters, 
    bookingManagement.currentPage
  );
  const modalContent = useModalContent(bookingManagement.confirmModal.action);

  // Create handlers
  const handlers = createBookingHandlers(
    bookingManagement.setBookings,
    bookingManagement.setFilters,
    bookingManagement.setCurrentPage,
    bookingManagement.setSelectedBooking,
    bookingManagement.setIsDrawerOpen,
    bookingManagement.setConfirmModal,
    bookingManagement.setIsRefreshing,
    bookings,
    bookingManagement.selectedBooking
  );

  // Get selected restaurant
  const selectedRestaurant = bookingManagement.selectedBooking 
  ? content.mock_restaurants[bookingManagement.selectedBooking.restaurantId] 
  : null;

  return (
    <div className={styles.layout.page}>
      <BookingHeader 
        content={content}
        onExport={() => handlers.handleExport(filteredBookings)} 
        onRefresh={handlers.handleRefresh}
        isRefreshing={bookingManagement.isRefreshing}
        styles={styles}
      />

      <BookingStats 
        content={content}
        stats={stats}
        onStatClick={handlers.handleStatClick}
        activeFilter={bookingManagement.filters.status}
        styles={styles}
      />

      <BookingFilters
        content={content}
        filters={bookingManagement.filters}
        onFilterChange={handlers.handleFilterChange}
        onClearFilters={handlers.handleClearFilters}
        styles={styles}
      />

      <div className={styles.layout.content_container}>
        {filteredBookings.length === 0 ? (
          <EmptyState content={content} type="no_results" styles={styles} />
        ) : (
          <React.Fragment>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <BookingTable
                content={content}
                bookings={paginatedBookings}
                onBookingClick={handlers.handleBookingClick}
                onAction={handlers.handleAction}
                styles={styles}
              />
              
              <div className={styles.layout.mobile_cards}>
                {paginatedBookings.map(booking => (
                  <BookingCard
                    content={content}
                    key={booking.id}
                    booking={booking}
                    onBookingClick={handlers.handleBookingClick}
                    onAction={handlers.handleAction}
                    styles={styles}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  content={content}
                  currentPage={bookingManagement.currentPage}
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
        booking={bookingManagement.selectedBooking}
        restaurant={selectedRestaurant}
        isOpen={bookingManagement.isDrawerOpen}
        onClose={handlers.handleCloseDrawer}
        onAction={handlers.handleAction}
        onSaveNote={handlers.handleSaveNote}
        styles={styles}
      />

      <ConfirmationModal
        content={content}
        isOpen={bookingManagement.confirmModal.isOpen}
        title={modalContent.title}
        message={modalContent.message}
        actionType={bookingManagement.confirmModal.action}
        onConfirm={() => handlers.handleConfirmAction(bookingManagement.confirmModal)}
        onCancel={handlers.handleCancelAction}
        styles={styles}
      />
    </div>
  )
}

export default BookingsManagement