import { Lock, TriangleAlertIcon,ShoppingBag } from 'lucide-react'
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: [],
  isCartOpen: false,
  lastUpdated: null
};

const CART_STORAGE_KEY = 'foodDelivery_cart';

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART_OPEN: 'SET_CART_OPEN',
  LOAD_CART: 'LOAD_CART'
};

/**
 * Transform food item to cart item format
 * CRITICAL: Preserve MongoDB _id for order creation
 */
const transformToCartItem = (foodItem, quantity = 1) => {
  // Validate critical fields
  if (!foodItem._id) {
    console.error('CRITICAL: Food item missing MongoDB _id:', foodItem);
    throw new Error('Cannot add item to cart: Missing database ID');
  }

  if (!foodItem.restaurant && !foodItem.restaurantId) {
    console.error('CRITICAL: Food item missing restaurant:', foodItem);
    throw new Error('Cannot add item to cart: Missing restaurant information');
  }

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
    // MongoDB ObjectId - Required for order creation
    _id: foodItem._id,
    
    // Frontend display ID (UUID)
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
    quantity: quantity,
    
    // Images
    src: foodItem.src || foodItem.image?.url || foodItem.image,
    srcFallback: foodItem.srcFallback || foodItem.imageFallback?.url || foodItem.image,
    alt: foodItem.alt || foodItem.name,
    
    // Description
    description: foodItem.description || foodItem.ingredients || '',
    ingredients: foodItem.ingredients || foodItem.description || '',
    
    // Restaurant information (MongoDB ObjectId)
    restaurant: foodItem.restaurant || foodItem.restaurantId,
    restaurantId: foodItem.restaurant || foodItem.restaurantId,
    restaurantName: foodItem.restaurantName || '',
    
    // Additional metadata
    availableQuantity: foodItem.availableQuantity || 999,
    isAvailable: foodItem.isAvailable !== false,
    isActive: foodItem.isActive !== false,
    addedAt: new Date().toISOString()
  };
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      let newItems;
      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // New item, add to cart
        newItems = [action.payload, ...state.items];
      }

      return {
        ...state,
        items: newItems,
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      return {
        ...state,
        items: state.items.map(item => 
          item._id === action.payload.id 
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.change) }
            : item
        ),
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
        lastUpdated: new Date().toISOString()
      };
    }

    case ACTIONS.SET_CART_OPEN: {
      return {
        ...state,
        isCartOpen: action.payload
      };
    }

    case ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload || []
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, user } = useAuthContext();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Validate cart items have required fields
        const validItems = parsedCart.filter(item => {
          const hasMongoId = !!item._id;
          const hasRestaurant = !!(item.restaurant || item.restaurantId);
          
          if (!hasMongoId) {
            console.warn('Cart item missing MongoDB _id, removing:', item.name);
          }
          if (!hasRestaurant) {
            console.warn('Cart item missing restaurant, removing:', item.name);
          }
          
          return hasMongoId && hasRestaurant;
        });
        
        if (validItems.length !== parsedCart.length) {
          console.warn(`Removed ${parsedCart.length - validItems.length} invalid items from cart`);
        }
        
        dispatch({ type: ACTIONS.LOAD_CART, payload: validItems });
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.lastUpdated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.lastUpdated]);

  /**
   * Add item to cart (with authentication check)
   */
  const addToCart = useCallback((foodItem, quantity = 1, showToast = true) => {
    // Check authentication
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        duration: 3000,
        icon: <Lock className='' size={18} />
      });
      return false;
    }

    try {
      // Validate MongoDB _id
      if (!foodItem._id) {
        console.error('Cannot add to cart - missing MongoDB _id:', foodItem);
        toast.error('Unable to add item - please refresh the page and try again', {
          duration: 3000
        });
        return false;
      }

      // Validate restaurant information
      const restaurantId = foodItem.restaurant || foodItem.restaurantId;
      if (!restaurantId) {
        console.error('Cannot add to cart - missing restaurant:', foodItem);
        toast.error('Unable to add item - restaurant information missing', {
          duration: 3000
        });
        return false;
      }

      // Check if cart has items from different restaurant
      if (state.items.length > 0) {
        const existingRestaurant = state.items[0].restaurant || state.items[0].restaurantId;
        if (existingRestaurant !== restaurantId) {
          toast.error('You can only order from one restaurant at a time. Please clear your cart first.', {
            duration: 4000,
            icon: <TriangleAlertIcon className='text-yellow-400' size={25} />
          });
          return false;
        }
      }

      const cartItem = transformToCartItem(foodItem, quantity);
      
      // Final validation
      if (!cartItem._id || !cartItem.restaurant) {
        console.error('Transformation failed - missing critical fields:', cartItem);
        toast.error('Unable to add item to cart', {
          duration: 3000
        });
        return false;
      }

      dispatch({ type: ACTIONS.ADD_ITEM, payload: cartItem });
      
      if (showToast) {
        toast.success(`${foodItem.name} added to cart!`, {
          duration: 2000,
          icon: <ShoppingBag className='text-orange-500' size={18} />
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
      return false;
    }
  }, [isAuthenticated, state.items]);

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: itemId });
    toast.success('Item removed from cart', {
      duration: 2000
    });
  }, []);

  /**
   * Update item quantity
   */
  const updateQuantity = useCallback((itemId, change) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, change } });
  }, []);

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    toast.success('Cart cleared', {
      duration: 2000
    });
  }, []);

  /**
   * Open/Close cart panel
   */
  const setCartOpen = useCallback((isOpen) => {
    dispatch({ type: ACTIONS.SET_CART_OPEN, payload: isOpen });
  }, []);

  /**
   * Get cart item count
   */
  const getCartCount = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  /**
   * Get cart total
   */
  const getCartTotal = useCallback(() => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [state.items]);

  /**
   * Check if item is in cart
   */
  const isInCart = useCallback((itemId) => {
    return state.items.some(item => item._id === itemId || item.id === itemId);
  }, [state.items]);

  /**
   * Get item quantity in cart
   */
  const getItemQuantity = useCallback((itemId) => {
    const item = state.items.find(item => item._id === itemId || item.id === itemId);
    return item ? item.quantity : 0;
  }, [state.items]);

  /**
   * Get restaurant ID from cart items
   */
  const getCartRestaurantId = useCallback(() => {
    if (state.items.length === 0) return null;
    return state.items[0].restaurant || state.items[0].restaurantId;
  }, [state.items]);

  const value = {
    // State
    items: state.items,
    isCartOpen: state.isCartOpen,
    cartCount: getCartCount(),
    cartTotal: getCartTotal(),
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCartOpen,
    
    // Utilities
    isInCart,
    getItemQuantity,
    getCartCount,
    getCartTotal,
    getCartRestaurantId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export default CartContext;