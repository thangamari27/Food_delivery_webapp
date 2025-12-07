import { useState, useMemo } from 'react';

export const useTopCategories = (menuItems, itemsPerPage = 8) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (categoryFilter === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === categoryFilter);
  }, [categoryFilter, menuItems]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Handle filter change
  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    categoryFilter,
    currentPage,
    filteredItems,
    paginatedItems,
    totalPages,
    itemsPerPage,
    handleFilterChange,
    handlePageChange,
    setCategoryFilter,
    setCurrentPage
  };
};