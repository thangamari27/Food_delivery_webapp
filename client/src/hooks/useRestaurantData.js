import { useMemo } from "react";

export const useRestaurantData = (restaurants, appliedFilters, searchQuery) => {
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchSearch = restaurant.name.toLowerCase().includes(query) ||
                          restaurant.cuisine.toLowerCase().includes(query) ||
                          restaurant.address.toLowerCase().includes(query);
        if (!matchSearch) return false;
      }

      // Cuisine filter
      if (appliedFilters.cuisines.length > 0) {
        const restaurantCuisines = restaurant.cuisine.toLowerCase();
        const matchesCuisine = appliedFilters.cuisines.some(
          cuisine => restaurantCuisines.includes(cuisine.toLowerCase())
        );
        if (!matchesCuisine) return false;
      }
      
      // Dietary filter
      if (appliedFilters.dietary.length > 0) {
        if (appliedFilters.dietary.includes('veg')) {
          if (!restaurant.badges.includes('Pure Veg')) return false;
        }
      }

      // Price range filter
      if (appliedFilters.priceRange.length > 0) {
        const price = parseInt(restaurant.priceRange.match(/\d+/)[0]);
        const matchesPrice = appliedFilters.priceRange.some(range => {
          if (range === 'budget' && price < 300) return true;
          if (range === 'moderate' && price >= 300 && price <= 500) return true;
          if (range === 'premium' && price > 500) return true;
          return false; 
        });
        if (!matchesPrice) return false;
      }

      // Features filter
      if (appliedFilters.features.length > 0) {
        const matchesFeatures = appliedFilters.features.every(
          feature => restaurant.features.includes(feature)
        );
        if (!matchesFeatures) return false;
      }
      return true;
    }).sort((a, b) => {
      // Sort logic
      switch (appliedFilters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'priceLow':
          return parseInt(a.priceRange.match(/\d+/)[0]) - parseInt(b.priceRange.match(/\d+/)[0]);
        case 'priceHigh':
          return parseInt(b.priceRange.match(/\d+/)[0]) - parseInt(a.priceRange.match(/\d+/)[0]);
        default:
          return 0;
      }
    });
  }, [restaurants, appliedFilters, searchQuery]);

  return { filteredRestaurants };
};