import { useState, useMemo, useCallback } from 'react';

export const useTopCategories = (menuItems, itemsPerPage = 8) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [likedItems, setLikedItems] = useState(new Set());

  const filteredItems = useMemo(() => {
    if (categoryFilter === 'All') return menuItems;
    return menuItems.filter(item => item.category === categoryFilter);
  }, [categoryFilter, menuItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleLikeToggle = useCallback((itemId) => {
    setLikedItems(prev => {
      const updated = new Set(prev);
      updated.has(itemId) ? updated.delete(itemId) : updated.add(itemId);
      return updated;
    });
  }, []);

  return {
    categoryFilter,
    currentPage,
    paginatedItems,
    totalPages,
    likedItems,
    handleLikeToggle,
    handleFilterChange: (category) => {
      setCategoryFilter(category);
      setCurrentPage(1);
    },
    handlePageChange: setCurrentPage
  };
};
