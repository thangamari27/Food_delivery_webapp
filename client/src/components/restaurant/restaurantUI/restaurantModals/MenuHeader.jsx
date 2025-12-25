import Image from "@/components/common/Image";

const MenuHeader = ({ restaurant, styles }) => ( 
  <div className={styles.menuHeroImage}>
     <Image 
        src={restaurant.src}
        srcFallback={restaurant.srcFallback}
        imageStyle={styles.image}
      />
    <div className={styles.menuImageOverlay}></div>

    <div className={styles.menuImageContent}>
      <h2 className={styles.menuRestaurantName}>{restaurant.name}</h2>
      <p className={styles.menuCuisineType}>{restaurant.cuisine}</p>
    </div>
  </div>
);

export default MenuHeader;