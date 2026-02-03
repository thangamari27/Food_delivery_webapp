/**
 * useRestaurantManagement Hook 
*/
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRestaurant } from '../../context/admin/Restaurantcontext'
import { applyFilters, sortRestaurants, validateForm } from "../../utils/handler/admin/restaurantFilterHandler";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const getInitialFormState = () => ({
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: {
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  cuisine: [],
  operatingHours: {
    openingTime: "09:00",
    closingTime: "22:00",
    weeklySchedule: []
  },
  deliveryAvailable: true,
  takeawayAvailable: true,
  dineInAvailable: true,
  priceRange: "",
  priceForTwo: 0,
  status: "Active",
  description: "",
  deliveryTime: "30-40 mins",
  deliveryTimeMin: 30,
  deliveryTimeMax: 40,
  minOrderAmount: 0,
  deliveryFee: 0,
  deliveryRadius: 10,
  offers: "",
  badges: [],
  features: [],
  serviceAreas: [],
  paymentMethods: ["Cash", "Card", "UPI"],
  verificationStatus: "Pending",
  isActive: true,
  isFeatured: false,
  isPremium: false,
  menuItems: [],
  activeOffers: []
});

export function useRestaurantManagement(content) {
  const {
    restaurants: contextRestaurants,
    loading: contextLoading,
    error: contextError,
    fetchRestaurants,
    createRestaurant: createRestaurantAPI,
    updateRestaurant: updateRestaurantAPI,
    deleteRestaurant: deleteRestaurantAPI,
    clearError
  } = useRestaurant();

  // Track initial fetch
  const hasFetchedRef = useRef(false);
  const searchTimeoutRef = useRef(null);

  // State
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch from DB on mount (ONCE)
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchRestaurants();
    }
  }, [fetchRestaurants]);

  // Use ONLY context restaurants from DB (no sample data fallback)
  const restaurants = contextRestaurants;

  // Filtered and sorted restaurants
  const filteredRestaurants = useMemo(() => {
    let result = applyFilters(restaurants, searchTerm, filters);
    result = sortRestaurants(result, sortConfig);
    return result;
  }, [restaurants, searchTerm, filters, sortConfig]);

  // Pagination
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

  // Debounced search - re-fetch from server
  useEffect(() => {
    if (!hasFetchedRef.current) return; // Skip on initial mount
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Only fetch if search term exists
    if (searchTerm) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchRestaurants({ search: searchTerm });
      }, 500);
    } else if (hasFetchedRef.current) {
      // Search cleared, fetch all
      fetchRestaurants();
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, fetchRestaurants]);

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
    setImageFile(null);
    setImagePreview(null);
  }, []);

  const openModal = useCallback((mode, restaurant = null) => {
    setModalMode(mode);
    if (mode === "edit" && restaurant) {
      // Transform backend data to form format
      const transformedData = {
        ...restaurant,
        address: restaurant.address || getInitialFormState().address,
        operatingHours: restaurant.operatingHours || getInitialFormState().operatingHours,
        cuisine: restaurant.cuisine || [],
        badges: restaurant.badges || [],
        features: restaurant.features || [],
        serviceAreas: restaurant.serviceAreas || [],
        paymentMethods: restaurant.paymentMethods || ["Cash", "Card", "UPI"],
        verificationStatus: restaurant.verificationStatus || "Pending",
        isActive: restaurant.isActive ?? true,
        isFeatured: restaurant.isFeatured ?? false,
        isPremium: restaurant.isPremium ?? false,
        deliveryAvailable: restaurant.deliveryAvailable ?? true,
        takeawayAvailable: restaurant.takeawayAvailable ?? true,
        dineInAvailable: restaurant.dineInAvailable ?? true,
        minOrderAmount: restaurant.minOrderAmount || 0,
        deliveryFee: restaurant.deliveryFee || 0,
        deliveryRadius: restaurant.deliveryRadius || 10,
        offers: restaurant.offers || "",
        priceForTwo: restaurant.priceForTwo || 0
      };
      
      setFormData(transformedData);
      setSelectedRestaurant(restaurant);
      if (restaurant.image?.url) {
        setImagePreview(restaurant.image.url);
      }
    } else {
      resetForm();
    }
    setShowModal(true);
  }, [resetForm]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      // Prepare data for backend
      const restaurantData = {
        ...formData,
        cuisine: Array.isArray(formData.cuisine) ? formData.cuisine : [formData.cuisine],
        // Clean up empty coordinates
        address: {
          ...formData.address,
          coordinates: formData.address.coordinates?.latitude && formData.address.coordinates?.longitude
            ? formData.address.coordinates
            : undefined
        },
        // Convert string numbers to numbers
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        deliveryFee: parseFloat(formData.deliveryFee) || 0,
        deliveryRadius: parseInt(formData.deliveryRadius) || 10,
        priceForTwo: formData.priceForTwo || 0
      };

      if (modalMode === "create") {
        await createRestaurantAPI(restaurantData, imageFile);
        toast.success("Restaurant created successfully");
      } else {
        await updateRestaurantAPI(selectedRestaurant.rid, restaurantData, imageFile);
        toast.success("Restaurant updated successfully");
      }
      
      closeModal();
      fetchRestaurants(); // Refresh list
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  }, [formData, modalMode, selectedRestaurant, imageFile, createRestaurantAPI, updateRestaurantAPI, closeModal, fetchRestaurants]);

  const handleDelete = useCallback(async (idOrRid) => {
    if (window.confirm(content.confirmations?.delete || "Are you sure you want to delete this restaurant?")) {
      try {
        const restaurant = restaurants.find(r => r.id === idOrRid || r.rid === idOrRid);
        const ridToDelete = restaurant?.rid || idOrRid;
        
        await deleteRestaurantAPI(ridToDelete, false);
        toast.success("Restaurant deleted successfully");
        fetchRestaurants(); // Refresh list
      } catch (error) {
        toast.error(error.message || "Delete failed");
      }
    }
  }, [content.confirmations, deleteRestaurantAPI, fetchRestaurants, restaurants]);

  const viewDetails = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewDetailsModal(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setViewDetailsModal(false);
    setSelectedRestaurant(null);
  }, []);

  return {
    restaurants,
    filteredRestaurants,
    paginatedData,
    loading: contextLoading,
    error: contextError,
    currentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    showModal,
    modalMode,
    openModal,
    closeModal,
    viewDetailsModal,
    closeDetailsModal,
    viewDetails,
    formData,
    setFormData,
    errors,
    setErrors,
    imageFile,
    imagePreview,
    handleImageChange,
    handleSubmit,
    resetForm,
    handleDelete,
    selectedRestaurant,
    clearError
  };
}