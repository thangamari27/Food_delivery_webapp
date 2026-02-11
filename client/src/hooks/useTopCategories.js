import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useFood } from '../context/admin/Foodcontext';
import { useLikes } from '../context/LikesContext';

export const useTopCategories = (itemsPerPage = 8) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { foods, loading, error, fetchFoods, setFilters } = useFood();
  const { toggleLike, isLiked } = useLikes();
  
  const isInitialMountRef = useRef(true);
  const isFetchingRef = useRef(false);

  // Initial fetch on mount only
  useEffect(() => {
    const initialFetch = async () => {
      if (isInitialMountRef.current && !isFetchingRef.current) {
        isInitialMountRef.current = false;
        isFetchingRef.current = true;
        
        try {
          setFilters({});
          await fetchFoods();
        } catch (error) {
          console.error('Error fetching initial top category items:', error);
        } finally {
          isFetchingRef.current = false;
        }
      }
    };
    
    initialFetch();
  }, [fetchFoods, setFilters]);

  // Transform backend data to frontend format
  const menuItems = useMemo(() => {
    if (!foods || foods.length === 0) {
      return [];
    }

    // Filter for regular menu items only
    const regularItems = foods.filter(food => {
      const isRegularItem = food.type === 'Regular Menu' || 
                           (food.type && food.type.toLowerCase().includes('regular')) ||
                           (food.isSpecial === false && food.type !== 'Special Menu');
      return isRegularItem;
    });

    // Transform items with MongoDB _id preservation
    const transformedItems = regularItems.map(food => ({
      //  CRITICAL: MongoDB ObjectId - Required for cart/order
      _id: food._id,
      
      // Frontend display ID
      id: food.fid || food._id,
      fid: food.fid || food._id,
      
      // Item details
      name: food.name,
      category: food.category || 'Main Course',
      ingredients: food.ingredients || food.description || '',
      price: food.price,
      originalPrice: food.originalPrice || food.price,
      rating: typeof food.rating === 'object' ? food.rating?.average || 4 : food.rating || 4,
      reviews: typeof food.rating === 'object' ? food.rating?.count || 0 : 0,
      likes: food.likes || 0,
      
      // Images
      src: food.src || food.image?.url || food.image,
      srcFallback: food.srcFallback || food.imageFallback?.url || food.image,
      alt: food.alt || food.name,
      
      // Category
      cuisine: food.cuisine,
      type: food.type,
      isSpecial: food.type === 'Special Menu' || food.isSpecial === true,
      
      // Additional info
      description: food.description,
      prepTime: food.prepTime || food.preparationTime,
      serves: food.serves || food.servingSize,
      
      //  CRITICAL: Restaurant information (MongoDB ObjectId)
      restaurant: food.restaurant,
      restaurantId: food.restaurant,
      restaurantName: food.restaurantName || '',
      
      // Availability
      availableQuantity: food.availableQuantity || 0,
      isAvailable: food.isAvailable !== false,
      isActive: food.isActive !== false
    }));

    return transformedItems;
  }, [foods]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    const result = categoryFilter === 'All' 
      ? menuItems 
      : menuItems.filter(item => item.category === categoryFilter);
    
    return result;
  }, [categoryFilter, menuItems]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Paginate items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result = filteredItems.slice(startIndex, endIndex);
    
    return result;
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleLikeToggle = useCallback((itemId, item) => {
    toggleLike(item);
  }, [toggleLike]);

  const handleFilterChange = useCallback((category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return {
    categoryFilter,
    currentPage,
    paginatedItems,
    totalPages,
    handleLikeToggle,
    isLiked,
    handleFilterChange,
    handlePageChange,
    loading,
    error,
    hasItems: filteredItems.length > 0,
    filteredItemsCount: filteredItems.length
  };
};