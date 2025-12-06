import { Heart } from 'lucide-react'
import MenuCardImage from './MenuCardImage'
import MenuCardContent from './MenuCardContent'

function DishCardSpecial({ dish, buttonText, isLiked, onLikeToggle, isFeatured = false, styles }) {
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
    />
  </div>
  )
}

export default DishCardSpecial