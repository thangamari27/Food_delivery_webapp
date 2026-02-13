/**
 * useFoodManagement Hook
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useFood } from '../../context/admin/FoodContext';
import { useRestaurantContext } from '../../context/admin/Restaurantcontext';
import { toast } from 'react-hot-toast';

const getInitialFormState = () => ({
  name: '',
  category: '',
  cuisine: '',
  restaurant: '',
  type: 'Regular Menu',
  price: '',
  originalPrice: '',
  description: '',
  ingredients: '',
  status: 'Active',
  isVeg: true,
  isVegan: false,
  isGlutenFree: false,
  spiceLevel: 'Not Applicable',
  allergens: [],
  tags: [],
  preparationTime: 15,
  servingSize: '1 serving',
  availableQuantity: 100,
  minOrderQuantity: 1,
  maxOrderQuantity: 10,
  isFeatured: false,
  isBestseller: false,
  isNewArrival: false,
  nutritionalInfo: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  }
});

export const useFoodManagement = () => {
  // Use RestaurantContext for restaurant data
  const { 
    restaurants: restaurantContextData, 
    loading: loadingRestaurants,
    fetchRestaurants 
  } = useRestaurantContext();
  
  const {
    foods,
    loading,
    error,
    fetchFoods,
    createFood,
    updateFood,
    deleteFood,
    setFilters: setContextFilters,
    resetFilters: resetContextFilters,
    clearError,
    transformToBackendFormat,
    transformToFrontendFormat
  } = useFood();

  // Local UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState({
    category: 'all',
    cuisine: 'all',
    type: 'all',
    status: 'all',
    restaurant: 'all'
  });
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState(getInitialFormState());
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Refs
  const searchTimeoutRef = useRef(null);
  const initialFetchDone = useRef(false);

  /**
   * Process restaurant data from context for dropdown
   */
  const restaurants = useMemo(() => {
    
    if (!restaurantContextData || !Array.isArray(restaurantContextData)) {
      return [];
    }
    
    // Transform restaurant data for dropdown
    return restaurantContextData
      .filter(rest => rest.isActive !== false) // Only show active restaurants
      .map(rest => ({
        _id: rest._id || rest.id,
        id: rest.id || rest._id,
        name: rest.name || rest.restaurantName || 'Unnamed Restaurant',
        isActive: rest.isActive !== undefined ? rest.isActive : true
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  }, [restaurantContextData]);

  /**
   * Get restaurant name by ID for display
   */
  const getRestaurantNameById = useCallback((restaurantId) => {
    if (!restaurantId) return 'Unknown Restaurant';
    
    const restaurant = restaurants.find(rest => 
      rest._id === restaurantId || rest.id === restaurantId
    );
    
    return restaurant?.name || 'Unknown Restaurant';
  }, [restaurants]);

  /**
   * Fetch initial data
   */
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchFoods();
      // Fetch restaurants with default parameters
      fetchRestaurants({ limit: 100, page: 1, isActive: true }); // Get all active restaurants
    }
  }, [fetchFoods, fetchRestaurants]);

  /**
   * Debounced search
   */
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchTerm) {
        
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  /**
   * Apply local filtering and sorting to fetched data
   */
  const filteredFoods = useMemo(() => {
    let result = [...(foods || [])];

    // Apply search filter FIRST
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(food => 
        food.name?.toLowerCase().includes(searchLower) ||
        food.description?.toLowerCase().includes(searchLower) ||
        food.category?.toLowerCase().includes(searchLower) ||
        food.cuisine?.toLowerCase().includes(searchLower) ||
        food.restaurantName?.toLowerCase().includes(searchLower) ||
        food.ingredients?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (localFilters.category !== 'all') {
      result = result.filter(food => food.category === localFilters.category);
    }

    // Apply cuisine filter
    if (localFilters.cuisine !== 'all') {
      result = result.filter(food => food.cuisine === localFilters.cuisine);
    }

    // Apply type filter
    if (localFilters.type !== 'all') {
      result = result.filter(food => food.type === localFilters.type);
    }

    // Apply status filter
    if (localFilters.status !== 'all') {
      result = result.filter(food => {
        const foodStatus = food.status || (food.isActive && food.isAvailable ? 'Active' : 'Inactive');
        return foodStatus === localFilters.status;
      });
    }

    // Apply restaurant filter
    if (localFilters.restaurant !== 'all') {
      result = result.filter(food => {
        const restaurantId = typeof food.restaurant === 'object' 
          ? (food.restaurant._id || food.restaurant.id)
          : food.restaurant;
        return restaurantId === localFilters.restaurant;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'rating':
          const ratingA = typeof a.rating === 'object' ? (a.rating.average || 0) : (a.rating || 0);
          const ratingB = typeof b.rating === 'object' ? (b.rating.average || 0) : (b.rating || 0);
          return ratingB - ratingA;
        case 'recent':
        default:
          return new Date(b.create_at || 0) - new Date(a.create_at || 0);
      }
    });

    return result;
  }, [foods, localFilters, sortBy, searchTerm]);

  /**
   * Extract unique categories from fetched foods
   */
  const categories = useMemo(() => {
    const cats = new Set();
    foods?.forEach(food => {
      if (food.category) cats.add(food.category);
    });
    return Array.from(cats).sort();
  }, [foods]);

  /**
   * Extract unique cuisines from fetched foods
   */
  const cuisines = useMemo(() => {
    const cuis = new Set();
    foods?.forEach(food => {
      if (food.cuisine) cuis.add(food.cuisine);
    });
    return Array.from(cuis).sort();
  }, [foods]);

  /**
   * Get unique restaurants for filter dropdown
   */
  const availableRestaurantsForFilter = useMemo(() => {
    const restaurantMap = new Map();
    
    // Add restaurants from context
    restaurants.forEach(rest => {
      if (rest._id && rest.name) {
        restaurantMap.set(rest._id, {
          _id: rest._id,
          name: rest.name,
          id: rest.id || rest._id
        });
      }
    });
    
    // Also extract from foods data for backup
    foods?.forEach(food => {
      if (food.restaurant) {
        if (typeof food.restaurant === 'object' && food.restaurant._id) {
          restaurantMap.set(food.restaurant._id, {
            _id: food.restaurant._id,
            name: food.restaurant.name || food.restaurantName || 'Unknown Restaurant',
            id: food.restaurant.id || food.restaurant._id
          });
        } else if (food.restaurant) {
          // If restaurant is just an ID, find its name
          const restaurant = restaurants.find(r => r._id === food.restaurant);
          if (restaurant) {
            restaurantMap.set(food.restaurant, {
              _id: food.restaurant,
              name: restaurant.name || food.restaurantName || 'Unknown Restaurant',
              id: food.restaurant
            });
          }
        }
      }
    });
    
    return Array.from(restaurantMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
  }, [restaurants, foods]);

  /**
   * Pagination calculations
   */
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  
  const paginatedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFoods.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFoods, currentPage, itemsPerPage]);

  /**
   * Reset page when filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, localFilters, sortBy]);

  /**
   * Form validation
   */
  const validateForm = useCallback(() => {
    const errors = {};

    // Required fields
    if (!formData.name?.trim()) {
      errors.name = 'Food name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }

    if (!formData.cuisine) {
      errors.cuisine = 'Cuisine is required';
    }

    if (!formData.restaurant) {
      errors.restaurant = 'Restaurant is required';
    }

    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }

    // Price validation
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      errors.price = 'Valid price greater than 0 is required';
    }

    // Original price validation
    if (formData.originalPrice) {
      const originalPrice = parseFloat(formData.originalPrice);
      if (isNaN(originalPrice) || originalPrice < 0) {
        errors.originalPrice = 'Original price must be a valid number';
      } else if (originalPrice < price) {
        errors.originalPrice = 'Original price must be greater than or equal to current price';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Handle add food
   */
  const handleAddFood = useCallback(async () => {
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    try {
      // Backend expects restaurant ID
      const foodData = {
        ...formData,
        restaurant: formData.restaurant // Already the ID from dropdown
      };
      
      await createFood(foodData, imageFile);
      toast.success('Food item added successfully');
      setShowAddModal(false);
      resetForm();
      fetchFoods(); // Refresh the list
    } catch (err) {
      toast.error(err.message || 'Failed to add food item');
    }
  }, [formData, imageFile, validateForm, createFood, fetchFoods]);

  /**
   * Handle edit food
   */
  const handleEditFood = useCallback(async () => {
    if (!selectedFood || !validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    try {
      // Backend expects restaurant ID
      const foodData = {
        ...formData,
        restaurant: formData.restaurant 
      };
      
      await updateFood(selectedFood.fid, foodData, imageFile);
      toast.success('Food item updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchFoods(); // Refresh the list
    } catch (err) {
      toast.error(err.message || 'Failed to update food item');
    }
  }, [selectedFood, formData, imageFile, validateForm, updateFood, fetchFoods]);

  /**
   * Handle delete food
   */
  const handleDeleteFood = useCallback(async () => {
    if (!selectedFood) return;

    try {
      await deleteFood(selectedFood.fid, false);
      toast.success('Food item deleted successfully');
      setShowDeleteModal(false);
      setSelectedFood(null);
      fetchFoods(); // Refresh the list
    } catch (err) {
      toast.error(err.message || 'Failed to delete food item');
    }
  }, [selectedFood, deleteFood, fetchFoods]);

  /**
   * Open edit modal with food data
   */
  const openEditModal = useCallback((food) => {
    const frontendData = transformToFrontendFormat(food);
    setSelectedFood(food);
    
    // Set form data with restaurant ID
    setFormData({
      ...frontendData,
      restaurant: food.restaurant // This is the ID from backend
    });
    
    // Set image preview
    if (food.image?.url) {
      setImagePreview(food.image.url);
    } else if (food.imageUrl) {
      setImagePreview(food.imageUrl);
    }
    
    setShowEditModal(true);
  }, [transformToFrontendFormat]);

  /**
   * Open view modal with food data
   */
  const openViewModal = useCallback((food) => {
    setSelectedFood(food);
    setShowViewModal(true);
  }, []);

  /**
   * Open delete modal with food data
   */
  const openDeleteModal = useCallback((food) => {
    setSelectedFood(food);
    setShowDeleteModal(true);
  }, []);

  /**
   * Reset form
   */
  const resetForm = useCallback(() => {
    setFormData(getInitialFormState());
    setFormErrors({});
    setImageFile(null);
    setImagePreview('');
    setSelectedFood(null);
  }, []);

  /**
   * Reset all filters
   */
  const resetAllFilters = useCallback(() => {
    setSearchTerm('');
    setLocalFilters({
      category: 'all',
      cuisine: 'all',
      type: 'all',
      status: 'all',
      restaurant: 'all'
    });
    setSortBy('recent');
    setCurrentPage(1);
  }, []);

  /**
   * Handle image upload
   */
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      // Clear image if no file selected
      setImageFile(null);
      setImagePreview('');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  /**
   * Open add modal and ensure restaurants are loaded
   */
  const openAddModal = useCallback(() => {
    
    // Refresh restaurants list if needed
    if (restaurants.length === 0 && !loadingRestaurants) {
      fetchRestaurants({ limit: 100, page: 1, isActive: true });
    }
    resetForm(); // Reset form before opening
    setShowAddModal(true);
  }, [restaurants.length, loadingRestaurants, fetchRestaurants, resetForm]);

  /**
   * Check if filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return searchTerm.trim() !== '' || 
           localFilters.category !== 'all' ||
           localFilters.cuisine !== 'all' ||
           localFilters.type !== 'all' ||
           localFilters.status !== 'all' ||
           localFilters.restaurant !== 'all';
  }, [searchTerm, localFilters]);

  /**
   * Enhanced foods data with restaurant names for display
   */
  const enhancedFoods = useMemo(() => {
    return filteredFoods.map(food => ({
      ...food,
      restaurantDisplayName: getRestaurantNameById(food.restaurant) || food.restaurantName
    }));
  }, [filteredFoods, getRestaurantNameById]);

  /**
   * Enhanced paginated foods
   */
  const enhancedPaginatedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return enhancedFoods.slice(startIndex, startIndex + itemsPerPage);
  }, [enhancedFoods, currentPage, itemsPerPage]);

  return {
    // Data
    foods: enhancedFoods,
    paginatedFoods: enhancedPaginatedFoods,
    categories,
    cuisines,
    restaurants, 
    availableRestaurantsForFilter, 
    loadingRestaurants,
    getRestaurantNameById, 
    
    // State
    loading,
    error,
    searchTerm,
    localFilters,
    sortBy,
    currentPage,
    itemsPerPage,
    totalPages,
    showAddModal,
    showEditModal,
    showViewModal,
    showDeleteModal,
    selectedFood,
    formData,
    formErrors,
    imagePreview,
    hasActiveFilters,
    
    // Setters
    setSearchTerm,
    setLocalFilters,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setShowAddModal,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setSelectedFood,
    setFormData,
    
    // Actions
    fetchFoods,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    openEditModal,
    openViewModal,
    openDeleteModal,
    openAddModal,
    resetAllFilters,
    resetForm,
    handleImageUpload,
    clearError
  };
};

export const useClickOutside = (callback) => {
  const ref = useRef();
  useEffect(() => {
    const handler = (e) =>
      ref.current && !ref.current.contains(e.target) && callback();
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [callback]);
  return ref;
};

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && callback();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [callback]);
};