import { useState, useMemo } from "react";

export const useRestaurantPagination = (itemsPerPage = 3) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const getPaginationData = useMemo(() => {
    return (filteredItems) => {
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      return {
        startIndex,
        endIndex,
        paginatedItems: filteredItems.slice(startIndex, endIndex),
        totalPages
      };
    };
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    getPaginationData,
    handlePageChange,
    resetToFirstPage,
    setCurrentPage
  };
};