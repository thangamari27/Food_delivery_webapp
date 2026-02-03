/**
 * useFoodManagement Hook 
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useFood } from '../../context/admin/Foodcontext';
import { toast } from 'react-hot-toast';

const getInitialFormState = () => ({
  name: '',
  category: '',
  cuisine: '',
  type: 'Regular Menu Item',
  price: '',
  originalPrice: '',
  description: '',
  status: 'Active',
  restaurant: ''
});

export const useFoodManagement = (content) => {
  const {
    foods: contextFoods,
    loading: contextLoading,
    error: contextError,
    fetchFoods,
    createFood: createFoodAPI,
    updateFood: updateFoodAPI,
    deleteFood: deleteFoodAPI,
    clearError
  } = useFood();

  // Track initial fetch
  const hasFetchedRef = useRef(false);
  const filterTimeoutRef = useRef(null);

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formData, setFormData] = useState(getInitialFormState());
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Fetch from DB on mount (ONCE)
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      console.log('Initial fetch: Loading foods from database...');
      fetchFoods();
    }
  }, [fetchFoods]);

  // Use ONLY context foods from DB 
  const foods = contextFoods;
  
  // Client-side filtering
  const filteredFoods = useCallback(() => {
    let result = [...foods];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(f => 
        f.name?.toLowerCase().includes(term) ||
        f.category?.toLowerCase().includes(term) ||
        f.cuisine?.toLowerCase().includes(term) ||
        f.restaurantName?.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory.length > 0) {
      result = result.filter(f => selectedCategory.includes(f.category));
    }
    
    if (selectedCuisine.length > 0) {
      result = result.filter(f => selectedCuisine.includes(f.cuisine));
    }
    
    if (selectedType) {
      result = result.filter(f => f.type === selectedType);
    }
    
    if (selectedStatus) {
      result = result.filter(f => f.status === selectedStatus);
    }
    
    if (selectedRestaurant) {
      result = result.filter(f => 
        f.restaurant === selectedRestaurant || 
        f.restaurantName === selectedRestaurant
      );
    }
    
    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (sortBy === 'recent') {
      result.sort((a, b) => {
        const dateA = new Date(a.create_at || a.createdDate || 0);
        const dateB = new Date(b.create_at || b.createdDate || 0);
        return dateB - dateA;
      });
    }
    
    return result;
  }, [foods, searchTerm, selectedCategory, selectedCuisine, selectedType, selectedStatus, selectedRestaurant, sortBy]);

  const filtered = filteredFoods();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedCuisine, selectedType, selectedStatus, selectedRestaurant, sortBy]);

  // Debounced search - re-fetch from server
  useEffect(() => {
    if (!hasFetchedRef.current) return; // Skip on initial mount
    
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }
    
    // Only fetch if search term exists
    if (searchTerm) {
      filterTimeoutRef.current = setTimeout(() => {
        console.log('Search triggered: Fetching from server...');
        fetchFoods({ search: searchTerm });
      }, 500);
    } else if (hasFetchedRef.current) {
      // Search cleared, fetch all
      fetchFoods();
    }
    
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [searchTerm, fetchFoods]);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Food name is required';
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
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (formData.originalPrice && (isNaN(formData.originalPrice) || parseFloat(formData.originalPrice) < parseFloat(formData.price))) {
      errors.originalPrice = 'Original price must be greater than or equal to price';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory([]);
    setSelectedCuisine([]);
    setSelectedType('');
    setSelectedStatus('');
    setSelectedRestaurant('');
    setSortBy('recent');
    // Fetch all after reset
    fetchFoods();
  }, [fetchFoods]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(getInitialFormState());
    setImagePreview('');
    setImageFile(null);
    setFormErrors({});
  }, []);

  // Add food
  const handleAddFood = useCallback(async () => {
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }
    
    try {
      const foodData = {
        name: formData.name,
        category: formData.category,
        cuisine: formData.cuisine,
        restaurant: formData.restaurant,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        type: formData.type,
        status: formData.status
      };

      await createFoodAPI(foodData, imageFile);
      toast.success('Food item added successfully');
      setShowAddModal(false);
      resetForm();
      fetchFoods(); // Refresh list
    } catch (error) {
      toast.error(error.message || 'Failed to add food item');
    }
  }, [formData, imageFile, validateForm, createFoodAPI, resetForm, fetchFoods]);

  // Edit food
  const handleEditFood = useCallback(async () => {
    if (!validateForm() || !selectedFood) {
      toast.error('Please fix validation errors');
      return;
    }
    
    try {
      const foodData = {
        name: formData.name,
        category: formData.category,
        cuisine: formData.cuisine,
        restaurant: formData.restaurant,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        type: formData.type,
        status: formData.status
      };

      await updateFoodAPI(selectedFood.fid, foodData, imageFile);
      toast.success('Food item updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchFoods(); // Refresh list
    } catch (error) {
      toast.error(error.message || 'Failed to update food item');
    }
  }, [formData, imageFile, selectedFood, validateForm, updateFoodAPI, resetForm, fetchFoods]);

  // Delete food
  const handleDeleteFood = useCallback(async () => {
    if (!selectedFood) return;
    
    try {
      await deleteFoodAPI(selectedFood.fid, false);
      toast.success('Food item deleted successfully');
      setShowDeleteModal(false);
      setSelectedFood(null);
      fetchFoods(); // Refresh list
    } catch (error) {
      toast.error(error.message || 'Failed to delete food item');
    }
  }, [selectedFood, deleteFoodAPI, fetchFoods]);

  // Open edit modal
  const openEditModal = useCallback((food) => {
    setSelectedFood(food);
    setFormData({
      name: food.name || '',
      category: food.category || '',
      cuisine: food.cuisine || '',
      type: food.type || 'Regular Menu Item',
      price: food.price?.toString() || '',
      originalPrice: food.originalPrice?.toString() || '',
      description: food.description || '',
      status: food.status || 'Active',
      restaurant: food.restaurant || ''
    });
    setImagePreview(food.image?.url || '');
    setShowEditModal(true);
  }, []);

  // Image upload
  const handleImageUpload = useCallback((e) => {
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

  // Pagination
  const paginatedFoods = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  const hasFilters = searchTerm || 
    selectedCategory.length > 0 || 
    selectedCuisine.length > 0 || 
    selectedType || 
    selectedStatus || 
    selectedRestaurant;

  return {
    foods: filtered,
    filteredFoods: filtered,
    searchTerm,
    selectedCategory,
    selectedCuisine,
    selectedType,
    selectedStatus,
    selectedRestaurant,
    sortBy,
    currentPage,
    itemsPerPage,
    showAddModal,
    showEditModal,
    showViewModal,
    showDeleteModal,
    showFilters,
    selectedFood,
    formData,
    formErrors,
    imagePreview,
    paginatedFoods,
    totalPages,
    hasFilters,
    loading: contextLoading,
    error: contextError,
    setSearchTerm,
    setSelectedCategory,
    setSelectedCuisine,
    setSelectedType,
    setSelectedStatus,
    setSelectedRestaurant,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setShowAddModal,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowFilters,
    setSelectedFood,
    setFormData,
    setFormErrors,
    setImagePreview,
    resetFilters,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    openEditModal,
    handleImageUpload,
    resetForm,
    validateForm,
    clearError
  };
};

export const useClickOutside = (callback) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);
  return ref;
};

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && callback();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [callback]);
};