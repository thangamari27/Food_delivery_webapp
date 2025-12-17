import { useState, useEffect } from "react";
import FilterManager from "./ui/FilterManager";
import MainContent from "./ui/MainContent";
import ModalManager from "./ui/ModalManager";
import { useRestaurantFilters } from "@/hooks/useRestaurantFilters";
import { useRestaurantPagination } from "@/hooks/useRestaurantPagination";
import { useRestaurantData } from "@/hooks/useRestaurantData";
import useRestaurantContainerState from "@/hooks/useRestaurantContainerState";

// Constants
const RESTAURANTS_PER_PAGE = 3;

function RestaurantContainer({ content, styles }) {
  // State management
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
    closeMenuModal
  } = useRestaurantContainerState();

  // Custom Hooks
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

  const { filteredRestaurants } = useRestaurantData(
    content.restaurants,
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

  return (
    <div className={styles.container}>
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

      {/* Main Content */}
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

      {/* Modal Management */}
      <ModalManager
        selectedRestaurant={selectedRestaurant}
        showReservationModal={showReservationModal}
        showMenuModal={showMenuModal}
        onCloseReservation={closeReservationModal}
        onCloseMenu={closeMenuModal}
        content={content}
        styles={styles}
      />
    </div>
  );
}

export default RestaurantContainer;