import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useRestaurantContext } from '../../context/admin/RestaurantContext';
import { toast } from 'react-hot-toast';
import restaurantService from '../../services/restaurantService';

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
  activeOffers: [],
  rating: {
    average: 0,
    count: 0
  }
});

export function useRestaurantManagement(content) {
  const {
    restaurants,
    pagination,
    loading,
    error,
    fetchRestaurants
  } = useRestaurantContext();

  const hasFetchedRef = useRef(false);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: "all",
    cuisine: "all",
    delivery: "all",
    priceRange: "all"
  });
  //  FIX: Initialize sortConfig with default object instead of null
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState(getInitialFormState());
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Search and filter loading state
  const [dataLoading, setDataLoading] = useState(false);

  const itemsPerPage = pagination?.limit || ITEMS_PER_PAGE;

  //  Initial fetch (ONCE)
  useEffect(() => {
    if (!hasFetchedRef.current && typeof fetchRestaurants === 'function') {
      hasFetchedRef.current = true;
      fetchRestaurants();
    }
  }, [fetchRestaurants]);

  //  Filtering
  const filteredRestaurants = useMemo(() => {
    let data = [...(restaurants || [])];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(r =>
        r.name?.toLowerCase().includes(term) ||
        r.address?.city?.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filters.status !== "all") {
      data = data.filter(r => r.status === filters.status);
    }

    // Cuisine filter
    if (filters.cuisine !== "all") {
      data = data.filter(r => 
        Array.isArray(r.cuisine) ? r.cuisine.includes(filters.cuisine) : false
      );
    }

    // Delivery filter
    if (filters.delivery !== "all") {
      if (filters.delivery === "available") {
        data = data.filter(r => r.deliveryAvailable === true);
      } else if (filters.delivery === "unavailable") {
        data = data.filter(r => r.deliveryAvailable === false);
      }
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      data = data.filter(r => {
        const priceForTwo = r.priceForTwo || 0;
        switch (filters.priceRange) {
          case "under300":
            return priceForTwo < 300;
          case "moderate":
            return priceForTwo >= 300 && priceForTwo <= 500;
          case "premium":
            return priceForTwo > 500;
          default:
            return true;
        }
      });
    }

    return data;
  }, [restaurants, searchTerm, filters]);

  //  Sorting with null-safe check
  const sortedRestaurants = useMemo(() => {
    // If no sort key is selected, return unsorted
    if (!sortConfig || !sortConfig.key) return filteredRestaurants;

    const { key, direction } = sortConfig;
    return [...filteredRestaurants].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      // Handle undefined/null values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? 1 : -1;
      if (bValue == null) return direction === 'asc' ? -1 : 1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Numeric comparison
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRestaurants, sortConfig]);

  //  Pagination
  const totalPages = Math.max(1, Math.ceil(sortedRestaurants.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedRestaurants.slice(start, start + itemsPerPage);
  }, [sortedRestaurants, currentPage, itemsPerPage]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Handlers
  const handleSort = useCallback((key) => {
    setSortConfig(prev => {
      // If clicking same column, toggle direction
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      // If clicking new column, start with ascending
      return { key, direction: 'asc' };
    });
  }, []);

  const handleSearchSubmit = useCallback(async () => {
    if (!searchTerm || !searchTerm.trim()) {
      // If search is empty, fetch all
      setDataLoading(true);
      try {
        await fetchRestaurants();
      } catch (error) {
        toast.error('Failed to fetch restaurants');
      } finally {
        setDataLoading(false);
      }
      return;
    }

    setDataLoading(true);
    try {
      await fetchRestaurants({ search: searchTerm });
    } catch (error) {
      toast.error('Search failed: ' + error.message);
    } finally {
      setDataLoading(false);
    }
  }, [searchTerm, fetchRestaurants]);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormState());
    setErrors({});
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
        priceForTwo: restaurant.priceForTwo || 0,
        rating: restaurant.rating || getInitialFormState().rating
      };
      
      setFormData(transformedData);
      setSelectedRestaurant(restaurant);
      if (restaurant.image?.url) {
        setImagePreview(restaurant.image.url);
      }
    } else {
      resetForm();
      setSelectedRestaurant(null);
    }
    setShowModal(true);
  }, [resetForm]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  const validateForm = useCallback((data) => {
    const errors = {};
    
    if (!data.name?.trim()) errors.name = "Name is required";
    if (!data.contactPerson?.trim()) errors.contactPerson = "Contact person is required";
    if (!data.phone?.trim()) errors.phone = "Phone is required";
    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!data.address?.street?.trim()) errors["address.street"] = "Street is required";
    if (!data.address?.city?.trim()) errors["address.city"] = "City is required";
    
    if (!Array.isArray(data.cuisine) || data.cuisine.length === 0) {
      errors.cuisine = "At least one cuisine is required";
    }
    
    return errors;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    const loadingToast = toast.loading(
      modalMode === "create" ? "Creating restaurant..." : "Updating restaurant..."
    );

    try {
      const restaurantData = {
        ...formData,
        cuisine: Array.isArray(formData.cuisine) ? formData.cuisine : [formData.cuisine],
        address: {
          ...formData.address,
          coordinates: formData.address.coordinates?.latitude && formData.address.coordinates?.longitude
            ? formData.address.coordinates
            : undefined
        },
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        deliveryFee: parseFloat(formData.deliveryFee) || 0,
        deliveryRadius: parseInt(formData.deliveryRadius) || 10,
        priceForTwo: formData.priceForTwo || 0,
        rating: {
          average: parseFloat(formData.rating?.average) || 0,
          count: parseInt(formData.rating?.count) || 0
        }
      };

      if (modalMode === "create") {
        await restaurantService.create(restaurantData, imageFile);
        toast.success("Restaurant created successfully", { id: loadingToast });
      } else {
        await restaurantService.update(selectedRestaurant.rid, restaurantData, imageFile);
        toast.success("Restaurant updated successfully", { id: loadingToast });
      }
      
      closeModal();
      // Refresh the list
      await fetchRestaurants();
      
    } catch (error) {
      toast.error(error.message || "Operation failed", { id: loadingToast });
    }
  }, [formData, modalMode, selectedRestaurant, imageFile, validateForm, closeModal, fetchRestaurants]);

  const handleDelete = useCallback(async (idOrRid) => {
    if (window.confirm(content.confirmations?.delete || "Are you sure you want to delete this restaurant?")) {
      const loadingToast = toast.loading("Deleting restaurant...");
      
      try {
        const restaurant = restaurants.find(r => r.id === idOrRid || r.rid === idOrRid);
        const ridToDelete = restaurant?.rid || idOrRid;
        
        await restaurantService.deactivate(ridToDelete);
        toast.success("Restaurant deleted successfully", { id: loadingToast });
        
        // Refresh the list
        await fetchRestaurants();
      } catch (error) {
        toast.error(error.message || "Delete failed", { id: loadingToast });
      }
    }
  }, [content.confirmations, restaurants, fetchRestaurants]);

  const viewDetails = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewDetailsModal(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setViewDetailsModal(false);
    setSelectedRestaurant(null);
  }, []);

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

  const getCuisineOptions = useMemo(() => {
    if (!restaurants || restaurants.length === 0) return [];
    
    const cuisines = new Set();
    restaurants.forEach(r => {
      if (r.cuisine && Array.isArray(r.cuisine)) {
        r.cuisine.forEach(c => cuisines.add(c));
      }
    });
    return Array.from(cuisines).sort();
  }, [restaurants]);

  return {
    // Data
    restaurants: restaurants || [],
    filteredRestaurants: sortedRestaurants,
    paginatedData,
    itemsPerPage,
    currentPage,
    totalPages,
    
    // UI state
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    sortConfig,
    
    // Modal state
    showModal,
    modalMode,
    viewDetailsModal,
    selectedRestaurant,
    
    // Form state
    formData,
    setFormData,
    errors,
    setErrors,
    imageFile,
    imagePreview,
    
    // Loading states
    loading,
    error,
    dataLoading,
    
    // Handlers
    handleSort,
    handleSearchSubmit,
    openModal,
    closeModal,
    viewDetails,
    closeDetailsModal,
    handleSubmit,
    handleDelete,
    handleImageChange,
    setCurrentPage,
    
    // Utilities
    getCuisineOptions
  };
}