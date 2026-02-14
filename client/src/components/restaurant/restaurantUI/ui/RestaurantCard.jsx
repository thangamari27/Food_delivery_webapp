import { Leaf, Award, Flame, Clock, MapPin, Star, IndianRupee, Phone } from "lucide-react";
import Image from "@/components/common/Image";

function RestaurantCard({ restaurant, styles, onViewMenu, onBookNow, isAuthenticated }) {
  
  // Helper: Format cuisine display
  const formatCuisine = (cuisine) => {
    if (!cuisine) return "Multi-cuisine";
    
    if (Array.isArray(cuisine)) {
      if (cuisine.length === 0) return "Multi-cuisine";
      if (cuisine.length <= 2) return cuisine.join(", ");
      return `${cuisine.slice(0, 2).join(", ")} +${cuisine.length - 2}`;
    }
    
    return String(cuisine);
  };

  // Helper: Get address display
  const getAddressDisplay = (address) => {
    if (!address) return "Location";
    
    if (typeof address === 'string') return address;
    
    if (typeof address === 'object') {
      // Priority: city > area > street
      if (address.city) return address.city;
      if (address.area) return address.area;
      if (address.street) return address.street;
      
      // Fallback: combine available fields
      const parts = [
        address.street,
        address.area,
        address.city
      ].filter(Boolean);
      
      if (parts.length > 0) return parts.join(", ");
    }
    
    return "Location";
  };

  // Helper: Get full address
  const getFullAddress = (address) => {
    if (!address) return "";
    
    if (typeof address === 'string') return address;
    
    if (typeof address === 'object') {
      const parts = [
        address.street,
        address.area,
        address.city,
        address.state,
        address.zipCode
      ].filter(Boolean);
      
      return parts.join(", ");
    }
    
    return "";
  };

  // Helper: Get rating display
  const getRatingDisplay = (rating) => {
    if (!rating) return "New";
    
    if (typeof rating === 'object') {
      const avg = rating.average || rating.value || 0;
      const count = rating.count || rating.total || 0;
      return { average: avg.toFixed(1), count };
    }
    
    return { average: Number(rating).toFixed(1), count: 0 };
  };

  // Helper: Get image source
  const getImageSource = (restaurant) => {
    // Check for image object
    if (restaurant.image) {
      if (typeof restaurant.image === 'string') {
        return { src: restaurant.image };
      }
      if (restaurant.image.url) {
        return { src: restaurant.image.url };
      }
      if (restaurant.image.publicId) {
        return {
          src: {
            publicId: restaurant.image.publicId,
            format: restaurant.image.format || 'webp'
          },
          srcFallback: {
            publicId: restaurant.image.publicId,
            format: 'jpg'
          }
        };
      }
    }

    // Check for direct src property
    if (restaurant.src) return { src: restaurant.src, srcFallback: restaurant.srcFallback };
    
    // Default placeholder
    return { 
      src: 'https://via.placeholder.com/400x300?text=Restaurant',
      srcFallback: 'https://via.placeholder.com/400x300?text=Restaurant'
    };
  };

  // Helper: Get badges
  const getBadges = (restaurant) => {
    const badges = [];
    
    // From badges array
    if (Array.isArray(restaurant.badges)) {
      badges.push(...restaurant.badges);
    }
    
    // From features
    if (restaurant.isVegetarian || restaurant.type === 'Veg') {
      if (!badges.includes('Pure Veg')) badges.push('Pure Veg');
    }
    
    if (restaurant.featured) {
      if (!badges.includes('Featured')) badges.push('Featured');
    }
    
    if (restaurant.trending) {
      if (!badges.includes('Trending')) badges.push('Trending');
    }
    
    return badges;
  };

  // Helper: Get features
  const getFeatures = (restaurant) => {
    const features = [];
    
    // From features array
    if (Array.isArray(restaurant.features)) {
      features.push(...restaurant.features);
    }
    
    // From amenities
    if (Array.isArray(restaurant.amenities)) {
      features.push(...restaurant.amenities);
    }
    
    // From boolean flags
    if (restaurant.hasParking) features.push('Parking');
    if (restaurant.hasWifi) features.push('WiFi');
    if (restaurant.hasAC) features.push('AC');
    if (restaurant.takeaway) features.push('Takeaway');
    if (restaurant.delivery) features.push('Delivery');
    
    // Remove duplicates
    return [...new Set(features)];
  };

  // Helper: Get delivery time
  const getDeliveryTime = (restaurant) => {
    if (restaurant.deliveryTime) return restaurant.deliveryTime;
    if (restaurant.avgDeliveryTime) return `${restaurant.avgDeliveryTime} mins`;
    return "30-40 mins";
  };

  // Helper: Get price range
  const getPriceRange = (restaurant) => {
    if (restaurant.priceRange) return restaurant.priceRange;
    if (restaurant.avgCostForTwo) return `₹${restaurant.avgCostForTwo} for two`;
    if (restaurant.priceForTwo) return `₹${restaurant.priceForTwo} for two`;
    return "₹300 for two";
  };

  // Process data
  const imageData = getImageSource(restaurant);
  const rating = getRatingDisplay(restaurant.rating);
  const badges = getBadges(restaurant);
  const features = getFeatures(restaurant);
  const fullAddress = getFullAddress(restaurant.address);

  // Badge icon mapping
  const getBadgeIcon = (badge) => {
    const iconMap = {
      'Pure Veg': <Leaf className="w-3 h-3 text-green-600" />,
      'Bestseller': <Award className="w-3 h-3 text-yellow-600" />,
      'Trending': <Flame className="w-3 h-3 text-orange-600" />,
      'Fast Delivery': <Clock className="w-3 h-3 text-blue-600" />,
      'Award Winner': <Award className="w-3 h-3 text-purple-600" />,
      'Featured': <Star className="w-3 h-3 text-yellow-600" />
    };
    return iconMap[badge] || null;
  };

  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.cardImage}>
        <Image 
          src={imageData.src}
          srcFallback={imageData.srcFallback}
          pictureStyle={styles.image}
          alt={restaurant.name || "Restaurant"}
        />
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className={styles.badge}>
            {badges.slice(0, 3).map((badge) => (
              <span key={badge} className={styles.badgeItem}>
                {getBadgeIcon(badge)}
                {badge}
              </span>
            ))}
          </div>
        )}
        
        {/* Offers */}
        {restaurant.offers && (
          <div className={styles.offerBadge}>
            {restaurant.offers}
          </div>
        )}

        {/* Status */}
        {!restaurant.isActive || restaurant.status !== 'Active' && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Currently Unavailable</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.restaurantHeader}>
          <h3 className={styles.restaurantName} title={restaurant.name}>
            {restaurant.name || "Restaurant"}
          </h3>
          <div className={styles.rating}>
            <Star className="w-3 h-3 fill-white" />
            {rating.average}
            {rating.count > 0 && (
              <span className="text-xs ml-1">({rating.count})</span>
            )}
          </div>
        </div>

        {/* Cuisine */}
        <p className={styles.cuisine} title={formatCuisine(restaurant.cuisine)}>
          {formatCuisine(restaurant.cuisine)}
        </p>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoRow} title={fullAddress}>
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="truncate">{getAddressDisplay(restaurant.address)}</span>
          </div>
          
          <div className={styles.infoRow}>
            <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{getDeliveryTime(restaurant)}</span>
          </div>
          
          <div className={styles.infoRow}>
            <IndianRupee className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{getPriceRange(restaurant)}</span>
          </div>

          {restaurant.phone && (
            <div className={styles.infoRow}>
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
          )}
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className={styles.features}>
            {features.slice(0, 3).map((feature) => (
              <span key={feature} className={styles.featureTag}>
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className={styles.featureTag}>
                +{features.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={styles.cardFooter}>
        <button 
          className={styles.viewMenuButton}
          onClick={() => onViewMenu && onViewMenu(restaurant)}
          disabled={ !restaurant.isActive || restaurant.status !== 'Active'}
        >
          View Menu
        </button>
        <button 
          className={styles.bookButton}
          onClick={() => onBookNow && onBookNow(restaurant)}
          disabled={ !restaurant.isActive || restaurant.status !== 'Active'}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;