import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import MenuCardImage from './MenuCardImage'
import MenuCardContent from './MenuCardContent'
import ViewItemModal from '@/components/common/ViewItemModal'
import { useCart } from '@/context/CartContext'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'

function DishCardSpecial({ dish, buttonText, isLiked, onLikeToggle, isFeatured = false, styles }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Get cart and auth context
  const { addToCart, isInCart, setCartOpen } = useCart()
  const { isAuthenticated } = useAuthContext()

  const handleViewClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  /**
   * Handle Add to Cart - with authentication check
   */
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Check authentication first
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        duration: 3000,
        icon: '🔒'
      })
      return
    }

    // Add to cart
    const success = addToCart(dish, 1, true)
    
    if (success) {
      // Optional: Open cart panel after adding
      // setCartOpen(true)
    }
  }

  /**
   * Handle Add to Cart from Modal
   */
  const handleAddToCartFromModal = (quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      setIsModalOpen(false)
      return
    }

    const success = addToCart(dish, quantity, true)
    
    if (success) {
      setIsModalOpen(false)
      // Optional: Open cart panel
      setTimeout(() => setCartOpen(true), 300)
    }
  }

  // Check if item is already in cart
  const itemInCart = isInCart(dish.fid || dish._id || dish.id)

  return (
    <div
      className={`${styles.cardContainer}
        ${isFeatured ? styles.cardHighlight : styles.cardHighlightHover }
      `}
    >
      {/* Like Button */}
      <button
        onClick={() => onLikeToggle(dish.id || dish.fid || dish._id)}
        className={styles.likeButton}
        title={isLiked ? "Unlike" : "Like"}
      >
        <Heart size={20} className={isLiked ? styles.islikeIcon : styles.likeIcon } />
      </button>

      {/* Cart Badge - Show if item is in cart */}
      {itemInCart && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-2 shadow-lg z-10">
          <ShoppingCart size={16} />
        </div>
      )}
      
      {/* Special menu card image */}
      <MenuCardImage 
        dish={dish}
        styles={styles} 
      />
      
      {/* Special menu cart content */}
      <MenuCardContent
        dish={dish}
        isFeatured={isFeatured}
        buttonText={buttonText}
        styles={styles}
        onViewClick={handleViewClick}
        onAddToCart={handleAddToCart}
        itemInCart={itemInCart}
      />

      {/* View Item Modal for Special Menu */}
      <ViewItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dish={dish}
        buttonText={buttonText}
        onAddToCart={handleAddToCartFromModal}
        type="specialMenu"
      />
    </div>
  )
}

export default DishCardSpecial