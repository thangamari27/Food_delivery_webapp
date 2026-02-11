import { useMemo } from "react";

export const useRestaurantData = (restaurants, appliedFilters, searchQuery) => {
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Helper function to get cuisine string/array
      const getCuisineString = (cuisine) => {
        if (Array.isArray(cuisine)) {
          return cuisine.join(', ');
        }
        return cuisine || '';
      };

      // Helper function to get address string
      const getAddressString = (address) => {
        if (typeof address === 'string') return address;
        if (address && typeof address === 'object') {
          return `${address.street || ''}, ${address.area || ''}, ${address.city || ''}`.trim();
        }
        return '';
      };

      const cuisineString = getCuisineString(restaurant.cuisine);
      const addressString = getAddressString(restaurant.address);

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchSearch = 
          (restaurant.name || '').toLowerCase().includes(query) ||
          cuisineString.toLowerCase().includes(query) ||
          addressString.toLowerCase().includes(query);
        if (!matchSearch) return false;
      }

      // Cuisine filter - check if restaurant has any of the selected cuisines
      if (appliedFilters.cuisines.length > 0) {
        const restaurantCuisines = Array.isArray(restaurant.cuisine) 
          ? restaurant.cuisine.map(c => c.toLowerCase())
          : [cuisineString.toLowerCase()];
        
        const matchesCuisine = appliedFilters.cuisines.some(
          selectedCuisine => {
            const selectedCuisineLower = selectedCuisine.toLowerCase();
            return restaurantCuisines.some(cuisine => 
              cuisine.includes(selectedCuisineLower)
            );
          }
        );
        if (!matchesCuisine) return false;
      }
      
      // Dietary filter
      if (appliedFilters.dietary.length > 0) {
        if (appliedFilters.dietary.includes('veg')) {
          if (!restaurant.badges || !restaurant.badges.includes('Pure Veg')) return false;
        }
      }

      // Price range filter
      if (appliedFilters.priceRange.length > 0 && restaurant.priceRange) {
        const priceMatch = restaurant.priceRange.match(/\d+/);
        if (priceMatch) {
          const price = parseInt(priceMatch[0]);
          const matchesPrice = appliedFilters.priceRange.some(range => {
            if (range === 'budget' && price < 300) return true;
            if (range === 'moderate' && price >= 300 && price <= 500) return true;
            if (range === 'premium' && price > 500) return true;
            return false; 
          });
          if (!matchesPrice) return false;
        }
      }

      // Features filter
      if (appliedFilters.features.length > 0) {
        if (!restaurant.features || !Array.isArray(restaurant.features)) return false;
        const matchesFeatures = appliedFilters.features.every(
          feature => restaurant.features.includes(feature)
        );
        if (!matchesFeatures) return false;
      }
      return true;
    }).sort((a, b) => {
      // Sort logic with safety checks
      switch (appliedFilters.sortBy) {
        case 'rating':
          return (b.rating?.average || b.rating || 0) - (a.rating?.average || a.rating || 0);
        case 'deliveryTime':
          const aTime = parseInt(a.deliveryTime) || 60;
          const bTime = parseInt(b.deliveryTime) || 60;
          return aTime - bTime;
        case 'priceLow':
          const aPriceLow = parseInt((a.priceRange || '').match(/\d+/)?.[0]) || 0;
          const bPriceLow = parseInt((b.priceRange || '').match(/\d+/)?.[0]) || 0;
          return aPriceLow - bPriceLow;
        case 'priceHigh':
          const aPriceHigh = parseInt((a.priceRange || '').match(/\d+/)?.[0]) || 0;
          const bPriceHigh = parseInt((b.priceRange || '').match(/\d+/)?.[0]) || 0;
          return bPriceHigh - aPriceHigh;
        default:
          return 0;
      }
    });
  }, [restaurants, appliedFilters, searchQuery]);

  return { filteredRestaurants };
};