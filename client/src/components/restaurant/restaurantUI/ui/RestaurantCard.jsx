import { Leaf, Award, Flame, Clock, MapPin, Star, IndianRupee } from "lucide-react";
import Image from "@/components/common/Image";

function RestaurantCard({ restaurant, styles, onViewMenu, onBookNow }) {
  
  // Helper function to format cuisine display
  const formatCuisine = (cuisine) => {
    if (!cuisine) return "";
    
    if (Array.isArray(cuisine)) {
      // If it's an array, join with commas and limit to 2-3 items
      if (cuisine.length <= 3) {
        return cuisine.join(", ");
      } else {
        return `${cuisine.slice(0, 2).join(", ")} +${cuisine.length - 2}`;
      }
    }
    
    // If it's a string, just return it
    return cuisine;
  };

  // Helper function to get address display
  const getAddressDisplay = (address) => {
    if (!address) return "Address not available";
    
    if (typeof address === 'string') return address;
    
    if (address && typeof address === 'object') {
      // Show city or area
      if (address.city) return address.city;
      if (address.area) return address.area;
      if (address.street) return address.street;
    }
    
    return "Location";
  };

  // Helper to safely get rating
  const getRatingDisplay = (rating) => {
    if (!rating) return "N/A";
    
    if (typeof rating === 'object') {
      return `${rating.average || 'N/A'} (${rating.count || 0})`;
    }
    
    return rating;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image 
          src={restaurant.src}
          srcFallback={restaurant.srcFallback}
          pictureStyle={styles.image}
        />
        <div className={styles.badge}>
          {restaurant.badges && restaurant.badges.map((badge) => (
            <span key={badge} className={styles.badgeItem}>
              {badge === "Pure Veg" && <Leaf className="w-3 h-3 text-green-600" />}
              {badge === "Bestseller" && <Award className="w-3 h-3 text-yellow-600" />}
              {badge === "Trending" && <Flame className="w-3 h-3 text-orange-600" />}
              {badge === "Fast Delivery" && <Clock className="w-3 h-3 text-blue-600" />}
              {badge === "Award Winner" && <Award className="w-3 h-3 text-purple-600" />}
              {badge}
            </span>
          ))}
        </div>
        {restaurant.offers && (
          <div className={styles.offerBadge}>
            {restaurant.offers}
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.restaurantHeader}>
          <h3 className={styles.restaurantName}>{restaurant.name || "Restaurant"}</h3>
          <div className={styles.rating}>
            <Star className="w-3 h-3 fill-white" />
            {getRatingDisplay(restaurant.rating)}
          </div>
        </div>

        {/* Cuisine display - now properly formatted */}
        <p className={styles.cuisine}>
          {formatCuisine(restaurant.cuisine) || "Multiple cuisines"}
        </p>

        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{getAddressDisplay(restaurant.address)}</span>
          </div>
          <div className={styles.infoRow}>
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{restaurant.deliveryTime || "30-40 min"}</span>
          </div>
          <div className={styles.infoRow}>
            <IndianRupee className="w-4 h-4 text-gray-500" />
            <span>{restaurant.priceRange || "₹300 for two"}</span>
          </div>
        </div>

        <div className={styles.features}>
          {restaurant.features && restaurant.features.slice(0, 3).map((feature) => (
            <span key={feature} className={styles.featureTag}>
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button 
          className={styles.viewMenuButton}
          onClick={() => onViewMenu && onViewMenu(restaurant)}
        >
          View Menu
        </button>
        <button 
          className={styles.bookButton}
          onClick={() => onBookNow && onBookNow(restaurant)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;