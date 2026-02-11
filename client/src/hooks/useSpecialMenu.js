import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useFood } from '../context/admin/Foodcontext';
import { specialMenuContent } from '../utils/constant/admin/MenuConstant';

export default function useSpecialMenu() {
  const content = specialMenuContent;
  const ITEMS_PER_PAGE = content.itemPerPage ?? 6;

  const [activeCuisine, setActiveCuisine] = useState('all');
  const [specialMenuPage, setSpecialMenuPage] = useState(1);
  const [likedItems, setLikedItems] = useState(new Set());
  
  const { foods, loading, error, fetchFoods, setFilters } = useFood();
  
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
          console.error('Error fetching initial special menu items:', error);
        } finally {
          isFetchingRef.current = false;
        }
      }
    };
    
    initialFetch();
  }, []);

  // Reset page when activeCuisine changes
  useEffect(() => {
    setSpecialMenuPage(1);
  }, [activeCuisine]);

  // Transform and filter backend data
  const filteredSpecialDishes = useMemo(() => {
    if (!foods || foods.length === 0) {
      return [];
    }

    const transformedFoods = foods.map(food => {
      const cuisineLower = food.cuisine?.toLowerCase() || '';
      
      return {
        // ✅ CRITICAL: MongoDB ObjectId - Required for cart/order
        _id: food._id, // MongoDB ObjectId
        
        // Frontend display ID
        id: food.fid || food._id,
        fid: food.fid || food._id,
        
        // Item details
        name: food.name,
        cuisine: cuisineLower,
        price: food.price,
        originalPrice: food.originalPrice || food.price,
        description: food.description || '',
        rating: typeof food.rating === 'object' ? food.rating?.average || 4 : food.rating || 4,
        reviews: typeof food.rating === 'object' ? food.rating?.count || 0 : 0,
        
        // Images
        src: food.src || food.image?.url || food.image,
        srcFallback: food.srcFallback || food.imageFallback?.url || food.image,
        alt: food.alt || food.name,
        
        // Category
        category: food.category,
        type: food.type,
        isSpecial: food.type === 'Special Menu' || food.isSpecial === true,
        
        // Additional info
        ingredients: food.ingredients || food.description,
        prepTime: food.prepTime || food.preparationTime,
        serves: food.serves || food.servingSize,
        
        // ✅ CRITICAL: Restaurant information (MongoDB ObjectId)
        restaurant: food.restaurant, // MongoDB ObjectId
        restaurantId: food.restaurant,
        restaurantName: food.restaurantName || '',
        
        // Availability
        availableQuantity: food.availableQuantity || 0,
        isAvailable: food.isAvailable !== false,
        isActive: food.isActive !== false
      };
    });

    // Filter for special items only
    const specialItems = transformedFoods.filter(food => 
      food.type === 'Special Menu' || food.isSpecial === true
    );
    
    // Filter by cuisine if needed
    if (activeCuisine === 'all') {
      return specialItems;
    }
    
    return specialItems.filter(food => 
      food.cuisine === activeCuisine.toLowerCase()
    );
  }, [foods, activeCuisine]);

  const totalPages = Math.max(1, Math.ceil(filteredSpecialDishes.length / ITEMS_PER_PAGE));

  // Paginate dishes
  const paginatedSpecialDishes = useMemo(() => {
    const start = (specialMenuPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredSpecialDishes.slice(start, end);
  }, [filteredSpecialDishes, specialMenuPage, ITEMS_PER_PAGE]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setSpecialMenuPage(page);
    }
  }, [totalPages]);

  const handleLikeToggle = useCallback((dishId) => {
    setLikedItems(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(dishId)) {
        newLiked.delete(dishId);
      } else {
        newLiked.add(dishId);
      }
      return newLiked;
    });
  }, []);

  const handleCuisineChange = useCallback((cuisine) => {
    if (cuisine && typeof cuisine === 'string') {
      setActiveCuisine(cuisine);
    }
  }, []);

  return {
    content,
    activeCuisine,
    setActiveCuisine: handleCuisineChange,
    specialMenuPage,
    totalPages,
    paginatedSpecialDishes,
    handlePageChange,
    likedItems,
    handleLikeToggle,
    ITEMS_PER_PAGE,
    loading,
    error,
    hasItems: filteredSpecialDishes.length > 0,
    filteredSpecialCount: filteredSpecialDishes.length
  };
}