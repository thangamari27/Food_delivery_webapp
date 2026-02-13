import { MapPin, Star } from "lucide-react";

function RestaurantInfoPanel({ content, restaurant, styles }) {
  if (!restaurant) return null;

  // Get features with fallback - check different possible property names
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
  
  // Get image with fallback
  const image = restaurant.image || 
                restaurant.imageUrl || 
                restaurant.imageSrc || 
                'https://placehold.co/400x400/FF4F00/white?text=No+Image';

  return (
    <div className="space-y-4">
      <img
        src={image}
        alt={restaurant.name}
        className={styles.images.restaurant}
      />
      <div>
        <h3 className={styles.text.heading.h3}>{restaurant.name || 'Restaurant'}</h3>
        <p className={styles.text.body.muted}>
          {restaurant.cuisine || 'Multiple'} Cuisine
        </p>
      </div>

      {rating > 0 && (
        <div className="flex items-center gap-2">
          <Star className={`w-5 h-5 ${styles.icon_colors.yellow}`} />
          <span className={styles.text.body.regular + ' font-semibold'}>
            {rating.toFixed(1)}
          </span>
          <span className={styles.text.body.small_muted}>
            {content.restaurant_labels?.rating || 'Rating'}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{restaurant.address || 'Address not available'}</span>
        </div>
        {restaurant.phone && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <span className="font-medium">Phone:</span>
            <a href={`tel:${restaurant.phone}`} className="text-orange-600 hover:underline">
              {restaurant.phone}
            </a>
          </div>
        )}
      </div>

      {features.length > 0 && (
        <div>
          <h4 className={styles.text.heading.h4 + ' mb-2'}>
            {content.restaurant_labels?.features || 'Features'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 5).map((feature, idx) => (
              <span key={idx} className={styles.features?.feature_badge || 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded'}>
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {badges.length > 0 && (
        <div>
          <h4 className={styles.text.heading.h4 + ' mb-2'}>
            {content.restaurant_labels?.restaurant_badges || 'Badges'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 5).map((badge, idx) => (
              <span key={idx} className={styles.features?.restaurant_badge || 'bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded'}>
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