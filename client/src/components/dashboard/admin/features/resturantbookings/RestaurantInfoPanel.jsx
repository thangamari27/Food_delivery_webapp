import { MapPin, Star, Phone } from "lucide-react";

function RestaurantInfoPanel({ content, restaurant, styles }) {
  if (!restaurant) return null;
  // Properly construct image URL from backend response
  const getRestaurantImage = (restaurant) => {
    // If image is an object with publicId and format
    if (restaurant.image && typeof restaurant.image === 'object') {
      const { publicId, format } = restaurant.image;
      if (publicId && format) {
        // Construct Cloudinary URL
        // Replace with your actual Cloudinary cloud name
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
        return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;
      }
    }
    
    // If image is a direct URL string
    if (typeof restaurant.image === 'string') {
      return restaurant.image;
    }
    
    // Check other possible image fields
    if (restaurant.imageUrl) return restaurant.imageUrl;
    if (restaurant.imageSrc) return restaurant.imageSrc;
    if (restaurant.src) return restaurant.src;
    
    // Fallback placeholder
    return 'https://placehold.co/400x400/FF4F00/white?text=Restaurant';
  };

  const restaurantImage = getRestaurantImage(restaurant);
  
  // Get features with fallback
  const features = restaurant.features || 
                   restaurant.restaurantFeatures || 
                   restaurant.featuresList || 
                   [];
  
  // Get badges with fallback
  const badges = restaurant.badges || 
                 restaurant.restaurantBadges || 
                 restaurant.badgeList || 
                 [];
  
  // Get rating with fallback
  const rating = restaurant.rating || 
                 restaurant.ratingAverage || 
                 restaurant.averageRating || 
                 0;
  
  // Get cuisine with fallback
  const cuisine = restaurant.cuisine || 'Multiple';

  return (
    <div className="space-y-4">
      {/* Restaurant Image */}
      {/* <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={restaurantImage}
          alt={restaurant.name || 'Restaurant'}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = 'https://placehold.co/400x400/FF4F00/white?text=Restaurant';
          }}
        />
      </div> */}

      {/* Restaurant Name and Cuisine */}
      <div>
        <h3 className={styles.text?.heading?.h3 || 'text-lg font-semibold text-gray-900'}>
          {restaurant.name || 'Restaurant'}
        </h3>
        <p className={styles.text?.body?.muted || 'text-sm text-gray-600'}>
          {Array.isArray(cuisine) ? cuisine.join(', ') : cuisine} Cuisine
        </p>
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-2">
          <Star className={`w-5 h-5 ${styles.icon_colors?.yellow || 'text-yellow-500'} fill-current`} />
          <span className={(styles.text?.body?.regular || 'text-sm') + ' font-semibold'}>
            {Number(rating).toFixed(1)}
          </span>
          <span className={styles.text?.body?.small_muted || 'text-xs text-gray-500'}>
            {content?.restaurant_labels?.rating || 'Rating'}
          </span>
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-2">
        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{restaurant.address || 'Address not available'}</span>
        </div>
        
        {/* Phone */}
        {restaurant.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <a 
              href={`tel:${restaurant.phone}`} 
              className="text-orange-600 hover:underline"
            >
              {restaurant.phone}
            </a>
          </div>
        )}
      </div>

      {/* Features */}
      {Array.isArray(features) && features.length > 0 && (
        <div>
          <h4 className={(styles.text?.heading?.h4 || 'text-sm font-semibold text-gray-900') + ' mb-2'}>
            {content?.restaurant_labels?.features || 'Features'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 6).map((feature, idx) => (
              <span 
                key={idx} 
                className={styles.features?.feature_badge || 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded'}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {Array.isArray(badges) && badges.length > 0 && (
        <div>
          <h4 className={(styles.text?.heading?.h4 || 'text-sm font-semibold text-gray-900') + ' mb-2'}>
            {content?.restaurant_labels?.restaurant_badges || 'Badges'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 5).map((badge, idx) => (
              <span 
                key={idx} 
                className={styles.features?.restaurant_badge || 'bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded'}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantInfoPanel;