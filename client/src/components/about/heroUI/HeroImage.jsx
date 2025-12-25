import Image from '@/components/common/Image'

function HeroImage({ image, styles }) {
  return (
    <div className={styles.right}>
        <Image 
            src={image.src}
            srcFallback={image.srcFallback}
            alt={image.alt}
            width={image.width}
            height={image.height}
            imageStyle={styles.imageStyle}
            pictureStyle={styles.pictureStyle}
        />
    </div>
  )
}

export default HeroImage