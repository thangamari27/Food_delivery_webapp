import { X, IndianRupee, Star, Clock, Users, Globe, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from './Image';
import { viewItemModalContent } from '@/utils/constant/admin/CommonConstant';
import { viewItemModalStyles } from '@/utils/styles/Common';

function ViewItemModal({ 
  isOpen, 
  onClose, 
  item, 
  dish, 
  buttonContent, 
  buttonText, 
  onAddToCart,
  type = 'topCategory' 
}) {
  // Get content and styles based on type
  const content = type === 'specialMenu' ? viewItemModalContent.specialMenu : viewItemModalContent.topCategory;
  const styles = viewItemModalStyles;
  
  // Use item or dish based on type
  const menuItem = item || dish;
  const [quantity, setQuantity] = useState(1);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !menuItem) return null;

  // Helper functions
  const getCuisineBadgeColor = () => {
    const cuisine = menuItem.cuisine?.toLowerCase();
    if (!cuisine) return 'bg-gray-100 text-gray-800';
    if (cuisine === 'arabic') return 'bg-blue-100 text-blue-800';
    if (cuisine === 'thai') return 'bg-red-100 text-red-800';
    if (cuisine === 'indian') return 'bg-orange-100 text-orange-800';
    if (cuisine === 'pakistani') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getCategoryBadgeColor = () => {
    const category = menuItem.category?.toLowerCase();
    if (!category) return 'bg-gray-100 text-gray-800';
    if (category.includes('roll')) return 'bg-purple-100 text-purple-800';
    if (category.includes('noodle')) return 'bg-yellow-100 text-yellow-800';
    if (category.includes('rice')) return 'bg-amber-100 text-amber-800';
    if (category.includes('seafood')) return 'bg-blue-100 text-blue-800';
    if (category.includes('beverage')) return 'bg-cyan-100 text-cyan-800';
    return 'bg-gray-100 text-gray-800';
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
    } else {
      console.log(`Added ${quantity} x ${menuItem.name} to cart`);
      onClose();
    }
  };

  const getButtonContent = () => {
    if (type === 'specialMenu' && buttonText) {
      return {
        btnText1: buttonText.btntext1 || "View Details",
        btnText2: buttonText.btntext2 || "Quick Add"
      };
    }
    return buttonContent || { btnText1: "View Details", btnText2: "Quick Add" };
  };

  const buttonLabels = getButtonContent();

  return (
    <div 
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        
        {/* Header with image */}
        <div className={styles.headerImage}>
          <Image 
            src={menuItem.src}
            srcFallback={menuItem.srcFallback}
            alt={menuItem.alt || menuItem.name}
            pictureStyle="w-full h-full"
            imageStyle="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          {/* Cuisine or Category badge */}
          {menuItem.cuisine && (
            <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${getCuisineBadgeColor()}`}>
              <div className="flex items-center gap-1">
                <Globe size={14} />
                {menuItem.cuisine.charAt(0).toUpperCase() + menuItem.cuisine.slice(1)}
              </div>
            </div>
          )}
          
          {menuItem.category && !menuItem.cuisine && (
            <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor()}`}>
              {menuItem.category}
            </div>
          )}
          
          {/* Discount badge */}
          {menuItem.originalPrice && menuItem.originalPrice > menuItem.price && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {Math.round((1 - menuItem.price / menuItem.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and rating */}
          <div className="mb-4">
            <h2 className={styles.title}>{menuItem.name}</h2>
            <div className={styles.ratingWrapper}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    className={i < (menuItem.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({menuItem.reviews || '120'} {content.reviewsText})
              </span>
            </div>
          </div>

          {/* Description */}
          <div className={styles.descriptionWrapper}>
            <h3 className={styles.sectionTitle}>
              {content.descriptionTitle}
            </h3>
            <p className={styles.descriptionText}>
              {menuItem.description || menuItem.ingredients || content.defaultDescription}
            </p>
          </div>

          {/* Additional info */}
          <div className={styles.infoGrid}>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500" />
              <div>
                <p className={styles.infoLabel}>
                  {content.prepTimeLabel}
                </p>
                <p className={styles.infoValue}>
                  {menuItem.prepTime || "15-20 mins"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray-500" />
              <div>
                <p className={styles.infoLabel}>
                  {content.servesLabel}
                </p>
                <p className={styles.infoValue}>
                  {menuItem.serves || "2-3 People"}
                </p>
              </div>
            </div>
          </div>

          {/* Price and quantity */}
          <div className={styles.priceWrapper}>
            <div>
              <div className="flex items-center mb-1">
                <IndianRupee size={20} />
                <span className="text-2xl font-bold text-gray-900 ml-1">
                  {menuItem.price}
                </span>
              </div>
              {menuItem.originalPrice && menuItem.originalPrice > menuItem.price && (
                <div className="flex items-center text-sm">
                  <IndianRupee className="text-gray-400 line-through" size={14} />
                  <span className="text-gray-400 line-through ml-1">
                    {menuItem.originalPrice}
                  </span>
                  <span className="ml-2 text-red-600 font-semibold">
                    Save ₹{menuItem.originalPrice - menuItem.price}
                  </span>
                </div>
              )}
            </div>
            
            <div className={styles.quantityWrapper}>
              <button 
                className={styles.quantityBtn}
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 border-x font-semibold min-w-[40px] text-center">
                {quantity}
              </span>
              <button 
                className={styles.quantityBtn}
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCartClick}
              className={type === 'specialMenu' ? styles.actionButton.specialMenu : styles.actionButton.topCategory}
            >
              {content.addToCartText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemModal;