import { useState } from 'react'
import { Heart } from 'lucide-react'
import MenuCardImage from './MenuCardImage'
import MenuCardContent from './MenuCardContent'
import ViewItemModal from '../../common/ViewItemModal'

function DishCardSpecial({ dish, buttonText, isLiked, onLikeToggle, isFeatured = false, styles }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleAddToCart = (quantity) => {
    console.log(`Added ${quantity} x ${dish.name} to cart`)
    setIsModalOpen(false)
    // Call your existing cart logic here
  }

  return (
    <div
      className={`${styles.cardContainer}
        ${isFeatured ? styles.cardHighlight : styles.cardHighlightHover }
      `}
    >
      <button
        onClick={() => onLikeToggle(dish.id)}
        className={styles.likeButton}
        title={isLiked ? "Unlike" : "Like"}
      >
        <Heart size={20} className={isLiked ? styles.islikeIcon : styles.likeIcon } />
      </button>
      
      {/* special menu card image */}
      <MenuCardImage 
        dish={dish}
        styles={styles} 
      />
      
      {/* special menu cart content */}
      <MenuCardContent
        dish={dish}
        isFeatured={isFeatured}
        buttonText={buttonText}
        styles={styles}
        onViewClick={handleViewClick}
      />

      {/* View Item Modal for Special Menu */}
      <ViewItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dish={dish}
        buttonText={buttonText}
        onAddToCart={handleAddToCart}
        type="specialMenu"
      />
    </div>
  )
}

export default DishCardSpecial