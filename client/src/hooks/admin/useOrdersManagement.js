import { useState, useMemo } from 'react';

export function useOrdersManagement(initialOrders) {
  const [orders, setOrders] = useState(initialOrders);
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

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query)
      );
    }
    
    if (filters.orderStatus !== 'all') {
      result = result.filter(order => order.orderStatus === filters.orderStatus);
    }
    
    if (filters.paymentStatus !== 'all') {
      result = result.filter(order => order.paymentStatus === filters.paymentStatus);
    }
    
    // Date range filtering
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

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, currentPage, rowsPerPage]);

  const mobilePaginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const openModal = (type, data = null) => {
    setModalState({ type, data });
    
    if (type === 'add') {
      setFormData({
        customerName: '', 
        phone: '', 
        address: '', 
        orderStatus: 'pending',
        paymentStatus: 'unpaid', 
        notes: ''
      });
      setSelectedFoodItems([]);
      setFormErrors({});
    } else if (type === 'edit' && data) {
      setFormData({
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        orderStatus: data.orderStatus,
        paymentStatus: data.paymentStatus,
        notes: data.notes || ''
      });
      setSelectedFoodItems(data.items.map(item => ({ ...item, quantity: item.quantity })));
      setFormErrors({});
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

  const validateForm = () => {
    const errors = {};
    if (!formData.customerName?.trim()) errors.customerName = 'Customer name is required';
    if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
    if (!formData.address?.trim()) errors.address = 'Delivery address is required';
    if (selectedFoodItems.length === 0) errors.foodItems = 'Select at least one food item';
    return errors;
  };

  const calculateTotal = () => {
    const subtotal = selectedFoodItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.09;
    const deliveryFee = 5.00;
    return { 
      subtotal: parseFloat(subtotal.toFixed(2)), 
      tax: parseFloat(tax.toFixed(2)), 
      deliveryFee, 
      total: parseFloat((subtotal + tax + deliveryFee).toFixed(2)) 
    };
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const { subtotal, tax, deliveryFee, total } = calculateTotal();
    
    if (modalState.type === 'add') {
      const newOrder = {
        id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        orderDate: new Date().toISOString(),
        items: selectedFoodItems,
        subtotal,
        tax,
        deliveryFee,
        total,
        orderStatus: formData.orderStatus,
        paymentStatus: formData.paymentStatus,
        notes: formData.notes
      };
      setOrders([newOrder, ...orders]);
    } else if (modalState.type === 'edit') {
      setOrders(orders.map(order => 
        order.id === modalState.data.id 
          ? { 
              ...order, 
              customerName: formData.customerName,
              phone: formData.phone,
              address: formData.address,
              orderStatus: formData.orderStatus,
              paymentStatus: formData.paymentStatus,
              notes: formData.notes,
              items: selectedFoodItems, 
              subtotal, 
              tax, 
              deliveryFee, 
              total 
            }
          : order
      ));
    }
    
    closeModal();
  };

  const handleDelete = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    closeModal();
  };

  const handleFoodItemToggle = (foodItem) => {
    const exists = selectedFoodItems.find(item => item.id === foodItem.id);
    if (exists) {
      setSelectedFoodItems(selectedFoodItems.filter(item => item.id !== foodItem.id));
    } else {
      setSelectedFoodItems([...selectedFoodItems, { ...foodItem, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setSelectedFoodItems(selectedFoodItems.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return {
    // State
    orders,
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
  };
}