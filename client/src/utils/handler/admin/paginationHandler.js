export const getPaginationRange = (currentPage, totalPages) => {
  const range = [];
  
  if (totalPages <= 5) {
    // Show all pages if total pages are 5 or less
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  } else if (currentPage <= 3) {
    // Show first 5 pages
    for (let i = 1; i <= 5; i++) {
      range.push(i);
    }
  } else if (currentPage >= totalPages - 2) {
    // Show last 5 pages
    for (let i = totalPages - 4; i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    // Show pages around current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      range.push(i);
    }
  }
  
  return range;
};

export const getPaginationInfo = (currentPage, rowsPerPage, totalItems) => {
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalItems);
  
  return {
    startIndex,
    endIndex,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < Math.ceil(totalItems / rowsPerPage),
    totalPages: Math.ceil(totalItems / rowsPerPage)
  };
};