import { useState } from 'react';
import Image from '../Image'
import { Plus, ForkKnifeCrossed, IndianRupee, Heart, Star } from 'lucide-react'
import ViewItemModal from '../ViewItemModal';

function TopMenuItem({ items, buttonContent, styles, isLiked, onLikeToggle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleAddToCart = (quantity) => {
    console.log(`Added ${quantity} x ${items.name} to cart`)
    setIsModalOpen(false)
    // Call your existing cart logic here
  }

  const handleQuickAdd = () => {
    console.log(`Quick add: ${items.name}`)
    // Call your existing quick add logic here
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <button
            onClick={() => onLikeToggle(items.id)}
            className={styles.likeButton}
            title={isLiked ? "Remove from favourites" : "Add to favourites"}
          >
            <Star
              size={20}
              className={isLiked ? styles.likeActive : styles.likeInactive}
            />
          </button>

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
              <span className={styles.originalPrice}>
                <IndianRupee className={`${styles.priceIcon} ${styles.originalPriceIcon}`} />
                {items.originalPrice}
              </span>
            </div>
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.addButton1} onClick={handleViewDetails}>
              <ForkKnifeCrossed className={styles.buttonIcon1} />
              <span className={styles.buttonText}>{buttonContent.btnText1}</span>
            </button>
            
            <button 
              className={styles.addButton2}
              onClick={handleQuickAdd}
            >
              <Plus className={styles.buttonIcon2} />
              <span className={styles.buttonText}>{buttonContent.btnText2}</span>
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
        onAddToCart={handleAddToCart}
        type="topCategory"
      />
    </>
  )
}

export default TopMenuItem