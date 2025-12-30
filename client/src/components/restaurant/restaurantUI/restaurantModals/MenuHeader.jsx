import Image from "@/components/common/Image";
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

const MenuHeader = ({ restaurant, styles }) => ( 
  <div className={styles.menuHeroImage}>
     <Image 
        src={restaurant.src}
        srcFallback={restaurant.srcFallback}
        imageStyle={styles.image}
      />
    <div className={styles.menuImageOverlay}></div>

    <div className={styles.menuImageContent}>
      <Title 
        title={restaurant.name}
        titleStyle={styles.menuRestaurantName}
      />
      <Paragraph 
        paragraph={restaurant.cuisine}
        paragraphStyle={styles.menuCuisineType}
      />
    </div>
  </div>
);

export default MenuHeader;