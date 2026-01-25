import { MapPin, Star } from "lucide-react";

function RestaurantInfoPanel({ content, restaurant, styles }) {
  if (!restaurant) return null;

  return (
    <div className="space-y-4">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className={styles.images.restaurant}
      />
      <div>
        <h3 className={styles.text.heading.h3}>{restaurant.name}</h3>
        <p className={styles.text.body.muted}>
          {restaurant.cuisine} Cuisine
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Star className={`w-5 h-5 ${styles.icon_colors.yellow}`} />
        <span className={styles.text.body.regular + ' font-semibold'}>
          {restaurant.rating}
        </span>
        <span className={styles.text.body.small_muted}>
          {content.restaurant_labels.rating}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{restaurant.address}</span>
        </div>
      </div>

      <div>
        <h4 className={styles.text.heading.h4 + ' mb-2'}>
          {content.restaurant_labels.features}
        </h4>
        <div className="flex flex-wrap gap-2">
          {restaurant.features.map((feature, idx) => (
            <span key={idx} className={styles.features.feature_badge}>
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className={styles.text.heading.h4 + ' mb-2'}>
          {content.restaurant_labels.restaurant_badges}
        </h4>
        <div className="flex flex-wrap gap-2">
          {restaurant.badges.map((badge, idx) => (
            <span key={idx} className={styles.features.restaurant_badge}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RestaurantInfoPanel