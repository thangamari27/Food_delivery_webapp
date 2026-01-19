import { useState, useEffect, useCallback, useRef } from 'react';

export const useFoodManagement = (content) => {
  // State management
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formData, setFormData] = useState({
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
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  // Initialize sample data
  useEffect(() => {
    setFoods(content.sampleData);
    setFilteredFoods(content.sampleData);
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...foods];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        f.cuisine.toLowerCase().includes(term) ||
        (f.restaurant && f.restaurant.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategory.length > 0) {
      result = result.filter(f => selectedCategory.includes(f.category));
    }
    
    // Apply cuisine filter
    if (selectedCuisine.length > 0) {
      result = result.filter(f => selectedCuisine.includes(f.cuisine));
    }
    
    // Apply type filter
    if (selectedType) {
      result = result.filter(f => f.type === selectedType);
    }
    
    // Apply status filter
    if (selectedStatus) {
      result = result.filter(f => f.status === selectedStatus);
    }
    
    // Apply restaurant filter
    if (selectedRestaurant) {
      result = result.filter(f => f.restaurant === selectedRestaurant);
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    
    setFilteredFoods(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedCuisine, selectedType, selectedStatus, selectedRestaurant, sortBy, foods]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory([]);
    setSelectedCuisine([]);
    setSelectedType('');
    setSelectedStatus('');
    setSelectedRestaurant('');
    setSortBy('');
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = `${content.form.name.label} is required`;
    }
    
    if (!formData.category) {
      errors.category = `${content.form.category.label} is required`;
    }
    
    if (!formData.cuisine) {
      errors.cuisine = `${content.form.cuisine.label} is required`;
    }
    
    if (!formData.restaurant) {
      errors.restaurant = `${content.form.restaurant.label} is required`;
    }
    
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (formData.originalPrice && (isNaN(formData.originalPrice) || formData.originalPrice <= 0)) {
      errors.originalPrice = 'Original price must be valid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Add food item
  const handleAddFood = useCallback(() => {
    if (!validateForm()) return;
    
    const newFood = {
      id: foods.length + 1,
      name: formData.name,
      category: formData.category,
      cuisine: formData.cuisine,
      restaurant: formData.restaurant,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      image: imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      type: formData.type,
      status: formData.status,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setFoods([newFood, ...foods]);
    setShowAddModal(false);
    resetForm();
  }, [foods, formData, imagePreview, validateForm]);

  // Edit food item
  const handleEditFood = useCallback(() => {
    if (!validateForm() || !selectedFood) return;
    
    const updatedFoods = foods.map(food => 
      food.id === selectedFood.id ? {
        ...food,
        name: formData.name,
        category: formData.category,
        cuisine: formData.cuisine,
        restaurant: formData.restaurant,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        image: imagePreview || food.image,
        type: formData.type,
        status: formData.status
      } : food
    );
    
    setFoods(updatedFoods);
    setShowEditModal(false);
    resetForm();
  }, [foods, formData, imagePreview, selectedFood, validateForm]);

  // Delete food item
  const handleDeleteFood = useCallback(() => {
    if (!selectedFood) return;
    
    setFoods(foods.filter(f => f.id !== selectedFood.id));
    setShowDeleteModal(false);
    setSelectedFood(null);
  }, [foods, selectedFood]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
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
    setImagePreview('');
    setFormErrors({});
  }, []);

  // Open edit modal
  const openEditModal = useCallback((food) => {
    setSelectedFood(food);
    setFormData({
      name: food.name,
      category: food.category,
      cuisine: food.cuisine,
      type: food.type,
      price: food.price.toString(),
      originalPrice: food.originalPrice ? food.originalPrice.toString() : '',
      description: food.description,
      status: food.status,
      restaurant: food.restaurant || ''
    });
    setImagePreview(food.image);
    setShowEditModal(true);
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // Calculate paginated foods
  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  
  const hasFilters = searchTerm || 
    selectedCategory.length > 0 || 
    selectedCuisine.length > 0 || 
    selectedType || 
    selectedStatus || 
    selectedRestaurant;

  // Return all state and handlers
  return {
    // State
    foods,
    filteredFoods,
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
    
    // Setters
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
    
    // Handlers
    resetFilters,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    openEditModal,
    handleImageUpload,
    resetForm,
    validateForm
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