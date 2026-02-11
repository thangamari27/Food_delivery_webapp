import { Heart, HeartCrack, LockKeyhole } from 'lucide-react';
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';

const LikesContext = createContext();

const initialState = {
  items: [],
  lastUpdated: null
};

const LIKES_STORAGE_KEY = 'foodDelivery_likes';

const ACTIONS = {
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  LOAD_LIKES: 'LOAD_LIKES',
  CLEAR_LIKES: 'CLEAR_LIKES'
};

/**
 * Transform food item to liked item format
 */
const transformToLikedItem = (foodItem) => {
  // Handle rating
  let rating = 4;
  let reviews = 0;
  
  if (typeof foodItem.rating === 'object' && foodItem.rating !== null) {
    rating = foodItem.rating.average || 4;
    reviews = foodItem.rating.count || 0;
  } else if (typeof foodItem.rating === 'number') {
    rating = foodItem.rating;
    reviews = foodItem.reviews || 0;
  }

  return {
    // MongoDB ObjectId
    _id: foodItem._id,
    
    // Frontend display ID
    id: foodItem.fid || foodItem.id || foodItem._id,
    fid: foodItem.fid || foodItem.id || foodItem._id,
    
    // Item details
    name: foodItem.name,
    price: foodItem.price,
    originalPrice: foodItem.originalPrice || foodItem.price,
    category: foodItem.category || 'Main Course',
    cuisine: foodItem.cuisine || '',
    rating: rating,
    reviews: reviews,
    likes: foodItem.likes || 0,
    
    // Images
    src: foodItem.src || foodItem.image?.url || foodItem.image,
    srcFallback: foodItem.srcFallback || foodItem.imageFallback?.url || foodItem.image,
    alt: foodItem.alt || foodItem.name,
    
    // Description
    description: foodItem.description || foodItem.ingredients || '',
    ingredients: foodItem.ingredients || foodItem.description || '',
    
    // Restaurant information
    restaurant: foodItem.restaurant || foodItem.restaurantId,
    restaurantId: foodItem.restaurant || foodItem.restaurantId,
    restaurantName: foodItem.restaurantName || '',
    
    // Additional metadata
    availableQuantity: foodItem.availableQuantity || 999,
    isAvailable: foodItem.isAvailable !== false,
    isActive: foodItem.isActive !== false,
    likedAt: new Date().toISOString()
  };
};

function likesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_LIKE: {
      const exists = state.items.some(item => item._id === action.payload._id);
      
      if (exists) {
        return state;
      }

      return {
        ...state,
        items: [action.payload, ...state.items],
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.REMOVE_LIKE: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.LOAD_LIKES: {
      return {
        ...state,
        items: action.payload || []
      };
    }

    case ACTIONS.CLEAR_LIKES: {
      return {
        ...state,
        items: [],
        lastUpdated: new Date().toISOString()
      };
    }

    default:
      return state;
  }
}

export function LikesProvider({ children }) {
  const [state, dispatch] = useReducer(likesReducer, initialState);
  const { isAuthenticated } = useAuthContext();

  // Load likes from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem(LIKES_STORAGE_KEY);
    if (savedLikes) {
      try {
        const parsedLikes = JSON.parse(savedLikes);
        dispatch({ type: ACTIONS.LOAD_LIKES, payload: parsedLikes });
      } catch (error) {
        console.error('Error loading likes:', error);
        localStorage.removeItem(LIKES_STORAGE_KEY);
      }
    }
  }, []);

  // Save likes to localStorage whenever it changes
  useEffect(() => {
    if (state.lastUpdated) {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.lastUpdated]);

  /**
   * Toggle like status of an item
   */
  const toggleLike = useCallback((foodItem) => {
    if (!isAuthenticated) {
      toast.error('Please login to like items', {
        duration: 3000,
        icon: '🔒'
      });
      return false;
    }

    const itemId = foodItem._id || foodItem.id;
    const isLiked = state.items.some(item => item._id === itemId);

    if (isLiked) {
      // Remove like
      dispatch({ type: ACTIONS.REMOVE_LIKE, payload: itemId });
      toast.success('Removed from favorites', {
        duration: 2000,
        icon: '💔'
      });
      return false;
    } else {
      // Add like
      const likedItem = transformToLikedItem(foodItem);
      dispatch({ type: ACTIONS.ADD_LIKE, payload: likedItem });
      toast.success('Added to favorites!', {
        duration: 2000,
        icon: '❤️'
      });
      return true;
    }
  }, [isAuthenticated, state.items]);

  /**
   * Remove item from likes
   */
  const removeLike = useCallback((itemId) => {
    dispatch({ type: ACTIONS.REMOVE_LIKE, payload: itemId });
    toast.success('Removed from favorites', {
      duration: 2000,
      icon: '💔'
    });
  }, []);

  /**
   * Clear all liked items
   */
  const clearLikes = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_LIKES });
    toast.success('All favorites cleared', {
      duration: 2000
    });
  }, []);

  /**
   * Check if item is liked
   */
  const isLiked = useCallback((itemId) => {
    return state.items.some(item => item._id === itemId || item.id === itemId);
  }, [state.items]);

  /**
   * Get likes count
   */
  const getLikesCount = useCallback(() => {
    return state.items.length;
  }, [state.items]);

  const value = {
    // State
    items: state.items,
    likesCount: getLikesCount(),
    
    // Actions
    toggleLike,
    removeLike,
    clearLikes,
    
    // Utilities
    isLiked,
    getLikesCount
  };

  return (
    <LikesContext.Provider value={value}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within LikesProvider');
  }
  return context;
}

export default LikesContext;