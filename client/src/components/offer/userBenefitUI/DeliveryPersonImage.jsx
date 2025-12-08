import Image from '@/components/common/Image'

function DeliveryPersonImage({ content, styles}) {
  return (
    <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
            {/* Subtle blurred background glow */}
            <div className={styles.imageShadow}></div>          
            <Image 
                src={content.src}
                srcFallback={content.srcFallback}
                alt={content.alt}
                pictureStyle={styles.picture}
                imageStyle={styles.image}
            />          
        </div>
    </div>
  )
}

export default DeliveryPersonImage