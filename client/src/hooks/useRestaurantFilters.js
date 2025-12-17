import { useState, useEffect } from "react";

export const useRestaurantFilters = (initialFilters = {}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: [],
    ...initialFilters
  });

  const [tempFilters, setTempFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: [],
    ...initialFilters
  });

  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: [],
    ...initialFilters
  });

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const toggleTempFilter = (category, value) => {
    setTempFilters(prev => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const applyFilters = () => {
    setAppliedFilters(tempFilters);
  };

  const applyDesktopFilters = () => {
    setAppliedFilters(selectedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      sortBy: "relevance",
      cuisines: [],
      dietary: [],
      priceRange: [],
      features: []
    };
    
    setSelectedFilters(clearedFilters);
    setTempFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  return {
    selectedFilters,
    tempFilters,
    appliedFilters,
    setSelectedFilters,
    setTempFilters,
    setAppliedFilters,
    toggleFilter,
    toggleTempFilter,
    applyFilters,
    applyDesktopFilters,
    clearAllFilters
  };
};