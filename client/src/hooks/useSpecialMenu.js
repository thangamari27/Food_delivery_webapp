import { useState, useCallback, useMemo, useEffect } from 'react';
import { specialMenuContent } from '../utils/constant/admin/MenuConstant';

export default function useSpecialMenu() {
  const content = specialMenuContent;
  const ITEMS_PER_PAGE = content.itemPerPage ?? 6;

  const [activeCuisine, setActiveCuisine] = useState('all');
  const [specialMenuPage, setSpecialMenuPage] = useState(1);
  const [likedItems, setLikedItems] = useState(new Set());

  // Reset page when activeCuisine changes (keeps original behavior of resetting page on filter change)
  useEffect(() => {
    setSpecialMenuPage(1);
  }, [activeCuisine]);

  const filteredSpecialDishes = useMemo(() => {
    if (activeCuisine === 'all') {
      return content.specialMenuList;
    }
    return content.specialMenuList.filter(dish => dish.cuisine === activeCuisine);
  }, [activeCuisine, content.specialMenuList]);

  const totalPages = Math.ceil(filteredSpecialDishes.length / ITEMS_PER_PAGE);

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

  return {
    content,
    styles: null, 
    activeCuisine,
    setActiveCuisine,
    specialMenuPage,
    totalPages,
    paginatedSpecialDishes,
    handlePageChange,
    likedItems,
    handleLikeToggle,
    ITEMS_PER_PAGE,
  };
}