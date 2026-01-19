import { useState, useEffect, useMemo, useCallback } from "react";

export const useCustomerData = () => {
  const generateMockCustomers = (count = 100) => {
    const names = ['Akash Kumar', 'Priya Sharma', 'Rajesh Patel', 'Sneha Reddy', 'Vikram Singh', 'Anita Desai', 'Karthik Nair', 'Divya Iyer', 'Suresh Kumar', 'Lakshmi Venkat'];
    const cities = ['Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Bangalore', 'Mumbai', 'Delhi'];
    const states = ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `CUST${String(i + 1).padStart(5, '0')}`,
      name: `${names[i % names.length]} ${i + 1}`,
      phone: `+91 ${9000000000 + i}`,
      email: `customer${i + 1}@fooddelivery.com`,
      address: `${i + 1}, Food Street, Area ${i % 10}`,
      city: cities[i % cities.length],
      state: states[i % states.length],
      postal: `6000${String(i % 100).padStart(2, '0')}`,
      status: i % 15 === 0 ? 'blocked' : i % 20 === 0 ? 'inactive' : 'active',
      totalOrders: Math.floor(Math.random() * 100),
      totalSpend: Math.floor(Math.random() * 50000),
      lastOrder: i % 10 === 0 ? null : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      notes: ''
    }));
  };

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadCustomers = () => {
      setTimeout(() => {
        setCustomers(generateMockCustomers(100));
        setLoading(false);
      }, 800);
    };

    loadCustomers();
  }, []);

  const addCustomer = useCallback((customer) => {
    const newCustomer = {
      ...customer,
      id: `CUST${String(customers.length + 1).padStart(5, '0')}`,
      totalOrders: 0,
      totalSpend: 0,
      lastOrder: null,
      lastActive: new Date().toISOString(),
      created: new Date().toISOString()
    };
    setCustomers(prev => [newCustomer, ...prev]);
    return newCustomer;
  }, [customers.length]);

  const updateCustomer = useCallback((id, updates) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCustomer = useCallback((id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }, []);

  return { customers, loading, addCustomer, updateCustomer, deleteCustomer };
};

export const useCustomerFilters = (customers) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...customers];

    // Apply search filter
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.phone.includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term)
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
          return new Date(b.created) - new Date(a.created);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'recent':
          return new Date(b.lastActive) - new Date(a.lastActive);
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

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const startIdx = page * perPage;
  const endIdx = Math.min(startIdx + perPage, items.length);
  const paginatedItems = items.slice(startIdx, endIdx);

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

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
};