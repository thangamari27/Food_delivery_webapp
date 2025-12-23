import { useState } from 'react'
import Modal from './Modal';
import { LucideForkKnifeCrossed, Heart, ShoppingCart, Star, IndianRupee  } from 'lucide-react';

function LikedItemsModal({ isOpen, onClose, items, onRemoveLike, onAddToCart, styles }) {
  const [sortBy, setSortBy] = useState('likes');
  
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const likeModalStyles = styles.likeModal;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Favorite Foods" size="lg" styles={styles}>
      <div className={likeModalStyles.container}>
        {/* Sort Controls */}
        <div className={likeModalStyles.sortContainer}>
          <p className={likeModalStyles.title}>{items.length} items saved</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={likeModalStyles.dropDown}
          >
            <option value="likes">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Items Grid */}
        <div className={likeModalStyles.itemGrid}>
          {sortedItems.map(item => (
            <div key={item.id} className={likeModalStyles.itemContainer}>
              <div className={likeModalStyles.itemWrapper}>
                <LucideForkKnifeCrossed className={likeModalStyles.knifeIcon} />
                <button
                  onClick={() => onRemoveLike(item.id)}
                  className={likeModalStyles.likeBtn}
                  aria-label="Remove from favorites"
                >
                  <Heart className={likeModalStyles.likeIcon} />
                </button>
              </div>
              <div className={likeModalStyles.contentContainer}>
                <div>
                  <h3 className={likeModalStyles.itemName}>{item.name}</h3>
                  <div className={likeModalStyles.categoryBadge}>
                    <span className={likeModalStyles.category}>
                      {item.category}
                    </span>
                    <div className={likeModalStyles.ratingContainer}>
                      <Star className={likeModalStyles.ratingIcon} />
                      <span className={likeModalStyles.rating}>{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className={likeModalStyles.priceContainer}>
                  <p className={likeModalStyles.price}>
                    <IndianRupee className={likeModalStyles.priceIcon} />
                    {item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => onAddToCart(item)}
                    className={likeModalStyles.addCartBtn}
                  >
                    <ShoppingCart className={likeModalStyles.addCartIcon} />
                    Add
                  </button>
                </div>
                <div className={likeModalStyles.likeCountContainer}>
                  <Heart className={likeModalStyles.likeCountIcon} />
                  <span>{item.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className={likeModalStyles.noFavoriteContainer}>
            <Heart className={likeModalStyles.noFavoriteIcon} />
            <p className={likeModalStyles.noFavoriteDescription1}>No favorite items yet</p>
            <p className={likeModalStyles.noFavoriteDescription2}>Start adding items to your favorites!</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default LikedItemsModal