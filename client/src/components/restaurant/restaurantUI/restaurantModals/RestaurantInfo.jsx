import { Star, Clock, IndianRupee, MapPin, Award } from "lucide-react";

const RestaurantInfo = ({ restaurant, styles }) => (
  <div className={styles.menuInfoSection}>
    <InfoGrid restaurant={restaurant} styles={styles} />
    {restaurant.offers && <OfferBanner offer={restaurant.offers} styles={styles} />}
  </div>
);

// Sub-component: Info Grid
const InfoGrid = ({ restaurant, styles }) => (
  <div className={styles.menuInfoGrid}>
    <InfoItem
      icon={<Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
      text={restaurant.rating}
      isBold={true}
      styles={styles}
    />
    <InfoItem
      icon={<Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />}
      text={restaurant.deliveryTime}
      styles={styles}
    />
    <InfoItem
      icon={<IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />}
      text={restaurant.priceRange}
      styles={styles}
    />
    <InfoItem
      icon={<MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />}
      text={restaurant.address}
      styles={styles}
    />
  </div>
);

// Sub-component: Individual Info Item
const InfoItem = ({ icon, text, isBold = false, styles }) => (
  <div className={styles.menuInfoItem}>
    {icon}
    <span className={isBold ? "font-semibold" : styles.menuInfoItemText}>
      {text}
    </span>
  </div>
);

// Sub-component: Offer Banner
const OfferBanner = ({ offer, styles }) => (
  <div className={styles.menuOfferBanner}>
    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
    <span className={styles.menuOfferText}>{offer}</span>
  </div>
);

export default RestaurantInfo;