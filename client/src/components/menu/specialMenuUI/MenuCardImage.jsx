import Image from '@/components/common/Image'

function MenuCardImage({ dish, styles}) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={dish.src}
        srcFallback={dish.srcFallback}
        alt={dish.alt}
        pictureStyle={styles.picture}
        imageStyle={styles.image}
      />
    </div>
  )
}

export default MenuCardImage