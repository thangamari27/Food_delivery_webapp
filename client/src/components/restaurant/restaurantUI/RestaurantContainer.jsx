import { useState, useEffect } from "react";
import FilterManager from "./ui/FilterManager";
import MainContent from "./ui/MainContent";
import ModalManager from "./ui/ModalManager";
import AdminLoader, { CardSkeletonLoader, InlineLoader } from "../../common/admin/AdminLoader";
import ErrorDisplay from "../../common/admin/ErrorDisplay";
import { useRestaurantFilters } from "@/hooks/useRestaurantFilters";
import { useRestaurantPagination } from "@/hooks/useRestaurantPagination";
import { useRestaurantData } from "@/hooks/useRestaurantData";
import useRestaurantContainerState from "@/hooks/useRestaurantContainerState";

// Constants
const RESTAURANTS_PER_PAGE = 3;

function RestaurantContainer({ content, styles }) {
  // State management with API integration
  const {
    searchQuery,
    setSearchQuery,
    showMobileFilter,
    setShowMobileFilter,
    showReservationModal,
    showMenuModal,
    selectedRestaurant,
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
  } = useRestaurantContainerState();

  // Custom Hooks for filtering
  const {
    selectedFilters,
    tempFilters,
    appliedFilters,
    setSelectedFilters,
    setTempFilters,
    toggleFilter,
    toggleTempFilter,
    applyFilters: applyMobileFilters,
    applyDesktopFilters,
    clearAllFilters
  } = useRestaurantFilters();

  const {
    currentPage,
    getPaginationData,
    handlePageChange,
    resetToFirstPage,
    setCurrentPage
  } = useRestaurantPagination(RESTAURANTS_PER_PAGE);

  // Filter restaurants using fetched data
  const { filteredRestaurants } = useRestaurantData(
    restaurants,
    appliedFilters,
    searchQuery
  );

  // Get paginated data
  const { 
    startIndex, 
    endIndex, 
    paginatedItems: paginatedRestaurants, 
    totalPages 
  } = getPaginationData(filteredRestaurants);

  // Reset to page 1 when filters change
  useEffect(() => {
    resetToFirstPage();
  }, [appliedFilters, searchQuery]);

  const handleClearAllFilters = () => {
    clearAllFilters();
    resetToFirstPage();
  };

  // Handle error state
  if (restaurantsError && restaurants.length === 0) {
    return (
      <div className={styles.container}>
        <ErrorDisplay 
          message={restaurantsError} 
          onRetry={loadRestaurants}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Show inline loader when loading more restaurants */}
      {restaurantsLoading && restaurants.length > 0 && (
        <div className="mb-6">
          <InlineLoader 
            size="medium" 
            text="Loading more restaurants..." 
          />
        </div>
      )}

      {/* Filter Management */}
      <FilterManager
        selectedFilters={selectedFilters}
        tempFilters={tempFilters}
        appliedFilters={appliedFilters}
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
        toggleFilter={toggleFilter}
        toggleTempFilter={toggleTempFilter}
        setTempFilters={setTempFilters}
        applyMobileFilters={applyMobileFilters}
        clearAllFilters={clearAllFilters}
        content={content}
        styles={styles}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetToFirstPage={resetToFirstPage}
      />

      {/* Main Content with skeleton loader */}
      {restaurantsLoading ? (
        <div className="mt-8">
          <CardSkeletonLoader count={RESTAURANTS_PER_PAGE} />
        </div>
      ) : (
        <MainContent
          content={content}
          styles={styles}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          setSelectedFilters={setSelectedFilters}
          handleClearAllFilters={handleClearAllFilters}
          applyDesktopFilters={applyDesktopFilters}
          filteredRestaurants={filteredRestaurants}
          paginatedRestaurants={paginatedRestaurants}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          onViewMenu={handleViewMenu}
          onBookNow={handleBookNow}
        />
      )}

      {/* Show loading state for booking */}
      {bookingLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <InlineLoader 
            size="large" 
            text="Processing your reservation..." 
          />
        </div>
      )}

      {/* Modal Management */}
      <ModalManager
        selectedRestaurant={selectedRestaurant}
        showReservationModal={showReservationModal}
        showMenuModal={showMenuModal}
        onCloseReservation={closeReservationModal}
        onCloseMenu={closeMenuModal}
        onSubmitBooking={handleBookingSubmit}
        bookingSuccess={bookingSuccess}
        bookingError={bookingError}
        bookingLoading={bookingLoading}
        content={content}
        styles={styles}
      />
    </div>
  );
}

export default RestaurantContainer;