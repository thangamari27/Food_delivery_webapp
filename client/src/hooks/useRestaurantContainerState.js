import { useState, useEffect } from 'react';

function useRestaurantContainerState(RESTAURANTS_PER_PAGE) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Modal handlers
  const handleBookNow = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReservationModal(true);
  };

  const handleViewMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    setSelectedRestaurant(null);
  };

  const closeMenuModal = () => {
    setShowMenuModal(false);
    setSelectedRestaurant(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    showMobileFilter,
    setShowMobileFilter,
    showReservationModal,
    setShowReservationModal,
    showMenuModal,
    setShowMenuModal,
    selectedRestaurant,
    setSelectedRestaurant,
    handleBookNow,
    handleViewMenu,
    closeReservationModal,
    closeMenuModal
  };
}

export default useRestaurantContainerState