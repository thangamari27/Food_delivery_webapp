export const filterOrders = (orders, filters, searchQuery) => {
  let result = [...orders];
  
  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(order => 
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query)
    );
  }
  
  // Status filters
  if (filters.orderStatus !== 'all') {
    result = result.filter(order => order.orderStatus === filters.orderStatus);
  }
  
  if (filters.paymentStatus !== 'all') {
    result = result.filter(order => order.paymentStatus === filters.paymentStatus);
  }
  
  // Date range filtering
  if (filters.dateRange !== 'all') {
    result = filterByDateRange(result, filters.dateRange);
  }
  
  return result;
};

const filterByDateRange = (orders, dateRange) => {
  const now = new Date();
  
  return orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    
    switch (dateRange) {
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
};

export const sortOrders = (orders, sortConfig) => {
  const sorted = [...orders];
  
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
};