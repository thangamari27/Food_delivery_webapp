import { useState } from 'react';
import Image from '../Image'
import { Plus, Lock, IndianRupee, Star, ShoppingCart, Eye } from 'lucide-react'
import ViewItemModal from '../ViewItemModal';
import { useCart } from '@/context/CartContext'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'

function TopMenuItem({ items, buttonContent, styles, isLiked, onLikeToggle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get cart and auth context
  const { addToCart, isInCart, setCartOpen } = useCart()
  const { isAuthenticated } = useAuthContext()

  // Create a handler to pass both ID and item for like toggle
  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(items._id || items.id || items.fid, items);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  /**
   * Handle Quick Add to Cart - with authentication check
   */
  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Check authentication first
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        duration: 3000,
        icon: <Lock className='' size={25} />
      })
      return
    }

    // Add to cart
    const success = addToCart(items, 1, true)
    
    if (success) {
      // Optional: Open cart panel after adding
      // setTimeout(() => setCartOpen(true), 300)
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

    const success = addToCart(items, quantity, true)
    
    if (success) {
      setIsModalOpen(false)
      // Optional: Open cart panel
      setTimeout(() => setCartOpen(true), 300)
    }
  }

  // Check if item is already in cart
  const itemInCart = isInCart(items.fid || items._id || items.id)

  // Get rating value - handle both object and number
  const ratingValue = typeof items.rating === 'object' 
    ? items.rating?.average || 4 
    : items.rating || 4;

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          {/* Like/Favorite Button - Updated to use handleLikeClick */}
          <button
            onClick={handleLikeClick}
            className={styles.likeButton}
            title={isLiked ? "Remove from favourites" : "Add to favourites"}
          >
            <Star
              size={20}
              className={isLiked ? styles.likeActive : styles.likeInactive}
            />
          </button>

          {/* Cart Badge - Show if item is in cart */}
          {itemInCart && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-2 shadow-lg z-10">
              <ShoppingCart size={16} />
            </div>
          )}

          <Image 
            src={items.src}
            srcFallback={items.srcFallback}
            alt={items.alt}
            pictureStyle={styles.picture}
            imageStyle={styles.image}
          />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{items.name}</h3>
          <p className={styles.ingredients}>{items.ingredients}</p>
          
          <div className={styles.priceContainer}>
            <div className={styles.priceWrapper}>
              <span className={styles.price}>
                <IndianRupee className={`${styles.priceIcon}`} />
                {items.price}
              </span>
              {items.originalPrice && items.originalPrice > items.price && (
                <span className={styles.originalPrice}>
                  <IndianRupee className={`${styles.priceIcon} ${styles.originalPriceIcon}`} />
                  {items.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className={styles.buttonContainer}>
            {/* View Details Button */}
            <button 
              className={styles.addButton1} 
              onClick={handleViewDetails}
              title="View details"
            >
              <Eye className={styles.buttonIcon1} />
              <span className={styles.buttonText}>{buttonContent.btnText1}</span>
            </button>
            
            {/* Quick Add to Cart Button */}
            <button 
              className={`${styles.addButton2} ${itemInCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
              onClick={handleQuickAdd}
              title={itemInCart ? 'Already in cart' : 'Quick add to cart'}
            >
              {itemInCart ? (
                <>
                  <ShoppingCart className={styles.buttonIcon2} />
                  <span className={styles.buttonText}>In Cart</span>
                </>
              ) : (
                <>
                  <Plus className={styles.buttonIcon2} />
                  <span className={styles.buttonText}>{buttonContent.btnText2}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* View Item Modal for Top Category */}
      <ViewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={items}
        buttonContent={buttonContent}
        onAddToCart={handleAddToCartFromModal}
        type="topCategory"
      />
    </>
  )
}

export default TopMenuItem