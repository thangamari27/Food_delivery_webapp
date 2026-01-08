import { useState, useEffect, useCallback, useMemo } from "react";
import { applyFilters, sortRestaurants, validateForm } from "../../utils/handler/admin/restaurantFilterHandler";

const ITEMS_PER_PAGE = 10;

const getInitialFormState = () => ({
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  cuisine: [],
  openingTime: "09:00",
  closingTime: "22:00",
  deliveryAvailable: true,
  priceRange: "",
  status: "Active",
  description: "",
  rating: 0,
  deliveryTime: "",
  offers: "",
  badges: [],
  features: [],
  image: null
});

export function useRestaurantManagement(content) {
  // State Management
  const [restaurants, setRestaurants] = useState(content.restaurantData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({
    status: "all",
    cuisine: "all",
    delivery: "all",
    priceRange: "all"
  });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState(getInitialFormState());
  const [errors, setErrors] = useState({});

  // Memoized filtered and sorted restaurants
  const filteredRestaurants = useMemo(() => {
    let result = applyFilters(restaurants, searchTerm, filters);
    result = sortRestaurants(result, sortConfig);
    return result;
  }, [restaurants, searchTerm, filters, sortConfig]);

  // Pagination calculations
  const totalPages = useMemo(() => 
    Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE),
    [filteredRestaurants.length]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRestaurants, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Handlers
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormState());
    setErrors({});
    setSelectedRestaurant(null);
  }, []);

  const openModal = useCallback((mode, restaurant = null) => {
    setModalMode(mode);
    if (mode === "edit" && restaurant) {
      setFormData(restaurant);
      setSelectedRestaurant(restaurant);
    } else {
      resetForm();
    }
    setShowModal(true);
  }, [resetForm]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    if (modalMode === "create") {
      const newId = restaurants.length 
        ? Math.max(...restaurants.map(r => r.id)) + 1 
        : 1;
      setRestaurants((prev) => [...prev, { ...formData, id: newId }]);
    } else {
      setRestaurants((prev) =>
        prev.map((r) => r.id === selectedRestaurant.id 
          ? { ...formData, id: r.id } 
          : r
        )
      );
    }

    closeModal();
  }, [formData, modalMode, restaurants, selectedRestaurant, closeModal]);

  const handleDelete = useCallback((id) => {
    if (window.confirm(content.confirmations?.delete || "Are you sure you want to delete this restaurant?")) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  }, [content.confirmations]);

  const viewDetails = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewDetailsModal(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setViewDetailsModal(false);
    setSelectedRestaurant(null);
  }, []);

  return {
    // Data
    restaurants,
    filteredRestaurants,
    paginatedData,
    
    // Pagination
    currentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    setCurrentPage,

    // Filter & Search
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,

    // Sort
    sortConfig,
    handleSort,

    // Modal Control
    showModal,
    modalMode,
    openModal,
    closeModal,
    viewDetailsModal,
    closeDetailsModal,
    viewDetails,

    // Form
    formData,
    setFormData,
    errors,
    setErrors,
    handleSubmit,
    resetForm,
    handleDelete,
    selectedRestaurant
  };
}