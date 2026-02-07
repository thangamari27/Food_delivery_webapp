// hooks/admin/useCustomerData.js
import { useState, useEffect, useMemo, useCallback } from "react";
import customerService from "../../services/customerService";

export const useCustomerData = () => {
  // Data state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // UI state (moved from component)
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 1440
  );

  // Toast state
  const [toast, setToast] = useState(null);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1440);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch all customers
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await customerService.getAllCustomers();
      console.log("API Response:", response);
      
      // Handle API response structure
      if (response && response.data) {
        // Your API returns: { statusCode, data: { pagination, users }, message, success }
        // Extract users array from response.data.users
        const usersData = response.data.users || response.data.customers || response.data.data || [];
        console.log("Extracted users:", usersData);
        
        // Transform users to customers format if needed
        const transformedUsers = Array.isArray(usersData) ? usersData.map(user => ({
          id: user.id || user._id || user.customer_id || `user-${Math.random()}`,
          name: user.fullname || user.name || user.username || 'Unknown',
          email: user.email || '',
          phone: user.phone || user.mobile || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          postal: user.postal || user.pincode || '',
          status: user.status || 'active',
          totalOrders: user.totalOrders || user.total_orders || 0,
          totalSpend: user.totalSpend || user.total_spend || 0,
          lastOrder: user.lastOrder || user.last_order || null,
          lastActive: user.lastActive || user.last_active || new Date().toISOString(),
          created: user.created || user.created_at || user.registration_date || new Date().toISOString(),
          notes: user.notes || '',
          // Keep original data for reference
          originalData: user
        })) : [];
        
        setCustomers(transformedUsers);
      } else if (Array.isArray(response)) {
        setCustomers(response);
      } else {
        console.warn("Unexpected response format:", response);
        setCustomers([]);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch customers');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Add customer
  const addCustomer = useCallback(async (customerData) => {
    try {
      setActionLoading(true);
      const response = await customerService.createCustomer(customerData);
      const newCustomer = response.data || response;
      
      // Transform new customer data if needed
      const transformedCustomer = {
        id: newCustomer.id || newCustomer._id || `user-${Math.random()}`,
        name: newCustomer.fullname || newCustomer.name || newCustomer.username || 'Unknown',
        email: newCustomer.email || '',
        phone: newCustomer.phone || newCustomer.mobile || '',
        address: newCustomer.address || '',
        city: newCustomer.city || '',
        state: newCustomer.state || '',
        postal: newCustomer.postal || newCustomer.pincode || '',
        status: newCustomer.status || 'active',
        totalOrders: newCustomer.totalOrders || newCustomer.total_orders || 0,
        totalSpend: newCustomer.totalSpend || newCustomer.total_spend || 0,
        lastOrder: newCustomer.lastOrder || newCustomer.last_order || null,
        lastActive: newCustomer.lastActive || newCustomer.last_active || new Date().toISOString(),
        created: newCustomer.created || newCustomer.created_at || newCustomer.registration_date || new Date().toISOString(),
        notes: newCustomer.notes || '',
        originalData: newCustomer
      };
      
      setCustomers(prev => [transformedCustomer, ...prev]);
      
      return transformedCustomer;
    } catch (err) {
      console.error('Error creating customer:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to create customer');
    } finally {
      setActionLoading(false);
    }
  }, []);

  // Update customer
  const updateCustomer = useCallback(async (id, updateData) => {
    try {
      setActionLoading(true);
      const response = await customerService.updateCustomer(id, updateData);
      const updatedCustomer = response.data || response;
      
      // Transform updated customer data
      const transformedCustomer = {
        id: updatedCustomer.id || updatedCustomer._id || id,
        name: updatedCustomer.fullname || updatedCustomer.name || updatedCustomer.username || 'Unknown',
        email: updatedCustomer.email || '',
        phone: updatedCustomer.phone || updatedCustomer.mobile || '',
        address: updatedCustomer.address || '',
        city: updatedCustomer.city || '',
        state: updatedCustomer.state || '',
        postal: updatedCustomer.postal || updatedCustomer.pincode || '',
        status: updatedCustomer.status || 'active',
        totalOrders: updatedCustomer.totalOrders || updatedCustomer.total_orders || 0,
        totalSpend: updatedCustomer.totalSpend || updatedCustomer.total_spend || 0,
        lastOrder: updatedCustomer.lastOrder || updatedCustomer.last_order || null,
        lastActive: updatedCustomer.lastActive || updatedCustomer.last_active || new Date().toISOString(),
        created: updatedCustomer.created || updatedCustomer.created_at || updatedCustomer.registration_date || new Date().toISOString(),
        notes: updatedCustomer.notes || '',
        originalData: updatedCustomer
      };
      
      setCustomers(prev => 
        prev.map(c => c.id === id || c._id === id ? transformedCustomer : c)
      );
      
      return transformedCustomer;
    } catch (err) {
      console.error('Error updating customer:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to update customer');
    } finally {
      setActionLoading(false);
    }
  }, []);

  // Update customer status
  const updateCustomerStatus = useCallback(async (id, status) => {
    try {
      setActionLoading(true);
      const response = await customerService.updateCustomerStatus(id, status);
      const updatedCustomer = response.data || response;
      
      setCustomers(prev => 
        prev.map(c => c.id === id || c._id === id ? { 
          ...c, 
          status,
          // Update original data if exists
          originalData: c.originalData ? { ...c.originalData, status } : c.originalData
        } : c)
      );
      
      return updatedCustomer;
    } catch (err) {
      console.error('Error updating customer status:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  }, []);

  // Delete customer
  const deleteCustomer = useCallback(async (id) => {
    try {
      setActionLoading(true);
      await customerService.deleteCustomer(id);
      
      setCustomers(prev => prev.filter(c => c.id !== id && c._id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to delete customer');
    } finally {
      setActionLoading(false);
    }
  }, []);

  // Bulk update status
  const bulkUpdateStatus = useCallback(async (customerIds, status) => {
    try {
      setActionLoading(true);
      await customerService.bulkUpdateStatus(customerIds, status);
      
      setCustomers(prev => 
        prev.map(c => 
          customerIds.includes(c.id) || customerIds.includes(c._id) 
            ? { 
                ...c, 
                status,
                // Update original data if exists
                originalData: c.originalData ? { ...c.originalData, status } : c.originalData
              } 
            : c
        )
      );
    } catch (err) {
      console.error('Error bulk updating status:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to bulk update status');
    } finally {
      setActionLoading(false);
    }
  }, []);

  // Get statistics
  const getStatistics = useCallback(async () => {
    try {
      const response = await customerService.getStatistics();
      return response.data || response;
    } catch (err) {
      console.error('Error fetching statistics:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to fetch statistics');
    }
  }, []);

  // Search customers
  const searchCustomers = useCallback(async (query, limit = 10) => {
    try {
      const response = await customerService.searchCustomers(query, limit);
      return response.data || response;
    } catch (err) {
      console.error('Error searching customers:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to search customers');
    }
  }, []);

  // Export customers
  const exportCustomers = useCallback(async (params = {}) => {
    try {
      const result = await customerService.exportCustomers(params);
      return result;
    } catch (err) {
      console.error('Error exporting customers:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to export customers');
    }
  }, []);

  // Component event handlers
  const handleSave = useCallback(async (form, toastContent) => {
    try {
      if (editCustomer) {
        await updateCustomer(editCustomer.id, form);
        showToast(toastContent?.customerUpdated || 'Customer updated successfully');
      } else {
        await addCustomer(form);
        showToast(toastContent?.customerAdded || 'Customer added successfully');
      }
      
      setShowForm(false);
      setEditCustomer(null);
    } catch (error) {
      showToast(error.message || 'Operation failed', 'error');
    }
  }, [editCustomer, updateCustomer, addCustomer, showToast]);

  const handleToggleStatus = useCallback((customer) => {
    const action = customer.status === 'active' ? 'block' : 'unblock';
    setConfirmAction({ type: action, customer });
  }, []);

  const handleDelete = useCallback((customer) => {
    setConfirmAction({ type: 'delete', customer });
  }, []);

  const handleConfirm = useCallback(async (toastContent) => {
    try {
      const { type, customer } = confirmAction;
      
      if (type === 'delete') {
        await deleteCustomer(customer.id);
        showToast(toastContent?.customerDeleted || 'Customer deleted successfully');
      } else if (type === 'block') {
        await updateCustomer(customer.id, { status: 'blocked' });
        showToast(toastContent?.statusChanged || 'Status changed successfully');
      } else if (type === 'unblock') {
        await updateCustomer(customer.id, { status: 'active' });
        showToast(toastContent?.statusChanged || 'Status changed successfully');
      }
      
      setConfirmAction(null);
    } catch (error) {
      showToast(error.message || 'Operation failed', 'error');
    }
  }, [confirmAction, deleteCustomer, updateCustomer, showToast]);

  const handleRefresh = useCallback(async () => {
    try {
      await fetchCustomers();
      showToast('Data refreshed successfully', 'success');
    } catch (error) {
      showToast('Failed to refresh data', 'error');
    }
  }, [fetchCustomers, showToast]);

  // Modal control functions
  const openViewModal = useCallback((customer) => setViewCustomer(customer), []);
  const closeViewModal = useCallback(() => setViewCustomer(null), []);
  
  const openEditModal = useCallback((customer) => {
    setEditCustomer(customer);
    setShowForm(true);
  }, []);
  
  const openAddModal = useCallback(() => {
    setEditCustomer(null);
    setShowForm(true);
  }, []);
  
  const closeFormModal = useCallback(() => {
    setShowForm(false);
    setEditCustomer(null);
  }, []);
  
  const closeConfirmModal = useCallback(() => setConfirmAction(null), []);

  return { 
    // Data state
    customers, 
    loading, 
    error,
    actionLoading,
    
    // UI state
    viewCustomer,
    editCustomer,
    showForm,
    confirmAction,
    isMobile,
    toast,
    
    // Data operations
    addCustomer, 
    updateCustomer, 
    updateCustomerStatus,
    deleteCustomer,
    bulkUpdateStatus,
    getStatistics,
    searchCustomers,
    exportCustomers,
    refetch: fetchCustomers,
    
    // Event handlers
    handleSave,
    handleToggleStatus,
    handleDelete,
    handleConfirm,
    handleRefresh,
    
    // Modal controls
    openViewModal,
    closeViewModal,
    openEditModal,
    openAddModal,
    closeFormModal,
    closeConfirmModal,
    
    // Toast
    showToast
  };
};

export const useCustomerFilters = (customers) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    // Ensure customers is always an array
    const customersArray = Array.isArray(customers) ? customers : [];
    let result = [...customersArray];

    // Apply search filter
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter(c =>
        c.name?.toLowerCase().includes(term) ||
        c.phone?.includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.id?.toLowerCase().includes(term) ||
        c._id?.toLowerCase().includes(term) ||
        c.customer_id?.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at || b.created) - new Date(a.created_at || a.created);
        case 'oldest':
          return new Date(a.created_at || a.created) - new Date(b.created_at || b.created);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'orders':
          return (b.totalOrders || b.total_orders || 0) - (a.totalOrders || a.total_orders || 0);
        case 'spend':
          return (b.totalSpend || b.total_spend || 0) - (a.totalSpend || a.total_spend || 0);
        case 'recent':
          return new Date(b.last_active || b.lastActive || 0) - new Date(a.last_active || a.lastActive || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [customers, search, statusFilter, sortBy]);

  const activeFilterCount = (search.trim() ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);

  const resetFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('all');
    setSortBy('newest');
  }, []);

  return { 
    search, setSearch, 
    statusFilter, setStatusFilter, 
    sortBy, setSortBy, 
    showFilters, setShowFilters,
    filtered, 
    activeFilterCount,
    resetFilters 
  };
};

export const usePagination = (items, rowsPerPage = 10) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(rowsPerPage);

  // Ensure items is always an array
  const itemsArray = Array.isArray(items) ? items : [];
  
  const totalPages = Math.max(1, Math.ceil(itemsArray.length / perPage));
  const startIdx = page * perPage;
  const endIdx = Math.min(startIdx + perPage, itemsArray.length);
  const paginatedItems = itemsArray.slice(startIdx, endIdx);

  const goToPage = useCallback((newPage) => {
    setPage(Math.max(0, Math.min(newPage, totalPages - 1)));
  }, [totalPages]);

  const changePerPage = useCallback((newPerPage) => {
    setPerPage(newPerPage);
    setPage(0);
  }, []);

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      goToPage(totalPages - 1);
    }
  }, [totalPages, page, goToPage]);

  return {
    page,
    perPage,
    totalPages,
    startIdx,
    endIdx,
    paginatedItems,
    goToPage,
    changePerPage
  };
};