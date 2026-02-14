import Image from "@/components/common/Image";
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

const MenuHeader = ({ restaurant, styles }) => {
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
  const imageData = getImageSource(restaurant);
  return (
    <div className={styles.menuHeroImage}>
     <Image 
        src={imageData.src}
        srcFallback={imageData.srcFallback}
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
  )
};

export default MenuHeader;