import { Leaf, Award, Flame, Clock, MapPin, Star, IndianRupee } from "lucide-react";

function RestaurantCard({ restaurant, styles, onViewMenu, onBookNow }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img 
          src={restaurant.image}
          alt={restaurant.name}
          className={styles.image}
        />
        <div className={styles.badge}>
          {restaurant.badges.map((badge) => (
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
          <h3 className={styles.restaurantName}>{restaurant.name}</h3>
          <div className={styles.rating}>
            <Star className="w-3 h-3 fill-white" />
            {restaurant.rating}
          </div>
        </div>

        <p className={styles.cuisine}>{restaurant.cuisine}</p>

        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{restaurant.address}</span>
          </div>
          <div className={styles.infoRow}>
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className={styles.infoRow}>
            <IndianRupee className="w-4 h-4 text-gray-500" />
            <span>{restaurant.priceRange}</span>
          </div>
        </div>

        <div className={styles.features}>
          {restaurant.features.slice(0, 3).map((feature) => (
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