import { useState, useMemo, useEffect } from 'react';
import { useOrder } from '../../context/admin/Ordercontext';
import { useFood } from '../../context/admin/Foodcontext';
import { useRestaurantContext } from '../../context/admin/Restaurantcontext'; 
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export function useOrdersManagement() {
  const { 
    orders: contextOrders, 
    loading: ordersLoading, 
    fetchOrders, 
    updateOrder,
    updateOrderStatus,
    deleteOrder: deleteOrderContext,
    createOrder,
    transformToBackend,
    calculatePricing
  } = useOrder();

  const {
    foods: allFoodItems,
    loading: foodsLoading,
    fetchFoods
  } = useFood();

  const {
    restaurants,
    loading: restaurantsLoading,
    fetchRestaurants
  } = useRestaurantContext();

  const { user } = useAuthContext();

  // State management
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({ 
    orderStatus: 'all', 
    paymentStatus: 'all',
    dateRange: 'all' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);

  // Combined loading state
  const loading = ordersLoading || foodsLoading || restaurantsLoading;

  /**
   * Load initial data
   */
  useEffect(() => {
    loadOrders();
    loadFoodItems();
    loadRestaurants();
  }, []);

  /**
   * Sync context orders to local state
   */
  useEffect(() => {
    if (contextOrders.length > 0) {
      setOrders(contextOrders);
    }
  }, [contextOrders]);

  /**
   * Load orders from API
   */
  const loadOrders = async () => {
    try {
      await fetchOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    }
  };

  /**
   * Load food items from API
   */
  const loadFoodItems = async () => {
    try {
      await fetchFoods({ 
        limit: 1000,
        isActive: true,
        isAvailable: true
      });
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  };

  /**
   * Load restaurants from API
   */
  const loadRestaurants = async () => {
    try {
      await fetchRestaurants({ 
        limit: 1000,
        isActive: true
      });
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  };

  /**
   * FILTERING LOGIC
   */
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        (order.id || order.orderId)?.toLowerCase().includes(query) ||
        order.customerName?.toLowerCase().includes(query) ||
        order.phone?.toLowerCase().includes(query) ||
        order.email?.toLowerCase().includes(query)
      );
    }
    
    // Order status filter
    if (filters.orderStatus !== 'all') {
      result = result.filter(order => order.orderStatus === filters.orderStatus);
    }
    
    // Payment status filter
    if (filters.paymentStatus !== 'all') {
      result = result.filter(order => order.paymentStatus === filters.paymentStatus);
    }
    
    // Date range filter
    const now = new Date();
    if (filters.dateRange !== 'all') {
      result = result.filter(order => {
        const orderDate = new Date(order.orderDate);
        
        switch (filters.dateRange) {
          case 'today':
            return orderDate.toDateString() === now.toDateString();
          case 'week':
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            return orderDate >= startOfWeek;
          case 'month':
            return orderDate.getMonth() === now.getMonth() && 
                   orderDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }
    
    return result;
  }, [orders, searchQuery, filters]);

  /**
   * SORTING LOGIC
   */
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'orderDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortConfig.key === 'amount') {
        aVal = a.total;
        bVal = b.total;
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }, [filteredOrders, sortConfig]);

  /**
   * PAGINATION LOGIC
   */
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, currentPage, rowsPerPage]);

  const mobilePaginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage);

  /**
   * SORTING HANDLERS
   */
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  /**
   * SELECTION HANDLERS
   */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(paginatedOrders.map(o => o.id || o.orderId));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  /**
   * Initialize empty form data with all fields
   */
  const getEmptyFormData = () => ({
    // Customer fields
    customerName: '', 
    phone: '', 
    email: '',
    userId: user?.id || user?._id || null,
    
    // Delivery fields
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    address: '', // Full address (auto-generated)
    deliveryInstructions: '',
    latitude: '',
    longitude: '',
    
    // Restaurant fields
    restaurantId: '',
    restaurantName: '',
    restaurantPhone: '',
    
    // Payment fields
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    transactionId: '',
    refundAmount: 0,
    
    // Pricing fields
    taxRate: 9,
    deliveryFee: 50,
    discount: 0,
    discountType: 'none',
    discountCode: '',
    tip: 0,
    
    // Order status
    orderStatus: 'pending',
    
    // Tracking fields
    estimatedDeliveryTime: '',
    preparationTime: '',
    deliveryPartnerName: '',
    deliveryPartnerPhone: '',
    deliveryPartnerVehicle: '',
    
    // Additional fields
    notes: '',
    specialRequests: '',
    source: 'admin',
    isActive: true,
    cancelReason: ''
  });

  /**
   * MODAL HANDLERS - ENHANCED
   */
  const openModal = (type, data = null) => {
    
    setModalState({ type, data });
    
    if (type === 'add') {
      // Initialize empty form for new order
      setFormData(getEmptyFormData());
      setSelectedFoodItems([]);
      setFormErrors({});
    } else if (type === 'edit' && data) {
      
      // Populate form with existing order data - ALL FIELDS
      setFormData({
        // Customer fields
        customerName: data.customerName || '',
        phone: data.phone || '',
        email: data.email || '',
        userId: data.userId || null,
        
        // Delivery fields
        street: data.street || '',
        apartment: data.apartment || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
        country: data.country || 'India',
        address: data.address || '',
        deliveryInstructions: data.deliveryInstructions || '',
        latitude: data.latitude || '',
        longitude: data.longitude || '',
        
        // Restaurant fields
        restaurantId: data.restaurantId || '',
        restaurantName: data.restaurantName || '',
        restaurantPhone: data.restaurantPhone || '',
        
        // Payment fields
        paymentMethod: data.paymentMethod || 'cash',
        paymentStatus: data.paymentStatus || 'pending',
        transactionId: data.transactionId || '',
        refundAmount: data.refundAmount || 0,
        
        // Pricing fields
        taxRate: data.taxRate || 9,
        deliveryFee: data.deliveryFee || 50,
        discount: data.discount || 0,
        discountType: data.discountType || 'none',
        discountCode: data.discountCode || '',
        tip: data.tip || 0,
        subtotal: data.subtotal || 0,
        tax: data.tax || 0,
        total: data.total || 0,
        
        // Order status
        orderStatus: data.orderStatus || 'pending',
        
        // Tracking fields
        estimatedDeliveryTime: data.estimatedDeliveryTime 
          ? new Date(data.estimatedDeliveryTime).toISOString().slice(0, 16)
          : '',
        preparationTime: data.preparationTime || '',
        deliveryPartnerName: data.tracking?.deliveryPartner?.name || '',
        deliveryPartnerPhone: data.tracking?.deliveryPartner?.phone || '',
        deliveryPartnerVehicle: data.tracking?.deliveryPartner?.vehicleNumber || '',
        
        // Additional fields
        notes: data.notes || '',
        specialRequests: data.specialRequests || '',
        source: data.source || 'admin',
        isActive: data.isActive !== undefined ? data.isActive : true,
        cancelReason: data.cancelReason || ''
      });
      
      // Map backend order items to selected food items format
      const mappedFoodItems = (data.items || []).map(orderItem => {
        const matchingFoodItem = allFoodItems.find(foodItem => {
          return (
            foodItem.fid === orderItem.foodId ||
            foodItem.id === orderItem.foodId ||
            foodItem._id === orderItem.foodItem ||
            foodItem.name?.toLowerCase() === orderItem.name?.toLowerCase()
          );
        });
        
        if (matchingFoodItem) {
          return {
            id: matchingFoodItem.fid || matchingFoodItem.id,
            fid: matchingFoodItem.fid,
            foodId: orderItem.foodId,
            foodItem: orderItem.foodItem,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            category: orderItem.category || matchingFoodItem.category,
            description: matchingFoodItem.description,
            image: matchingFoodItem.image
          };
        } else {
          return {
            id: orderItem.foodId || orderItem.id,
            fid: orderItem.foodId,
            foodId: orderItem.foodId,
            foodItem: orderItem.foodItem,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            category: orderItem.category || 'Main Course',
            description: orderItem.description || '',
            image: orderItem.image || null
          };
        }
      }).filter(Boolean);
      
      setSelectedFoodItems(mappedFoodItems);
      setFormErrors({});
    } else if (type === 'view' && data) {
      setModalState({ type, data });
    } else if (type === 'delete' && data) {
      setModalState({ type, data });
    }
  };

  const closeModal = () => {
    setModalState({ type: null, data: null });
    setFormData({});
    setFormErrors({});
    setSelectedFoodItems([]);
    setSearchTerm('');
    setSelectedCategory('all');
  };

  /**
   * FORM VALIDATION - ENHANCED
   */
  const validateForm = () => {
    const errors = {};
    
    // Customer validation
    if (!formData.customerName?.trim()) {
      errors.customerName = 'Customer name is required';
    } else if (formData.customerName.trim().length < 2) {
      errors.customerName = 'Name must be at least 2 characters';
    }
    
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format';
    }
    
    if (formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    // Delivery address validation
    if (!formData.street?.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!formData.city?.trim()) {
      errors.city = 'City is required';
    }
    
    if (!formData.state?.trim()) {
      errors.state = 'State is required';
    }
    
    if (!formData.zipCode?.trim()) {
      errors.zipCode = 'Zip code is required';
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      errors.zipCode = 'Invalid zip code (should be 6 digits)';
    }
    
    // Restaurant validation
    if (!formData.restaurantId) {
      errors.restaurantId = 'Please select a restaurant';
    }
    
    // Food items validation
    if (selectedFoodItems.length === 0) {
      errors.foodItems = 'Select at least one food item';
    }
    
    // Payment method validation
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    
    return errors;
  };

  /**
   * CALCULATE TOTAL - Uses context's calculatePricing
   */
  const calculateTotal = () => {
    return calculatePricing(selectedFoodItems, {
      taxRate: formData.taxRate || 9,
      deliveryFee: formData.deliveryFee || 50,
      tip: formData.tip || 0,
      discountAmount: formData.discount || 0,
      discountType: formData.discountType || 'none'
    });
  };

  /**
   * FORM SUBMISSION - ENHANCED
   */
  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      if (modalState.type === 'add') {
        // Create new order
        const orderFormData = {
          // Customer info (nested)
          customer: {
            userId: formData.userId,
            name: formData.customerName,
            phone: formData.phone,
            email: formData.email
          },
          
          // Delivery info (nested)
          delivery: {
            address: {
              street: formData.street,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
              fullAddress: `${formData.street}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`
            },
            instructions: formData.deliveryInstructions,
            coordinates: formData.latitude && formData.longitude ? {
              latitude: parseFloat(formData.latitude),
              longitude: parseFloat(formData.longitude)
            } : undefined
          },
          
          // Restaurant info (nested)
          restaurant: formData.restaurantId,
          
          // Order items
          items: selectedFoodItems.map(item => ({
            foodItem: item.foodItem || item._id,
            foodId: item.foodId || item.fid || item.id,
            name: item.name,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
            category: item.category
          })),
          
          // Order status
          orderStatus: formData.orderStatus,
          
          // Payment info (nested)
          payment: {
            status: formData.paymentStatus,
            method: formData.paymentMethod,
            transactionId: formData.transactionId || undefined
          },
          
          // Tracking info (nested)
          tracking: {
            estimatedDeliveryTime: formData.estimatedDeliveryTime 
              ? new Date(formData.estimatedDeliveryTime)
              : undefined,
            preparationTime: formData.preparationTime 
              ? parseInt(formData.preparationTime)
              : undefined,
            deliveryPartner: formData.deliveryPartnerName ? {
              name: formData.deliveryPartnerName,
              phone: formData.deliveryPartnerPhone,
              vehicleNumber: formData.deliveryPartnerVehicle
            } : undefined
          },
          
          // Additional fields
          notes: formData.notes,
          specialRequests: formData.specialRequests,
          source: formData.source,
          isActive: formData.isActive
        };
        
        // Calculate pricing
        const pricing = calculatePricing(selectedFoodItems, {
          taxRate: formData.taxRate || 9,
          deliveryFee: formData.deliveryFee || 50,
          discountAmount: formData.discount || 0,
          discountType: formData.discountType || 'none',
          tip: formData.tip || 0
        });
        
        orderFormData.pricing = pricing;
        
        const response = await createOrder(selectedFoodItems, orderFormData);
        
        if (response.success) {
          toast.success('Order created successfully');
          await loadOrders();
        }
      } else if (modalState.type === 'edit' && modalState.data) {
        // Update existing order
        const updateData = {
          // Customer info (nested)
          customer: {
            userId: formData.userId,
            name: formData.customerName,
            phone: formData.phone,
            email: formData.email
          },
          
          // Delivery info (nested)
          delivery: {
            address: {
              street: formData.street,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
              fullAddress: `${formData.street}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`
            },
            instructions: formData.deliveryInstructions,
            coordinates: formData.latitude && formData.longitude ? {
              latitude: parseFloat(formData.latitude),
              longitude: parseFloat(formData.longitude)
            } : undefined
          },
          
          // Restaurant info
          restaurant: formData.restaurantId,
          
          // Order items
          items: selectedFoodItems.map(item => ({
            foodItem: item.foodItem || item._id,
            foodId: item.foodId || item.fid || item.id,
            name: item.name,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
            category: item.category
          })),
          
          // Order status
          orderStatus: formData.orderStatus,
          
          // Payment info (nested)
          payment: {
            status: formData.paymentStatus,
            method: formData.paymentMethod,
            transactionId: formData.transactionId || undefined,
            refundAmount: formData.refundAmount || 0
          },
          
          // Tracking info (nested)
          tracking: {
            estimatedDeliveryTime: formData.estimatedDeliveryTime 
              ? new Date(formData.estimatedDeliveryTime)
              : undefined,
            preparationTime: formData.preparationTime 
              ? parseInt(formData.preparationTime)
              : undefined,
            deliveryPartner: formData.deliveryPartnerName ? {
              name: formData.deliveryPartnerName,
              phone: formData.deliveryPartnerPhone,
              vehicleNumber: formData.deliveryPartnerVehicle
            } : undefined
          },
          
          // Additional fields
          notes: formData.notes,
          specialRequests: formData.specialRequests,
          source: formData.source,
          isActive: formData.isActive,
          cancelReason: formData.cancelReason || undefined
        };
        
        // Calculate pricing
        const pricing = calculatePricing(selectedFoodItems, {
          taxRate: formData.taxRate || 9,
          deliveryFee: formData.deliveryFee || 50,
          discountAmount: formData.discount || 0,
          discountType: formData.discountType || 'none',
          tip: formData.tip || 0
        });
        
        updateData.pricing = pricing;
        
        const orderId = modalState.data.orderId || modalState.data.id || modalState.data._id;
        const response = await updateOrder(orderId, updateData);
        
        if (response.success) {
          toast.success('Order updated successfully');
          await loadOrders();
        }
      }
      
      closeModal();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to save order');
    }
  };

  /**
   * DELETE HANDLER
   */
  const handleDelete = async (orderId) => {
    try {
      await deleteOrderContext(orderId, false); // soft delete
      toast.success('Order deleted successfully');
      await loadOrders();
      closeModal();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error(error.message || 'Failed to delete order');
    }
  };

  /**
   * FOOD ITEM HANDLERS
   */
  const handleFoodItemToggle = (foodItem) => {
    const exists = selectedFoodItems.find(item => {
      const foodItemId = foodItem.fid || foodItem.id || foodItem._id;
      const selectedItemId = item.fid || item.id || item._id;
      
      return (
        foodItemId === selectedItemId ||
        foodItem.foodId === item.foodId ||
        foodItem.name?.toLowerCase() === item.name?.toLowerCase()
      );
    });
    
    if (exists) {
      setSelectedFoodItems(selectedFoodItems.filter(item => {
        const foodItemId = foodItem.fid || foodItem.id || foodItem._id;
        const selectedItemId = item.fid || item.id || item._id;
        
        return !(
          foodItemId === selectedItemId ||
          foodItem.foodId === item.foodId ||
          foodItem.name?.toLowerCase() === item.name?.toLowerCase()
        );
      }));
    } else {
      const newItem = {
        id: foodItem.fid || foodItem.id,
        fid: foodItem.fid,
        foodId: foodItem.fid || foodItem.id,
        foodItem: foodItem._id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: 1,
        category: foodItem.category || 'Main Course',
        description: foodItem.description,
        image: foodItem.image
      };
      
      setSelectedFoodItems([...selectedFoodItems, newItem]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setSelectedFoodItems(selectedFoodItems.map(item => {
      const itemIdentifier = item.fid || item.id || item._id;
      if (itemIdentifier === itemId) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return {
    // State
    orders,
    loading,
    searchQuery,
    selectedOrders,
    searchTerm,
    selectedCategory,
    showFilterPanel,
    filters,
    currentPage,
    rowsPerPage,
    sortConfig,
    modalState,
    formData,
    formErrors,
    selectedFoodItems,
    
    // Data from contexts
    allFoodItems,
    foodsLoading,
    restaurants,
    restaurantsLoading,
    user,
    
    // Computed values
    filteredOrders,
    sortedOrders,
    paginatedOrders,
    mobilePaginatedOrders,
    totalPages,
    
    // Setters
    setSearchQuery,
    setSearchTerm,
    setSelectedCategory,
    setSelectedOrders,
    setShowFilterPanel,
    setFilters,
    setCurrentPage,
    setRowsPerPage,
    setSortConfig,
    setModalState,
    setFormData,
    setFormErrors,
    setSelectedFoodItems,
    setOrders,
    
    // Handlers
    handleSort,
    handleSelectAll,
    handleSelectOrder,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleFoodItemToggle,
    updateQuantity,
    calculateTotal,
    validateForm,
    loadOrders,
    loadFoodItems,
    loadRestaurants,
  };
}