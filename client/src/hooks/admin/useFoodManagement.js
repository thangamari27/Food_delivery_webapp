import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useFood } from '../../context/admin/Foodcontext';
import { toast } from 'react-hot-toast';

const getInitialFormState = () => ({
  name: '',
  category: '',
  cuisine: '',
  restaurant: '',
  type: 'Regular Menu Item',
  price: '',
  originalPrice: '',
  description: '',
  status: 'Active'
});

export const useFoodManagement = () => {
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
    status: 'all'
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

  // Initial fetch
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchFoods();
    }
  }, [fetchFoods]);

  // Sync local filters with context
  useEffect(() => {
    const contextFilters = {};
    
    if (searchTerm) contextFilters.search = searchTerm;
    if (localFilters.category !== 'all') contextFilters.category = localFilters.category;
    if (localFilters.cuisine !== 'all') contextFilters.cuisine = localFilters.cuisine;
    if (localFilters.type !== 'all') contextFilters.type = localFilters.type;
    if (localFilters.status !== 'all') contextFilters.status = localFilters.status;
    
    setContextFilters(contextFilters);
  }, [searchTerm, localFilters, setContextFilters]);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchFoods({ search: searchTerm });
      } else {
        fetchFoods();
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, fetchFoods]);

  // Apply local filters to fetched data
  const filteredFoods = useMemo(() => {
    let result = foods || [];

    // Apply local filters
    if (localFilters.category !== 'all') {
      result = result.filter(food => food.category === localFilters.category);
    }
    if (localFilters.cuisine !== 'all') {
      result = result.filter(food => food.cuisine === localFilters.cuisine);
    }
    if (localFilters.type !== 'all') {
      result = result.filter(food => food.type === localFilters.type);
    }
    if (localFilters.status !== 'all') {
      result = result.filter(food => {
        if (localFilters.status === 'Active') {
          return food.isActive && food.isAvailable;
        } else {
          return !food.isActive || !food.isAvailable;
        }
      });
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'recent':
        default:
          return new Date(b.create_at || 0) - new Date(a.create_at || 0);
      }
    });

    return result;
  }, [foods, localFilters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFoods.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFoods, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, localFilters, sortBy]);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.name?.trim()) errors.name = 'Food name is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.cuisine) errors.cuisine = 'Cuisine is required';
    if (!formData.restaurant) errors.restaurant = 'Restaurant is required';
    
    const price = parseFloat(formData.price);
    if (!price || price <= 0) errors.price = 'Valid price is required';
    
    if (formData.originalPrice) {
      const originalPrice = parseFloat(formData.originalPrice);
      if (originalPrice < price) {
        errors.originalPrice = 'Original price must be greater than or equal to current price';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handlers
  const handleAddFood = useCallback(async () => {
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    try {
      await createFood(formData, imageFile);
      toast.success('Food item added successfully');
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Failed to add food item');
    }
  }, [formData, imageFile, validateForm, createFood]);

  const handleEditFood = useCallback(async () => {
    if (!selectedFood || !validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    try {
      await updateFood(selectedFood.fid, formData, imageFile);
      toast.success('Food item updated successfully');
      setShowEditModal(false);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Failed to update food item');
    }
  }, [selectedFood, formData, imageFile, validateForm, updateFood]);

  const handleDeleteFood = useCallback(async () => {
    if (!selectedFood) return;

    try {
      await deleteFood(selectedFood.fid, false);
      toast.success('Food item deleted successfully');
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err.message || 'Failed to delete food item');
    }
  }, [selectedFood, deleteFood]);

  const openEditModal = useCallback((food) => {
    const frontendData = transformToFrontendFormat(food);
    setSelectedFood(food);
    setFormData(frontendData);
    setImagePreview(food.image?.url || '');
    setShowEditModal(true);
  }, [transformToFrontendFormat]);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormState());
    setFormErrors({});
    setImageFile(null);
    setImagePreview('');
    setSelectedFood(null);
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchTerm('');
    setLocalFilters({
      category: 'all',
      cuisine: 'all',
      type: 'all',
      status: 'all'
    });
    resetContextFilters();
    fetchFoods();
  }, [resetContextFilters, fetchFoods]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchTerm || 
           localFilters.category !== 'all' ||
           localFilters.cuisine !== 'all' ||
           localFilters.type !== 'all' ||
           localFilters.status !== 'all';
  }, [searchTerm, localFilters]);

  return {
    // Data
    foods: filteredFoods,
    paginatedFoods,
    
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
