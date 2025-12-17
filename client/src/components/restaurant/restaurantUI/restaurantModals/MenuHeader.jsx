
const MenuHeader = ({ restaurant, styles }) => ( 
  <div className={styles.menuHeroImage}>
    <img 
      src={restaurant.image} 
      alt={restaurant.name}
      className={styles.menuImage}
    />
    <div className={styles.menuImageOverlay}></div>

    <div className={styles.menuImageContent}>
      <h2 className={styles.menuRestaurantName}>{restaurant.name}</h2>
      <p className={styles.menuCuisineType}>{restaurant.cuisine}</p>
    </div>
  </div>
);

export default MenuHeader;